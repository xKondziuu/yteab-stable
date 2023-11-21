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
        modify: inject.watch.modify.Module
        mute: inject.watch.mute.Module
        quality: inject.watch.quality.Module
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
          preserve: (yt_navigate_finish:YouTube.EventResponse.Event.yt_navigate_finish) => void
          cancel: (yt_navigate_finish?:YouTube.EventResponse.Event.yt_navigate_finish) => void
        },
        keep: (videoid:YouTube.Iframe.src.videoid) => void
        remove: () => void

      }

    }

    namespace modify {

      interface Module {

        safe: (yt_navigate_finish:YouTube.EventResponse.Event.yt_navigate_finish) => void
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
          set: (desiredquality:YouTube.qualityLabel, callback?:Function) => void
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

    namespace sync {

      interface Module {

        safestart: (yt_navigate_finish:YouTube.EventResponse.Event.yt_navigate_finish, delay?:number, rate?:number) => void
        startnow: (rate:number, videoid?:YouTube.Iframe.src.videoid|null) => void
        stop: () => void

      }

    }

  }

}
