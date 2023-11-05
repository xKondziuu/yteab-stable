import inject from '..'
import { name } from '../../../package.json'
import { logger } from '../../logger'
import { ytelem, yteabelem } from '../../main'


/**
 * Moduł z funkcjami do tworzenia, zarządzania, zmiany itd wideo embed bez reklam.
 * @interface Module
 * @module embed
 * @memberof inject/watch
 */
export const embed: inject.watch.embed.Module = {

  /**
   * Funkcja, która przygotowuje (tworzy) element <iframe> w miejscu odtwarzanego wideo (nad nim)
   * z src odpowiednim do odtwarzania tego samego filmu co pod spodem w sposób płynny i bez reklam,
   * dodatkowo załącza funkcję z intervalem który cały czas stara się wyciszać <video> na youtube.
   * @param {Event|unknown} yt_navigate_start - Objekt event zwracany przez addEventListener po wywołaniu eventu yt-navigate-start
   * @see /src/inject/events.ts run(listener, event?)
   */
  prepare(yt_navigate_start:YouTube.EventResponse.Event.yt_navigate_start): void {

    logger.log('Preparing video iframe...')

    /** Element <div> zawierający <video> */
    let video_container: HTMLDivElement|null = ytelem.watch.video_container()
    if (!video_container) return

    /** Jeśli element <iframe> istnjeje to go usuwamy */
    if (yteabelem.watch.iframe()) {
      yteabelem.watch.iframe()?.remove()
      logger.log('Existing iframe removed')
    }

    // pobieramy id wideo
    const videoid: YouTube.Iframe.src.videoid = yt_navigate_start.detail.endpoint.watchEndpoint.videoId

    // ustawiamy parametry odtwarzacza embed
    const settings: YouTube.Iframe.src.settings = {
      autoplay: 1,        // automatyczne odtwarzanie wideo
      enablejsapi: 1,     // api umożliwiające ustawienie źródła odtwarzania
      fs: 1,              // zezwolenie na pełny ekran
      modestbranding: 1,  // ukrycie przycisku z logo youtube
      origin: '0.0.0.0',  // źródło odtwarzania na domenę nadrzędną (youtube.com)
      rel: 0,             // ukrycie proponowanych filmów
      showinfo: 0,        // ukrycie informacji o odtwarzanym filmie
      start: 0,           // po ilu sekundach rozpocząć odtwarzanie filmu          #TODO
      v: 3                // wersja odtwarzacza wideo (musi być 3)
    }

    // konwertujemy objekt na string URLSearchParams()
    const querySettings = Object.keys(settings)
    .map(key => `${key}=${encodeURIComponent(settings[key as keyof YouTube.Iframe.src.settings])}`)
    .join('&')

    /** Tworzymy element <iframe> do późniejszej edycji */
    let iframe = document.createElement('iframe')

    // ustawiamy src z id oraz ustawieniami
    iframe.src = `https://www.youtube.com/embed/${videoid}/?${querySettings}`

    // dodajemy dodatkowe ustawienia
    iframe.id = name.split('-')[0]
    iframe.loading = 'eager'
    iframe.referrerPolicy = 'same-origin'
    iframe.setAttribute('sandbox', 'allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation')
    iframe.style.display = 'block' /** Ponieważ dopiero prepare */                // #DEBUG

    /** Dodajemy element <iframe> do wcześniej otrzymanego video_container */
    video_container.appendChild(iframe)

    if (yteabelem.watch.iframe()) {
      logger.log('Iframe rendered successfully!')
      logger.log('Ready for further instructions')
    }

  },

  preparation: {

    /**
     * Funkcja, która zachowuje element <iframe> przygotowany wcześniej przez funkcję prepare(yt_navigate_start),
     * następnie po zatwierdzeniu poprawnego odtwarzania wideo, modyfikuje zawartość <iframe> tak, aby przypominał
     * standardowy odtwarzacz, na koniec pokazuje <iframe> oraz po 3 sekundach próbuje uruchamić funkcję sync().
     * @param {Event|unknown} yt_navigate_finish - Objekt event zwracany przez addEventListener po wywołaniu eventu yt-navigate-finish
     * @see /src/inject/events.ts run(listener, event?)
     * @see /src/inject/watch/sync.ts
     */
    preserve(yt_navigate_finish:YouTube.EventResponse.Event.yt_navigate_finish) {

    },

    /**
     * Funkcja, która anuluje (usuwa) element <iframe> przygotowany wcześniej przez funkcję prepare(yt_navigate_start),
     * dodatkowo uruchamia funkcję która wyłącza wcześniej załączony interval cały czas wyciszający <video> na youtube.
     * @param {Event|unknown} [yt_navigate_finish] - Objekt event zwracany przez addEventListener po wywołaniu eventu yt-navigate-finish
     * @see /src/inject/events.ts run(listener, event?)
     */
    cancel(yt_navigate_finish?:YouTube.EventResponse.Event.yt_navigate_finish) {

    }

  }

}


logger.debug.loaded('inject/watch/embed.ts')
