import inject from '..'
import * as dev from '../../dev.json'
import { logger } from '../../logger'
import { yteabelem, ytelem, ytif } from '../../main'


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
   * @param {number} delay - Wartość (w sekundach) określająca delay rozpoczęcia synchronizacji wideo, domyślna wartość 4 sekundy
  * @param {number} rate - Wartość (w sekundach) określająca delay interwału synchronizacji wideo, domyślna wartość 4 sekundy
   */
  safestart(yt_navigate_finish:YouTube.EventResponse.Event.yt_navigate_finish, delay:number = 1, rate:number = 3) {

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

      let videoid = response.endpoint.watchEndpoint.videoId as YouTube.Iframe.src.videoid
      clearTimeout(syncDelay)

      syncDelay = setTimeout(()=>{

        try {

          sync.startnow(rate, videoid)

        } catch (error) {

          logger.error('Unable to start synchronization: \n'+error)

        } finally {

          logger.log('Synchronization started successfully')

        }

      }, delay*1000)

    }

  },

  /**
   * Funkcja uruchamiająca synchronizację wideo w embed do tego na stronie natychmiast po wywołaniu funkcji, interwał jest
   * tworzony i uruchamiany od razu bez względu na obecnie wyświetlaną zawartość, długość wideo i jego obecność na stronie.
   * @param {number} rate - Wartość (w sekundach) określająca delay interwału synchronizacji wideo, domyślna wartość 4 sekundy
   */
  startnow(rate:number, videoid?:YouTube.Iframe.src.videoid|null) {

    clearTimeout(syncDelay)
    clearInterval(syncInterval)

    syncInterval = setInterval(()=>{

      let mainvid = ytelem.watch.video()
      let embed = videoid ? yteabelem.watch.iframe.id(videoid) : yteabelem.watch.iframe.any()

      var embedDOM:Document|undefined = embed?.contentWindow?.document
      if (!embedDOM) return

      let embedvid:HTMLVideoElement|null = embedDOM.querySelector('video')

      if (!ytif.watch.adplaying() && mainvid && embed && embedDOM && embedvid) {

        mainvid.pause()

        if (dev.debug) {

          const maintime = Number( mainvid.currentTime.toFixed(3) )
          const embedtime = Number( embedvid.currentTime.toFixed(3) )
          const deltatime = Number( Math.abs(embedtime - maintime).toFixed(3) )
          const loss = Number( ((deltatime / mainvid.duration) * 100).toFixed(3) )

          logger.debug.log(`Sync - main: ${maintime.toFixed(2)}, embed: ${embedtime.toFixed(2)}, delta: ${deltatime.toFixed(2)}, loss: ${loss}%`)

        }

        mainvid.currentTime = embedvid.currentTime

      } else {

        sync.stop()

      }

    }, rate*1000)

  },

  /**
   * Funkcja zatrzymująca interwał synchronizacji natychmiast po wywołaniu bez względu na to czy jest on utworzony.
   */
  stop() {

    clearTimeout(syncDelay)
    clearInterval(syncInterval)

    logger.log('Synchronization stopped')

  }

}


logger.debug.loaded('inject/watch/sync.ts')
