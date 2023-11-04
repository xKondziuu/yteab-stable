declare namespace logger {

  interface Module {

    log: Function
    error: Function
    warn: Function

    debug: {
      loaded: Function
    }

  }

}
