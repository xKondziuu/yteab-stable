(()=>{"use strict";var e=[function(e,t,o){var r=this&&this.__createBinding||(Object.create?function(e,t,o,r){void 0===r&&(r=o);var i=Object.getOwnPropertyDescriptor(t,o);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,r,i)}:function(e,t,o,r){void 0===r&&(r=o),e[r]=t[o]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),s=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&r(t,e,o);return i(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});const n=s(o(1)),l=o(2),a=o(3),c=o(4),u=o(5),d={_v:n.version,watch:{embed:l.embed,sync:u.sync},events:a.events,logger:c.logger};t.default=d},e=>{e.exports=JSON.parse('{"name":"yteab-stable","version":"1.0.0","description":"YouTube Ethical AdBlocker","license":"UNLICENSED","homepage":"https://github.com/xKondziuu/yteab-stable","private":false,"repository":{"type":"git","url":"https://github.com/xKondziuu/yteab-stable.git"},"author":{"name":"xKondziuu","email":"xkondziuu4@gmail.com","url":"https://github.com/xKondziuu"},"contributors":[{"name":"MrFajFel","email":"filipgamer1234567@gmail.com","url":"https://github.com/MrFajFel"}],"scripts":{"build":"webpack build --mode none --config ./webpack.config.js && (sh build-linux.sh || call build-win.cmd)"},"devDependencies":{"@types/firefox":"^0.0.33","@types/node":"^20.8.9","css-loader":"^6.8.1","postcss-import":"^15.1.0","postcss-loader":"^7.3.3","postcss-nested":"^6.0.1","postcss-preset-env":"^9.2.0","postcss-pxtorem":"^6.0.0","style-loader":"^3.3.3","ts-loader":"^9.5.0","webpack":"^5.89.0","webpack-cli":"^5.1.4","webpack-dev-server":"^4.15.1"}}')},(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.embed=void 0,t.embed={}},(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.events=void 0,t.events={}},(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.logger=void 0;let r=o(1).name.toLocaleUpperCase();t.logger={log(e){console.log(`[${r}] - ${String(e)}`)},error(e){console.error(`[${r}] - ${String(e)}`)},warn(e){console.warn(`[${r}] - ${String(e)}`)}}},(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.sync=void 0,t.sync={}}],t={};!function o(r){var i=t[r];if(void 0!==i)return i.exports;var s=t[r]={exports:{}};return e[r].call(s.exports,s,s.exports,o),s.exports}(0)})();