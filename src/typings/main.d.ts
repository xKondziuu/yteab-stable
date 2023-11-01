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
      ytd_top: () => HTMLElement | null
      player_container: () => HTMLDivElement | null
      player: () => HTMLDivElement | null
      video_container: () => HTMLDivElement | null
      video: () => HTMLVideoElement | null
    }
  }

}
