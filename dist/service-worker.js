if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let c={};const l=e=>i(e,o),u={module:{uri:o},exports:c,require:l};s[o]=Promise.all(n.map((e=>u[e]||l(e)))).then((e=>(r(...e),c)))}}define(["./workbox-6567b62a"],(function(e){"use strict";e.setCacheNameDetails({prefix:"fdpa-front-adm-v1"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/css/app.41f8ed1d.css",revision:null},{url:"/css/chunk-vendors.1588c5b5.css",revision:null},{url:"/img/logo-white.128699df.png",revision:null},{url:"/img/success.ce5fedbe.svg",revision:null},{url:"/img/success.svg",revision:"f7d605bb72c7669874c22069f7da0c91"},{url:"/index.html",revision:"cbe341f1815d5e830487daef6a19c7fb"},{url:"/js/app.c32fb56d.js",revision:null},{url:"/js/chunk-vendors.a4b10ae1.js",revision:null},{url:"/manifest.json",revision:"7e03f1a6eec6b89dada08aae320c5caf"},{url:"/robots.txt",revision:"735ab4f94fbcd57074377afca324c813"}],{})}));
//# sourceMappingURL=service-worker.js.map