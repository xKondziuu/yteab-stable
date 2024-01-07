(()=>{"use strict";var e=[function(e,t,a){var r=this&&this.__createBinding||(Object.create?function(e,t,a,r){void 0===r&&(r=a);var i=Object.getOwnPropertyDescriptor(t,a);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[a]}}),Object.defineProperty(e,r,i)}:function(e,t,a,r){void 0===r&&(r=a),e[r]=t[a]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)"default"!==a&&Object.prototype.hasOwnProperty.call(e,a)&&r(t,e,a);return i(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});const o=l(a(1)),n=a(2),s=a(4),d=a(11),c=a(2),u=a(7),y=a(8),p=a(10),g=a(9),m=a(6),b={_v:o.version,watch:{embed:s.embed,modify:u.modify,mute:y.mute,quality:p.quality,sync:g.sync},events:d.events,urlparams:m.urlparams,logger:c.logger};window.yteab=b,window.yteab==b&&(n.logger.debug.loaded("inject/index.ts"),n.logger.log("Extension loaded successfully!"),b.events.listen("yt-navigate-finish"),b.events.listen("yt-navigate-start")),t.default=b},e=>{e.exports=JSON.parse('{"name":"yteab-stable","version":"1.0.0","description":"YouTube Ethical AdBlocker","license":"UNLICENSED","homepage":"https://github.com/xKondziuu/yteab-stable","private":false,"repository":{"type":"git","url":"https://github.com/xKondziuu/yteab-stable.git"},"author":{"name":"xKondziuu","email":"xkondziuu4@gmail.com","url":"https://github.com/xKondziuu"},"contributors":[{"name":"MrFajFel","email":"filipgamer1234567@gmail.com","url":"https://github.com/MrFajFel"}],"scripts":{"build":"webpack build --mode none --config ./webpack.config.js && (sh build-linux.sh || call build-win.cmd)"},"devDependencies":{"@types/firefox":"^0.0.33","@types/node":"^20.8.9","css-loader":"^6.8.1","postcss-import":"^15.1.0","postcss-loader":"^7.3.3","postcss-nested":"^6.0.1","postcss-preset-env":"^9.2.0","postcss-pxtorem":"^6.0.0","style-loader":"^3.3.3","ts-loader":"^9.5.0","webpack":"^5.89.0","webpack-cli":"^5.1.4","webpack-dev-server":"^4.15.1"}}')},function(e,t,a){var r=this&&this.__createBinding||(Object.create?function(e,t,a,r){void 0===r&&(r=a);var i=Object.getOwnPropertyDescriptor(t,a);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[a]}}),Object.defineProperty(e,r,i)}:function(e,t,a,r){void 0===r&&(r=a),e[r]=t[a]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)"default"!==a&&Object.prototype.hasOwnProperty.call(e,a)&&r(t,e,a);return i(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.logger=void 0;const o=a(1),n=l(a(3));let s=o.name.split("-")[0].toLocaleUpperCase();t.logger={log(e){n.logger&&console.log(`[${s}] - ${String(e)}`)},error(e){n.logger&&console.error(`[${s}] - ${String(e)}`)},warn(e){n.logger&&console.warn(`[${s}] - ${String(e)}`)},dlog(e,a){n.logger&&(n.debug?t.logger.debug.log(a):t.logger.log(e))},debug:{loaded(e){n.logger&&n.debug&&console.log(`[${s}] - DEBUG: /src/${String(e)} loaded!`)},log(e){n.logger&&n.debug&&console.log(`[${s}] - DEBUG: ${String(e)}`)},warn(e){n.logger&&n.debug&&console.warn(`[${s}] - DEBUG: ${String(e)}`)}}},t.logger.debug.loaded("logger.ts")},e=>{e.exports=JSON.parse('{"debug":false,"logger":true}')},(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.embed=void 0;const r=a(1),i=a(2),l=a(5),o=a(6),n=a(7),s=a(8),d=a(9);t.embed={create(e,t){var a;let n=l.ytelem.watch.video_container();if(!n)return;const s={autoplay:1,enablejsapi:1,fs:1,modestbranding:1,origin:"0.0.0.0",rel:0,showinfo:0,start:o.urlparams.current().has("t")?Number(null===(a=o.urlparams.current().get("t"))||void 0===a?void 0:a.replace(/[^0-9]/g,"")):0,v:3},d=Object.keys(s).map((e=>`${e}=${encodeURIComponent(s[e])}`)).join("&");let c=document.createElement("iframe");c.src=`https://www.youtube.com/embed/${e}/?${d}`,c.id=r.name.split("-")[0],c.loading="eager",c.referrerPolicy="same-origin",c.setAttribute("data-yteab",btoa(e)),c.style.display="none",c.setAttribute("sandbox","allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation"),n.appendChild(c),l.yteabelem.watch.iframe.id(e)?(i.logger.debug.log("Iframe rendering finished"),t&&t()):i.logger.error("Unable to create iframe")},prepare(e,a){var r;i.logger.debug.log("Preparing video iframe..."),null===(r=l.ytelem.watch.player())||void 0===r||r.classList.add("yteab-playing"),s.mute.enable();const o=e.detail.endpoint.watchEndpoint.videoId;t.embed.create(o,(()=>{a&&a()}))},preparation:{preserve(e){const a=e.detail.response.endpoint.watchEndpoint.videoId,r=l.yteabelem.watch.iframe.id(a);r&&(i.logger.dlog("Keeping prepared render","Keeping prepared iframe"),t.embed.keep(a),n.modify.safe(e),t.embed.focus(a),r.style.display="block",d.sync.safestart(e))},cancel(e){var a;i.logger.dlog("Canceling prepared render","Canceling prepared iframe"),t.embed.remove(),null===(a=l.ytelem.watch.player())||void 0===a||a.classList.remove("yteab-playing"),s.mute.disable(),d.sync.stop()}},keep(e){var t;l.yteabelem.watch.iframe.id(e)?null===(t=l.yteabelem.watch.iframes())||void 0===t||t.forEach((t=>{t.getAttribute("data-yteab")!=btoa(e)&&t.remove()})):i.logger.error("Unable find iframe to keep")},focus(e){let t=e?l.yteabelem.watch.iframe.id(e):l.yteabelem.watch.iframe.any();if(t)try{t.focus(),i.logger.debug.log("Iframe element focused")}catch(e){i.logger.error("Unable to focus iframe: \n"+e)}},hide(e){let t=e?l.yteabelem.watch.iframe.id(e):l.yteabelem.watch.iframe.any();t&&(t.style.visibility="hidden")},show(e){let t=e?l.yteabelem.watch.iframe.id(e):l.yteabelem.watch.iframe.any();t&&(t.style.visibility="visible")},remove(){var e;if(l.yteabelem.watch.iframe.any())try{null===(e=l.yteabelem.watch.iframes())||void 0===e||e.forEach((e=>{e.remove()})),d.sync.stop(),s.mute.disable()}catch(e){i.logger.error(`Unable to remove iframes:\n${e}`)}finally{i.logger.dlog("Restored youtube defaults","All existing iframes removed")}}},i.logger.debug.loaded("inject/watch/embed.ts")},(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ytif=t.ytelem=t.yteabelem=t.regex=void 0;const r=a(2);t.regex={ytid:/([a-zA-Z0-9\_-]){11,11}/,yturl:/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]){11,11}/};const i={watch:{iframe:{any:()=>document.querySelector("ytd-player iframe#yteab"),id:e=>document.querySelector(`ytd-player iframe#yteab[data-yteab="${btoa(e)}"]`)},iframes:()=>document.querySelectorAll("ytd-player iframe#yteab")}};t.yteabelem=i;const l={watch:{ytd_top:()=>document.querySelector("ytd-player#ytd-player"),player_container:()=>document.querySelector("ytd-player div#container"),player:()=>document.querySelector("ytd-player div#movie_player"),video_container:()=>document.querySelector("ytd-player div.html5-video-container"),video:()=>document.querySelector("ytd-player div.html5-video-container video"),settings:{button:()=>document.querySelector("ytd-player .ytp-chrome-controls .ytp-settings-button"),menu:()=>document.querySelector("ytd-player .ytp-settings-menu > .ytp-panel > div"),quality:()=>document.querySelector("ytd-player .ytp-settings-menu > .ytp-panel > div > div:last-child"),qualities:()=>document.querySelectorAll(".ytp-quality-menu .ytp-menuitem > .ytp-menuitem-label > div > span")}}};t.ytelem=l;const o={watch:{adplaying:()=>{var e,t;return(null===(e=l.watch.player())||void 0===e?void 0:e.classList.contains("ad-showing"))||(null===(t=l.watch.player())||void 0===t?void 0:t.classList.contains("ad-interrupting"))}}};t.ytif=o,r.logger.debug.loaded("main.ts")},(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.urlparams=void 0;const r=a(2);t.urlparams={current:()=>new URLSearchParams(window.location.search),custom:e=>new URLSearchParams(e)},r.logger.debug.loaded("inject/urlparams.ts")},(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.modify=void 0;const r=a(2),i=a(5),l=a(4);var o=0;t.modify={safe(e){const a=e.detail.response;if(i.yteabelem.watch.iframe.any()&&a&&"watch"==a.page&&"OK"==a.playerResponse.playabilityStatus.status&&a.playerResponse.playabilityStatus.playableInEmbed&&0==a.playerResponse.videoDetails.isOwnerViewing&&0==a.playerResponse.videoDetails.isPrivate&&0==a.playerResponse.videoDetails.isLiveContent){let e=a.endpoint.watchEndpoint.videoId;try{t.modify.now(e,(()=>{r.logger.dlog("Adjusted player content","Frame content successfully manipulated")}))}catch(e){r.logger.error("Unable to manipulate frame content: \n"+e)}}},now(e,a){var n;try{clearTimeout(o)}catch(e){}let s=e?i.yteabelem.watch.iframe.id(e):i.yteabelem.watch.iframe.any();var d=null===(n=null==s?void 0:s.contentWindow)||void 0===n?void 0:n.document;if(!d)return;let c=d.querySelector("#movie_player");c&&(c.classList.remove("ytp-embed"),c.classList.remove("ytp-embed-playlist"),c.classList.add("yteab-embed"));let u=d.querySelector(".ytp-next-button");u&&(u.style.display="block",u.style.opacity=".9");let y=[".ytp-ce-element",".ytp-chrome-top",".ytp-gradient-top",".ytp-more-videos-view"],p=[".ytp-chrome-top",".ytp-contextmenu .ytp-panel-menu > .ytp-menuitem:first-child",".ytp-contextmenu .ytp-collapse",".ytp-gradient-top",".ytp-more-videos-view",".ytp-pause-overlay",".ytp-pause-overlay-container",".ytp-youtube-button"];for(let e of y){let t=d.querySelector(e);t&&t.remove()}for(let e of p){let t=d.querySelector(e);t&&(t.style.display="none")}let g=d.createElement("style");g.innerHTML=`${p.toString()} {display: none!important}`,g.className="yteab-style-hide",d.body.appendChild(g),c&&c.classList.contains("yteab-embed")?a&&a():(l.embed.hide(),o=setTimeout((()=>{t.modify.now(e,(()=>{r.logger.dlog("Adjusted player content","Frame content manipulated after a retry"),l.embed.show()}))}),500))}},r.logger.debug.loaded("inject/watch/modify.ts")},(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.mute=void 0;const r=a(2),i=a(5);var l;t.mute={enable(){var e,t;(null===(e=i.ytelem.watch.player())||void 0===e?void 0:e.classList.contains("yteab-mute"))||(null===(t=i.ytelem.watch.player())||void 0===t||t.classList.add("yteab-mute"),l=setInterval((()=>{let e=i.ytelem.watch.video();e&&!e.muted&&(e.muted=!0)}),1),r.logger.debug.log("Main video muted"))},disable(){var e,t;if(!(null===(e=i.ytelem.watch.player())||void 0===e?void 0:e.classList.contains("yteab-mute")))return;let a=i.ytelem.watch.video();clearInterval(l),a&&a.muted&&(a.muted=!1),r.logger.debug.log("Main video unmuted"),null===(t=i.ytelem.watch.player())||void 0===t||t.classList.remove("yteab-mute")}},r.logger.debug.loaded("inject/watch/mute.ts")},function(e,t,a){var r=this&&this.__createBinding||(Object.create?function(e,t,a,r){void 0===r&&(r=a);var i=Object.getOwnPropertyDescriptor(t,a);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[a]}}),Object.defineProperty(e,r,i)}:function(e,t,a,r){void 0===r&&(r=a),e[r]=t[a]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)"default"!==a&&Object.prototype.hasOwnProperty.call(e,a)&&r(t,e,a);return i(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.sync=void 0;const o=l(a(3)),n=a(2),s=a(5),d=a(10);var c,u;t.sync={safestart(e,a=1,r=2){const i=e.detail.response;if(i&&"watch"==i.page&&"OK"==i.playerResponse.playabilityStatus.status&&i.playerResponse.playabilityStatus.playableInEmbed&&0==i.playerResponse.videoDetails.isOwnerViewing&&0==i.playerResponse.videoDetails.isPrivate&&0==i.playerResponse.videoDetails.isLiveContent){let e=i.endpoint.watchEndpoint.videoId;clearTimeout(c),c=setTimeout((()=>{try{d.quality.main.setonce("360p"),t.sync.startnow(r,e)}catch(e){n.logger.error("Unable to start synchronization: \n"+e)}finally{n.logger.log("Synchronization started successfully")}}),1e3*a)}},startnow(e,a){var r;clearTimeout(c),clearInterval(u),null===(r=s.ytelem.watch.player())||void 0===r||r.classList.add("yteab-sync");let i=!1;u=setInterval((()=>{var e;let r=s.ytelem.watch.video(),l=a?s.yteabelem.watch.iframe.id(a):s.yteabelem.watch.iframe.any();var d=null===(e=null==l?void 0:l.contentWindow)||void 0===e?void 0:e.document;if(!d)return;let c=d.querySelector("video");if(s.ytif.watch.adplaying())r&&(r.playbackRate=2);else if(r&&l&&d&&c)if(1!=r.playbackRate&&(r.playbackRate=1),r.pause(),r.ended&&r.play(),r.currentTime!=c.currentTime){if(i=!1,o.debug){const e=Number(r.currentTime.toFixed(3)),t=Number(c.currentTime.toFixed(3)),a=Number(Math.abs(t-e).toFixed(3)),i=Number((a/r.duration*100).toFixed(3));n.logger.debug.log(`Synchronization - main: ${e.toFixed(2)}, embed: ${t.toFixed(2)}, delta: ${a.toFixed(2)}, loss: ${i}%`)}r.currentTime=c.currentTime}else 0==i&&n.logger.dlog("Video paused, halting...",`Synchronization - VIDEO PAUSED at ${c.currentTime.toFixed(2)}`),i=!0;else t.sync.stop()}),1e3*e)},stop(){var e,t;clearTimeout(c),clearInterval(u),(null===(e=s.ytelem.watch.player())||void 0===e?void 0:e.classList.contains("yteab-sync"))&&n.logger.log("Synchronization stopped"),null===(t=s.ytelem.watch.player())||void 0===t||t.classList.remove("yteab-sync")}},n.logger.debug.loaded("inject/watch/sync.ts")},(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.quality=void 0;const r=a(2),i=a(5);t.quality={translate(e){switch(e){case"144p":return"tiny";case"240p":return"small";case"360p":return"medium";case"480p":return"large";case"720p":return"hd720";case"1080p":return"hd1080";case"1440p":return"hd1440";case"2160p":return"hd2160";case"2880p":return"hd2880";case"4320p":return"hd4320";default:return r.logger.error("Unable to recognize quality label"),null}},main:{init(){let e=i.ytelem.watch.settings.button();e&&(e.click(),e.click())},get(){this.init();let e=i.ytelem.watch.settings.quality(),a=null==e?void 0:e.querySelector("span.ytp-menu-label-secondary");if(e&&a){let e=a.innerText.slice(1,-1).split("p")[0]+"p";return t.quality.translate(e)}return null},getrawcookie(e=!1){let t=window.localStorage.getItem("yt-player-quality");if(!t)return null;if(e){let e=JSON.parse(t),a=JSON.parse(e.data);return e.data=a,e}return t},getcookie(){let e=this.getrawcookie(!0),a=null==e?void 0:e.data;if(e&&a){let e=a.quality+"p";return t.quality.translate(e)}return null},set(e,t=!1,a){var l,o,n;this.init();let s=i.ytelem.watch.settings.quality(),d=null==s?void 0:s.querySelector("span.ytp-menu-label-secondary");if(s&&d){if(e==d.innerText.slice(1,-1).split("p")[0]+"p")return;s.click();let y=i.ytelem.watch.settings.qualities();if(y){for(var c,u=0;u<y.length;u++)if(null===(l=y[u].textContent)||void 0===l?void 0:l.includes(e)){c=y[u];break}if(c){let i=null===(n=null===(o=c.parentElement)||void 0===o?void 0:o.parentElement)||void 0===n?void 0:n.parentElement;i?(i.click(),t||r.logger.log("Main video quality changed to: "+e),a&&a()):r.logger.error("Unable to change main video quality to "+e),s.click()}}}},setcookie(e){let t=this.getrawcookie(!0),a=null==t?void 0:t.data;t&&a&&(a.quality=Number(e.slice(0,-1)),t.data=JSON.stringify(a),window.localStorage.setItem("yt-player-quality",JSON.stringify(t)),r.logger.log("Video quality cookie changed to: "+e))},setrawcookie(e){e&&window.localStorage.setItem("yt-player-quality",JSON.stringify(e))},setonce(e){let t=this.getrawcookie();this.set(e,!0,(()=>{this.setrawcookie(JSON.parse(t)),r.logger.dlog("Adjusted video quality",`Main video quality changed once to: ${e}`)}))}},embed:{init(e){var t;let a=e?i.yteabelem.watch.iframe.id(e):i.yteabelem.watch.iframe.any();var r=null===(t=null==a?void 0:a.contentWindow)||void 0===t?void 0:t.document;if(!r)return;let l=r.querySelector(".ytp-chrome-controls .ytp-settings-button");l&&(l.click(),l.click())},get(e){var a;this.init();let r=e?i.yteabelem.watch.iframe.id(e):i.yteabelem.watch.iframe.any();var l=null===(a=null==r?void 0:r.contentWindow)||void 0===a?void 0:a.document;if(!l)return null;let o=l.querySelector(".ytp-settings-menu > .ytp-panel > div > div:last-child"),n=null==o?void 0:o.querySelector("span.ytp-menu-label-secondary");if(o&&n){let e=n.innerText.slice(1,-1).split("p")[0]+"p";return t.quality.translate(e)}return null}}},r.logger.debug.loaded("inject/watch/quality.ts")},function(e,t,a){var r=this&&this.__createBinding||(Object.create?function(e,t,a,r){void 0===r&&(r=a);var i=Object.getOwnPropertyDescriptor(t,a);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[a]}}),Object.defineProperty(e,r,i)}:function(e,t,a,r){void 0===r&&(r=a),e[r]=t[a]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)"default"!==a&&Object.prototype.hasOwnProperty.call(e,a)&&r(t,e,a);return i(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.events=void 0;const o=l(a(3)),n=a(2),s=a(4),d=a(5),c=a(8);t.events={listen(e){try{document.addEventListener(e,(t=>this.run(e,t)))}catch(t){n.logger.error(`Unable to listen ${e}:\n${t}`)}finally{n.logger.debug.log(`Listening for event: ${e}`)}},run(e,t){switch(e){case"yt-navigate-finish":if(t){const e=t;if(e.returnValue)if("watch"==e.detail.pageType){const t=e.detail.response;if("watch"==t.page&&"OK"==t.playerResponse.playabilityStatus.status&&t.playerResponse.playabilityStatus.playableInEmbed&&0==t.playerResponse.videoDetails.isOwnerViewing&&0==t.playerResponse.videoDetails.isPrivate&&0==t.playerResponse.videoDetails.isLiveContent){n.logger.log("Video overwrite possible!");const a=t.endpoint.watchEndpoint.videoId;d.yteabelem.watch.iframe.id(a)?s.embed.preparation.preserve(e):(n.logger.log(`Processing video '${e.detail.endpoint.watchEndpoint.videoId}'`),s.embed.create(a,(()=>{var t;null===(t=d.ytelem.watch.player())||void 0===t||t.classList.add("yteab-playing"),s.embed.preparation.preserve(e)})))}else n.logger.log("Video overwrite NOT possible!"),o.debug&&("OK"!=t.playerResponse.playabilityStatus.status&&n.logger.debug.warn("Overwrite failed - Playability status: "+t.playerResponse.playabilityStatus.status),t.playerResponse.playabilityStatus.playableInEmbed||n.logger.debug.warn("Overwrite failed - Video is not playable in embed"),t.playerResponse.videoDetails.isOwnerViewing&&n.logger.debug.warn("Overwrite failed - Video is viewed by owner"),t.playerResponse.videoDetails.isPrivate&&n.logger.debug.warn("Overwrite failed - Video is private"),t.playerResponse.videoDetails.isLiveContent&&n.logger.debug.warn("Overwrite failed - Video is live content")),s.embed.preparation.cancel(e)}else s.embed.remove();else n.logger.error("Cannot read yt-navigate-finish");break}case"yt-navigate-start":if(t){const e=t;e.returnValue?"watch"==e.detail.pageType&&(n.logger.log(`Processing video '${e.detail.endpoint.watchEndpoint.videoId}'`),c.mute.enable(),s.embed.prepare(e)):n.logger.error("Cannot read yt-navigate-start");break}}}},n.logger.debug.loaded("inject/events.ts")}],t={};!function a(r){var i=t[r];if(void 0!==i)return i.exports;var l=t[r]={exports:{}};return e[r].call(l.exports,l,l.exports,a),l.exports}(0)})();