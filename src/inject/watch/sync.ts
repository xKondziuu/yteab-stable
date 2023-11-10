import inject from '..'
import { logger } from '../../logger'
import { ytelem, ytif } from '../../main'


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
   * @param {number} rate - Wartość (w sekundach) określająca delay interwału synchronizacji wideo, domyślna wartość 4 sekundy
   */
  safestart(yt_navigate_finish:YouTube.EventResponse.Event.yt_navigate_finish, rate:number = 4) {

  },

  /**
   * Funkcja uruchamiająca synchronizację wideo w embed do tego na stronie natychmiast po wywołaniu funkcji, interwał jest
   * tworzony i uruchamiany od razu bez względu na obecnie wyświetlaną zawartość, długość wideo i jego obecność na stronie.
   * @param {number} rate - Wartość (w sekundach) określająca delay interwału synchronizacji wideo, domyślna wartość 4 sekundy
   */
  startnow(rate:number) {

  },

  /**
   * Funkcja zatrzymująca interwał synchronizacji natychmiast po wywołaniu bez względu na to czy jest on utworzony.
   */
  stop() {

  }

}


logger.debug.loaded('inject/watch/sync.ts')
