declare namespace YouTube {

  type audioChannels = 0|1|2|3|4|6|8
  type audioQuality = 'AUDIO_QUALITY_LOW'|'AUDIO_QUALITY_MEDIUM'|'AUDIO_QUALITY_HIGH'
  type quality = 'tiny'|'small'|'medium'|'large'|'hd720'|'hd1080'|'hd1440'|'hd2160'|'hd2880'|'hd4320'
  type qualityLabel = '144p'|'240p'|'360p'|'480p'|'720p'|'1080p'|'1440p'|'2160p'|'2880p'|'4320p'
  type fps = 25|30|48|50|60

  namespace Iframe {

    namespace src {

      type videoid = string

      interface settings {
        autoplay: 0|1
        enablejsapi: 0|1
        fs: 0|1
        modestbranding: 0|1
        origin: string
        rel: 0|1
        showinfo: 0|1
        start: number
        v: number
      }

    }

  }

  namespace EventResponse {

    namespace streamingData {

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

    }

    interface playerAds {

      playerLegacyDesktopWatchAdsRenderer: {
        playerAdParams: {
          showContentThumbnail: boolean
          enabledEngageTypes: string
        },
        gutParams: {
          tag: string
        },
        showCompanion: boolean
        showInstream: boolean
        useGut: boolean
      }

    }

    interface thumbnails {

      url: string,
      width: number,
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
            },
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
          },
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
              },
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
                serviceTrackingParams: [
                  {
                    service: 'GFEEDBACK',
                    params: [
                      {
                        key: 'is_alc_surface',
                        value: 'true'|'false'
                      },
                      {
                        key: 'ipcc',
                        value: '0'|'1'
                      },
                      {
                        key: 'is_viewed_live',
                        value: 'True'|'False'   //IMPORTANT
                      },
                      {
                        key: 'premium_membership',
                        value: 'member'|'non_member'   //IMPORTANT
                      },
                      {
                        key: 'has_unlimited_entitlement',
                        value: 'True'|'False'
                      },
                      {
                        key: 'has_alc_entitlement',
                        value: 'true'|'false'
                      },
                      {
                        key: 'logged_in',
                        value: '0'|'1'
                      },
                      {
                        key: 'e',
                        value: string
                      }
                    ]
                  },
                  {
                    service: 'CSI',
                    params: [
                      {
                        key: 'yt_ad',
                        value: '0'|'1'   //IMPORTANT
                      },
                      {
                        key: 'c',
                        value: 'WEB'
                      },
                      {
                        key: 'cver',
                        value: string
                      },
                      {
                        key: 'yt_li',
                        value: '0'|'1'
                      },
                      {
                        key: 'GetPlayer_rid',
                        value: string
                      }
                    ]
                  },
                  {
                    service: 'GUIDED_HELP',
                    params: [
                      {
                        key: 'logged_in',
                        value: '0'|'1'
                      }
                    ]
                  },
                  {
                    service: 'ECATCHER',
                    params: [
                      {
                        key: 'client.version',
                        value: string
                      },
                      {
                        key: 'client.name',
                        value: 'WEB'
                      },
                      {
                        key: 'client.fexp',
                        value: string
                      }
                    ]
                  }
                ],
                maxAgeSeconds: number
                mainAppWebResponseContext: {
                  datasyncId: string
                  loggedOut: boolean
                  trackingParam: string
                },
                webResponseContextExtensionData: {
                  hasDecorated: boolean
                }
              },
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
                    playbackMode: 'PLAYBACK_MODE_ALLOW'   //IMPORTANT
                  }
                }
                contextParams: string
              }
              streamingData: {
                expiresInSeconds: string
                formats: YouTube.EventResponse.streamingData.format[]
                adaptiveFormats: YouTube.EventResponse.streamingData.adaptiveFormat[]
              }
              playerAds: YouTube.EventResponse.playerAds[]
              playbackTracking: {
                videostatsPlaybackUrl: {
                  baseUrl: string
                },
                videostatsDelayplayUrl: {
                  baseUrl: string
                },
                videostatsWatchtimeUrl: {
                  baseUrl: string
                },
                ptrackingUrl: {
                  baseUrl: string
                },
                qoeUrl: {
                  baseUrl: string
                },
                atrUrl: {
                  baseUrl: string
                  elapsedMediaTimeSeconds: number
                },
                videostatsScheduledFlushWalltimeSeconds: number[]
                videostatsDefaultFlushIntervalSeconds: number,
                youtubeRemarketingUrl: {
                  baseUrl: string,
                  elapsedMediaTimeSeconds: number
                },
                googleRemarketingUrl: {
                  baseUrl: string
                  elapsedMediaTimeSeconds: number
                }
              },
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
                  thumbnails: YouTube.EventResponse.thumbnails[]
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
                    thumbnails: YouTube.EventResponse.thumbnails[]
                  },
                  embed: {
                    iframeUrl: string   //IMPORTANT
                    width: number
                    height: number
                  },
                  title: {
                    simpleText: string   //IMPORTANT
                  },
                  description: {
                    simpleText: string   //IMPORTANT
                  },
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
            },
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

}
