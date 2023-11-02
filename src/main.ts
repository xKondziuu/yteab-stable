import * as dev from './dev.json'
import { logger } from './logger'


/**
 * Regexy używane do walidacji adresów.
 * @module Regex
 * @memberof main
 */
const regex: main.Regex = {
  ytid: /([a-zA-Z0-9\_-]){11,11}/,
  yturl: /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]){11,11}/
}


/**
 * Szybkie referencje do elementów youtube.
 * @module Ytelem
 * @memberof main
 */
const ytelem: main.Ytelem = {
  watch: {
    ytd_top: () => document.querySelector('ytd-player#ytd-player'),
    player_container: () => document.querySelector('ytd-player div#container'),
    player: () => document.querySelector('ytd-player div#movie_player'),
    video_container: () => document.querySelector('ytd-player div.html5-video-container'),
    video: () => document.querySelector('ytd-player div.html5-video-container video')
  }
}


logger.debug.log('/src/main.ts loaded!')


export {regex, ytelem}
