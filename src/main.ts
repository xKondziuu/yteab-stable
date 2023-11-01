const regex: main.Regex = {
  ytid: /([a-zA-Z0-9\_-]){11,11}/,
  yturl: /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]){11,11}/
}

const ytelem: main.Ytelem = {
  watch: {
    ytd_top: () => document.querySelector('ytd-player#ytd-player'),
    player_container: () => document.querySelector('ytd-player div#container'),
    player: () => document.querySelector('ytd-player div#movie_player'),
    video_container: () => document.querySelector('ytd-player div.html5-video-container'),
    video: () => document.querySelector('ytd-player div.html5-video-container video')
  }
}


export {regex, ytelem}