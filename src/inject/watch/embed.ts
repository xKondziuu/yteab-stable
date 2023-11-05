import inject from '..'
import { name } from '../../../package.json'
import { logger } from '../../logger'
import { ytelem, yteabelem } from '../../main'


/**
 * Moduł z funkcjami do tworzenia, zarządzania, zmiany itd wideo embed bez reklam.
 * @interface Module
 * @module embed
 * @memberof inject/watch
 */
export const embed: inject.watch.embed.Module = {

  prepare(yt_navigate_start:YouTube.EventResponse.Event.yt_navigate_start) {

    let video_container: HTMLDivElement|null = ytelem.watch.video_container()
    if (!video_container) return

    if (yteabelem.watch.iframe()) {
      yteabelem.watch.iframe()?.remove()
      logger.log('Existing frame removed')
    }

    const videoid: YouTube.Iframe.src.videoid = yt_navigate_start.detail.endpoint.watchEndpoint.videoId

    const settings: YouTube.Iframe.src.settings = {
      autoplay: 1,
      enablejsapi: 1,
      fs: 1,
      modestbranding: 1,
      origin: '0.0.0.0',
      rel: 0,
      showinfo: 0,
      start: 0, //todo
      v: 3
    }

    const querySettings = Object.keys(settings)
    .map(key => `${key}=${encodeURIComponent(settings[key as keyof YouTube.Iframe.src.settings])}`)
    .join('&');

    let iframe = document.createElement('iframe')

    iframe.src = `https://www.youtube.com/embed/${videoid}/?${querySettings}`

    iframe.id = name.split('-')[0]
    iframe.loading = 'eager'
    iframe.referrerPolicy = 'same-origin'
    iframe.setAttribute('sandbox', 'allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation')
    iframe.style.display = 'block' /** Ponieważ dopiero prepare */                // #DEBUG

    video_container.appendChild(iframe)

  },

  preparation: {

    preserve(yt_navigate_finish:YouTube.EventResponse.Event.yt_navigate_finish) {

    },

    cancel(yt_navigate_finish?:YouTube.EventResponse.Event.yt_navigate_finish) {

    }

  }

}


logger.debug.loaded('inject/watch/embed.ts')
