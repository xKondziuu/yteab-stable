import inject from '.'


/**
 * Eventy elementu document na youtube
 * @event yt-guide-close - zamknięcie menu nawigacji
 * @event yt-guide-show - otwercie menu nawigacji
 * @event yt-guide-toggle - przełączenie menu nawigacji
 * @event yt-navigate-finish - ukończenie przekierowania w nawigowaniu na następą stronę niezależnie od typu
 * @event yt-navigate-start - rozpoczęccie przekierowania w nawigowaniu na następą stronę niezależnie od typu
 * @event yt-page-data-updated - zaktualizowanie strony bez przeladowania
 * @event yt-page-type-changed - zmiana typu wyświetlanej zawartości po zakończeniu nawigacji
 * @event yt-set-theater-mode-enabled - tylko /watch - tryb kinowy
 * @event yt-watch-masthead-scroll - scrollowanie strony wszędzie
 */


/**
 * Moduł z funkcjami do wychwytywania eventów z youtube.
 * @interface Module
 * @module events
 * @memberof inject
 */
export const events: inject.events.Module = {

  listen(listener:inject.events.Listeners): void {

    document.addEventListener(listener, (event) => this.run(listener, event))

  },

  run(listener:inject.events.Listeners, event?:Event|unknown) {

    switch (listener) {
      case 'yt-navigate-finish': if (event) {
        let data = event as YouTube.EventResponse.Event.yt_navigate_finish



        break
      }
      case 'yt-navigate-start': if (event) {
        let data = event as YouTube.EventResponse.Event.yt_navigate_start



        break
      }
      case 'yt-page-type-changed': {



        break
      }
    }

  }

}
