import inject from './inject'
import { name } from '../package.json'
import * as dev from './dev.json'


let prefix = name.toLocaleUpperCase()

/**
 * Moduł z funkcjami do tworzenia logów w konsoli przeglądarki użytkownika.
 * @module Logger
 * @memberof inject
 */
export const logger: inject.logger.Module = {

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

    log(message:string): void {
      if (dev.logger && dev.debug) console.log(`[${prefix}] - DEBUG: ${String(message)}`)
    },

    error(message:string): void {
      if (dev.logger && dev.debug) console.error(`[${prefix}] - DEBUG: ${String(message)}`)
    },

    warn(message:string): void {
      if (dev.logger && dev.debug) console.warn(`[${prefix}] - DEBUG: ${String(message)}`)
    }

  }

}
