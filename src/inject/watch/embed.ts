import inject from '..'
import * as dev from '../../dev.json'
import { name } from '../../../package.json'
import { logger } from '../../logger'
import { ytelem, yteabelem } from '../../main'
import { urlparams } from '../urlparams'
import { modify } from './modify'
import { mute } from './mute'
import { sync } from './sync'


/**
 * Moduł z funkcjami do tworzenia, zarządzania, zmiany itd wideo embed bez reklam.
 * @interface Module
 * @module embed
 * @memberof inject/watch
 */
export const embed: inject.watch.embed.Module = {

  /**
   * Funkcja, która tworzy element <iframe> w miejscu odtwarzanego wideo (nad nim),
   * src ramki pokrywa się z id filmu i jest odpowiedno dostosowane do odtwarzania
   * wideo bez reklam, w taki sposób, aby użytkownik nie widział że jest w ramce.
   * @param {string} videoid - ID wideo na YouTube do odtworzenia w <iframe>
   * @param {Function} [callback] - Funkcja wywoływana gdy sukces
   * @see /src/inject/events.ts run(listener, event?)
   */
  create(videoid:YouTube.Iframe.src.videoid, callback?:Function): void {

    /** Określamy wymagany element <div> zawierający <video> */
    let video_container: HTMLDivElement|null = ytelem.watch.video_container()
    if (!video_container) return

    /** Czas rozpoczęcia odtwarzania wideo */
    const videostart = urlparams.current().has('t') ? Number(urlparams.current().get('t')?.replace(/[^0-9]/g, '')) : 0

    /** Interesujące nas ustawienia odtwarzacza embed */
    type iframesett = Pick< YouTube.Iframe.src.settings, ('autoplay'|'enablejsapi'|'fs'|'modestbranding'|'origin'|'rel'|'showinfo'|'start'|'v') >

    // ustawiamy wybrane wcześniej parametry odtwarzacza embed
    const settings: iframesett = {
      autoplay: 1,        // automatyczne odtwarzanie wideo
      enablejsapi: 1,     // api umożliwiające ustawienie źródła odtwarzania
      fs: 1,              // zezwolenie na pełny ekran
      modestbranding: 1,  // ukrycie przycisku z logo youtube
      origin: '0.0.0.0',  // źródło odtwarzania na domenę nadrzędną (youtube.com)
      rel: 0,             // ukrycie proponowanych filmów
      showinfo: 0,        // ukrycie informacji o odtwarzanym filmie
      start: videostart,  // po ilu sekundach rozpocząć odtwarzanie filmu
      v: 3                // wersja odtwarzacza wideo (musi być 3)
    }

    /** Konwersja objektu settings na URLSearchParams */
    const querySettings = Object.keys(settings)
    .map(key => `${key}=${encodeURIComponent(settings[key as keyof iframesett])}`)
    .join('&')

    /** Tworzymy element <iframe> do późniejszej edycji */
    let iframe = document.createElement('iframe')

    // ustawiamy src z id oraz ustawieniami
    iframe.src = `https://www.youtube.com/embed/${videoid}/?${querySettings}`

    // dodajemy dodatkowe ustawienia
    iframe.id = name.split('-')[0]                    // określa #id po którym odnajdujemy nasze ramki
    iframe.loading = 'eager'                          // wymusza szybkie załadowanie zawartości
    iframe.referrerPolicy = 'same-origin'             // eliminuje problemy z CORS oraz skryptami
    iframe.setAttribute('data-yteab', btoa(videoid))  // dzięki temu określamy film (id) jest odtwarzany w ramce
    iframe.style.display = 'none'                     // ponieważ dopiero przygotowujemy

    /** Ustawienia sandbox dzięki którym ramka może gadać z dokumentem powyżej na odwrót */
    iframe.setAttribute('sandbox', 'allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation')

    /** Dodajemy element <iframe> do wcześniej otrzymanego video_container */
    video_container.appendChild(iframe)

    // sprawdzamy czy wszystko przebiegło zgodnie z planem
    if (yteabelem.watch.iframe.id(videoid)) {
      logger.debug.log('Iframe rendering finished')
      if (callback) callback()
    } else {
      logger.error('Unable to create iframe')
    }

  },

  /**
   * Funkcja, która przygotowuje (tworzy) element <iframe> za pomocą funkcji create(videoid, callback?),
   * id video pobiera z eventu, dodatkowo załącza z interval który cały czas wycisza <video> na youtube.
   * @param {Event|unknown} yt_navigate_start - Objekt event zwracany przez addEventListener po wywołaniu eventu yt-navigate-start
   * @param {Function} [callback] - Funkcja wywoływana gdy sukces
   * @see /src/inject/events.ts run(listener, event?)
   */
  prepare(yt_navigate_start:YouTube.EventResponse.Event.yt_navigate_start, callback?:Function): void {

    logger.debug.log('Preparing video iframe...')

    // dodajemy do odtwarzacza klasę do zmiany css
    ytelem.watch.player()?.classList.add('yteab-playing')

    // wyciszamy wideo
    mute.enable()

    /** Pobieramy id wideo które użytkownik chce załadować */
    const videoid: YouTube.Iframe.src.videoid = yt_navigate_start.detail.endpoint.watchEndpoint.videoId

    /** Tworzymy (przygotowujemy) element <iframe> */
    embed.create(videoid, ()=>{
      if (callback) callback()
    })

  },

  preparation: {

    /**
     * Funkcja, która zachowuje element <iframe> przygotowany wcześniej przez funkcję prepare(yt_navigate_start),
     * następnie modyfikuje zawartość <iframe> tak, aby przypominał standardowy odtwarzacz, na koniec pokazuje
     * domyślnie ukryty element <iframe> i uruchamia funkcję sync.safestart(yt_navigate_finish, delay, rate)
     * @param {Event|unknown} yt_navigate_finish - Objekt event zwracany przez addEventListener po wywołaniu eventu yt-navigate-finish
     * @see /src/inject/events.ts run(listener, event?)
     * @see /src/inject/watch/sync.ts safestart(yt_navigate_finish, delay, rate)
     */
    preserve(yt_navigate_finish_OR_ytInitialPlayerResponse:YouTube.EventResponse.Event.yt_navigate_finish|YouTube.PlayerResponse.ytInitialPlayerResponse) {

      /**
       * Sprawdzamy czy podano yt_navigate_finish czy ytInitialPlayerResponse,
       * dodajemy zmienną isEvent:boolean która mówi czy to event czy nie.
       */
      let detect = yt_navigate_finish_OR_ytInitialPlayerResponse as any
      var isEvent:boolean = false
      if (detect.type == 'yt-navigate-finish') isEvent = true
      const yt_navigate_finish = yt_navigate_finish_OR_ytInitialPlayerResponse as YouTube.EventResponse.Event.yt_navigate_finish
      const ytInitialPlayerResponse = yt_navigate_finish_OR_ytInitialPlayerResponse as YouTube.PlayerResponse.ytInitialPlayerResponse

      /** Pobieramy id finalnie załadowanego wideo */
      const videoid: YouTube.Iframe.src.videoid = isEvent ? yt_navigate_finish.detail.response.endpoint.watchEndpoint.videoId : ytInitialPlayerResponse.videoDetails.videoId

      /** Pobieramy załadowany <iframe> */
      const iframe = yteabelem.watch.iframe.id(videoid)

      // sprawdzamy czy istnieje
      if (iframe) {

        logger.dlog('Keeping prepared render', 'Keeping prepared iframe')

        /** Pozostawiamy <iframe> który zawiera wideo o tym id */
        embed.keep(videoid)

        /** Modyfikujemy zawartość ramki w sposób bezpieczny */
        modify.safe(yt_navigate_finish_OR_ytInitialPlayerResponse)

        /** Przenosimy focus na ramkę */
        embed.focus(videoid)

        /** Pokazujemy <iframe> */
        iframe.style.display = 'block'

        /** Uruchamiamy synchronizację w sposób bezpieczny */
        sync.safestart(yt_navigate_finish)

      }

    },

    /**
     * Funkcja, która anuluje przygotowanie <iframe> poprzez jego usunięcie za pomocą remove(),
     * dodatkowo wyłącza wcześniej załączony interval cały czas wyciszający <video> na youtube.
     * @param {Event|unknown} [yt_navigate_finish] - Objekt event zwracany przez addEventListener po wywołaniu eventu yt-navigate-finish
     * @see /src/inject/events.ts run(listener, event?)
     * @see /src/inject/watch/sync.ts stop()
     */
    cancel(yt_navigate_finish?:YouTube.EventResponse.Event.yt_navigate_finish) {

      logger.dlog('Canceling prepared render', 'Canceling prepared iframe')

      // dla pewności usuwamy wszystkie ramki
      embed.remove()

      // usuwamy z odtwarzacza klasę do zmiany css
      ytelem.watch.player()?.classList.remove('yteab-playing')

      // wyłączamy wyciszenie
      mute.disable()

      // zatrzymujemy synchronizację
      sync.stop()

    }

  },

  /**
   * Funkcja która odnajduje wśród wyrenderowanych <iframe>, ramkę odtwarzającą
   * wideo o podanym ID, a następnie usuwa wszystkie pozostałe z innymi filmami.
   * @param {string} videoid - ID wideo na YouTube do odnalezienia ramki
   */
  keep(videoid:YouTube.Iframe.src.videoid) {

    // sprawdzamy czy interesująca nas ramka istnieje
    if (yteabelem.watch.iframe.id(videoid)) {

      /** Usuwamy wszystkie ramki z filmem o nie pasującym ID */
      yteabelem.watch.iframes()?.forEach((iframe) => {
        if (iframe.getAttribute('data-yteab') != btoa(videoid)) {
          iframe.remove()
        }
      })

    } else {

      logger.error('Unable find iframe to keep')

    }

  },

  /**
   * Funkcja która ustawia focus na stworzonej ramce, domyślnie focus jest ustawiony na głównym wideo,
   * przenosimy focus w celu nasłuchiwania imputów z klawiatury i ignorowania ich na głównym wideo.
   * @param {string} [videoid] - ID wideo na YouTube do odnalezienia ramki, bez niego jest używana dowolna
   */
  focus(videoid?:YouTube.Iframe.src.videoid) {

    // pozyskujemy ramkę, jeśli mamy id wideo to po id, a jeśli nie mamy to dowolną, nie kontynuujemy bez
    let embed = videoid ? yteabelem.watch.iframe.id(videoid) : yteabelem.watch.iframe.any()
    if (!embed) return

    /** Zfocusowanie elementu <iframe> */
    try {
      embed.focus()
      logger.debug.log('Iframe element focused')
    } catch (error) {
      logger.error('Unable to focus iframe: \n'+error)
    }

  },

  /**
   * Funkcja która ukrywa ramkę poprzez ustawienie css visibility do hidden
   * @param {string} [videoid] - ID wideo na YouTube do odnalezienia ramki, bez niego jest używana dowolna
   */
  hide(videoid?:YouTube.Iframe.src.videoid) {

    // pozyskujemy ramkę, jeśli mamy id wideo to po id, a jeśli nie mamy to dowolną, nie kontynuujemy bez
    let embed = videoid ? yteabelem.watch.iframe.id(videoid) : yteabelem.watch.iframe.any()
    if (!embed) return

    embed.style.visibility = 'hidden'

  },

  /**
   * Funkcja która pokazuje ukrytą ramkę poprzez ustawienie css visibility do visible
   * @param {string} [videoid] - ID wideo na YouTube do odnalezienia ramki, bez niego jest używana dowolna
   */
  show(videoid?:YouTube.Iframe.src.videoid) {

    // pozyskujemy ramkę, jeśli mamy id wideo to po id, a jeśli nie mamy to dowolną, nie kontynuujemy bez
    let embed = videoid ? yteabelem.watch.iframe.id(videoid) : yteabelem.watch.iframe.any()
    if (!embed) return

    embed.style.visibility = 'visible'

  },

  /**
   * Funkcja zwracająca wybrane informacje na temat ramki <iframe> oraz <video> w ramce w postaci objektu z danymi
   * UWAGA! Działa tylko gdy <video> w ramce jest załadowane (video.onloadedmetadata), inaczej zwraca undefined
   * @param {string} [videoid] - ID wideo na YouTube do odnalezienia ramki, bez niego jest używana dowolna
   * @returns {Object} - Wybrane informacje pozyskane na temat ramki oraz <video> w ramce
   */
  getinfo(videoid?:YouTube.Iframe.src.videoid) {

    // pozyskujemy ramkę, jeśli mamy id wideo to po id, a jeśli nie mamy to dowolną
    const frame = videoid ? yteabelem.watch.iframe.id(videoid) : yteabelem.watch.iframe.any()
    if (!frame) return

    // pozyskujemy document ramki, nie kontunuujemy bez niego
    var embedDOM:Document|undefined = frame?.contentWindow?.document
    if (!embedDOM) return

    // pozyskujemy <video> z ramki w celu wydobycia informacji na jego temat
    const video: HTMLVideoElement | null = embedDOM.querySelector('#player div.html5-video-container video')
    if (!video) return

    const response: inject.watch.embed.getinfo = {
      iframe: {
        clientHeight: frame.clientHeight,
        clientWidth: frame.clientWidth,
        src: frame.src
      },
      video: {
        clientHeight: video.clientHeight,
        clientWidth: video.clientWidth,
        duration: video.duration,
        ended: video.ended,
        loop: video.loop,
        paused: video.paused,
        videoHeight: video.videoHeight,
        videoWidth: video.videoWidth,
        volume: video.volume
      }
    }

    return response

  },

  /**
   * Funkcja usuwająca wszystkie elementy <iframe> jeśli istnieje chociaż jeden.
   * @see /src/inject/events.ts run(listener, event?)
   */
  remove() {

    // sprawdzamy czy istnieje jaki kolwiek <iframe>
    if (yteabelem.watch.iframe.any()) {

      // aby uniknąć błędów używamy try{}
      try {

        /** Odnajdujemy i usuwamy wszyskie ramki */
        yteabelem.watch.iframes()?.forEach((iframe) => {
          iframe.remove()
        })

        // zatrzymujemy synchronizację
        sync.stop()

        // wyłączamy wyciszenie
        mute.disable()

      } catch (error) {

        logger.error(`Unable to remove iframes:\n${error}`)

      } finally {

        logger.dlog('Restored youtube defaults', 'All existing iframes removed')

      }

    }

  }

}


logger.debug.loaded('inject/watch/embed.ts')
