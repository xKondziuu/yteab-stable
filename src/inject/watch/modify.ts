import inject from '..'
import { logger } from '../../logger'


/**
 * Moduł z funkcjami do modyfikacji zawartości ramki embed.
 * @interface Module
 * @module modify
 * @memberof inject/watch
 */
export const modify: inject.watch.modify.Module = {

  safe(yt_navigate_finish:YouTube.EventResponse.Event.yt_navigate_finish): void {

  },

  now(videoid?:YouTube.Iframe.src.videoid|null): void {

  }

}


logger.debug.loaded('inject/watch/modify.ts')
