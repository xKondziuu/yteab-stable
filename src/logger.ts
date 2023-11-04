import inject from './inject'
import { name } from '../package.json'
import * as dev from './dev.json'


let prefix = name.split('-')[0].toLocaleUpperCase()

/**
 * Moduł z funkcjami do tworzenia logów w konsoli przeglądarki użytkownika.
 * @module Logger
 * @memberof inject
 */
export const logger: logger.Module = {

  log(message:string): void {
    if (dev.logger) console.log(`[${prefix}] - ${String(message)}`)
  },

  error(message:string): void {
    if (dev.logger) console.error(`[${prefix}] - ${String(message)}`)
  },

  warn(message:string): void {
    if (dev.logger) console.warn(`[${prefix}] - ${String(message)}`)
  },

  debug: {

    loaded(path:string): void {
      if (dev.logger && dev.debug) console.log(`[${prefix}] - DEBUG: /src/${String(path)} loaded!`)
    }

  }

}


logger.debug.loaded('logger.ts')
