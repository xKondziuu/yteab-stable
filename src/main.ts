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
 * Szybkie referencje do naszych elementow.
 * @module Yteabelem
 * @memberof main
 */
const yteabelem: main.Yteabelem = {
  watch: {
    iframe: {
      any: () => document.querySelector('ytd-player iframe#yteab'),
      id: (videoid:YouTube.Iframe.src.videoid) => document.querySelector(`ytd-player iframe#yteab[data-yteab="${btoa(videoid)}"]`)
    },
    iframes: () => document.querySelectorAll('ytd-player iframe#yteab')
  }
}


/**
 * Szybkie referencje do elementów youtube.
 * @module Ytelem
 * @memberof main
 */
const ytelem: main.Ytelem = {
  watch: {
    ytd_watch_flexy: () => document.querySelector('ytd-watch-flexy'),
    columns: () => document.querySelector('ytd-watch-flexy #columns'),
    columns_primary: () => document.querySelector('ytd-watch-flexy #columns #primary'),
    columns_secondary: () => document.querySelector('ytd-watch-flexy #columns #secondary'),
    ytd_player: () => document.querySelector('ytd-player'),
    player_container: () => document.querySelector('ytd-player div#container'),
    player: () => document.querySelector('ytd-player div#movie_player'),
    video_container: () => document.querySelector('ytd-player div.html5-video-container'),
    video: () => document.querySelector('ytd-player div.html5-video-container video'),
    tooltip: () => document.querySelector('ytd-player div.ytp-tooltip'),
    ytd_watch_next: {
      first: () => document.querySelector('ytd-watch-next-secondary-results-renderer #contents ytd-compact-video-renderer:first-child a'),
      nth: (x:number) => document.querySelector(`ytd-watch-next-secondary-results-renderer #contents ytd-compact-video-renderer:nth-child(${x}) a`),
    },
    controls: {
      prev: () => document.querySelector('ytd-player .ytp-chrome-controls .ytp-prev-button'),
      pause: () => document.querySelector('ytd-player .ytp-chrome-controls .ytp-play-button'),
      next: () => document.querySelector('ytd-player .ytp-chrome-controls .ytp-next-button')
    },
    settings: {
      button: () => document.querySelector('ytd-player .ytp-chrome-controls .ytp-settings-button'),
      menu: () => document.querySelector('ytd-player .ytp-settings-menu > .ytp-panel > div'),
      quality: () => document.querySelector('ytd-player .ytp-settings-menu > .ytp-panel > div > div:last-child'),
      qualities: () => document.querySelectorAll('.ytp-quality-menu .ytp-menuitem > .ytp-menuitem-label > div > span')
    }
  }
}


const ytif: main.Ytif = {
  watch: {
    adplaying: () => (ytelem.watch.player()?.classList.contains('ad-showing') || ytelem.watch.player()?.classList.contains('ad-interrupting')),
    isplaylist: () => (document.querySelector('ytd-watch-flexy')?.hasAttribute('playlist'))
  }
}


logger.debug.loaded('main.ts')

export {regex, yteabelem, ytelem, ytif}
