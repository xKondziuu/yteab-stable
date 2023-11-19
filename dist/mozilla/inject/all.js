(()=>{"use strict";var e=[function(e,t,r){var a=this&&this.__createBinding||(Object.create?function(e,t,r,a){void 0===a&&(a=r);var o=Object.getOwnPropertyDescriptor(t,r);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,a,o)}:function(e,t,r,a){void 0===a&&(a=r),e[a]=t[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&a(t,e,r);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});const n=i(r(1)),l=r(2),s=r(4),d=r(9),c=r(2),u=r(7),p=r(8),g=r(6),y={_v:n.version,watch:{embed:s.embed,mute:u.mute,sync:p.sync},events:d.events,urlparams:g.urlparams,logger:c.logger};window.yteab=y,window.yteab==y&&(l.logger.debug.loaded("inject/index.ts"),l.logger.log("Extension loaded successfully!"),y.events.listen("yt-navigate-finish"),y.events.listen("yt-navigate-start")),t.default=y},e=>{e.exports=JSON.parse('{"name":"yteab-stable","version":"1.0.0","description":"YouTube Ethical AdBlocker","license":"UNLICENSED","homepage":"https://github.com/xKondziuu/yteab-stable","private":false,"repository":{"type":"git","url":"https://github.com/xKondziuu/yteab-stable.git"},"author":{"name":"xKondziuu","email":"xkondziuu4@gmail.com","url":"https://github.com/xKondziuu"},"contributors":[{"name":"MrFajFel","email":"filipgamer1234567@gmail.com","url":"https://github.com/MrFajFel"}],"scripts":{"build":"webpack build --mode none --config ./webpack.config.js && (sh build-linux.sh || call build-win.cmd)"},"devDependencies":{"@types/firefox":"^0.0.33","@types/node":"^20.8.9","css-loader":"^6.8.1","postcss-import":"^15.1.0","postcss-loader":"^7.3.3","postcss-nested":"^6.0.1","postcss-preset-env":"^9.2.0","postcss-pxtorem":"^6.0.0","style-loader":"^3.3.3","ts-loader":"^9.5.0","webpack":"^5.89.0","webpack-cli":"^5.1.4","webpack-dev-server":"^4.15.1"}}')},function(e,t,r){var a=this&&this.__createBinding||(Object.create?function(e,t,r,a){void 0===a&&(a=r);var o=Object.getOwnPropertyDescriptor(t,r);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,a,o)}:function(e,t,r,a){void 0===a&&(a=r),e[a]=t[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&a(t,e,r);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.logger=void 0;const n=r(1),l=i(r(3));let s=n.name.split("-")[0].toLocaleUpperCase();t.logger={log(e){l.logger&&console.log(`[${s}] - ${String(e)}`)},error(e){l.logger&&console.error(`[${s}] - ${String(e)}`)},warn(e){l.logger&&console.warn(`[${s}] - ${String(e)}`)},debug:{loaded(e){l.logger&&l.debug&&console.log(`[${s}] - DEBUG: /src/${String(e)} loaded!`)},log(e){l.logger&&console.log(`[${s}] - DEBUG: ${String(e)}`)},warn(e){l.logger&&console.warn(`[${s}] - DEBUG: ${String(e)}`)}}},t.logger.debug.loaded("logger.ts")},e=>{e.exports=JSON.parse('{"debug":false,"logger":true}')},(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.embed=void 0;const a=r(1),o=r(2),i=r(5),n=r(6),l=r(7),s=r(8);t.embed={create(e,t){var r;let l=i.ytelem.watch.video_container();if(!l)return;const s={autoplay:1,enablejsapi:1,fs:1,modestbranding:1,origin:"0.0.0.0",rel:0,showinfo:0,start:n.urlparams.current().has("t")?Number(null===(r=n.urlparams.current().get("t"))||void 0===r?void 0:r.replace(/[^0-9]/g,"")):0,v:3},d=Object.keys(s).map((e=>`${e}=${encodeURIComponent(s[e])}`)).join("&");let c=document.createElement("iframe");c.src=`https://www.youtube.com/embed/${e}/?${d}`,c.id=a.name.split("-")[0],c.loading="eager",c.referrerPolicy="same-origin",c.setAttribute("data-yteab",btoa(e)),c.style.display="none",c.setAttribute("sandbox","allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation"),l.appendChild(c),i.yteabelem.watch.iframe.id(e)?(o.logger.log("Iframe rendered successfully!"),t&&t()):o.logger.error("Unable to create iframe")},prepare(e,r){o.logger.log("Preparing video iframe...");const a=e.detail.endpoint.watchEndpoint.videoId;t.embed.create(a,(()=>{o.logger.log("Ready for further instructions"),l.mute.enable(),r&&r()}))},preparation:{preserve(e){const r=e.detail.response.endpoint.watchEndpoint.videoId,a=i.yteabelem.watch.iframe.id(r);a&&(o.logger.log("Keeping prepared iframe"),t.embed.keep(r),a.style.display="block",s.sync.safestart(e))},cancel(e){o.logger.log("Canceling prepared iframe"),t.embed.remove(),l.mute.disable(),s.sync.stop()}},keep(e){var t;i.yteabelem.watch.iframe.id(e)?null===(t=i.yteabelem.watch.iframes())||void 0===t||t.forEach((t=>{t.getAttribute("data-yteab")!=btoa(e)&&t.remove()})):o.logger.error("Unable find iframe to keep")},remove(){var e;if(i.yteabelem.watch.iframe.any())try{null===(e=i.yteabelem.watch.iframes())||void 0===e||e.forEach((e=>{e.remove()})),s.sync.stop(),l.mute.disable()}catch(e){o.logger.error(`Unable to remove iframes:\n${e}`)}finally{o.logger.log("All existing iframes removed")}}},o.logger.debug.loaded("inject/watch/embed.ts")},(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ytif=t.ytelem=t.yteabelem=t.regex=void 0;const a=r(2);t.regex={ytid:/([a-zA-Z0-9\_-]){11,11}/,yturl:/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]){11,11}/};const o={watch:{iframe:{any:()=>document.querySelector("ytd-player iframe#yteab"),id:e=>document.querySelector(`ytd-player iframe#yteab[data-yteab="${btoa(e)}"]`)},iframes:()=>document.querySelectorAll("ytd-player iframe#yteab")}};t.yteabelem=o;const i={watch:{ytd_top:()=>document.querySelector("ytd-player#ytd-player"),player_container:()=>document.querySelector("ytd-player div#container"),player:()=>document.querySelector("ytd-player div#movie_player"),video_container:()=>document.querySelector("ytd-player div.html5-video-container"),video:()=>document.querySelector("ytd-player div.html5-video-container video")}};t.ytelem=i;const n={watch:{adplaying:()=>{var e,t;return(null===(e=i.watch.player())||void 0===e?void 0:e.classList.contains("ad-showing"))||(null===(t=i.watch.player())||void 0===t?void 0:t.classList.contains("ad-interrupting"))}}};t.ytif=n,a.logger.debug.loaded("main.ts")},(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.urlparams=void 0;const a=r(2);t.urlparams={current:()=>new URLSearchParams(window.location.search),custom:e=>new URLSearchParams(e)},a.logger.debug.loaded("inject/urlparams.ts")},(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.mute=void 0;const a=r(2),o=r(5);var i;t.mute={enable(){var e,t;(null===(e=o.ytelem.watch.player())||void 0===e?void 0:e.classList.contains("yteab-mute"))||(null===(t=o.ytelem.watch.player())||void 0===t||t.classList.add("yteab-mute"),i=setInterval((()=>{let e=o.ytelem.watch.video();e&&!e.muted&&(e.muted=!0)}),1),a.logger.log("Main video muted"))},disable(){var e,t;if(!(null===(e=o.ytelem.watch.player())||void 0===e?void 0:e.classList.contains("yteab-mute")))return;let r=o.ytelem.watch.video();clearInterval(i),r&&r.muted&&(r.muted=!1),a.logger.log("Main video unmuted"),null===(t=o.ytelem.watch.player())||void 0===t||t.classList.remove("yteab-mute")}},a.logger.debug.loaded("inject/watch/mute.ts")},function(e,t,r){var a=this&&this.__createBinding||(Object.create?function(e,t,r,a){void 0===a&&(a=r);var o=Object.getOwnPropertyDescriptor(t,r);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,a,o)}:function(e,t,r,a){void 0===a&&(a=r),e[a]=t[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&a(t,e,r);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.sync=void 0;const n=i(r(3)),l=r(2),s=r(5);var d,c;t.sync={safestart(e,r=1,a=3){const o=e.detail.response;if(o&&"watch"==o.page&&"OK"==o.playerResponse.playabilityStatus.status&&o.playerResponse.playabilityStatus.playableInEmbed&&0==o.playerResponse.videoDetails.isOwnerViewing&&0==o.playerResponse.videoDetails.isPrivate&&0==o.playerResponse.videoDetails.isLiveContent){let e=o.endpoint.watchEndpoint.videoId;clearTimeout(d),d=setTimeout((()=>{try{t.sync.startnow(a,e)}catch(e){l.logger.error("Unable to start synchronization: \n"+e)}finally{l.logger.log("Synchronization started successfully")}}),1e3*r)}},startnow(e,r){var a;clearTimeout(d),clearInterval(c),null===(a=s.ytelem.watch.player())||void 0===a||a.classList.add("yteab-sync"),c=setInterval((()=>{var e;let a=s.ytelem.watch.video(),o=r?s.yteabelem.watch.iframe.id(r):s.yteabelem.watch.iframe.any();var i=null===(e=null==o?void 0:o.contentWindow)||void 0===e?void 0:e.document;if(!i)return;let d=i.querySelector("video");if(!s.ytif.watch.adplaying())if(a&&o&&i&&d){if(a.pause(),n.debug){const e=Number(a.currentTime.toFixed(3)),t=Number(d.currentTime.toFixed(3)),r=Number(Math.abs(t-e).toFixed(3)),o=Number((r/a.duration*100).toFixed(3));l.logger.debug.log(`Synchronization - main: ${e.toFixed(2)}, embed: ${t.toFixed(2)}, delta: ${r.toFixed(2)}, loss: ${o}%`)}a.currentTime=d.currentTime}else t.sync.stop()}),1e3*e)},stop(){var e,t;clearTimeout(d),clearInterval(c),(null===(e=s.ytelem.watch.player())||void 0===e?void 0:e.classList.contains("yteab-sync"))&&l.logger.log("Synchronization stopped"),null===(t=s.ytelem.watch.player())||void 0===t||t.classList.remove("yteab-sync")}},l.logger.debug.loaded("inject/watch/sync.ts")},function(e,t,r){var a=this&&this.__createBinding||(Object.create?function(e,t,r,a){void 0===a&&(a=r);var o=Object.getOwnPropertyDescriptor(t,r);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,a,o)}:function(e,t,r,a){void 0===a&&(a=r),e[a]=t[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&a(t,e,r);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.events=void 0;const n=i(r(3)),l=r(2),s=r(4),d=r(5),c=r(7);t.events={listen(e){try{document.addEventListener(e,(t=>this.run(e,t)))}catch(t){l.logger.error(`Unable to listen ${e}:\n${t}`)}finally{l.logger.log(`Listening for event: ${e}`)}},run(e,t){switch(e){case"yt-navigate-finish":if(t){const e=t;if(e.returnValue)if("watch"==e.detail.pageType){const t=e.detail.response;if("watch"==t.page&&"OK"==t.playerResponse.playabilityStatus.status&&t.playerResponse.playabilityStatus.playableInEmbed&&0==t.playerResponse.videoDetails.isOwnerViewing&&0==t.playerResponse.videoDetails.isPrivate&&0==t.playerResponse.videoDetails.isLiveContent){l.logger.log("Video overwrite possible");const r=t.endpoint.watchEndpoint.videoId;d.yteabelem.watch.iframe.id(r)?s.embed.preparation.preserve(e):s.embed.create(r,(()=>{l.logger.log("Ready for further instructions"),s.embed.preparation.preserve(e)}))}else l.logger.log("Video overwrite not possible"),n.debug&&("OK"!=t.playerResponse.playabilityStatus.status&&l.logger.debug.warn("Overwrite failed - Playability status: "+t.playerResponse.playabilityStatus.status),t.playerResponse.playabilityStatus.playableInEmbed||l.logger.debug.warn("Overwrite failed - Video is not playable in embed"),t.playerResponse.videoDetails.isOwnerViewing&&l.logger.debug.warn("Overwrite failed - Video is viewed by owner"),t.playerResponse.videoDetails.isPrivate&&l.logger.debug.warn("Overwrite failed - Video is private"),t.playerResponse.videoDetails.isLiveContent&&l.logger.debug.warn("Overwrite failed - Video is live content")),s.embed.preparation.cancel(e)}else s.embed.remove();else l.logger.error("Cannot read yt-navigate-finish");break}case"yt-navigate-start":if(t){const e=t;e.returnValue?"watch"==e.detail.pageType&&(c.mute.enable(),s.embed.prepare(e)):l.logger.error("Cannot read yt-navigate-start");break}}}},l.logger.debug.loaded("inject/events.ts")}],t={};!function r(a){var o=t[a];if(void 0!==o)return o.exports;var i=t[a]={exports:{}};return e[a].call(i.exports,i,i.exports,r),i.exports}(0)})();