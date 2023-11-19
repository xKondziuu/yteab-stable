import * as pack from '../../package.json'
import { logger } from '../logger'
import { embed as module_embed } from './watch/embed'
import { events as module_events } from './events'
import { logger as module_logger } from '../logger'
import { mute as module_mute } from './watch/mute'
import { quality as module_quality } from './watch/quality'
import { sync as module_sync } from './watch/sync'
import { urlparams as module_urlparams } from './urlparams'


/**
 * Zbiór modułów i funkcji z namespaceu inject.
 * @interface Module
 * @module index
 * @memberof inject
 * @see /src/typings/inject.d.ts
 */
const inject: inject.index.Module = {

  _v: pack.version,

  watch: {
    embed: module_embed,
    mute: module_mute,
    quality: module_quality,
    sync: module_sync
  },

  events: module_events,
  urlparams: module_urlparams,

  logger: module_logger

}


/**
 * Załadowanie modułu index do okna przeglądarki.
 * @implements @module index
 */
;(function init() {
  window.yteab = inject
  if (window.yteab == inject) {
    logger.debug.loaded('inject/index.ts')
    logger.log('Extension loaded successfully!')
    inject.events.listen('yt-navigate-finish')
    inject.events.listen('yt-navigate-start')
  }
})();


export default inject
