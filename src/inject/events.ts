import inject from '.'
import { logger } from '../logger'
import { embed } from './watch/embed'


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
        const data = event as YouTube.EventResponse.Event.yt_navigate_finish

        if (data.returnValue) {

          const response = data.detail.response

          if (
            response.page == 'watch' &&
            response.playerResponse.playabilityStatus.status == 'OK' &&
            response.playerResponse.playabilityStatus.playableInEmbed &&
            response.playerResponse.videoDetails.isOwnerViewing == false &&
            response.playerResponse.videoDetails.isPrivate == false &&
            response.playerResponse.videoDetails.isLiveContent == false
          ) {

            logger.log('Video overwrite possible')
            embed.preparation.preserve(data)

          } else {

            logger.log('Video overwrite not possible')
            embed.preparation.cancel(data)

          }

        } else {

          logger.error('Cannot read yt-navigate-finish')

        }

        break
      }
      case 'yt-navigate-start': if (event) {
        const data = event as YouTube.EventResponse.Event.yt_navigate_start

        if (data.returnValue) {

          if (data.detail.pageType == 'watch') {

            embed.prepare(data)

          }

        } else {

          logger.error('Cannot read yt-navigate-start')

        }

        break
      }
      case 'yt-page-type-changed': {

        // Event na zmianę typu strony

        break
      }
    }

  }

}


logger.debug.loaded('inject/events.ts')
