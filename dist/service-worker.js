if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let c={};const l=e=>i(e,o),u={module:{uri:o},exports:c,require:l};s[o]=Promise.all(n.map((e=>u[e]||l(e)))).then((e=>(r(...e),c)))}}define(["./workbox-2d118ab0"],(function(e){"use strict";e.setCacheNameDetails({prefix:"fdpa-front-adm-v1"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/css/app.0b369566.css",revision:null},{url:"/css/chunk-vendors.180ce890.css",revision:null},{url:"/img/logo-white.128699df.png",revision:null},{url:"/img/success.ce5fedbe.svg",revision:null},{url:"/img/success.svg",revision:"f7d605bb72c7669874c22069f7da0c91"},{url:"/index.html",revision:"9dbca46496b4765e22ddfd8ef3dea05f"},{url:"/js/app.3ee04b8c.js",revision:null},{url:"/js/chunk-vendors.68039d79.js",revision:null},{url:"/manifest.json",revision:"7e03f1a6eec6b89dada08aae320c5caf"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
