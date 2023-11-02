import inject from '.'


/**
 * Eventy na youtube
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


const listeners = {

  yt_navigate_finish() {

    // funkcja do wykonania gdy event

  },

  yt_navigate_start() {

    // funkcja do wykonania gdy event

  },

  yt_page_type_changed() {

    // funkcja do wykonania gdy event

  }

}


/**
 * Moduł z funkcjami do wychwytywania eventów z youtube.
 * @module Events
 * @memberof inject
 */
export const events: inject.Events = {

  youtube: {

    yt_navigate_finish: {

      listen() { document.addEventListener('yt-navigate-finish', listeners.yt_navigate_finish) },
      ignore() { document.removeEventListener('yt-navigate-finish', listeners.yt_navigate_finish) }

    },

    yt_navigate_start: {

      listen() { document.addEventListener('yt-navigate-start', listeners.yt_navigate_start) },
      ignore() { document.addEventListener('yt-navigate-start', listeners.yt_navigate_start) }

    },

    yt_page_type_changed: {

      listen() { document.addEventListener('yt-page-type-changed', listeners.yt_page_type_changed) },
      ignore() { document.addEventListener('yt-page-type-changed', listeners.yt_page_type_changed) }

    }

  }

}
