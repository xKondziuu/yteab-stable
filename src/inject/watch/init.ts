import inject from '..'
import { logger } from '../../logger'
import { ytelem } from '../../main'
import { embed } from './embed'
import { mute } from './mute'


var initCalled: boolean = false
var initSuccess: boolean


/**
 * Funkcja do manualnego wywołania działań normalnie wykonywanych przy evencie 'yt-navigate-finish',
 * uruchamiana w momencie gdy skrypt all.js wczytano bezpośrednia na stronie '/watch', co uniemożliwia
 * odebranie niezbędnych informacji z eventu 'yt-navigate-start' lub z 'yt-navigate-finish' i wymaga
 * manualnego zdobycia tych informacji poprzez przejrzenie wskazanych części DOM całego dokumentu.
 * @interface Function
 * @function init
 * @memberof inject/watch
 */
export const init: inject.watch.init.Function = () => {

  initCalled = true

  const ytInitialPlayerResponse = window.ytInitialPlayerResponse
  let iswatch = (document.querySelector('ytd-masthead')?.hasAttribute('is-watch-page') && (document.querySelector('ytd-watch-flexy')?.getAttribute('role') == 'main') || window.location.pathname == '/watch')
  let isyteab = (document.querySelector('ytd-player #movie_player')?.classList.contains('yteab-playing') || document.querySelector('ytd-player #movie_player')?.className.includes('yteab') || document.querySelector('iframe#yteab'))

  /** Czy wywoływane na stronie '/watch', czy jeszcze nie ma ramki oraz czy otrzymano ytInitialPlayerResponse */
  if (iswatch && !isyteab && ytInitialPlayerResponse) {

    const videoid = ytInitialPlayerResponse.videoDetails.videoId

    logger.log(`Processing video '${videoid}'`)

    if (  // jeśli poniższe warunki są spełnione
      ytInitialPlayerResponse.playabilityStatus.status == 'OK' &&      // czy wideo załadowało się poprawnie
      ytInitialPlayerResponse.playabilityStatus.playableInEmbed &&     // czy możnaje je odtwarzać w ramce
      ytInitialPlayerResponse.videoDetails.isOwnerViewing == false &&  // czy wyświetla właściciel
      ytInitialPlayerResponse.videoDetails.isPrivate == false &&       // czy jest prywatne
      ytInitialPlayerResponse.videoDetails.isLiveContent == false      // czy to transmisja live
    ) {

      logger.log('Video overwrite possible!')

      /** Wyciszamy wideo najszybciej jak to możliwe */
      mute.enable()

      // tworzenie ramki którą później będziemy przetwarzać
      embed.create(videoid, ()=>{
        ytelem.watch.player()?.classList.add('yteab-playing')
        embed.preparation.preserve(ytInitialPlayerResponse)
      })

      initSuccess = true

    } else {

      logger.log('Video overwrite NOT possible!')

      initSuccess = false

    }

  } else {

    initSuccess = false

  }

}


logger.debug.loaded('inject/watch/init.ts')
