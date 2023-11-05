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
        sync: inject.watch.sync.Module
      }

      events: inject.events.Module
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

  namespace watch {

    namespace embed {

      interface Module {

        prepare: (yt_navigate_start:YouTube.EventResponse.Event.yt_navigate_start) => void
        preparation: {
          preserve: (yt_navigate_finish:YouTube.EventResponse.Event.yt_navigate_finish) => void
          cancel: (yt_navigate_finish?:YouTube.EventResponse.Event.yt_navigate_finish) => void
        },
        remove: () => void

      }

    }

    namespace sync {

      interface Module {

      }

    }

  }

}
