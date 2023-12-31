import inject from '..'
import * as dev from '../../dev.json'
import { logger } from '../../logger'
import { yteabelem, ytelem, ytif } from '../../main'
import { quality } from './quality'


var syncDelay:number, syncInterval:number


/**
 * Moduł z funkcjami do synchronizacji wideo w embed do tego na stronie.
 * @interface Module
 * @module sync
 * @memberof inject/watch
 */
export const sync: inject.watch.sync.Module = {

  /**
   * Funkcja uruchamiająca funkcję synchronizacji startnow(rate) w sposób bezpieczny, dzięki dodatkowemu pozyskaniu odpowiedzi
   * z eventu yt-navigate-finish sprawdzamy wiele rzeczy m.in. długość, obecność wideo i po ich potwierdzeniu kontynuujemy.
   * @param {Event|unknown} yt_navigate_finish - Objekt event zwracany przez addEventListener po wywołaniu eventu yt-navigate-finish
   * @param {number} [delay=1] - Wartość (w sekundach) określająca delay rozpoczęcia synchronizacji wideo, domyślna wartość 4 sekundy
   * @param {number} [rate=3] - Wartość (w sekundach) określająca delay interwału synchronizacji wideo, domyślna wartość 4 sekundy
   * @see /src/inject/watch/embed.ts preparation.preserve(yt_navigate_finish)
   */
  safestart(yt_navigate_finish:YouTube.EventResponse.Event.yt_navigate_finish, delay:number = 1, rate:number = 2) {

    /** Pobieramy dane odpowiedzi eventu */
    const response = yt_navigate_finish.detail.response

    if (  // jeśli poniższe warunki są spełnione
      response &&                                                      // czy uzyskano odpowiedź eventu
      response.page == 'watch' &&                                      // czy typ strony to 'watch'
      response.playerResponse.playabilityStatus.status == 'OK' &&      // czy wideo załadowało się poprawnie
      response.playerResponse.playabilityStatus.playableInEmbed &&     // czy możnaje je odtwarzać w ramce
      response.playerResponse.videoDetails.isOwnerViewing == false &&  // czy wyświetla właściciel
      response.playerResponse.videoDetails.isPrivate == false &&       // czy jest prywatne
      response.playerResponse.videoDetails.isLiveContent == false      // czy to transmisja live
    ) {

      // pobieramy id wideo youtube
      let videoid = response.endpoint.watchEndpoint.videoId as YouTube.Iframe.src.videoid

      // czyścimy timeout syncDelay jeśli jest
      clearTimeout(syncDelay)

      /**
       * Tworzymy timeout syncDelay odliczający czas do rozpoczęcia synchronizacji po załadowaniu wideo,
       * taki timeout jest potrzebny gdyż, reklama jest odtwarzana przed filmem może powodować problemy.
       */
      syncDelay = setTimeout(()=>{

        // stosując try{} unikamy ewentualnych problemów z funkcją startnow(rate, videoid)
        try {

          /** Zmieniamy rodzielczość głównego wideo na SD w celu oszczędzania zasobów */
          quality.main.setonce('360p')

          /** Rozpoczynamy synchronizację, rate przepisujemy z góry i dodajemy uzyskane id wideo */
          sync.startnow(rate, videoid)

        } catch (error) {

          logger.error('Unable to start synchronization: \n'+error)

        } finally {

          logger.log('Synchronization started successfully')

        }

      }, delay*1000)  // mnożymy aby zamienić sekundy na milisekundy

    }

  },

  /**
   * Funkcja uruchamiająca synchronizację wideo w embed do tego na stronie natychmiast po wywołaniu funkcji, interwał jest
   * tworzony i uruchamiany od razu bez względu na obecnie wyświetlaną zawartość, długość wideo i jego obecność na stronie.
   * @param {number} rate - Wartość (w sekundach) określająca delay interwału synchronizacji wideo, domyślna wartość 4 sekundy
   * @param {string} [videoid] - ID wideo na YouTube do odnalezienia ramki, bez niego jest używana dowolna
   */
  startnow(rate:number, videoid?:YouTube.Iframe.src.videoid|null) {

    // czyścimy timeouty syncDelay i syncInterval jeśli są
    clearTimeout(syncDelay)
    clearInterval(syncInterval)

    ytelem.watch.player()?.classList.add('yteab-sync')

    // zmienna pomagająca ustalić czy wideo jest zatrzymane
    let paused:boolean = false

    /**
     * Główny timeout synchronizacji - syncInterval, którego najważniejszym
     * zadaniem jest synchronizacja czasu, wartości currentTime, wideo z embed.
     */
    syncInterval = setInterval(()=>{

      // pozyskujemy główne wideo
      let mainvid = ytelem.watch.video()

      // pozyskujemy ramkę, jeśli mamy id wideo to po id, a jeśli nie mamy to dowolną
      let embed = videoid ? yteabelem.watch.iframe.id(videoid) : yteabelem.watch.iframe.any()

      // pozyskujemy document ramki, nie kontunuujemy bez niego
      var embedDOM:Document|undefined = embed?.contentWindow?.document
      if (!embedDOM) return

      // pozyskujemy wideo z ramki
      let embedvid:HTMLVideoElement|null = embedDOM.querySelector('video')

      /** Jeśli NIE jest odtwarzana reklama */
      if (!ytif.watch.adplaying()) {

        // gdy wszystkie wartości są pozyskane
        if (mainvid && embed && embedDOM && embedvid) {

          // korekcja prędkości odtwarzania po odtwarzaniu reklam
          if (mainvid.playbackRate != 1) mainvid.playbackRate = 1

          /** Zatrzymujemy wideo w celu oszczędzania zasobów */
          mainvid.pause()

          /**
           * Wideo czasami przewija się do końca w wyniku błędu synchronizacji, aby wyeliminować ten problem,
           * jeśli wideo zostało zakończone, automatycznie cofamy do początku i odtwarzamy je ponownie.
           */
          if (mainvid.ended) mainvid.play()

          // sprawdzamy czy czasy wideo (currentTime) różnią się
          if (mainvid.currentTime != embedvid.currentTime) {

            paused = false

            /**
             * Opcjonalne logowanie szczegółów w konsoli przy każdej synchronizacji,
             * dostępne tylko przy trybie debugowania w celu oszczędzania zasobów.
             */
            if (dev.debug) {

              const maintime = Number( mainvid.currentTime.toFixed(3) )                 // przybliżony czas głównego wideo
              const embedtime = Number( embedvid.currentTime.toFixed(3) )               // przybliżony czas wideo odtwarzanego w ramce
              const deltatime = Number( Math.abs(embedtime - maintime).toFixed(3) )     // czas delta, różnica pomiędzy głównym wideo a embed
              const loss = Number( ((deltatime / mainvid.duration) * 100).toFixed(3) )  // procent pominiętego wideo, które nie musiało pobrane

              // logowanie wszystkich obliczonych wartości
              logger.debug.log(`Synchronization - main: ${maintime.toFixed(2)}, embed: ${embedtime.toFixed(2)}, delta: ${deltatime.toFixed(2)}, loss: ${loss}%`)

            }

            /** Synchronizacja czasu, wartości currentTime, głównego wideo do embed */
            mainvid.currentTime = embedvid.currentTime

          } else {

            // logowanie informacji o wstrzymaniu filmu
            if (paused == false) logger.dlog('Video paused, halting...', `Synchronization - VIDEO PAUSED at ${embedvid.currentTime.toFixed(2)}`)

            paused = true

          }

        } else {

          /** Gdy wystąpił problem w pozyskaniu wartości zatrzymujemy synchronizację */
          sync.stop()

        }

      } else {

        /** Przyśpieszenie x2 odtwarzania reklam w tle */
        if (mainvid) mainvid.playbackRate = 2

      }

    }, rate*1000)  // mnożymy aby zamienić sekundy na milisekundy

  },

  /**
   * Funkcja zatrzymująca interwał synchronizacji natychmiast po wywołaniu bez względu na to czy jest on utworzony.
   */
  stop() {

    // czyścimy timeouty syncDelay i syncInterval jeśli są
    clearTimeout(syncDelay)
    clearInterval(syncInterval)

    if (ytelem.watch.player()?.classList.contains('yteab-sync')) {
      logger.log('Synchronization stopped')
    }

    ytelem.watch.player()?.classList.remove('yteab-sync')

  }

}


logger.debug.loaded('inject/watch/sync.ts')
