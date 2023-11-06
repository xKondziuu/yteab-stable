import inject from '.'
import { logger } from '../logger'


/**
 * Moduł z funkcjami do otrzymania URLSearchParams z obecnego adresu lub podanego stringa.
 * @interface Module
 * @module urlparams
 * @memberof inject
 */
export const urlparams: inject.urlparams.Module = {

  current() {
    return new URLSearchParams(window.location.search)
  },

  custom(params) {
    return new URLSearchParams(params)
  }

}


logger.debug.loaded('inject/urlparams.ts')
