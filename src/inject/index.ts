import * as pack from '../../package.json'
import { logger } from '../logger'
import { embed as module_embed } from './watch/embed'
import { events as module_events } from './events'
import { logger as module_logger } from '../logger'
import { sync as module_sync } from './watch/sync'


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
    sync: module_sync
  },

  events: module_events,
  logger: module_logger

}


logger.debug.log('/src/inject/index.ts loaded!')


export default inject
