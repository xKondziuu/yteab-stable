import inject from '..'
import { logger } from '../../logger'
import { yteabelem, ytelem, ytif } from '../../main'
import { embed } from './embed'
import { ratiofix } from './ratiofix'


var modifyRetryTimeout:number = 0


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
  safe(yt_navigate_finish_OR_ytInitialPlayerResponse:YouTube.EventResponse.Event.yt_navigate_finish|YouTube.PlayerResponse.ytInitialPlayerResponse): void {

    /**
     * Sprawdzamy czy podano yt_navigate_finish czy ytInitialPlayerResponse,
     * dodajemy zmienną isEvent:boolean która mówi czy to event czy nie.
     */
    let detect = yt_navigate_finish_OR_ytInitialPlayerResponse as any
    var isEvent:boolean = false
    if (detect.type == 'yt-navigate-finish') isEvent = true
    const yt_navigate_finish = yt_navigate_finish_OR_ytInitialPlayerResponse as YouTube.EventResponse.Event.yt_navigate_finish
    const ytInitialPlayerResponse = yt_navigate_finish_OR_ytInitialPlayerResponse as YouTube.PlayerResponse.ytInitialPlayerResponse

    var conditionsToMet:boolean
    if (isEvent) {

      // pobieramy dane odpowiedzi eventu
      const response = yt_navigate_finish.detail.response

      // ustalamy warunki do spełnienia
      conditionsToMet = (
        response &&                                                      // czy uzyskano odpowiedź eventu
        response.page == 'watch' &&                                      // czy typ strony to 'watch'
        response.playerResponse.playabilityStatus.status == 'OK' &&      // czy wideo załadowało się poprawnie
        response.playerResponse.playabilityStatus.playableInEmbed &&     // czy możnaje je odtwarzać w ramce
        response.playerResponse.videoDetails.isOwnerViewing == false &&  // czy wyświetla właściciel
        response.playerResponse.videoDetails.isPrivate == false &&       // czy jest prywatne
        response.playerResponse.videoDetails.isLiveContent == false      // czy to transmisja live
      )

    } else {

      // zmienna pozwalająca ustalić czy typ strony to 'watch'
      const iswatch = (document.querySelector('ytd-masthead')?.hasAttribute('is-watch-page') && (document.querySelector('ytd-watch-flexy')?.getAttribute('role') == 'main') || window.location.pathname == '/watch')

      // ustalamy warunki do spełnienia
      conditionsToMet = (
        ytInitialPlayerResponse &&                                       // czy uzyskano odpowiedź odtwarzacza
        iswatch &&                                                       // czy typ strony to 'watch'
        ytInitialPlayerResponse.playabilityStatus.status == 'OK' &&      // czy wideo załadowało się poprawnie
        ytInitialPlayerResponse.playabilityStatus.playableInEmbed &&     // czy możnaje je odtwarzać w ramce
        ytInitialPlayerResponse.videoDetails.isOwnerViewing == false &&  // czy wyświetla właściciel
        ytInitialPlayerResponse.videoDetails.isPrivate == false &&       // czy jest prywatne
        ytInitialPlayerResponse.videoDetails.isLiveContent == false      // czy to transmisja live
      )

    }

    // jeśli wyrenderowano ramkę oraz ustalone warunki są spełnione
    if (yteabelem.watch.iframe.any() && conditionsToMet) {

      // pobieramy id wideo youtube
      const videoid: YouTube.Iframe.src.videoid = isEvent ? yt_navigate_finish.detail.response.endpoint.watchEndpoint.videoId : ytInitialPlayerResponse.videoDetails.videoId

      // stosując try{} unikamy ewentualnych problemów z funkcją now(videoid)
      try {

        /** Modyfikujemy (manipulujemy) zawartość ramki */
        modify.now(videoid, ()=>{
          logger.dlog('Adjusted player content', 'Frame content successfully manipulated')
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
   */
  now(videoid?:YouTube.Iframe.src.videoid, callback?:Function): void {

    // czyścimy timeout niepowodzenia jeśli jest
    try { clearTimeout(modifyRetryTimeout) } catch(error){}

    // pozyskujemy ramkę, jeśli mamy id wideo to po id, a jeśli nie mamy to dowolną
    let frame = videoid ? yteabelem.watch.iframe.id(videoid) : yteabelem.watch.iframe.any()

    // pozyskujemy document ramki, nie kontunuujemy bez niego
    var embedDOM:Document|undefined = frame?.contentWindow?.document
    if (!embedDOM) return

    /** Modyfikacja klas głównego elementu odtwarzacza */
    let playerElement:HTMLDivElement|null = embedDOM.querySelector('#movie_player')
    if (playerElement) {
      playerElement.classList.remove('ytp-embed')
      playerElement.classList.remove('ytp-embed-playlist')
      playerElement.classList.add('yteab-embed')
    }

    /** Umieszczenie domyślnie ukrytego przycisku "Next" */
    let nextButton:HTMLAnchorElement|null = embedDOM.querySelector('.ytp-next-button')
    if (nextButton) {
      nextButton.style.display = 'block'
      nextButton.style.opacity = '.9'
      nextButton.style.cursor = 'pointer'
      nextButton.onclick = () => {
        if (ytif.watch.isplaylist()) {
          ytelem.watch.controls.next()?.click()
        } else {
          ytelem.watch.ytd_watch_next.first()?.click()
        }
      }
    }

    /** Umieszczenie domyślnie ukrytego przycisku "Prev" jeśli playlista */
    let prevButton:HTMLAnchorElement|null = embedDOM.querySelector('.ytp-prev-button')
    if (prevButton && ytif.watch.isplaylist()) {
      prevButton.style.display = 'block'
      prevButton.style.opacity = '.9'
      prevButton.style.cursor = 'pointer'
      prevButton.onclick = () => {
        ytelem.watch.controls.prev()?.click()
      }
    }

    /** Elementy do usunięcia */
    let elementsToRemove:string[] = [
      '.ytp-ce-element',
      '.ytp-chrome-top',
      '.ytp-gradient-top',
      '.ytp-more-videos-view'
    ]

    /** Elementy do ukrycia */
    let elementsToHide:string[] = [
      '.ytp-chrome-top',
      '.ytp-contextmenu .ytp-panel-menu > .ytp-menuitem:first-child',
      '.ytp-contextmenu .ytp-collapse',
      '.ytp-gradient-top',
      '.ytp-impression-link',
      '.ytp-more-videos-view',
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

    // dodatkowo dodajemy <style> ukrycia elementów
    let stylehide = embedDOM.createElement('style')
    stylehide.innerHTML = `${elementsToHide.toString()} {display: none!important}`
    stylehide.className = 'yteab-style-hide'
    embedDOM.body.appendChild(stylehide)

    /**
     * Jeśli poprawnie odnaleziono element odtwarzacza oraz nadano mu klasę,
     * oznacza to że prawdopodobnie powyższe zadana zostały wykonane poprawnie.
     */
    if (playerElement && playerElement.classList.contains('yteab-embed')) {

      /** Korygujemy aspect ratio jeśli zaszła taka potrzeba */
      ratiofix.fixnow(videoid)

      if (callback) callback()

    } else {

      /**
       * W wypadku niepowodzenia, czekamy 0.5 sekundy i powtarzamy wszystkie powyższe
       * czynności poprzez ponowne wywołanie funkcji modify.now(videoid, callback).
       */
      embed.hide() // ukrycie niezmodyfikowanej ramki
      modifyRetryTimeout = setTimeout(()=>{
        modify.now(videoid, ()=>{
          logger.dlog('Adjusted player content', 'Frame content manipulated after a retry')
          embed.show() // pokazanie ramkmi dopiero gdy mamy pewność że jest zmodyfikowana
        })
      },500)

    }

  }

}


logger.debug.loaded('inject/watch/modify.ts')
