import inject from '..'
import { logger } from '../../logger'
import { yteabelem, ytelem } from '../../main'


/**
 * Moduł z funkcjami do obsługi jakości wideo.
 * @interface Module
 * @module quality
 * @memberof inject/watch
 */
export const quality: inject.watch.quality.Module = {

  translate(qualitylabel:YouTube.qualityLabel): YouTube.quality|null {

    switch (qualitylabel) {
      case '144p':
        return 'tiny'
      case '240p':
        return 'small'
      case '360p':
        return 'medium'
      case '480p':
        return 'large'
      case '720p':
        return 'hd720'
      case '1080p':
        return 'hd1080'
      case '1440p':
        return 'hd1440'
      case '2160p':
        return 'hd2160'
      case '2880p':
        return 'hd2880'
      case '4320p':
        return 'hd4320'
      default:
        logger.error('Unable to recognize quality label')
        return null
    }

  },

  main: {

    init(): void {

      let button = ytelem.watch.settings.button()

      if (button) {
        button.click()
        button.click()
      }

    },

    get(): YouTube.quality|null {

      this.init()

      let qualitymenu = ytelem.watch.settings.quality()
      let label = qualitymenu?.querySelector('span.ytp-menu-label-secondary') as HTMLSpanElement

      if (qualitymenu && label) {

        let qualitylabel = label.innerText.slice(1,-1).split('p')[0]+'p' as YouTube.qualityLabel

        return quality.translate(qualitylabel)

      } else {

        return null

      }

    },

    getrawcookie(parse:boolean = false): YouTube.Cookie.scheme|string|null {

      let json = window.localStorage.getItem('yt-player-quality')
      if (!json) return null

      if (parse) {

        let parsed = JSON.parse(json) as YouTube.Cookie.scheme
        let data = JSON.parse(<string>parsed.data) as YouTube.Cookie.data.quality

        parsed.data = data
        return parsed

      } else {

        return json

      }

    },

    getcookie() {

      let cookie = this.getrawcookie(true) as YouTube.Cookie.scheme
      let data = cookie?.data as YouTube.Cookie.data.quality

      if (cookie && data) {

        let qualitylabel = data.quality+'p' as YouTube.qualityLabel

        return quality.translate(qualitylabel)

      } else {

        return null

      }

    },

    set(desiredquality:YouTube.qualityLabel, callback?:Function): void {

      this.init()

      let qualitymenu = ytelem.watch.settings.quality()
      let label = qualitymenu?.querySelector('span.ytp-menu-label-secondary') as HTMLSpanElement

      if (qualitymenu && label) {

        let qualitylabel = label.innerText.slice(1,-1).split('p')[0]+'p' as YouTube.qualityLabel
        if (desiredquality == qualitylabel) return

        qualitymenu.click()

        let tags = ytelem.watch.settings.qualities()

        if (tags) {

          var wantedquality
          for (var i = 0; i < tags.length; i++) {
            if (tags[i].textContent?.includes(desiredquality)) {
              wantedquality = tags[i]
              break
            }
          }

          if (wantedquality) {

            let button = wantedquality.parentElement?.parentElement?.parentElement

            if (button) {
              button.click()
              logger.log('Main video quality changed to: '+desiredquality)
              if (callback) (callback())
            } else {
              logger.error('Unable to change main video quality to '+desiredquality)
            }

            qualitymenu.click()

          }

        }

      }

    },

    setcookie(desiredquality:YouTube.qualityLabel): void {

      let cookie = this.getrawcookie(true) as YouTube.Cookie.scheme
      let data = cookie?.data as YouTube.Cookie.data.quality

      if (cookie && data) {

        data.quality = Number( desiredquality.slice(0,-1) ) as YouTube.qualityNumber

        cookie.data = JSON.stringify(data)

        window.localStorage.setItem('yt-player-quality', JSON.stringify(cookie))

        logger.log('Video quality cookie changed to: '+desiredquality)

      }

    },

    setrawcookie(cookie:YouTube.Cookie.scheme): void {

      if (cookie) {

        window.localStorage.setItem('yt-player-quality', JSON.stringify(cookie))

      }

    },

    setonce(desiredquality:YouTube.qualityLabel) {

      let cookieraw = this.getrawcookie() as string

      this.set(desiredquality, ()=>{
        this.setrawcookie(JSON.parse(cookieraw))
      })

    }

  },

  embed: {

    init(videoid?:YouTube.Iframe.src.videoid|null) {

      // pozyskujemy ramkę, jeśli mamy id wideo to po id, a jeśli nie mamy to dowolną
      let embed = videoid ? yteabelem.watch.iframe.id(videoid) : yteabelem.watch.iframe.any()

      // pozyskujemy document ramki, nie kontunuujemy bez niego
      var embedDOM:Document|undefined = embed?.contentWindow?.document
      if (!embedDOM) return

      let button:HTMLButtonElement|null = embedDOM.querySelector('.ytp-chrome-controls .ytp-settings-button')

      if (button) {
        button.click()
        button.click()
      }

    },

    get(videoid?:YouTube.Iframe.src.videoid|null) {

      this.init()

      // pozyskujemy ramkę, jeśli mamy id wideo to po id, a jeśli nie mamy to dowolną
      let embed = videoid ? yteabelem.watch.iframe.id(videoid) : yteabelem.watch.iframe.any()

      // pozyskujemy document ramki, nie kontunuujemy bez niego
      var embedDOM:Document|undefined = embed?.contentWindow?.document
      if (!embedDOM) return null

      let qualitymenu = embedDOM.querySelector('.ytp-settings-menu > .ytp-panel > div > div:last-child')
      let label = qualitymenu?.querySelector('span.ytp-menu-label-secondary') as HTMLSpanElement

      if (qualitymenu && label) {

        let qualitylabel = label.innerText.slice(1,-1).split('p')[0]+'p' as YouTube.qualityLabel

        return quality.translate(qualitylabel)

      } else {

        return null

      }

    }

  }

}


logger.debug.loaded('inject/watch/quality.ts')
