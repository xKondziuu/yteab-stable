import inject from '.'
import { logger } from '../logger'


/**
 * Moduł z funkcjami do otrzymania URLSearchParams z obecnego adresu lub podanego stringa.
 * @interface Module
 * @module urlparams
 * @memberof inject/watch
 */
export const urlparams: inject.urlparams.Module = {

  current() {
    return new URLSearchParams(window.location.search)
  },

  custom(params) {
    return new URLSearchParams(params)
  }

}


logger.debug.loaded('inject/watch/urlparams.ts')
