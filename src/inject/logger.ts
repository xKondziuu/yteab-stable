import inject from '.'
import { name } from '../../package.json'


let prefix = name.toLocaleUpperCase()

/**
 * Moduł z funkcjami do tworzenia logów w konsoli przeglądarki użytkownika.
 * @module Logger
 * @memberof inject
 */
export const logger: inject.Logger = {

  log(message:string) {
    console.log(`[${prefix}] - ${String(message)}`)
  },

  error(message:string) {
    console.error(`[${prefix}] - ${String(message)}`)
  },

  warn(message:string) {
    console.warn(`[${prefix}] - ${String(message)}`)
  }

}
