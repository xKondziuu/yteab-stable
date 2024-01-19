import inject from '..'
import { logger } from '../../logger'
import { ytelem, yteabelem } from '../../main'
import { embed } from './embed'


const cssHeightRatio: string = '--ytd-watch-flexy-height-ratio'
const cssWidthRatio: string = '--ytd-watch-flexy-width-ratio'
var fixnowStart:number, fixnowEnd:number, fixnowInterval:number


/**
 * Moduł z funkcjami do określenia oraz naprawy aspect ratio ramki.
 * @interface Module
 * @module ratiofix
 * @memberof inject/watch
 */
export const ratiofix: inject.watch.ratiofix.Module = {

  getratio: {

    /**
     * Funkcja zwracająca aspect ratio podane w regółach css elementu <ytd-watch-flexy> względem wysokości i szerokości w formie objektu
     * Note: Nazwy wartości css są podane jako stałe na górze skryptu, aby uniknąć ich powtarzania lub literówki
     * @returns {Object} - Aspect ratio regółach css elementu <ytd-watch-flexy> względem wysokości (np. 9) oraz szerokości (np. 16)
     */
    css() {

      // pozyskujemy watchflexy aby wydobyć obecnie ustawione wartości ratio
      const watchflexy:any = ytelem.watch.ytd_watch_flexy()
      if (!watchflexy) return

      const response = {
        height: Number(watchflexy.getComputedStyleValue(cssHeightRatio)),
        width: Number(watchflexy.getComputedStyleValue(cssWidthRatio))
      }

      return response

    },

    /**
     * Funkcja zwracająca aspect ratio <video> względem wysokości i szerokości w formie objektu
     * @param {string} [videoid] - ID wideo na YouTube do odnalezienia ramki, bez niego jest używana dowolna
     * @returns {Object} - Aspect ratio <video> względem wysokości (np. 9) oraz szerokości (np. 16)
     */
    video(videoid?:YouTube.Iframe.src.videoid) {

      // pozyskujemy wymiary wideo używając funkcji z modułu embed
      const videoHeight = embed.getinfo(videoid)?.video.videoHeight
      const videoWidth = embed.getinfo(videoid)?.video.videoWidth
      if (!videoHeight || !videoWidth) return

      const response = {
        height: Number(videoHeight / videoWidth),
        width: Number(videoWidth / videoHeight)
      }

      return response

    }

  },

  /**
   * Funkcja która dopasowuje aspect ratio <video> odtwarzanego w ramce <iframe> do aspect ratio podanego w regółach
   * css do elementu <ytd-watch-flexy>, co powoduje dopasowanie wideo do odtwarzacza i likwiduje czarne pasy, które
   * pojawiają się w momencie gdy pod filmem odtwarzana jest reklama w innym aspect ratio niż film w ramce <iframe>.
   * Note: Nazwy wartości css są podane jako stałe na górze skryptu, aby uniknąć ich powtarzania lub literówki
   * @param {string} [videoid] - ID wideo na YouTube do odnalezienia ramki, bez niego jest używana dowolna
   * @param {Function} [callback] - Funkcja wywoływana gdy sukces
   */
  align(videoid?:YouTube.Iframe.src.videoid, callback?:Function) {

    const videoHeight = embed.getinfo(videoid)?.video.videoHeight
    const videoWidth = embed.getinfo(videoid)?.video.videoWidth
    if (!videoHeight || !videoWidth) return

    // pozyskujemy ratio wideo w ramce używając funkcji getratio.video()
    const videoHeightRatio = ratiofix.getratio.video(videoid)?.height
    const videoWidthRatio = ratiofix.getratio.video(videoid)?.width
    if (!videoHeightRatio || !videoWidthRatio) return


    // pozyskujemy watchflexy aby móc zmienić obecnie ustawione wartości
    const watchflexy:any = ytelem.watch.ytd_watch_flexy()
    if (!watchflexy) return

    /**
     * Ze względu na to jak działają regóły css <ytd-watch-flexy>, w zależności od przypadku
     * podmieniamy tylko jedną z wartości którą chcemy skurczyć (wysokość lub szerokość).
     */
    if (videoHeight > videoWidth) {

      // w tym przypadku film jest nieco bardziej podłużny (np. 4:3)
      watchflexy.style.setProperty(cssWidthRatio, String(videoWidthRatio))
      watchflexy.style.setProperty(cssHeightRatio, '1')

    } else if (videoHeight < videoWidth) {

      // w tym przypadku film jest szeroki (np. 16:9)
      watchflexy.style.setProperty(cssHeightRatio, String(videoHeightRatio))
      watchflexy.style.setProperty(cssWidthRatio, '1')

    } else {

      // obie wartości modyfikujemy tylko gdy film jest dosłownie kwadratowy
      watchflexy.style.setProperty(cssWidthRatio, String(videoWidthRatio))
      watchflexy.style.setProperty(cssHeightRatio, String(videoHeightRatio))

    }

    if (callback) callback()

  },

  /**
   * Funkcja próbująca wywołać funkcję align(videoid) z określonym opóźnieniem, częstotoliwością prób i czasem zakończenia wykonywania
   * Note: Ponowne wywołanie funkcji, kiedy wykonywanie poprzedniego wywołania jeszcze się nie zakończyło powoduje reset poprzedniego wywołania
   * @param {string} [videoid] - ID wideo na YouTube do odnalezienia ramki, bez niego jest używana dowolna
   * @param {number} [start=500] - Wartość (w milisekundach) określająca czas do rozpoczęcia próbowania wywołania funkcji align(videoid)
   * @param {number} [end=2000] - Wartość (w milisekundach) określająca czas do zakończenia próbowania wywołania funkcji align(videoid)
   * @param {number} [rate=250] - Wartość (w milisekundach) określająca częstotliwość próbowania wywołania funkcji align(videoid)
   */
  fixnow(videoid?:YouTube.Iframe.src.videoid, start:number = 500, end:number = 2000, rate:number = 250) {

    clearTimeout(fixnowStart)
    clearTimeout(fixnowEnd)
    clearInterval(fixnowInterval)

    // oczekiwanie do rozpoczęcia
    fixnowStart = setTimeout(() => {

      clearTimeout(fixnowEnd)
      clearInterval(fixnowInterval)

      // interwał wywołujący funkcję align(videoid) co x milisekund
      fixnowInterval = setInterval(() => {
        try {
          videoid ? ratiofix.align(videoid) : ratiofix.align()
        } catch (error) {}
      }, rate)

      // oczekiwanie do zakończenia wykonywania interwału
      fixnowEnd = setTimeout(() => {
        clearInterval(fixnowInterval)
      }, end);

    }, start)

  }

}


logger.debug.loaded('inject/watch/ratiofix.ts')
