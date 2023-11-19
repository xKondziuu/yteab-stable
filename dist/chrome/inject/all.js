(()=>{"use strict";var e=[function(e,t,r){var a=this&&this.__createBinding||(Object.create?function(e,t,r,a){void 0===a&&(a=r);var i=Object.getOwnPropertyDescriptor(t,r);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,a,i)}:function(e,t,r,a){void 0===a&&(a=r),e[a]=t[r]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&a(t,e,r);return i(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});const o=l(r(1)),n=r(2),s=r(4),d=r(10),c=r(2),u=r(7),y=r(9),p=r(8),g=r(6),m={_v:o.version,watch:{embed:s.embed,mute:u.mute,quality:y.quality,sync:p.sync},events:d.events,urlparams:g.urlparams,logger:c.logger};window.yteab=m,window.yteab==m&&(n.logger.debug.loaded("inject/index.ts"),n.logger.log("Extension loaded successfully!"),m.events.listen("yt-navigate-finish"),m.events.listen("yt-navigate-start")),t.default=m},e=>{e.exports=JSON.parse('{"name":"yteab-stable","version":"1.0.0","description":"YouTube Ethical AdBlocker","license":"UNLICENSED","homepage":"https://github.com/xKondziuu/yteab-stable","private":false,"repository":{"type":"git","url":"https://github.com/xKondziuu/yteab-stable.git"},"author":{"name":"xKondziuu","email":"xkondziuu4@gmail.com","url":"https://github.com/xKondziuu"},"contributors":[{"name":"MrFajFel","email":"filipgamer1234567@gmail.com","url":"https://github.com/MrFajFel"}],"scripts":{"build":"webpack build --mode none --config ./webpack.config.js && (sh build-linux.sh || call build-win.cmd)"},"devDependencies":{"@types/firefox":"^0.0.33","@types/node":"^20.8.9","css-loader":"^6.8.1","postcss-import":"^15.1.0","postcss-loader":"^7.3.3","postcss-nested":"^6.0.1","postcss-preset-env":"^9.2.0","postcss-pxtorem":"^6.0.0","style-loader":"^3.3.3","ts-loader":"^9.5.0","webpack":"^5.89.0","webpack-cli":"^5.1.4","webpack-dev-server":"^4.15.1"}}')},function(e,t,r){var a=this&&this.__createBinding||(Object.create?function(e,t,r,a){void 0===a&&(a=r);var i=Object.getOwnPropertyDescriptor(t,r);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,a,i)}:function(e,t,r,a){void 0===a&&(a=r),e[a]=t[r]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&a(t,e,r);return i(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.logger=void 0;const o=r(1),n=l(r(3));let s=o.name.split("-")[0].toLocaleUpperCase();t.logger={log(e){n.logger&&console.log(`[${s}] - ${String(e)}`)},error(e){n.logger&&console.error(`[${s}] - ${String(e)}`)},warn(e){n.logger&&console.warn(`[${s}] - ${String(e)}`)},debug:{loaded(e){n.logger&&n.debug&&console.log(`[${s}] - DEBUG: /src/${String(e)} loaded!`)},log(e){n.logger&&console.log(`[${s}] - DEBUG: ${String(e)}`)},warn(e){n.logger&&console.warn(`[${s}] - DEBUG: ${String(e)}`)}}},t.logger.debug.loaded("logger.ts")},e=>{e.exports=JSON.parse('{"debug":false,"logger":true}')},(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.embed=void 0;const a=r(1),i=r(2),l=r(5),o=r(6),n=r(7),s=r(8);t.embed={create(e,t){var r;let n=l.ytelem.watch.video_container();if(!n)return;const s={autoplay:1,enablejsapi:1,fs:1,modestbranding:1,origin:"0.0.0.0",rel:0,showinfo:0,start:o.urlparams.current().has("t")?Number(null===(r=o.urlparams.current().get("t"))||void 0===r?void 0:r.replace(/[^0-9]/g,"")):0,v:3},d=Object.keys(s).map((e=>`${e}=${encodeURIComponent(s[e])}`)).join("&");let c=document.createElement("iframe");c.src=`https://www.youtube.com/embed/${e}/?${d}`,c.id=a.name.split("-")[0],c.loading="eager",c.referrerPolicy="same-origin",c.setAttribute("data-yteab",btoa(e)),c.style.display="none",c.setAttribute("sandbox","allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation"),n.appendChild(c),l.yteabelem.watch.iframe.id(e)?(i.logger.log("Iframe rendering finished"),t&&t()):i.logger.error("Unable to create iframe")},prepare(e,r){i.logger.log("Preparing video iframe...");const a=e.detail.endpoint.watchEndpoint.videoId;t.embed.create(a,(()=>{n.mute.enable(),r&&r()}))},preparation:{preserve(e){const r=e.detail.response.endpoint.watchEndpoint.videoId,a=l.yteabelem.watch.iframe.id(r);a&&(i.logger.log("Keeping prepared iframe"),t.embed.keep(r),a.style.display="block",s.sync.safestart(e))},cancel(e){i.logger.log("Canceling prepared iframe"),t.embed.remove(),n.mute.disable(),s.sync.stop()}},keep(e){var t;l.yteabelem.watch.iframe.id(e)?null===(t=l.yteabelem.watch.iframes())||void 0===t||t.forEach((t=>{t.getAttribute("data-yteab")!=btoa(e)&&t.remove()})):i.logger.error("Unable find iframe to keep")},remove(){var e;if(l.yteabelem.watch.iframe.any())try{null===(e=l.yteabelem.watch.iframes())||void 0===e||e.forEach((e=>{e.remove()})),s.sync.stop(),n.mute.disable()}catch(e){i.logger.error(`Unable to remove iframes:\n${e}`)}finally{i.logger.log("All existing iframes removed")}}},i.logger.debug.loaded("inject/watch/embed.ts")},(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ytif=t.ytelem=t.yteabelem=t.regex=void 0;const a=r(2);t.regex={ytid:/([a-zA-Z0-9\_-]){11,11}/,yturl:/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]){11,11}/};const i={watch:{iframe:{any:()=>document.querySelector("ytd-player iframe#yteab"),id:e=>document.querySelector(`ytd-player iframe#yteab[data-yteab="${btoa(e)}"]`)},iframes:()=>document.querySelectorAll("ytd-player iframe#yteab")}};t.yteabelem=i;const l={watch:{ytd_top:()=>document.querySelector("ytd-player#ytd-player"),player_container:()=>document.querySelector("ytd-player div#container"),player:()=>document.querySelector("ytd-player div#movie_player"),video_container:()=>document.querySelector("ytd-player div.html5-video-container"),video:()=>document.querySelector("ytd-player div.html5-video-container video"),settings:{button:()=>document.querySelector("ytd-player .ytp-chrome-controls .ytp-settings-button"),menu:()=>document.querySelector("ytd-player .ytp-settings-menu > .ytp-panel > div"),quality:()=>document.querySelector("ytd-player .ytp-settings-menu > .ytp-panel > div > div:last-child"),qualities:()=>document.querySelectorAll(".ytp-quality-menu .ytp-menuitem > .ytp-menuitem-label > div > span")}}};t.ytelem=l;const o={watch:{adplaying:()=>{var e,t;return(null===(e=l.watch.player())||void 0===e?void 0:e.classList.contains("ad-showing"))||(null===(t=l.watch.player())||void 0===t?void 0:t.classList.contains("ad-interrupting"))}}};t.ytif=o,a.logger.debug.loaded("main.ts")},(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.urlparams=void 0;const a=r(2);t.urlparams={current:()=>new URLSearchParams(window.location.search),custom:e=>new URLSearchParams(e)},a.logger.debug.loaded("inject/urlparams.ts")},(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.mute=void 0;const a=r(2),i=r(5);var l;t.mute={enable(){var e,t;(null===(e=i.ytelem.watch.player())||void 0===e?void 0:e.classList.contains("yteab-mute"))||(null===(t=i.ytelem.watch.player())||void 0===t||t.classList.add("yteab-mute"),l=setInterval((()=>{let e=i.ytelem.watch.video();e&&!e.muted&&(e.muted=!0)}),1),a.logger.log("Main video muted"))},disable(){var e,t;if(!(null===(e=i.ytelem.watch.player())||void 0===e?void 0:e.classList.contains("yteab-mute")))return;let r=i.ytelem.watch.video();clearInterval(l),r&&r.muted&&(r.muted=!1),a.logger.log("Main video unmuted"),null===(t=i.ytelem.watch.player())||void 0===t||t.classList.remove("yteab-mute")}},a.logger.debug.loaded("inject/watch/mute.ts")},function(e,t,r){var a=this&&this.__createBinding||(Object.create?function(e,t,r,a){void 0===a&&(a=r);var i=Object.getOwnPropertyDescriptor(t,r);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,a,i)}:function(e,t,r,a){void 0===a&&(a=r),e[a]=t[r]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&a(t,e,r);return i(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.sync=void 0;const o=l(r(3)),n=r(2),s=r(5),d=r(9);var c,u;t.sync={safestart(e,r=1,a=2){const i=e.detail.response;if(i&&"watch"==i.page&&"OK"==i.playerResponse.playabilityStatus.status&&i.playerResponse.playabilityStatus.playableInEmbed&&0==i.playerResponse.videoDetails.isOwnerViewing&&0==i.playerResponse.videoDetails.isPrivate&&0==i.playerResponse.videoDetails.isLiveContent){let e=i.endpoint.watchEndpoint.videoId;clearTimeout(c),c=setTimeout((()=>{try{d.quality.main.setonce("360p"),t.sync.startnow(a,e)}catch(e){n.logger.error("Unable to start synchronization: \n"+e)}finally{n.logger.log("Synchronization started successfully")}}),1e3*r)}},startnow(e,r){var a;clearTimeout(c),clearInterval(u),null===(a=s.ytelem.watch.player())||void 0===a||a.classList.add("yteab-sync"),u=setInterval((()=>{var e;let a=s.ytelem.watch.video(),i=r?s.yteabelem.watch.iframe.id(r):s.yteabelem.watch.iframe.any();var l=null===(e=null==i?void 0:i.contentWindow)||void 0===e?void 0:e.document;if(!l)return;let d=l.querySelector("video");if(!s.ytif.watch.adplaying())if(a&&i&&l&&d){if(a.pause(),o.debug){const e=Number(a.currentTime.toFixed(3)),t=Number(d.currentTime.toFixed(3)),r=Number(Math.abs(t-e).toFixed(3)),i=Number((r/a.duration*100).toFixed(3));n.logger.debug.log(`Synchronization - main: ${e.toFixed(2)}, embed: ${t.toFixed(2)}, delta: ${r.toFixed(2)}, loss: ${i}%`)}a.ended&&a.play(),a.currentTime=d.currentTime}else t.sync.stop()}),1e3*e)},stop(){var e,t;clearTimeout(c),clearInterval(u),(null===(e=s.ytelem.watch.player())||void 0===e?void 0:e.classList.contains("yteab-sync"))&&n.logger.log("Synchronization stopped"),null===(t=s.ytelem.watch.player())||void 0===t||t.classList.remove("yteab-sync")}},n.logger.debug.loaded("inject/watch/sync.ts")},(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.quality=void 0;const a=r(2),i=r(5);t.quality={translate(e){switch(e){case"144p":return"tiny";case"240p":return"small";case"360p":return"medium";case"480p":return"large";case"720p":return"hd720";case"1080p":return"hd1080";case"1440p":return"hd1440";case"2160p":return"hd2160";case"2880p":return"hd2880";case"4320p":return"hd4320";default:return a.logger.error("Unable to recognize quality label"),null}},main:{init(){let e=i.ytelem.watch.settings.button();e&&(e.click(),e.click())},get(){this.init();let e=i.ytelem.watch.settings.quality(),r=null==e?void 0:e.querySelector("span.ytp-menu-label-secondary");if(e&&r){let e=r.innerText.slice(1,-1).split("p")[0]+"p";return t.quality.translate(e)}return null},getrawcookie(e=!1){let t=window.localStorage.getItem("yt-player-quality");if(!t)return null;if(e){let e=JSON.parse(t),r=JSON.parse(e.data);return e.data=r,e}return t},getcookie(){let e=this.getrawcookie(!0),r=null==e?void 0:e.data;if(e&&r){let e=r.quality+"p";return t.quality.translate(e)}return null},set(e,t){var r,l,o;this.init();let n=i.ytelem.watch.settings.quality(),s=null==n?void 0:n.querySelector("span.ytp-menu-label-secondary");if(n&&s){if(e==s.innerText.slice(1,-1).split("p")[0]+"p")return;n.click();let u=i.ytelem.watch.settings.qualities();if(u){for(var d,c=0;c<u.length;c++)if(null===(r=u[c].textContent)||void 0===r?void 0:r.includes(e)){d=u[c];break}if(d){let r=null===(o=null===(l=d.parentElement)||void 0===l?void 0:l.parentElement)||void 0===o?void 0:o.parentElement;r?(r.click(),a.logger.log("Main video quality changed to: "+e),t&&t()):a.logger.error("Unable to change main video quality to "+e),n.click()}}}},setcookie(e){let t=this.getrawcookie(!0),r=null==t?void 0:t.data;t&&r&&(r.quality=Number(e.slice(0,-1)),t.data=JSON.stringify(r),window.localStorage.setItem("yt-player-quality",JSON.stringify(t)),a.logger.log("Video quality cookie changed to: "+e))},setrawcookie(e){e&&window.localStorage.setItem("yt-player-quality",JSON.stringify(e))},setonce(e){let t=this.getrawcookie();this.set(e,(()=>{this.setrawcookie(JSON.parse(t))}))}},embed:{init(e){var t;let r=e?i.yteabelem.watch.iframe.id(e):i.yteabelem.watch.iframe.any();var a=null===(t=null==r?void 0:r.contentWindow)||void 0===t?void 0:t.document;if(!a)return;let l=a.querySelector(".ytp-chrome-controls .ytp-settings-button");l&&(l.click(),l.click())},get(e){var r;this.init();let a=e?i.yteabelem.watch.iframe.id(e):i.yteabelem.watch.iframe.any();var l=null===(r=null==a?void 0:a.contentWindow)||void 0===r?void 0:r.document;if(!l)return null;let o=l.querySelector(".ytp-settings-menu > .ytp-panel > div > div:last-child"),n=null==o?void 0:o.querySelector("span.ytp-menu-label-secondary");if(o&&n){let e=n.innerText.slice(1,-1).split("p")[0]+"p";return t.quality.translate(e)}return null}}},a.logger.debug.loaded("inject/watch/quality.ts")},function(e,t,r){var a=this&&this.__createBinding||(Object.create?function(e,t,r,a){void 0===a&&(a=r);var i=Object.getOwnPropertyDescriptor(t,r);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,a,i)}:function(e,t,r,a){void 0===a&&(a=r),e[a]=t[r]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&a(t,e,r);return i(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.events=void 0;const o=l(r(3)),n=r(2),s=r(4),d=r(5),c=r(7);t.events={listen(e){try{document.addEventListener(e,(t=>this.run(e,t)))}catch(t){n.logger.error(`Unable to listen ${e}:\n${t}`)}finally{n.logger.log(`Listening for event: ${e}`)}},run(e,t){switch(e){case"yt-navigate-finish":if(t){const e=t;if(e.returnValue)if("watch"==e.detail.pageType){const t=e.detail.response;if("watch"==t.page&&"OK"==t.playerResponse.playabilityStatus.status&&t.playerResponse.playabilityStatus.playableInEmbed&&0==t.playerResponse.videoDetails.isOwnerViewing&&0==t.playerResponse.videoDetails.isPrivate&&0==t.playerResponse.videoDetails.isLiveContent){n.logger.log("Video overwrite possible!");const r=t.endpoint.watchEndpoint.videoId;d.yteabelem.watch.iframe.id(r)?s.embed.preparation.preserve(e):s.embed.create(r,(()=>{n.logger.log("Ready for further instructions"),s.embed.preparation.preserve(e)}))}else n.logger.log("Video overwrite NOT possible!"),o.debug&&("OK"!=t.playerResponse.playabilityStatus.status&&n.logger.debug.warn("Overwrite failed - Playability status: "+t.playerResponse.playabilityStatus.status),t.playerResponse.playabilityStatus.playableInEmbed||n.logger.debug.warn("Overwrite failed - Video is not playable in embed"),t.playerResponse.videoDetails.isOwnerViewing&&n.logger.debug.warn("Overwrite failed - Video is viewed by owner"),t.playerResponse.videoDetails.isPrivate&&n.logger.debug.warn("Overwrite failed - Video is private"),t.playerResponse.videoDetails.isLiveContent&&n.logger.debug.warn("Overwrite failed - Video is live content")),s.embed.preparation.cancel(e)}else s.embed.remove();else n.logger.error("Cannot read yt-navigate-finish");break}case"yt-navigate-start":if(t){const e=t;e.returnValue?"watch"==e.detail.pageType&&(c.mute.enable(),s.embed.prepare(e)):n.logger.error("Cannot read yt-navigate-start");break}}}},n.logger.debug.loaded("inject/events.ts")}],t={};!function r(a){var i=t[a];if(void 0!==i)return i.exports;var l=t[a]={exports:{}};return e[a].call(l.exports,l,l.exports,r),l.exports}(0)})();