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

  safestart(yt_navigate_finish:YouTube.EventResponse.Event.yt_navigate_finish, rate?:number) {

  },

  startnow(rate:number) {

  },

  stop() {

  }

}


logger.debug.loaded('inject/watch/sync.ts')
