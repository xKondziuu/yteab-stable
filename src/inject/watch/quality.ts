import inject from '..'
import { logger } from '../../logger'
import { yteabelem, ytelem } from '../../main'


/**
 * Moduł z funkcjami do obsługi jakości wideo.
 * @interface Module
 * @module quality
 * @memberof inject/watch
 */
export const quality: inject.watch.quality.Module = {

  /**
   * Funkcja konwartująca string jakości wideo w formacie qualityLabel (np.'480p','1080p')
   * na string jakości wideo w ogólnym formacie technicznym youtube (np.'large','hd1080')
   * @param {YouTube.qualityLabel} qualitylabel - Jakość wideo w formacie qualityLabel
   * @returns {string|null} - Jakość wideo w formacie technicznym lub null przy błędzie
   */
  translate(qualitylabel:YouTube.qualityLabel): YouTube.quality|null {

    /** W zależności od wprowadzonej wartości zwracamy jej odpowiednik */
    switch (qualitylabel) {
      case '144p':
        return 'tiny'
      case '240p':
        return 'small'
      case '360p':
        return 'medium'
      case '480p':
        return 'large'
      case '720p':
        return 'hd720'
      case '1080p':
        return 'hd1080'
      case '1440p':
        return 'hd1440'
      case '2160p':
        return 'hd2160'
      case '2880p':
        return 'hd2880'
      case '4320p':
        return 'hd4320'
      default:
        // przy błędzie zwracamy null
        logger.error('Unable to recognize quality label')
        return null
    }

  },

  main: {

    /**
     * Funkcja, która włącza możliwość oczytu i edycji jakości wideo z ustawień,
     * poprzez załadowanie DOM ustawień przez szybkie ich otwarcie i zamknęcie.
     */
    init(): void {

      // przycisk ustawień na odtwarzaczu
      let button = ytelem.watch.settings.button()

      // klikamy dwa razy aby szybko otworzyć i zamknąć
      if (button) {
        button.click()
        button.click()
      }

    },

    /**
     * Funkcja pozyskująca obecną jakość odtwarzanego wideo i zwracająca ją w formacie technicznym.
     * UWAGA! Działa tylko jeśli jakość nie była wcześniej zmodyfikowana przez inny skrypt!
     * @returns {string|null} - Jakość wideo w formacie technicznym lub null przy błędzie
     */
    get(): YouTube.quality|null {

      // uzyskujemy dostęp do ustawień
      this.init()

      // pozyskujemy przycisk ustawienia jakości
      let qualitymenu = ytelem.watch.settings.quality()

      // pozyskujemy element <span> z podaną jakością wideo
      let label = qualitymenu?.querySelector('span.ytp-menu-label-secondary') as HTMLSpanElement

      if (qualitymenu && label) {

        // odczytujemy obecną jakość z elementu <span>
        let qualitylabel = label.innerText.slice(1,-1).split('p')[0]+'p' as YouTube.qualityLabel

        /** Konwertujemy na format techniczny i zwracamy */
        return quality.translate(qualitylabel)

      } else {

        // przy błędzie zwracamy null
        return null

      }

    },

    /**
     * Funkcja pozyskująca konkretny rekord window.localStorage odpowiadający za preferowaną jakość wideo
     * i zwracająca jego zawartość jako objekt JSON w określonym formacie lub nieprzetworzony string.
     * @param {boolean} [parse=false] - Czy zwracać wartość JSON przetworzoną na objekt?
     * @returns {Object|string|null} - Wartość rekordu jako objekt lub string, null przy błędzie
     */
    getrawcookie(parse:boolean = false): YouTube.Cookie.scheme|string|null {

      /** Pozyskujemy zawartość rekordu jako string JSON, nie kontynuujemy bez niego */
      let json = window.localStorage.getItem('yt-player-quality')
      if (!json) return null

      // jeśli ma być przetworzony na objekt
      if (parse) {

        // przetwarzamy string JSON na objekt i przypisujemy do odpowiedniego typu
        let parsed = JSON.parse(json) as YouTube.Cookie.scheme

        // dodatkowo osobno przetwarzamy string data JSON na objekt bo też tego wymaga
        let data = JSON.parse(<string>parsed.data) as YouTube.Cookie.data.quality
        parsed.data = data

        /** Zwracamy przetworzoną zawartość w postaci objektu */
        return parsed

      } else {

        /** Jeśli nie ma być przetworzony zwracamy string */
        return json

      }

    },

    /**
     * Funkcja pozyskująca preferowaną jakość wideo przechowywaną w rekordzie window.localStorage, którego zawartość
     * jest pozyskiwana za pomocą funkcji getrawcookie(parse), następnie odczytywana jest jakość wideo będąca domyślnie
     * w formacie liczbowym qualityNumber, na końcu jest ona konwertowana i zwracana w formacie technicznym youtube.
     * @returns {string|null} - Jakość wideo w formacie technicznym lub null przy błędzie
     */
    getcookie(): YouTube.quality|null {

      // pozyskujemy zawartość rekordu i dane
      let cookie = this.getrawcookie(true) as YouTube.Cookie.scheme
      let data = cookie?.data as YouTube.Cookie.data.quality

      // jeśli poprawnie pozyskano
      if (cookie && data) {

        // z qualityNumber robimy qualityLabel
        let qualitylabel = data.quality+'p' as YouTube.qualityLabel

        /** Konwertujemy na format techniczny i zwracamy */
        return quality.translate(qualitylabel)

      } else {

        // przy błędzie zwracamy null
        return null

      }

    },

    /**
     * Funkcja za pomocą której można ustawić pożądaną jakość odtwarzanego obecnie wideo.
     * UWAGA! Działa tylko jeśli jakość nie była wcześniej zmodyfikowana przez inny skrypt!
     * Note: Ustawienie jakości tą funkcją zamieni też jakość preferowaną w window.localStorage
     * @param {YouTube.qualityLabel} desiredquality - Pożądana jakość wideo w formacie qualityLabel
     * @param {Function} [callback] - Funkcja wywoływana gdy sukces
     */
    set(desiredquality:YouTube.qualityLabel, callback?:Function): void {

      // uzyskujemy dostęp do ustawień
      this.init()

      // pozyskujemy przycisk ustawienia jakości
      let qualitymenu = ytelem.watch.settings.quality()

      // pozyskujemy element <span> z podaną jakością wideo
      let label = qualitymenu?.querySelector('span.ytp-menu-label-secondary') as HTMLSpanElement

      if (qualitymenu && label) {

        // jeśli pożądana jakość jest już ustawiona to nie kontunuujemy
        let qualitylabel = label.innerText.slice(1,-1).split('p')[0]+'p' as YouTube.qualityLabel
        if (desiredquality == qualitylabel) return

        // otwieramy menu ustawień jakości
        qualitymenu.click()

        // pozyskujemy wszystkie jakości jakie są do wyboru
        let tags = ytelem.watch.settings.qualities()

        if (tags) {

          /** Poszukujemy elementu <span> zawierającego pożądaną jakość w formacie qualityLabel */
          var wantedquality
          for (var i = 0; i < tags.length; i++) {
            if (tags[i].textContent?.includes(desiredquality)) {
              wantedquality = tags[i]
              break
            }
          }

          if (wantedquality) {

            // pozyskujemy przycisk ustawiający jakość
            let button = wantedquality.parentElement?.parentElement?.parentElement

            if (button) {
              button.click()  // kilkamy i ustawiamy jakość
              logger.log('Main video quality changed to: '+desiredquality)
              if (callback) (callback())
            } else {
              logger.error('Unable to change main video quality to '+desiredquality)
            }

            // zamykamy menu ustawień jakości
            qualitymenu.click()

          }

        }

      }

    },

    /**
     * Funkcja, która ustawia preferowaną jakość wideo przechowywaną w rekordzie window.localStorage.
     * Note: Ustawiona tutaj jakość zostanie zastosowana przy załadowaniu następnego filmu.
     * @param {YouTube.qualityLabel} desiredquality - Pożądana jakość wideo w formacie qualityLabel
     */
    setcookie(desiredquality:YouTube.qualityLabel): void {

      // pozyskujemy zawartość rekordu i dane
      let cookie = this.getrawcookie(true) as YouTube.Cookie.scheme
      let data = cookie?.data as YouTube.Cookie.data.quality

      if (cookie && data) {

        // ustawiamy jakość jako qualityNumber
        data.quality = Number( desiredquality.slice(0,-1) ) as YouTube.qualityNumber

        // konwertujemy data na string JSON
        cookie.data = JSON.stringify(data)

        /** Wstawiamy string JSON do rekordu */
        window.localStorage.setItem('yt-player-quality', JSON.stringify(cookie))

        logger.log('Video quality cookie changed to: '+desiredquality)

      }

    },

    /**
     * Funkcja, za pomocą której można ustawić całą zawartość rekordu jakości w window.localStorage,
     * akceptowany jest tylko konkretny schemat objektu który jest później konwertowany na string JSON.
     * @param {YouTube.Cookie.scheme} cookie
     */
    setrawcookie(cookie:YouTube.Cookie.scheme): void {

      if (cookie) {

        /** Wstawiamy do rekordu podany string JSON */
        window.localStorage.setItem('yt-player-quality', JSON.stringify(cookie))

      }

    },

    /**
     * Funkcja, która zmienia jakość wideo na pojedyńczym odtworzeniu, nie zmienia preferowanej jakości wideo,
     * dokładniej zapamiętuje poprzedną preferowaną jakość wideo, zmienia jakość odtwarzanego filmu i przywraca
     * automatycznie zmienioną przez youtube jakość preferowaną z pamięci za pomocą funkcji setrawcookie(cookie).
     * UWAGA! Działa tylko jeśli jakość nie była wcześniej zmodyfikowana przez inny skrypt!
     * @param {YouTube.qualityLabel} desiredquality - Pożądana jakość wideo w formacie qualityLabel
     */
    setonce(desiredquality:YouTube.qualityLabel) {

      // pobieramy string JSON z rekordu jakości z window.localStorage
      let cookieraw = this.getrawcookie() as string

      /** Ustawiamy pożądaną jakość wideo */
      this.set(desiredquality, ()=>{

        // przywracamy rekord jakości window.localStorage
        this.setrawcookie(JSON.parse(cookieraw))

      })

    }

  },

  embed: {

    /**
     * Funkcja, która włącza możliwość oczytu jakości wideo embed z ustawień,
     * poprzez załadowanie DOM ustawień przez szybkie ich otwarcie i zamknęcie.
     */
    init(videoid?:YouTube.Iframe.src.videoid|null) {

      // pozyskujemy ramkę, jeśli mamy id wideo to po id, a jeśli nie mamy to dowolną
      let embed = videoid ? yteabelem.watch.iframe.id(videoid) : yteabelem.watch.iframe.any()

      // pozyskujemy document ramki, nie kontunuujemy bez niego
      var embedDOM:Document|undefined = embed?.contentWindow?.document
      if (!embedDOM) return

      // przycisk ustawień na odtwarzaczu embed
      let button:HTMLButtonElement|null = embedDOM.querySelector('.ytp-chrome-controls .ytp-settings-button')

      // klikamy dwa razy aby szybko otworzyć i zamknąć
      if (button) {
        button.click()
        button.click()
      }

    },

    /**
     * Funkcja pozyskująca obecną jakość odtwarzanego wideo embed i zwracająca ją w formacie technicznym.
     * UWAGA! Działa tylko jeśli jakość nie była wcześniej zmodyfikowana przez inny skrypt!
     * @returns {string|null} - Jakość wideo w formacie technicznym lub null przy błędzie
     */
    get(videoid?:YouTube.Iframe.src.videoid|null): YouTube.quality|null {

      // uzyskujemy dostęp do ustawień
      this.init()

      // pozyskujemy ramkę, jeśli mamy id wideo to po id, a jeśli nie mamy to dowolną
      let embed = videoid ? yteabelem.watch.iframe.id(videoid) : yteabelem.watch.iframe.any()

      // pozyskujemy document ramki, nie kontunuujemy bez niego
      var embedDOM:Document|undefined = embed?.contentWindow?.document
      if (!embedDOM) return null

      // pozyskujemy przycisk ustawienia jakości
      let qualitymenu = embedDOM.querySelector('.ytp-settings-menu > .ytp-panel > div > div:last-child')

      // pozyskujemy element <span> z podaną jakością wideo
      let label = qualitymenu?.querySelector('span.ytp-menu-label-secondary') as HTMLSpanElement

      if (qualitymenu && label) {

        // odczytujemy obecną jakość z elementu <span>
        let qualitylabel = label.innerText.slice(1,-1).split('p')[0]+'p' as YouTube.qualityLabel

        /** Konwertujemy na format techniczny i zwracamy */
        return quality.translate(qualitylabel)

      } else {

        // przy błędzie zwracamy null
        return null

      }

    }

  }

}


logger.debug.loaded('inject/watch/quality.ts')
