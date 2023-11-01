/**
 * Deklaracje typów dla inject.
 * @namespace inject
 * @see /src/inject/index.ts
 */

declare namespace inject {

  interface Index {

    _v: string

    watch: {
      embed: inject.watch.Embed
      sync: inject.watch.Sync
    }

    events: inject.Events
    logger: inject.Logger

  }

  interface Events {



  }

  interface Logger {

    log: Function
    error: Function
    warn: Function

  }

  namespace watch {

    interface Embed {



    }

    interface Sync {



    }

  }

}
