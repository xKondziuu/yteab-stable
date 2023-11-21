import inject from '..'
import { logger } from '../../logger'
import { yteabelem } from '../../main'


/**
 * Moduł z funkcjami do modyfikacji zawartości ramki embed.
 * @interface Module
 * @module modify
 * @memberof inject/watch
 */
export const modify: inject.watch.modify.Module = {

  /**
   * Funkcja uruchamiająca funkcję modyfikacji (manipulacji) w sposób bezpieczny, dzięki dodatkowemu pozyskaniu odpowiedzi
   * z eventu yt-navigate-finish sprawdzamy wiele rzeczy m.in. długość, obecność wideo i po ich potwierdzeniu kontynuujemy.
   * @param {Event|unknown} yt_navigate_finish - Objekt event zwracany przez addEventListener po wywołaniu eventu yt-navigate-finish
   */
  safe(yt_navigate_finish:YouTube.EventResponse.Event.yt_navigate_finish): void {

    /** Pobieramy dane odpowiedzi eventu */
    const response = yt_navigate_finish.detail.response

    if (  // jeśli poniższe warunki są spełnione
      yteabelem.watch.iframe.any() &&                                  // czy wyrenderowano ramkę
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

      // stosując try{} unikamy ewentualnych problemów z funkcją now(videoid)
      try {

        /** Modyfikujemy (manipulujemy) zawartość ramki */
        modify.now(videoid, ()=>{
          logger.log('Frame content successfully manipulated')
        })

      } catch (error) {

        logger.error('Unable to manipulate frame content: \n'+error)

      }

    }

  },

  /**
   * Funkcja modyfikująca (manipulująca) zawartość ramki natychmiast po wywołaniu funkcji, wybrane elementy
   * są usuwane lub ukrywane, są też dodawane lub usuwane klasy w celu zmiany ich domyślnych wartości css.
   * @param {string} [videoid] - ID wideo na YouTube do odnalezienia ramki, bez niego jest używana dowolna
   * @param {Function} [callback] - Funkcja wywoływana gdy sukces
   * @returns
   */
  now(videoid?:YouTube.Iframe.src.videoid, callback?:Function): void {

    // pozyskujemy ramkę, jeśli mamy id wideo to po id, a jeśli nie mamy to dowolną
    let embed = videoid ? yteabelem.watch.iframe.id(videoid) : yteabelem.watch.iframe.any()

    // pozyskujemy document ramki, nie kontunuujemy bez niego
    var embedDOM:Document|undefined = embed?.contentWindow?.document
    if (!embedDOM) return

    /** Modyfikacja klas głównego elementu odtwarzacza */
    let playerElement:HTMLDivElement|null = embedDOM.querySelector('#movie_player')
    if (playerElement) {
      playerElement.classList.remove('ytp-embed')
      playerElement.classList.remove('ytp-embed-playlist')
      playerElement.classList.add('yteab-embed')
    }

    /** Elementy do usunięcia */
    let elementsToRemove:string[] = [
      '.ytp-chrome-top',
      '.ytp-gradient-top',
      '.ytp-more-videos-view',
    ]

    /** Elementy do ukrycia */
    let elementsToHide:string[] = [
      '.ytp-pause-overlay',
      '.ytp-pause-overlay-container',
      '.ytp-youtube-button'
    ]

    // usuwamy wszystkie elementy wymienione powyżej
    for (let selector of elementsToRemove) {
      let element:HTMLElement|null = embedDOM.querySelector(<string>selector)
      if (element) element.remove()
    }

    // ukrywamy wszystkie elementy wymienione powyżej
    for (let selector of elementsToHide) {
      let element:HTMLElement|null = embedDOM.querySelector(<string>selector)
      if (element) {
        element.style.display = 'none'
      }
    }

    /**
     * Jeśli poprawnie odnaleziono element odtwarzacza oraz nadano mu klasę,
     * oznacza to że prawdopodobnie powyższe zadana zostały wykonane poprawnie.
     */
    if (playerElement && playerElement.classList.contains('yteab-embed')) {
      if (callback) callback()
    }

  }

}


logger.debug.loaded('inject/watch/modify.ts')