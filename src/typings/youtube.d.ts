declare namespace YouTube {

  type audioChannels = 0|1|2|3|4|6|8
  type audioQuality = 'AUDIO_QUALITY_LOW'|'AUDIO_QUALITY_MEDIUM'|'AUDIO_QUALITY_HIGH'
  type quality = 'tiny'|'small'|'medium'|'large'|'hd720'|'hd1080'|'hd1440'|'hd2160'|'hd2880'|'hd4320'
  type qualityLabel = '144p'|'240p'|'360p'|'480p'|'720p'|'1080p'|'1440p'|'2160p'|'2880p'|'4320p'
  type qualityNumber = 144|240|360|480|720|1080|1440|2160|2880|4320
  type fps = 25|30|48|50|60

  namespace Cookie {

    interface scheme {

      data: string|data.quality
      expiration: number
      creation: number

    }

    namespace data {

      interface quality {

        quality: qualityNumber
        previousQuality: qualityNumber

      }

    }

  }

  namespace Iframe {

    namespace src {

      type videoid = string

      interface settings {
        autoplay: 0|1
        cc_load_policy: 1
        color: 'red'|'white'
        controls: 0|1|2
        disablekb: 0|1
        enablejsapi: 0|1
        end: number
        fs: 0|1
        hl: string
        iv_load_policy: 1|3
        list: 'string'
        listType: 'playlist'|'search'|'user_uploads'
        loop: 0|1
        modestbranding: 0|1
        origin: string
        playlist: string
        playsinline: 0|1
        rel: 0|1
        showinfo: 0|1
        start: number
        v: number
      }

    }

  }

  namespace EventResponse {

    namespace ServiceTrackingParams {

      interface params {

        key: string
        value: string

      }

      interface serviceTrackingParams {

        service: string
        params: params[]

      }

    }

    interface format {

      itag: number
      url: string
      mimeType: string
      bitrate: number
      width: number
      height: number
      lastModified: string
      contentLength: string
      quality: YouTube.quality
      fps: YouTube.fps
      qualityLabel: YouTube.qualityLabel
      projectionType: string
      averageBitrate: number
      audioQuality: YouTube.audioQuality
      approxDurationMs: string
      audioSampleRate: string
      audioChannels: YouTube.audioChannels

    }

    interface adaptiveFormat {

      itag: number
      url: string
      mimeType: string
      bitrate: number
      width: number
      height: number
      initRange: {
        start: string
        end: string
      }
      indexRange: {
        start: string
        end: string
      }
      lastModified: string
      contentLength: string
      quality: YouTube.quality
      fps: YouTube.fps
      qualityLabel: YouTube.qualityLabel
      projectionType: string
      averageBitrate: number
      colorInfo: {
        primaries: string
        transferCharacteristics: string
        matrixCoefficients: string
      }
      approxDurationMs: string

    }

    interface playerAds {

      playerLegacyDesktopWatchAdsRenderer: {
        playerAdParams: {
          showContentThumbnail: boolean
          enabledEngageTypes: string
        }
        gutParams: {
          tag: string
        }
        showCompanion: boolean
        showInstream: boolean
        useGut: boolean
      }

    }

    interface thumbnails {

      url: string
      width: number
      height: number

    }

    namespace Event {

      interface yt_navigate_finish {

        __composed: boolean
        bubbles: boolean
        cancelBubble: boolean
        cancelable: boolean
        composed: boolean
        currentTarget: null
        defaultPrevented: boolean
        detail: {
          endpoint: {
            clickTrackingParams: string
            commandMetadata: {
              webCommandMetadata: {
                url: string
                webPageType: string
                rootVe: number
              }
            }
            watchEndpoint: {
              videoId: string
              nofollow: boolean
              watchEndpointSupportedOnesieConfig: {
                html5PlaybackOnesieConfig: {
                  commonConfig: {
                    url: string
                  }
                }
              }
            }
          }
          pageType: string
          fromHistory: boolean
          response: {
            rootVe: number
            url: string   //IMPORTANT
            endpoint: {
              clickTrackingParams: string
              commandMetadata: {
                webCommandMetadata: {
                  url: string   //IMPORTANT
                  webPageType: string
                  rootVe: number
                }
              }
              watchEndpoint: {
                videoId: string   //IMPORTANT
                nofollow: boolean
                watchEndpointSupportedOnesieConfig: {
                  html5PlaybackOnesieConfig: {
                    commonConfig: {
                      url: string
                    }
                  }
                }
              }
            }
            page: string
            preconnect: string[]
            playerResponse: {
              responseContext: {
                serviceTrackingParams: ServiceTrackingParams.serviceTrackingParams[]
                maxAgeSeconds: number
                mainAppWebResponseContext: {
                  datasyncId: string
                  loggedOut: boolean
                  trackingParam: string
                }
                webResponseContextExtensionData: {
                  hasDecorated: boolean
                }
              }
              playabilityStatus: {
                status: 'OK'   //IMPORTANT
                playableInEmbed: boolean   //IMPORTANT
                offlineability: {
                  buttonRenderer: {
                    serviceEndpoint: {
                      clickTrackingParams: string
                      ypcGetOfflineUpsellEndpoint: {
                        params: string
                      }
                    }
                    trackingParams: string
                  }
                }
                miniplayer: {
                  miniplayerRenderer: {
                    playbackMode: string   //IMPORTANT
                  }
                }
                contextParams: string
              }
              streamingData: {
                expiresInSeconds: string
                formats: format[]
                adaptiveFormats: adaptiveFormat[]
              }
              playerAds: playerAds[]
              playbackTracking: {
                videostatsPlaybackUrl: {
                  baseUrl: string
                }
                videostatsDelayplayUrl: {
                  baseUrl: string
                }
                videostatsWatchtimeUrl: {
                  baseUrl: string
                }
                ptrackingUrl: {
                  baseUrl: string
                }
                qoeUrl: {
                  baseUrl: string
                }
                atrUrl: {
                  baseUrl: string
                  elapsedMediaTimeSeconds: number
                }
                videostatsScheduledFlushWalltimeSeconds: number[]
                videostatsDefaultFlushIntervalSeconds: number
                youtubeRemarketingUrl: {
                  baseUrl: string
                  elapsedMediaTimeSeconds: number
                }
                googleRemarketingUrl: {
                  baseUrl: string
                  elapsedMediaTimeSeconds: number
                }
              }
              videoDetails: {
                videoId: string   //IMPORTANT
                title: string   //IMPORTANT
                lengthSecond: string
                keywords: string[]
                channelId: string
                isOwnerViewing: boolean   //IMPORTANT
                shortDescription: string
                isCrawlable: boolean
                thumbnail: {
                  thumbnails: thumbnails[]
                }
                allowRatings: boolean
                viewCount: number
                author: number
                isLowLatencyLiveStream: boolean
                isPrivate: boolean   //IMPORTANT
                isUnpluggedCorpus: boolean
                latencyClass: string
                isLiveContent: boolean   //IMPORTANT
              }
              microformat: {
                playerMicroformatRenderer: {
                  thumbnail: {
                    thumbnails: thumbnails[]
                  }
                  embed: {
                    iframeUrl: string   //IMPORTANT
                    width: number
                    height: number
                  }
                  title: {
                    simpleText: string   //IMPORTANT
                  }
                  description: {
                    simpleText: string   //IMPORTANT
                  }
                  lengthSeconds: string
                  ownerProfileUrl: string   //IMPORTANT
                  externalChannelId: string
                  isFamilySafe: boolean   //IMPORTANT
                  availableCountries: string[]
                  isUnlisted: boolean
                  hasYpcMetadata: boolean
                  viewCount: string
                  category: string
                  publishDate: string
                  ownerChannelName: string   //IMPORTANT
                  liveBroadcastDetails: {
                    isLiveNow: boolean   //IMPORTANT
                    startTimestamp: string
                    endTimestamp: string
                  }
                  uploadDate: string
                }
              }
            }
          }
        }
        isTrusted: boolean
        returnValue: boolean
        srcElement: HTMLElement
        target: HTMLElement
        timeStamp: number
        type: 'yt-navigate-finish'

      }

      interface yt_navigate_start {

        __composed: boolean
        bubbles: boolean
        cancelBubble: boolean
        cancelable: boolean
        composed: boolean
        currentTarget: null
        defaultPrevented: boolean
        detail: {
          endpoint: {
            clickTrackingParams: string
            commandMetadata: {
              webCommandMetadata: {
                rootVe: number
                url: string   //IMPORTANT
                webPageType: string
              }
            }
            watchEndpoint: {
              nofollow: boolean
              videoId: string   //IMPORTANT
              watchEndpointSupportedOnesieConfig: {
                html5PlaybackOnesieConfig: {
                  commonConfig: {
                    url: string
                  }
                }
              }
            }
          }
          pageType: string   //IMPORTANT
          reload: boolean   //IMPORTANT
          url: string   //IMPORTANT
        }
        eventPhase: number
        explicitOriginalTarget: HTMLElement
        isTrusted: boolean
        originalTarget: HTMLElement
        returnValue: boolean
        srcElement: HTMLElement
        target: HTMLElement
        timeStamp: number
        type: 'yt-navigate-start'

      }

      type yt_page_type_changed = undefined

    }

  }

  namespace PlayerResponse {

    interface adPlacements {

      adPlacementRenderer: {
        adSlotLoggingData: {
          serializedSlotAdServingDataEntry: string
        }
        config: {
          adPlacementConfig: {
            adTimeOffset: {
              offsetEndMilliseconds: string
              offsetStartMilliseconds: string
            }
            hideCueRangeMarker: boolean
            kind: string
          }
        }
        renderer: {
          adBreakServiceRenderer: {
            getAdBreakUrl: string
            prefetchMilliseconds: string
          }
          clientForecastingAdRenderer: Object
        }
      }

    }

    namespace Annotations {

      namespace ServiceEndpoints {

        interface actions {

          clickTrackingParams: string
          openPopupAction: {
            popup: {
              confirmDialogRenderer: {
                cancelButton: {
                  buttonRenderer: {
                    accessibility: {
                      label: string
                    }
                    isDisabled: boolean
                    size: string
                    style: string
                    text: {
                      runs: runs[]
                    }
                    trackingParams: string
                  }
                }
                confirmButton: {
                  buttonRenderer: {
                    accessibility: {
                      label: string
                    }
                    isDisabled: boolean
                    serviceEndpoint: {
                      clickTrackingParams: string
                      commandMetadata: {
                        webCommandMetadata: {
                          apiUrl: string
                          sendPost: boolean
                        }
                      }
                      unsubscribeEndpoint: {
                        channelIds: string[]
                        params: string
                      }
                    }
                    size: string
                    style: string
                    text: {
                      runs: runs[]
                    }
                    trackingParams: string
                  }
                }
                dialogMessages: [
                  {
                    runs: runs[]
                  }
                ]
                primaryIsCancel: boolean
                trackingParams: string
              }
            }
            popupType: string
          }

        }

        interface serviceEndpoints {

          clickTrackingParams: string
          commandMetadata: {
            webCommandMetadata: {
              sendPost: boolean
            }
          }
          signalServiceEndpoint: {
            actions: actions[]
            signal: string
          }

        }

      }

      interface runs {

        text: string

      }

      interface thumbnails {

          height: number
          url: string
          width: number

      }

      interface annotations {

        playerAnnotationsExpandedRenderer: {
          allowSwipeDismiss: true
          annotationId: string
          featuredChannel: {
            channelName: string
            endTimeMs: string
            navigationEndpoint: {
              browseEndpoint: {
                browseId: string
              }
              clickTrackingParams: string
              commandMetadata: {
                webCommandMetadata: {
                  apiUrl: string
                  rootVe: number
                  url: string
                  webPageType: string
                }
              }
            }
            startTimeMs: string
            subscribeButton: {
              subscribeButtonRenderer: {
                buttonText: {
                  runs: runs[]
                }
                channelId: string
                enabled: boolean
                serviceEndpoints: ServiceEndpoints.serviceEndpoints[]
                showPreferences: boolean
                subscribeAccessibility: {
                  accessibilityData: {
                    label: string
                  }
                }
                subscribed: boolean
                subscribedButtonText: {
                  runs: runs[]
                }
                trackingParams: string
                type: string
                unsubscribeAccessibility: {
                  accessibilityData: {
                    label: string
                  }
                }
                unsubscribeButtonText: {
                  runs: runs[]
                }
                unsubscribedButtonText: {
                  runs: runs[]
                }
              }
            }
            trackingParams: string
            watermark: {
              thumbnails: thumbnails[]
            }
          }
        }

      }

    }

    interface audioTracks {

      captionTrackIndices: number[]

    }

    interface captionTracks {

      baseUrl: string
      isTranslatable: boolean
      kind: string
      languageCode: string
      name: {
        simpleText: string
      }
      trackName: string
      vssId: string

    }

    interface translationLanguages {

      languageCode: string
      languageName: {
        simpleText: string
      }

    }

    namespace Cards {

      interface cueRanges {

        endCardActiveMs: string
        iconAfterTeaserMs: string
        startCardActiveMs: string
        teaserDurationMs: string

      }

      interface cards {

        cardRenderer: {
          cueRanges: cueRanges[]
          teaser: {
            simpleCardTeaserRenderer: {
              logVisibilityUpdates: boolean
              message: {
                simpleText: string
              }
              onTapCommand: {
                changeEngagementPanelVisibilityAction: {
                  targetId: string
                  visibility: string
                }
                clickTrackingParams: string
              }
              prominent: boolean
              trackingParams: string
            }
          }
          trackingParams: string
        }

      }

    }

    namespace Elements {

      interface runs {

        text: string

      }

      namespace ServiceEndpoints {

        interface dialogMessages {

          runs: runs[]

        }

        interface actions {

          clickTrackingParams: string
          openPopupAction: {
            popup: {
              confirmDialogRenderer: {
                cancelButton: {
                  buttonRenderer: {
                    accessibility: {
                      label: string
                    }
                    isDisabled: boolean
                    size: string
                    style: string
                    text: {
                      runs: runs[]
                    }
                    trackingParams: string
                  }
                }
                confirmButton: {
                  buttonRenderer: {
                    accessibility: {
                      label: string
                    }
                    isDisabled: boolean
                    serviceEndpoint: {
                      clickTrackingParams: string
                      commandMetadata: {
                        webCommandMetadata: {
                          apiUrl: string
                          sendPost: boolean
                        }
                      }
                      unsubscribeEndpoint: {
                        channelIds: string[]
                        params: string
                      }
                    }
                    size: string
                    style: string
                    text: {
                      runs: runs[]
                    }
                    trackingParams: string
                  }
                }
                dialogMessages: dialogMessages[]
                primaryIsCancel: boolean
                trackingParams: string
              }
            }
            popupType: string
          }

        }

        interface serviceEndpoints {

          clickTrackingParams: string
          commandMetadata: {
            webCommandMetadata: {
              sendPost: boolean
            }
          }
          signalServiceEndpoint: {
            actions: actions[]
            signal: string
          }

        }

      }

      interface thumbnailsURL {

        url: string

      }

      interface thumbnailsALL {

        height: number
        url: string
        width: number

      }

      interface elements {

        endscreenElementRenderer: {
          aspectRatio: number
          callToAction: {
            simpleText: string
          }
          dismiss: {
            simpleText: string
          }
          endMs: string
          endpoint: {
            browseEndpoint: {
              browseId: string
            }
            clickTrackingParams: string
            commandMetadata: {
              webCommandMetadata: {
                apiUrl: string
                rootVe: number
                url: string
                webPageType: string
              }
            }
          }
          hovercardButton: {
            subscribeButtonRenderer: {
              buttonText: {
                runs: runs[]
              }
              channelId: string   //IMPORTANT
              enabled: boolean
              serviceEndpoints: []
              showPreferences: false
              subscribeAccessibility: {
                accessibilityData: {
                  label: string
                }
              }
              subscribed: boolean
              subscribedButtonText: {
                runs: runs[]
              }
              trackingParams: string
              type: string
              unsubscribeAccessibility: {
                accessibilityData: {
                  label: string
                }
              }
              unsubscribeButtonText: {
                runs: runs[]
              }
              unsubscribedButtonText: {
                runs: runs[]
              }
            }
          }
          icon: {
            thumbnails: thumbnailsURL[]
          }
          id: number
          image: {
            thumbnails: thumbnailsALL[]
          }
          isSubscribe: boolean
          left: number
          metadata: {
            simpleText: string
          }
          startMs: string
          style: string
          title: {
            accessibility: {
              accessibilityData: {
                label: string
              }
            }
            simpleText: string
          }
          top: number
          trackingParams: string
          width: number
        }

      }

    }

    interface thumbnails {

      height: number
      url: string
      width: number

    }

    interface playerAds {

      playerLegacyDesktopWatchAdsRenderer: {
        gutParams: {
          tag: string
        }
        playerAdParams: {
          enabledEngageTypes: string
          showContentThumbnail: boolean
        }
        showCompanion: boolean
        showInstream: boolean
        useGut: boolean
      }

    }

    interface actions1 {

      action: string
      addedVideoId: string

    }

    interface actions2 {

      action: string
      removedVideoId: string

    }

    interface adaptiveFormats {

      approxDurationMs: string
      averageBitrate: number
      bitrate: number
      colorInfo: {
        matrixCoefficients: string
        primaries: string
        transferCharacteristics: string
      }
      contentLength: string
      fps: fps   //IMPORTANT
      height: number
      indexRange: {
        end: string
        start: string
      }
      initRange: {
        end: string
        start: string
      }
      itag: number
      lastModified: string
      mimeType: string
      projectionType: string
      quality: quality   //IMPORTANT
      qualityLabel: qualityLabel   //IMPORTANT
      url: string   //IMPORTANT
      width: number

    }

    interface ytInitialPlayerResponse {

      adBreakHeartbeatParams: string
      adPlacements: adPlacements[]
      annotations: Annotations.annotations[]
      attestation: {
        playerAttestationRenderer: {
          botguardData: {
            interpreterSafeUrl: {
              privateDoNotAccessOrElseTrustedResourceUrlWrappedValue: string
            }
            program: string
            serverEnvironment: number
          }
          challenge: string
        }
      }
      captions: {
        playerCaptionsTracklistRenderer: {
          audioTracks: audioTracks[]   //IMPORTANT
          captionTracks: captionTracks[]   //IMPORTANT
          defaultAudioTrackIndex: number   //IMPORTANT
          translationLanguages: translationLanguages[]   //IMPORTANT
        }
      }
      cards: {
        cardCollectionRenderer: {
          allowTeaserDismiss: boolean
          cards: Cards.cards[]   //IMPORTANT
          closeButton: {
            infoCardIconRenderer: {
              trackingParams: string
            }
          }
          headerText: {
            simpleText: string
          }
          icon: {
            infoCardIconRenderer: {
              trackingParams: string
            }
          }
          logIconVisibilityUpdates: boolean
          trackingParams: string
        }
      }
      endscreen: {
        endscreenRenderer: {
          elements: Elements.elements[]   //IMPORTANT
          startMs: string   //IMPORTANT
          trackingParams: string
        }
      }
      frameworkUpdates: {
        entityBatchUpdate: {
          mutations: []
          timestamp: {
            nanos: number
            seconds: string
          }
        }
      }
      microformat: {
        playerMicroformatRenderer: {
          availableCountries: string[]
          category: string
          description: {
            simpleText: string
          }
          embed: {
            height: number
            iframeUrl: string
            width: number
          }
          externalChannelId: string   //IMPORTANT
          hasYpcMetadata: boolean
          isFamilySafe: boolean   //IMPORTANT
          isUnlisted: boolean   //IMPORTANT
          lengthSeconds: string   //IMPORTANT
          ownerChannelName: string   //IMPORTANT
          ownerProfileUrl: string   //IMPORTANT
          publishDate: string   //IMPORTANT
          thumbnail: {
            thumbnails: thumbnails[]
          }
          title: {
            simpleText: string   //IMPORTANT
          }
          uploadDate: string   //IMPORTANT
          viewCount: string   //IMPORTANT
        }
      }
      playabilityStatus: {
        contextParams: string
        miniplayer: {
          miniplayerRenderer: {
            playbackMode: string
          }
        }
        playableInEmbed: boolean   //IMPORTANT
        status: 'OK'   //IMPORTANT
      }
      playbackTracking: {
        atrUrl: {
          baseUrl: string
          elapsedMediaTimeSeconds: number
        }
        ptrackingUrl: {
          baseUrl: string
        }
        qoeUrl: {
          baseUrl: string
        }
        videostatsDefaultFlushIntervalSeconds: number
        videostatsDelayplayUrl: {
          baseUrl: string
        }
        videostatsPlaybackUrl: {
          baseUrl: string
        }
        videostatsScheduledFlushWalltimeSeconds: number[]
        videostatsWatchtimeUrl: {
          baseUrl: string
        }
      }
      playerAds: playerAds[]   //IMPORTANT
      playerConfig: {
        audioConfig: {
          enablePerFormatLoudness: boolean
          loudnessDb: number   //IMPORTANT
          perceptualLoudnessDb: number
        }
        mediaCommonConfig: {
          dynamicReadaheadConfig: {
            maxReadAheadMediaTimeMs: number
            minReadAheadMediaTimeMs: number
            readAheadGrowthRateMs: number
          }
        }
        streamSelectionConfig: {
          maxBitrate: string
        }
        webPlayerConfig: {
          useCobaltTvosDash: boolean
          webPlayerActionsPorting: {
            addToWatchLaterCommand: {
              clickTrackingParams: string
              commandMetadata: {
                webCommandMetadata: {
                  apiUrl: string
                  sendPost: boolean
                }
              }
              playlistEditEndpoint: {
                actions: actions1[]
                playlistId: string
              }
            }
            getSharePanelCommand: {
              clickTrackingParams: string
              commandMetadata: {
                webCommandMetadata: {
                  apiUrl: string
                  sendPost: boolean
                }
              }
              webPlayerShareEntityServiceEndpoint: {
                serializedShareEntity: string
              }
            }
            removeFromWatchLaterCommand: {
              clickTrackingParams: string
              commandMetadata: {
                webCommandMetadata: {
                  apiUrl: string
                  sendPost: boolean
                }
              }
              playlistEditEndpoint: {
                actions: actions2[]
                playlistId: string
              }
            }
            subscribeCommand: {
              clickTrackingParams: string
              commandMetadata: {
                webCommandMetadata: {
                  apiUrl: string
                  sendPost: boolean
                }
              }
              subscribeEndpoint: {
                channelIds: string[]
                params: string
              }
            }
            unsubscribeCommand: {
              clickTrackingParams: string
              commandMetadata: {
                webCommandMetadata: {
                  apiUrl: string
                  sendPost: boolean
                }
              }
              unsubscribeEndpoint: {
                channelIds: string[]
                params: string
              }
            }
          }
        }
      }
      responseContext: {
        mainAppWebResponseContext: {
          datasyncId: string
          loggedOut: boolean
          trackingParam: string
        }
        maxAgeSeconds: number
        serviceTrackingParams: []
        webResponseContextExtensionData: {
          hasDecorated: boolean
        }
      }
      storyboards: {
        playerStoryboardSpecRenderer: {
          highResolutionRecommendedLevel: number
          recommendedLevel: number
          spec: string
        }
      }
      streamingData: {
        adaptiveFormats: adaptiveFormats[]   //IMPORTANT
      }
      trackingParams: string
      videoDetails: {
        allowRatings: boolean   //IMPORTANT
        author: string   //IMPORTANT
        channelId: string   //IMPORTANT
        isCrawlable: boolean
        isLiveContent: boolean   //IMPORTANT
        isOwnerViewing: boolean   //IMPORTANT
        isPrivate: boolean   //IMPORTANT
        isUnpluggedCorpus: boolean
        keywords: string[]
        lengthSeconds: string   //IMPORTANT
        shortDescription: string   //IMPORTANT
        thumbnail: {
          thumbnails: thumbnails[]
        }
        title: string   //IMPORTANT
        videoId: string   //IMPORTANT
        viewCount: string   //IMPORTANT
      }

    }

  }

}
