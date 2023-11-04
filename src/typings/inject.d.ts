/**
 * Deklaracje typów dla inject.
 * @namespace inject
 * @see /src/inject/index.ts
 */

interface listenIgnore {
  listen: Function
  ignore: Function
}


declare namespace inject {

  namespace index {

    interface Module {

      _v: string

      watch: {
        embed: inject.watch.embed.Module
        sync: inject.watch.embed.Module
      }

      events: inject.events.Module
      logger: inject.events.Module

    }

  }

  namespace events {

    type Listeners = 'yt-navigate-finish'|'yt-navigate-start'|'yt-page-type-changed'

    interface Module {

      listen: (listeners:Listeners) => void
      run: (listeners:Listeners, event?:Event) => void

    }

  }

  namespace logger {

    interface Module {

      log: Function
      error: Function
      warn: Function

      debug: {
        log: Function
        error: Function
        warn: Function
      }

    }

  }

  namespace watch {

    namespace embed {

      interface Module {

      }

    }

    namespace sync {

      interface Module {

      }

    }

  }

}
