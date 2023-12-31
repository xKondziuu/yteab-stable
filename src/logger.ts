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

  /**
   * Wysyłanie zwykłej wiadomości log
   * @param {string} message - Wiadomość do wysłania do konsoli
   */
  log(message:string): void {
    if (dev.logger) console.log(`[${prefix}] - ${String(message)}`)
  },

  /**
   * Wysyłanie wiadomości o błędzie
   * @param {string} message - Wiadomość do wysłania do konsoli
   */
  error(message:string): void {
    if (dev.logger) console.error(`[${prefix}] - ${String(message)}`)
  },

  /**
   * Wysyłanie wiadomości z ostrzeżeniem
   * @param {string} message - Wiadomość do wysłania do konsoli
   */
  warn(message:string): void {
    if (dev.logger) console.warn(`[${prefix}] - ${String(message)}`)
  },

  /**
   * Wysyłanie wiadomości log która różni się w zależności od tego czy tryb debug jest włączony.
   * Funkcja przyjmuje dwa argumenty - dla wiadomości zwykłej oraz wiadomości dla trybu debug.
   * @param {string} message - Wiadomość do wysłania do konsoli gdy debug wyłączony
   * @param {string} messageDebug - Wiadomość do wysłania do konsoli gdy debug włączony
   */
  dlog(message:string, messageDebug:string) {
    if (dev.logger) {
      if (dev.debug) {
        logger.debug.log(messageDebug)
      } else {
        logger.log(message)
      }
    }
  },

  debug: {

    /**
     * Wysyłanie wiadomości o poprawnym załadowaniu pliku, stawiać na końcu plików .ts!
     * @param {string} path - Ścieżka do obecnego pliku .ts, którzy jest w folderze /src
     */
    loaded(path:string): void {
      if (dev.logger && dev.debug) console.log(`[${prefix}] - DEBUG: /src/${String(path)} loaded!`)
    },

    /**
     * Wysyłanie wiadomości log widocznej tylko w trybie debugowania
     * @param {string} message - Wiadomość do wysłania do konsoli
     */
    log(message:string): void {
      if (dev.logger && dev.debug) console.log(`[${prefix}] - DEBUG: ${String(message)}`)
    },

    /**
     * Wysyłanie wiadomości z ostrzeżeniem widocznej tylko w trybie debugowania
     * @param {string} message - Wiadomość do wysłania do konsoli
     */
    warn(message:string): void {
      if (dev.logger && dev.debug) console.warn(`[${prefix}] - DEBUG: ${String(message)}`)
    }

  }

}


logger.debug.loaded('logger.ts')
