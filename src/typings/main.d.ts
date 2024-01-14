/**
 * Deklaracje typów dla main.
 * @namespace main
 * @see /src/main.ts
 */

declare namespace main {

  interface Regex {
    ytid: RegExp
    yturl: RegExp
  }

  interface Ytelem {
    watch: {
      ytd_watch_flexy: () => HTMLElement | null
      columns: () => HTMLDivElement | null
      columns_primary: () => HTMLDivElement | null
      columns_secondary: () => HTMLDivElement | null
      ytd_player: () => HTMLElement | null
      player_container: () => HTMLDivElement | null
      player: () => HTMLDivElement | null
      video_container: () => HTMLDivElement | null
      video: () => HTMLVideoElement | null
      tooltip: () => HTMLDivElement | null
      ytd_watch_next: {
        first: () => HTMLElement | null
        nth: (x:number) => HTMLElement | null
      }
      controls: {
        prev: () => HTMLAnchorElement | null
        pause: () => HTMLButtonElement | null
        next: () => HTMLAnchorElement | null
      }
      settings: {
        button: () => HTMLButtonElement | null
        menu: () => HTMLDivElement | null
        quality: () => HTMLDivElement | null
        qualities: () => NodeListOf<HTMLSpanElement> | null
      }
    }
  }

  interface Yteabelem {
    watch: {
      iframe: {
        any: () => HTMLIFrameElement | null
        id: (videoid:YouTube.Iframe.src.videoid) => HTMLIFrameElement | null
      }
      iframes: () => NodeListOf<HTMLIFrameElement> | null
    }
  }

  interface Ytif {
    watch: {
      adplaying: () => boolean|undefined
      isplaylist: () => boolean|undefined
    }
  }

}
