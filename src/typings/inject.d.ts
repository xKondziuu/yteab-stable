/**
 * Deklaracje typów dla inject.
 * @namespace inject
 * @see /src/inject/index.ts
 */

declare namespace inject {

  namespace index {

    interface Module {

      _v: string

      watch: {
        embed: inject.watch.embed.Module
        init: inject.watch.init.Function
        modify: inject.watch.modify.Module
        mute: inject.watch.mute.Module
        quality: inject.watch.quality.Module
        ratiofix: inject.watch.ratiofix.Module
        sync: inject.watch.sync.Module
      }

      events: inject.events.Module
      urlparams: inject.urlparams.Module

      logger: logger.Module

    }

  }

  namespace events {

    type Listeners = 'yt-navigate-finish'|'yt-navigate-start'|'yt-page-type-changed'

    interface Module {

      listen: (listeners:Listeners) => void
      run: (listeners:Listeners, event?:Event) => void

    }

  }

  namespace urlparams {

    interface Module {

      current: () => URLSearchParams
      custom: (params:string) => URLSearchParams

    }

  }

  namespace watch {

    namespace embed {

      interface Module {

        create: (videoid:YouTube.Iframe.src.videoid, callback?:Function) => void
        prepare: (yt_navigate_start:YouTube.EventResponse.Event.yt_navigate_start, callback?:Function) => void
        preparation: {
          preserve: (yt_navigate_finish_OR_ytInitialPlayerResponse:YouTube.EventResponse.Event.yt_navigate_finish|YouTube.PlayerResponse.ytInitialPlayerResponse) => void
          cancel: (yt_navigate_finish?:YouTube.EventResponse.Event.yt_navigate_finish) => void
        },
        keep: (videoid:YouTube.Iframe.src.videoid) => void
        focus: (videoid?:YouTube.Iframe.src.videoid) => void
        hide: (videoid?:YouTube.Iframe.src.videoid) => void
        show: (videoid?:YouTube.Iframe.src.videoid) => void
        getinfo: (videoid?:YouTube.Iframe.src.videoid) => getinfo|undefined
        remove: () => void

      }

      interface getinfo {

        iframe: {
          clientHeight: number
          clientWidth: number
          src: string
        }
        video: {
          clientHeight: number
          clientWidth: number
          duration: number
          ended: boolean
          loop: boolean
          paused: boolean
          videoHeight: number
          videoWidth: number
          volume: number
        }

      }

    }

    namespace init {

      type Function = () => void;

    }

    namespace modify {

      interface Module {

        safe: (yt_navigate_finish_OR_ytInitialPlayerResponse:YouTube.EventResponse.Event.yt_navigate_finish|YouTube.PlayerResponse.ytInitialPlayerResponse) => void
        now: (videoid?:YouTube.Iframe.src.videoid, callback?:Function) => void

      }

    }

    namespace mute {

      interface Module {

        enable: () => void
        disable: () => void

      }

    }

    namespace quality {

      interface Module {

        translate: (qualitylabel:YouTube.qualityLabel) => YouTube.quality|null
        main: {
          init: () => void
          get: () => YouTube.quality|null
          getrawcookie: (parse?:boolean) => YouTube.Cookie.scheme|string|null
          getcookie: () => YouTube.quality|null
          set: (desiredquality:YouTube.qualityLabel, quiet?:boolean, callback?:Function) => void
          setcookie: (desiredquality:YouTube.qualityLabel) => void
          setrawcookie: (cookie:YouTube.Cookie.scheme) => void
          setonce: (desiredquality:YouTube.qualityLabel) => void
        }

        embed: {
          init: (videoid?:YouTube.Iframe.src.videoid|null) => void
          get: (videoid?:YouTube.Iframe.src.videoid|null) => YouTube.quality|null
        }

      }

    }

    namespace ratiofix {

      interface Module {

        getratio: {
          css: () => getreatio|undefined
          video: (videoid?:YouTube.Iframe.src.videoid) => getreatio|undefined
        }
        align: (videoid?:YouTube.Iframe.src.videoid, callback?:Function) => void
        fixnow: (videoid?:YouTube.Iframe.src.videoid) => void

      }

      interface getreatio {

        height: number,
        width: number

      }

    }

    namespace sync {

      interface Module {

        safestart: (yt_navigate_finish_OR_ytInitialPlayerResponse:YouTube.EventResponse.Event.yt_navigate_finish|YouTube.PlayerResponse.ytInitialPlayerResponse, delay?:number, rate?:number) => void
        startnow: (rate:number, videoid?:YouTube.Iframe.src.videoid|null) => void
        stop: () => void

      }

    }

  }

}
