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

    youtube: {
      yt_navigate_finish: listenIgnore
      yt_navigate_start: listenIgnore
      yt_page_type_changed: listenIgnore
    }

  }

  interface Logger {

    log: Function
    error: Function
    warn: Function

    debug: {
      log: Function
      error: Function
      warn: Function
    }

  }

  namespace watch {

    interface Embed {



    }

    interface Sync {



    }

  }

}
