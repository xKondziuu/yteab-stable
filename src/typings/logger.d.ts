declare namespace logger {

  interface Module {

    log: (message:string) => void
    error: (message:string) => void
    warn: (message:string) => void

    debug: {
      loaded: (path:string) => void
      log: (message:string) => void
      warn: (message:string) => void
    }

  }

}
