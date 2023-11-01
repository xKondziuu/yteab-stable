import * as pack from '../../package.json'
import { embed as module_embed } from './watch/embed'
import { events as module_events } from './events'
import { logger as module_logger } from './logger'
import { sync as module_sync } from './watch/sync'


/**
 * Zbiór modułów i funkcji z namespaceu inject.
 * @module Index
 * @memberof inject
 * @see /src/typings/inject.d.ts
 */
const inject: inject.Index = {

  _v: pack.version,

  watch: {
    embed: module_embed,
    sync: module_sync
  },

  events: module_events,
  logger: module_logger

}


export default inject
