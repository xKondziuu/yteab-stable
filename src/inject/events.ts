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

  /**
   * Funkcja uruchamiająca nasłuchiwanie podanego eventu na elemencie document
   * poprzez addEventListener i uruchomienie run(listener) po wywołaniu eventu.
   * @param {string} listener - Jeden z eventów określonych w switch w run()
   */
  listen(listener:inject.events.Listeners): void {

    try {
      document.addEventListener(listener, (event) => this.run(listener, event))
    } catch (error) {
      logger.error(`Unable to listen ${listener}:\n${error}`)
    } finally {
      logger.log(`Now listening for event: ${listener}`)
    }

  },

  /**
   * Funkcja która uruchamia inne funkcje itp po wywołaniu danego eventu, którego nasłuchiwanie
   * zostało wcześniej włączone poprzez listen(listener), dodatkowo może używać objektu event.
   * @param {string} listener - Jeden z eventów określonych w switch w run(listener, event?)
   * @param {Event|unknown} event - Objekt event zwracany przez addEventListener po wywołaniu eventu
   */
  run(listener:inject.events.Listeners, event?:Event|unknown): void {

    switch (listener) {

      /** Ukończono przekierowania w nawigacji */
      case 'yt-navigate-finish': if (event) {
        const data = event as YouTube.EventResponse.Event.yt_navigate_finish

        if (data.returnValue) {

          if (data.detail.pageType == 'watch') {

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

            embed.remove()

          }

        } else {

          logger.error('Cannot read yt-navigate-finish')

        }

        break
      }

      /** Rozpoczęto przekierowania nawigacji */
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

      /** Zmieniono typ wyświetlanej strony */
      case 'yt-page-type-changed': {

        // Tutaj event na zmianę typu strony

        break
      }

    }

  }

}


logger.debug.loaded('inject/events.ts')
