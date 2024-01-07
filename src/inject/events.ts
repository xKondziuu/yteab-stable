import inject from '.'
import * as dev from '../dev.json'
import { logger } from '../logger'
import { embed } from './watch/embed'
import { ytelem, yteabelem } from '../main'
import { mute } from './watch/mute'


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
      logger.debug.log(`Listening for event: ${listener}`)
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

        // jeśli event zwrócił wartość
        if (data.returnValue) {

          // jeśli typ załadowanej strony to 'watch'
          if (data.detail.pageType == 'watch') {

            /** Pobieramy dane odpowiedzi */
            const response = data.detail.response

            if (  // jeśli poniższe warunki są spełnione
              response.page == 'watch' &&                                      // czy typ strony to 'watch'
              response.playerResponse.playabilityStatus.status == 'OK' &&      // czy wideo załadowało się poprawnie
              response.playerResponse.playabilityStatus.playableInEmbed &&     // czy możnaje je odtwarzać w ramce
              response.playerResponse.videoDetails.isOwnerViewing == false &&  // czy wyświetla właściciel
              response.playerResponse.videoDetails.isPrivate == false &&       // czy jest prywatne
              response.playerResponse.videoDetails.isLiveContent == false      // czy to transmisja live
            ) {

              logger.log('Video overwrite possible!')

              /** Pobieramy ID wczytanego wideo */
              const videoid: YouTube.Iframe.src.videoid = response.endpoint.watchEndpoint.videoId

              /**
               * Jeżeli funkcja prepare(yt_navigate_start) przygotowała już ramkę, przetwarzamy
               * ją dalej używając funkcji preserve(yt_navigate_finish), w przeciwnym wypadku
               * tworzymy ją używając create(videoid, callback?) i dopiero potem przetwarzamy.
               * @see /src/inject/watch/embed.ts
               */
              if (yteabelem.watch.iframe.id(videoid)) {

                // przetwarzanie już utworzonej ramki
                embed.preparation.preserve(data)

              } else {

                logger.log(`Processing video '${data.detail.endpoint.watchEndpoint.videoId}'`)

                // tworzenie ramki którą później będziemy przetwarzać
                embed.create(videoid, ()=>{
                  ytelem.watch.player()?.classList.add('yteab-playing')
                  embed.preparation.preserve(data)
                })

              }


            } else {

              // jeśli warunki nie zostały spełnione, anulujemy przygotowanie ramki
              logger.log('Video overwrite NOT possible!')

              /**
               * Opcjonalne logowanie szczegółów w konsoli przy każdej synchronizacji,
               * dostępne tylko przy trybie debugowania w celu oszczędzania zasobów.
               */
              if (dev.debug) {
                if (response.playerResponse.playabilityStatus.status != 'OK') logger.debug.warn('Overwrite failed - Playability status: '+response.playerResponse.playabilityStatus.status)
                if (!response.playerResponse.playabilityStatus.playableInEmbed) logger.debug.warn('Overwrite failed - Video is not playable in embed')
                if (response.playerResponse.videoDetails.isOwnerViewing) logger.debug.warn('Overwrite failed - Video is viewed by owner')
                if (response.playerResponse.videoDetails.isPrivate) logger.debug.warn('Overwrite failed - Video is private')
                if (response.playerResponse.videoDetails.isLiveContent) logger.debug.warn('Overwrite failed - Video is live content')
              }

              embed.preparation.cancel(data)

            }

          } else {

            // jeśli typ załadwanej strony to nie 'watch', usuwamy wszystkie ramki
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

        // jeśli event zwrócił wartość
        if (data.returnValue) {

          // jeśli typ strony do załadowania to 'watch'
          if (data.detail.pageType == 'watch') {

            logger.log(`Processing video '${data.detail.endpoint.watchEndpoint.videoId}'`)

            /** Wyciszamy wideo najszybciej jak to możliwe */
            mute.enable()

            /**
             * Przygotowujemy (wstępnie tworzymy) ramkę, po wywołaniu eventu yt-navigate-finish
             * zostanie czy słusznie to zrobiliśmy, ale tutaj już się nad tym nie zastanawiamy.
             * @see /src/inject/watch/embed.ts
             */
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
