!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}({"../src/localstorage.js":
/*!******************************!*\
  !*** ../src/localstorage.js ***!
  \******************************/
/*! no static exports found */function(e,t){const o={options:{cacheTime:86400,cacheTimetKey:"",cacheKey:""},cacheTime:function(){let e=this,t={setKey:function(){let t=e.options.cacheKey?e.options.cacheKey+"_cacheTime":"";t&&(e.options.cacheTimetKey=t)},getKey:function(){return e.options.cacheTimetKey},get:function(){let t=localStorage.getItem(e.options.cacheTimetKey);return t||this.set()},set:function(){return localStorage.setItem(e.options.cacheTimetKey,(new Date).getTime()+e.options.cacheTime)},purge:function(){localStorage.removeItem(e.options.cacheTimetKey)}};return t.setKey(),t},shouldUpdateStorage:function(e){return!this.get(e)||(!this.cacheTime().get()||this.cacheTime().get()<(new Date).getTime())},update:function(e,t){this.options.cacheKey=e||!1,localStorage.setItem(this.cacheTime().getKey(),(new Date).getTime()+this.options.cacheTime),localStorage.setItem(e,JSON.stringify(t))},get:function(e){return this.options.cacheKey=e||!1,JSON.parse(localStorage.getItem(this.options.cacheKey))},purge:function(e){localStorage.removeItem(e),this.cacheTime().purge()}};e.exports=o},"./src/fetchData.js":
/*!**************************!*\
  !*** ./src/fetchData.js ***!
  \**************************/
/*! no static exports found */function(e,t,o){var n=o(/*! ../../src/localstorage.js */"../src/localstorage.js");n.options.cacheTime=18e3;var r=async e=>new Promise(function(t,o){var n=new XMLHttpRequest;n.open("GET","https://jsonplaceholder.typicode.com/"+e),n.onload=function(){if(this.status>=200&&this.status<300){let o=JSON.parse(n.response);a(o,e),t(o)}},n.send()}),a=(e,t)=>{e&&t&&n.update("lsHandle_example_"+t,e)};document.addEventListener("DOMContentLoaded",function(e){var t=performance.now();new Promise((e,t)=>{var o=(async()=>{for(var e=[],t=["photos","posts","comments"],o=!1,a=0;a<t.length;a++){var c=t[a],s="lsHandle_example_"+c;n.shouldUpdateStorage(s)?e[c]=await r(c):(o=!0,e[c]=n.get(s))}return e.loadedFromCache=o,e.options=n.options,e})();o&&e(o)}).then(e=>{console.log(e);var o=performance.now();console.log("Der Aufruf von getData dauerte "+(o-t)+" ms.")})})},"./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */function(e,t,o){o(/*! ./fetchData.js */"./src/fetchData.js"),o(/*! ./mediaplayer.js */"./src/mediaplayer.js")},"./src/mediaplayer.js":
/*!****************************!*\
  !*** ./src/mediaplayer.js ***!
  \****************************/
/*! no static exports found */function(e,t,o){o(/*! ../../src/localstorage.js */"../src/localstorage.js");let n=()=>{let e=this;return{options:{storage_key:"audio-play-storage",currentpos:0,selectors:{player:"#media-audio",playerControls:{startStop:"#play-pause-button",mute:"#mute-button",progressBar:"#progress-bar"}}},init:()=>{console.log(e.options)}}};document.addEventListener("DOMContentLoaded",function(e){console.log(n().init())})},0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */function(e,t,o){e.exports=o(/*! ./src/index.js */"./src/index.js")}});
//# sourceMappingURL=example.bundle.js.map