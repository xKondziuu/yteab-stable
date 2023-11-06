import inject from '..'
import { logger } from '../../logger'
import { ytelem } from '../../main'


var muteInterval: number

/**
 * Moduł z funkcjami do włączania i wyłączania ciągłego wyciszenia głównego wideo.
 * @interface Module
 * @module mute
 * @memberof inject/watch
 */
export const mute: inject.watch.mute.Module = {

  /**
   * Funkcja stale wyciszająca główne wideo poprzez szybki
   * interval który cały czas stara się wyciszać <video>.
   * @see /src/inject/watch/embed.ts
   */
  enable() {

    // tworzymy interval
    muteInterval = setInterval(()=>{

      // pobieramy główny element <video>
      let video = ytelem.watch.video()

      // wyciszamy jeśli nie jest
      if (video && !video.muted) video.muted = true

    }, 1)

    logger.log('Main video muted')

  },

  /**
   * Funkcja wyłączająca wyciszenie wideo poprzez wyczyszczenie
   * intervalu oraz odciszenie <video> jeżeli jest to możliwe.
   * @see /src/inject/watch/embed.ts
   */
  disable() {

    // pobieramy główny element <video>
    let video = ytelem.watch.video()

    // usuwamy interval jeśli jest
    if (muteInterval) clearInterval(muteInterval)

    // odciszamy jeśli można
    if (video && video.muted) video.muted = false

    logger.log('Main video unmuted')

  }

}


logger.debug.loaded('inject/watch/mute.ts')
