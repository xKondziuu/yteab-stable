import inject from '.'
import { logger } from '../logger'


/**
 * Moduł z funkcjami do otrzymania URLSearchParams z obecnego adresu lub podanego stringa.
 * @interface Module
 * @module urlparams
 * @memberof inject
 */
export const urlparams: inject.urlparams.Module = {

  /**
   * Funkcja, która pozyskuje parametry z window.location.search,
   * przetwarza oraz zwraca je w postaci konstrukcji URLSearchParams.
   * @returns {URLSearchParams} - Konstrukcja z odpowiednio przetworzonymi danymi z window.location.search
   */
  current() {
    return new URLSearchParams(window.location.search)
  },

  /**
   * Funkcja starająca się przetwarzyć parametry w postaci "window.location.search"
   * pozyskane ze stringa oraz zwracająca je w postaci konstrukcji URLSearchParams.
   * @param {string} params - Parametry w postaci stringa do przetworzenia
   * @returns {URLSearchParams} - Konstrukcja z odpowiednio przetworzonymi danymi ze stringa
   */
  custom(params) {
    return new URLSearchParams(params)
  }

}


logger.debug.loaded('inject/urlparams.ts')
