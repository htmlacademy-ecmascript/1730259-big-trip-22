(()=>{var t={10:(t,e,n)=>{"use strict";n.d(e,{Z:()=>o});var i=n(537),s=n.n(i),r=n(645),a=n.n(r)()(s());a.push([t.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]);const o=a},645:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",i=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),i&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),i&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,i,s,r){"string"==typeof t&&(t=[[null,t,void 0]]);var a={};if(i)for(var o=0;o<this.length;o++){var c=this[o][0];null!=c&&(a[c]=!0)}for(var l=0;l<t.length;l++){var d=[].concat(t[l]);i&&a[d[0]]||(void 0!==r&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=r),n&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=n):d[2]=n),s&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=s):d[4]="".concat(s)),e.push(d))}},e}},537:t=>{"use strict";t.exports=function(t){var e=t[1],n=t[3];if(!n)return e;if("function"==typeof btoa){var i=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),r="/*# ".concat(s," */");return[e].concat([r]).join("\n")}return[e].join("\n")}},484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",o="week",c="month",l="quarter",d="year",f="date",p="Invalid Date",u=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},v=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},b={s:v,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+v(i,2,"0")+":"+v(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(i,c),r=n-s<0,a=e.clone().add(i+(r?-1:1),c);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:d,w:o,d:a,D:f,h:r,m:s,s:i,ms:n,Q:l}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",_={};_[y]=m;var g=function(t){return t instanceof M},$=function t(e,n,i){var s;if(!e)return y;if("string"==typeof e){var r=e.toLowerCase();_[r]&&(s=r),n&&(_[r]=n,s=r);var a=e.split("-");if(!s&&a.length>1)return t(a[0])}else{var o=e.name;_[o]=e,s=o}return!i&&s&&(y=s),s||!i&&y},C=function(t,e){if(g(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new M(n)},w=b;w.l=$,w.i=g,w.w=function(t,e){return C(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var M=function(){function m(t){this.$L=$(t.locale,null,!0),this.parse(t)}var v=m.prototype;return v.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(w.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(u);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},v.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},v.$utils=function(){return w},v.isValid=function(){return!(this.$d.toString()===p)},v.isSame=function(t,e){var n=C(t);return this.startOf(e)<=n&&n<=this.endOf(e)},v.isAfter=function(t,e){return C(t)<this.startOf(e)},v.isBefore=function(t,e){return this.endOf(e)<C(t)},v.$g=function(t,e,n){return w.u(t)?this[e]:this.set(n,t)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(t,e){var n=this,l=!!w.u(e)||e,p=w.p(t),u=function(t,e){var i=w.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return l?i:i.endOf(a)},h=function(t,e){return w.w(n.toDate()[t].apply(n.toDate("s"),(l?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},m=this.$W,v=this.$M,b=this.$D,y="set"+(this.$u?"UTC":"");switch(p){case d:return l?u(1,0):u(31,11);case c:return l?u(1,v):u(0,v+1);case o:var _=this.$locale().weekStart||0,g=(m<_?m+7:m)-_;return u(l?b-g:b+(6-g),v);case a:case f:return h(y+"Hours",0);case r:return h(y+"Minutes",1);case s:return h(y+"Seconds",2);case i:return h(y+"Milliseconds",3);default:return this.clone()}},v.endOf=function(t){return this.startOf(t,!1)},v.$set=function(t,e){var o,l=w.p(t),p="set"+(this.$u?"UTC":""),u=(o={},o[a]=p+"Date",o[f]=p+"Date",o[c]=p+"Month",o[d]=p+"FullYear",o[r]=p+"Hours",o[s]=p+"Minutes",o[i]=p+"Seconds",o[n]=p+"Milliseconds",o)[l],h=l===a?this.$D+(e-this.$W):e;if(l===c||l===d){var m=this.clone().set(f,1);m.$d[u](h),m.init(),this.$d=m.set(f,Math.min(this.$D,m.daysInMonth())).$d}else u&&this.$d[u](h);return this.init(),this},v.set=function(t,e){return this.clone().$set(t,e)},v.get=function(t){return this[w.p(t)]()},v.add=function(n,l){var f,p=this;n=Number(n);var u=w.p(l),h=function(t){var e=C(p);return w.w(e.date(e.date()+Math.round(t*n)),p)};if(u===c)return this.set(c,this.$M+n);if(u===d)return this.set(d,this.$y+n);if(u===a)return h(1);if(u===o)return h(7);var m=(f={},f[s]=t,f[r]=e,f[i]=1e3,f)[u]||1,v=this.$d.getTime()+n*m;return w.w(v,this)},v.subtract=function(t,e){return this.add(-1*t,e)},v.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||p;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=w.z(this),r=this.$H,a=this.$m,o=this.$M,c=n.weekdays,l=n.months,d=function(t,n,s,r){return t&&(t[n]||t(e,i))||s[n].slice(0,r)},f=function(t){return w.s(r%12||12,t,"0")},u=n.meridiem||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:w.s(o+1,2,"0"),MMM:d(n.monthsShort,o,l,3),MMMM:d(l,o),D:this.$D,DD:w.s(this.$D,2,"0"),d:String(this.$W),dd:d(n.weekdaysMin,this.$W,c,2),ddd:d(n.weekdaysShort,this.$W,c,3),dddd:c[this.$W],H:String(r),HH:w.s(r,2,"0"),h:f(1),hh:f(2),a:u(r,a,!0),A:u(r,a,!1),m:String(a),mm:w.s(a,2,"0"),s:String(this.$s),ss:w.s(this.$s,2,"0"),SSS:w.s(this.$ms,3,"0"),Z:s};return i.replace(h,(function(t,e){return e||m[t]||s.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(n,f,p){var u,h=w.p(f),m=C(n),v=(m.utcOffset()-this.utcOffset())*t,b=this-m,y=w.m(this,m);return y=(u={},u[d]=y/12,u[c]=y,u[l]=y/3,u[o]=(b-v)/6048e5,u[a]=(b-v)/864e5,u[r]=b/e,u[s]=b/t,u[i]=b/1e3,u)[h]||b,p?y:w.a(y)},v.daysInMonth=function(){return this.endOf(c).$D},v.$locale=function(){return _[this.$L]},v.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=$(t,e,!0);return i&&(n.$L=i),n},v.clone=function(){return w.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},m}(),k=M.prototype;return C.prototype=k,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",c],["$y",d],["$D",f]].forEach((function(t){k[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),C.extend=function(t,e){return t.$i||(t(e,M,C),t.$i=!0),C},C.locale=$,C.isDayjs=g,C.unix=function(t){return C(1e3*t)},C.en=_[y],C.Ls=_,C.p={},C}()},212:function(t){t.exports=function(){"use strict";return function(t,e){e.prototype.isSameOrAfter=function(t,e){return this.isSame(t,e)||this.isAfter(t,e)}}}()},412:function(t){t.exports=function(){"use strict";return function(t,e){e.prototype.isSameOrBefore=function(t,e){return this.isSame(t,e)||this.isBefore(t,e)}}}()},181:function(t){t.exports=function(){"use strict";return function(t,e,n){var i=function(t,e){if(!e||!e.length||!e[0]||1===e.length&&!e[0].length)return null;var n;1===e.length&&e[0].length>0&&(e=e[0]),n=e[0];for(var i=1;i<e.length;i+=1)e[i].isValid()&&!e[i][t](n)||(n=e[i]);return n};n.max=function(){var t=[].slice.call(arguments,0);return i("isAfter",t)},n.min=function(){var t=[].slice.call(arguments,0);return i("isBefore",t)}}}()},379:t=>{"use strict";var e=[];function n(t){for(var n=-1,i=0;i<e.length;i++)if(e[i].identifier===t){n=i;break}return n}function i(t,i){for(var r={},a=[],o=0;o<t.length;o++){var c=t[o],l=i.base?c[0]+i.base:c[0],d=r[l]||0,f="".concat(l," ").concat(d);r[l]=d+1;var p=n(f),u={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==p)e[p].references++,e[p].updater(u);else{var h=s(u,i);i.byIndex=o,e.splice(o,0,{identifier:f,updater:h,references:1})}a.push(f)}return a}function s(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,s){var r=i(t=t||[],s=s||{});return function(t){t=t||[];for(var a=0;a<r.length;a++){var o=n(r[a]);e[o].references--}for(var c=i(t,s),l=0;l<r.length;l++){var d=n(r[l]);0===e[d].references&&(e[d].updater(),e.splice(d,1))}r=c}}},569:t=>{"use strict";var e={};t.exports=function(t,n){var i=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}},216:t=>{"use strict";t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,n)=>{"use strict";t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:t=>{"use strict";t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var i="";n.supports&&(i+="@supports (".concat(n.supports,") {")),n.media&&(i+="@media ".concat(n.media," {"));var s=void 0!==n.layer;s&&(i+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),i+=n.css,s&&(i+="}"),n.media&&(i+="}"),n.supports&&(i+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleTagTransform(i,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{"use strict";t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={id:i,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nc=void 0,(()=>{"use strict";const t=[{id:"b30d0ee1-77d2-447d-8f7f-ca476464b960",description:"Paris - a perfect place to stay with a family",name:"Paris",pictures:[]},{id:"81dda4a1-5997-475b-b37e-b7f79b56acc1",description:"Venice - with an embankment of a mighty river as a centre of attraction",name:"Venice",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/15.jpg",description:"Venice full of of cozy canteens where you can try the best coffee in the Middle East"},{src:"https://22.objects.htmlacademy.pro/static/destinations/11.jpg",description:"Venice is a beautiful city"},{src:"https://22.objects.htmlacademy.pro/static/destinations/7.jpg",description:"Venice with a beautiful old town"}]},{id:"a82fae47-4716-43a0-b620-5527d5d60758",description:"Hiroshima - in a middle of Europe",name:"Hiroshima",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/19.jpg",description:"Hiroshima with a beautiful old town"}]},{id:"ac7789b7-d549-43a7-b082-e58168bc6cb3",description:"Rome - with crowded streets",name:"Rome",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/8.jpg",description:"Rome with crowded streets"},{src:"https://22.objects.htmlacademy.pro/static/destinations/7.jpg",description:"Rome with an embankment of a mighty river as a centre of attraction"}]},{id:"8d918a87-177b-4333-bcda-670dab018496",description:"",name:"Chamonix",pictures:[]},{id:"8b575c07-33ad-4344-97f8-a20a5f91f336",description:"Chamonix - with an embankment of a mighty river as a centre of attraction",name:"Kioto",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/10.jpg",description:"Chamonix a perfect place to stay with a family"}]},{id:"fd9d7a4c-fb5a-4fd5-95e4-d50deb29f50f",description:"Oslo - in a middle of Europe",name:"Oslo",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/6.jpg",description:"Oslo a perfect place to stay with a family"},{src:"https://22.objects.htmlacademy.pro/static/destinations/13.jpg",description:"Oslo famous for its crowded street markets with the best street food in Asia"},{src:"https://22.objects.htmlacademy.pro/static/destinations/16.jpg",description:"Oslo with crowded streets"},{src:"https://22.objects.htmlacademy.pro/static/destinations/19.jpg",description:"Oslo a perfect place to stay with a family"}]},{id:"15f6fffa-48e1-42fc-92c1-4f96253860eb",description:"Geneva - in a middle of Europe",name:"Geneva",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/9.jpg",description:"Geneva full of of cozy canteens where you can try the best coffee in the Middle East"},{src:"https://22.objects.htmlacademy.pro/static/destinations/9.jpg",description:"Geneva full of of cozy canteens where you can try the best coffee in the Middle East"},{src:"https://22.objects.htmlacademy.pro/static/destinations/2.jpg",description:"Geneva with a beautiful old town"},{src:"https://22.objects.htmlacademy.pro/static/destinations/11.jpg",description:"Geneva famous for its crowded street markets with the best street food in Asia"},{src:"https://22.objects.htmlacademy.pro/static/destinations/13.jpg",description:"Geneva in a middle of Europe"}]},{id:"57463106-aea1-4e48-9444-62c980b56484",description:"Sochi - a perfect place to stay with a family",name:"Sochi",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/2.jpg",description:"Sochi a perfect place to stay with a family"}]},{id:"9dede120-f5d3-4e99-99ad-df12a2268571",description:"",name:"Tokio",pictures:[]}],e=[{type:"taxi",offers:[{id:"58f27849-c4f9-42e5-88ab-48267d282369",title:"Upgrade to a business class",price:175},{id:"5df4f3e4-f677-4318-a3f5-458b16f30969",title:"Choose the radio station",price:40},{id:"cde29377-f0d4-4626-949a-ab5709a2ad55",title:"Choose temperature",price:40},{id:"009ed2cd-714f-4ce2-aae1-7e85683eeedf",title:"Drive quickly, I'm in a hurry",price:97},{id:"effb2e14-3447-497b-a5bb-113083704bbd",title:"Drive slowly",price:67}]},{type:"bus",offers:[{id:"cafbbdd8-6dea-432f-bb37-f6b8ae635ae4",title:"Infotainment system",price:182},{id:"b371fb66-c631-4bca-b1f8-f80f48692674",title:"Order meal",price:126},{id:"bbc01c4e-2318-426b-bfef-6af93548e45c",title:"Choose seats",price:45}]},{type:"train",offers:[{id:"525b9ce2-5919-4039-9495-2a931663302a",title:"Book a taxi at the arrival point",price:178},{id:"cc002a26-9f8b-478f-b5e2-7dc4faa57b4c",title:"Order a breakfast",price:33},{id:"4305666f-a227-4a63-a600-9856bd1a5639",title:"Wake up at a certain time",price:53}]},{type:"flight",offers:[{id:"e68cd6be-f967-438b-b6c1-15a007daca30",title:"Choose meal",price:199},{id:"f859f23c-2dee-4a6c-8c72-4ec659562db6",title:"Choose seats",price:117},{id:"512e3870-1beb-469c-9cee-bf783820c0c6",title:"Upgrade to comfort class",price:91},{id:"98c665ca-d858-4a99-94ab-4f202344a3c8",title:"Upgrade to business class",price:173},{id:"d85ef0fe-e0c0-484b-a07e-5c6c3619fc46",title:"Add luggage",price:184},{id:"1c5b2003-4d91-4ea9-9cdb-5061f3610785",title:"Business lounge",price:200}]},{type:"check-in",offers:[{id:"5d04657e-be30-4db7-b3ea-e961c94ceed4",title:"Choose the time of check-in",price:198},{id:"fcb41394-879a-4de4-afa7-a4ca4a0288c7",title:"Choose the time of check-out",price:189},{id:"a899dc84-65a1-413b-a3f6-697e0d62a2af",title:"Add breakfast",price:56},{id:"bf3adb23-ca52-4725-90dd-c408a87a1d95",title:"Laundry",price:168},{id:"5a3581b3-bb76-42e9-976c-92af11b21d06",title:"Order a meal from the restaurant",price:36}]},{type:"sightseeing",offers:[]},{type:"ship",offers:[]},{type:"drive",offers:[{id:"e6ae2c76-a259-4de0-b816-189d0324c821",title:"With automatic transmission",price:163},{id:"8b5bf11e-995b-48ef-9261-0ba6b3cf1b9f",title:"With air conditioning",price:103}]},{type:"restaurant",offers:[{id:"856d9ea4-7560-4ca7-9133-9c8591dffdbe",title:"Choose live music",price:55},{id:"a3470ca1-9e12-4fb2-a57d-3472911ab61a",title:"Choose VIP area",price:43}]}];var i=n(484),s=n.n(i);const r="D MMM",a="MMM DD",o="HH:mm",c="DD/MM/YY[&nbsp;]HH:mm",l="mm[M]",d="HH[H] mm[M]",f="DD[D] HH[H] mm[M]",p="everything",u="future",h="present",m="past",v={[p]:"Click New Event to create your first point",[m]:"There are no past events now",[h]:"There are no present events now",[u]:"There are no future events now",load:"Loading...","Failed to load":"Failed to load latest route information"},b=["day","event","time","price","offers"],y=b[0],_=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],g={id:"",basePrice:0,dateFrom:s()(),dateTo:s()(),destination:"",isFavorite:!1,offers:"",type:"flight"},$="default",C="editing";function w(t){const e=Math.floor(Math.random()*(t-0+1)+0).toFixed(0);return Number(e)}const M=(t,e)=>t.find((t=>t.type===e));function k(t,e){return Array.isArray(e)?t.filter((t=>e.find((e=>t.id===e)))):t.find((t=>t.id===e))}const S=[{id:"1d633166-6a3b-4e7d-9273-34b02554719d",basePrice:w(1e4),dateFrom:"2024-01-23T01:15:05.048Z",dateTo:"2024-01-23T22:41:05.048Z",destination:"8d918a87-177b-4333-bcda-670dab018496",isFavorite:!!w(1),offers:["58f27849-c4f9-42e5-88ab-48267d282369","5df4f3e4-f677-4318-a3f5-458b16f30969","cde29377-f0d4-4626-949a-ab5709a2ad55","effb2e14-3447-497b-a5bb-113083704bbd"],type:"taxi"},{id:"c5aa3f40-f37a-4165-a2be-1d14d921b96c",basePrice:w(1e4),dateFrom:"2024-01-26T03:14:05.048Z",dateTo:"2024-01-27T02:38:05.048Z",destination:"fd9d7a4c-fb5a-4fd5-95e4-d50deb29f50f",isFavorite:!!w(1),offers:["cafbbdd8-6dea-432f-bb37-f6b8ae635ae4","b371fb66-c631-4bca-b1f8-f80f48692674"],type:"bus"},{id:"cd36dec2-a391-47c5-b938-6b7db8f3b4d0",basePrice:w(1e4),dateFrom:"2024-01-27T19:49:05.048Z",dateTo:"2024-01-29T04:35:05.048Z",destination:"57463106-aea1-4e48-9444-62c980b56484",isFavorite:!!w(1),offers:["055ba681-0802-460d-8b60-9d222286bd59"],type:"ship"},{id:"7de4a7d9-6b82-4dfc-9457-5b0080e0d212",basePrice:w(1e4),dateFrom:"2024-02-01T22:56:05.048Z",dateTo:"2024-02-03T13:29:05.048Z",destination:"9dede120-f5d3-4e99-99ad-df12a2268571",isFavorite:!!w(1),offers:[],type:"sightseeing"}];var E=n(379),D=n.n(E),A=n(795),x=n.n(A),T=n(569),j=n.n(T),F=n(565),O=n.n(F),L=n(216),P=n.n(L),H=n(589),B=n.n(H),I=n(10),V={};V.styleTagTransform=B(),V.setAttributes=O(),V.insert=j().bind(null,"head"),V.domAPI=x(),V.insertStyleElement=P(),D()(I.Z,V),I.Z&&I.Z.locals&&I.Z.locals;const Z="shake";class R{#t=null;constructor(){if(new.target===R)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#t||(this.#t=function(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}(this.template)),this.#t}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#t=null}shake(t){this.element.classList.add(Z),setTimeout((()=>{this.element.classList.remove(Z),t?.()}),600)}}function Y(t,e,n="beforeend"){if(!(t instanceof R))throw new Error("Can render only components");if(null===e)throw new Error("Container element doesn't exist");e.insertAdjacentElement(n,t.element)}function q(t,e){if(!(t instanceof R&&e instanceof R))throw new Error("Can replace only components");const n=t.element,i=e.element,s=i.parentElement;if(null===s)throw new Error("Parent element doesn't exist");s.replaceChild(n,i)}function W(t){if(null!==t){if(!(t instanceof R))throw new Error("Can remove only components");t.element.remove(),t.removeElement()}}class U extends R{#e=null;constructor({messageType:t}){super(),this.#e=t}get template(){return t=this.#e,`<p class="trip-events__msg">${v[t]}</p>`;var t}}class N extends R{get template(){return'<ul class="trip-events__list"></ul>'}}class z extends R{get template(){return`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n      ${b.map((t=>{return`<div class="trip-sort__item  trip-sort__item--${e=t}">\n      <input id="sort-${e}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${e}" ${y===e?"checked":""}>\n      <label class="trip-sort__btn" for="sort-${e}">${e}</label>\n    </div>`;var e})).join("")}\n    </form>`}}var G=n(181),J=n.n(G),X=n(412),K=n.n(X),Q=n(212),tt=n.n(Q);function et(t,e){return t?s()(t).format(e):""}s().extend(J()),s().extend(K()),s().extend(tt());class nt extends R{#n=null;#i=null;#s=null;#r=null;#a=null;constructor({point:t=g,offers:e,destinations:n,onRollupButtonClick:i,onFormSubmit:s}){super(),this.#n=t,this.#i=e,this.#s=n,this.#r=s,this.#a=i,this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#o),this.element.querySelector("form").addEventListener("submit",this.#c)}#c=t=>{t.preventDefault(),this.#r(this.#n)};#o=t=>{t.preventDefault(),this.#a()};get template(){return function(t,e,n){const{id:i,type:s,dateFrom:r,dateTo:a,basePrice:o,offers:l,destination:d}=t,f=M(e,s),p=k(n,d),{name:u}=p||{name:""};return`\n      <li class="trip-events__item">\n        <form class="event event--edit" action="#" method="post">\n          <header class="event__header">\n            <div class="event__type-wrapper">\n              <label class="event__type  event__type-btn" for="event-type-toggle-${i}">\n                <span class="visually-hidden">Choose event type</span>\n                <img class="event__type-icon" width="17" height="17" src="img/icons/${s}.png" alt="Event type icon">\n              </label>\n              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${i}" type="checkbox">\n\n              <div class="event__type-list">\n                <fieldset class="event__type-group">\n                  <legend class="visually-hidden">Event type</legend>\n\n                  ${_.map((t=>function(t,e,n){return`<div class="event__type-item">\n      <input id="event-type-${t}-${n}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t}" ${e===t&&"checked"}>\n      <label class="event__type-label  event__type-label--${t}" for="event-type-${t}-${n}">${(t=>t.charAt(0).toUpperCase()+t.substring(1))(t)}</label>\n    </div>`}(t,s,i))).join("")}\n                </fieldset>\n              </div>\n            </div>\n\n            <div class="event__field-group  event__field-group--destination">\n              <label class="event__label  event__type-output" for="event-destination-${i}">\n                ${s}\n              </label>\n              <input class="event__input  event__input--destination" id="event-destination-${i}" type="text" name="event-destination" value='${u}' list="destination-list-${i}">\n              <datalist id="destination-list-${i}">\n                ${n.map((t=>`<option value=${t.name}></option>`))}\n              </datalist>\n            </div>\n\n            <div class="event__field-group  event__field-group--time">\n              <label class="visually-hidden" for="event-start-time-${i}">From</label>\n              <input class="event__input  event__input--time" id="event-start-time-${i}" type="text" name="event-start-time" value=${et(r,c)}>\n              &mdash;\n              <label class="visually-hidden" for="event-end-time-${i}">To</label>\n              <input class="event__input  event__input--time" id="event-end-time-${i}" type="text" name="event-end-time" value=${et(a,c)}>\n            </div>\n\n            <div class="event__field-group  event__field-group--price">\n              <label class="event__label" for="event-price-${i}">\n                <span class="visually-hidden">Price</span>\n                &euro;\n              </label>\n              <input class="event__input  event__input--price" id="event-price-${i}" type="text" name="event-price" value=${o}>\n            </div>\n\n            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n            <button class="event__reset-btn" type="reset">Delete</button>\n            <button class="event__rollup-btn" type="button">\n              <span class="visually-hidden">Open event</span>\n            </button>\n          </header>\n          ${function({offers:t},e,{description:n,pictures:i}){return t.length>0||n.length>0||i.length>0?`<section class="event__details">\n        ${function(t,e){return 0!==t.length?`<section class="event__section  event__section--offers">\n        <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n        <div class="event__available-offers">\n          ${t.map((t=>function(t,e){const{id:n,title:i,price:s}=t;return`<div class="event__offer-selector">\n      <input class="event__offer-checkbox  visually-hidden" id=${n} type="checkbox" name=${n} ${!!e.includes(n)&&"checked"}>\n      <label class="event__offer-label" for=${n}>\n        <span class="event__offer-title">${i}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${s}</span>\n      </label>\n    </div>`}(t,e))).join("")}\n        </div>\n      </section>`:""}(t,e)}\n        ${function(t,e){return t.length>0||e.length>0?`<section class="event__section  event__section--destination">\n        <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n        <p class="event__destination-description">${t}</p>\n        ${function(t){return t.length>0?`<div class="event__photos-container">\n        <div class="event__photos-tape">\n          ${t.map((t=>function(t){const{src:e,description:n}=t;return`<img class="event__photo" src=${e} alt=${n}>`}(t))).join("")}\n        </div>\n      </div>`:""}(e)}\n      </section>`:""}(n,i)}\n      </section>`:""}(f,l,p)}\n        </form>\n      </li>\n    `}(this.#n,this.#i,this.#s)}}class it extends R{#n=null;#i=null;#s=null;#l=null;#d=null;constructor({point:t,offers:e,destinations:n,onFavoritClick:i,onEditClick:s}){super(),this.#n=t,this.#i=e,this.#s=n,this.#d=i,this.#l=s,this.element.querySelector(".event__favorite-btn").addEventListener("click",this.#f),this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#p)}#f=t=>{t.preventDefault(),this.#d()};#p=t=>{t.preventDefault(),this.#l()};get template(){return function(t,e,n){const{type:i,dateFrom:r,dateTo:c,isFavorite:p,basePrice:u,offers:h,destination:m}=t,v=k(n,m),{name:b}=v,y=k(M(e,i).offers,h);return`\n      <li class="trip-events__item">\n        <div class="event">\n          <time class="event__date" datetime=${r}>${et(r,a)}</time>\n          <div class="event__type">\n            <img class="event__type-icon" width="42" height="42" src="img/icons/${i}.png" alt="Event type icon">\n          </div>\n          <h3 class="event__title">${i} ${b}</h3>\n          <div class="event__schedule">\n            <p class="event__time">\n              <time class="event__start-time" datetime=${r}>${et(r,o)}</time>\n              &mdash;\n              <time class="event__end-time" datetime=${c}>${et(c,o)}</time>\n            </p>\n            <p class="event__duration">${function(t,e){const n=s()(e).diff(t)/6e4;switch(n){case n<60:return s()(n).format(l);case n>60&&n<1440:return s()(n).format(d);default:return s()(n).format(f)}}(r,c)}</p>\n          </div>\n          <p class="event__price">\n            &euro;&nbsp;<span class="event__price-value">${u}</span>\n          </p>\n          <h4 class="visually-hidden">Offers:</h4>\n          <ul class="event__selected-offers">\n            ${y.map((t=>function({title:t,price:e}){return`<li class="event__offer">\n        <span class="event__offer-title">${t}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${e}</span>\n    </li>`}(t))).join("")}\n          </ul>\n          <button class="event__favorite-btn ${p&&"event__favorite-btn--active"}" type="button">\n            <span class="visually-hidden">Add to favorite</span>\n            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n            </svg>\n          </button>\n          <button class="event__rollup-btn" type="button">\n            <span class="visually-hidden">Open event</span>\n          </button>\n        </div>\n      </li>\n    `}(this.#n,this.#i,this.#s)}}class st{#u=null;#h=null;#m=null;#v=null;#b=null;#n=null;#i=null;#s=null;#y=$;constructor({pointListContainer:t,onDataChange:e,onModeChange:n}){this.#u=t,this.#v=e,this.#b=n}init(t,e,n){this.#n=t,this.#i=e,this.#s=n;const i=this.#h,s=this.#m;this.#h=new it({point:this.#n,offers:this.#i,destinations:this.#s,onFavoritClick:this.#_,onEditClick:this.#l}),this.#m=new nt({point:this.#n,offers:this.#i,destinations:this.#s,onRollupButtonClick:this.#g,onFormSubmit:this.#r}),null!==i&&null!==s?(this.#y===$&&q(this.#h,i),this.#y===C&&q(this.#m,s),W(i),W(s)):Y(this.#h,this.#u)}destroy(){W(this.#h),W(this.#m)}resetView(){this.#y!==$&&this.#$()}#C(){q(this.#m,this.#h),document.addEventListener("keydown",this.#w),this.#b(),this.#y=C}#$(){q(this.#h,this.#m),document.removeEventListener("keydown",this.#w),this.#y=$}#w=t=>{(t=>"Escape"===t.key)(t)&&(t.preventDefault(),this.#$())};#r=t=>{this.#v(t),this.#$()};#g=()=>{this.#$()};#l=()=>{this.#C()};#_=()=>{this.#v({...this.#n,isFavorite:!this.#n.isFavorite})}}class rt extends R{#M=null;constructor({filters:t}){super(),this.#M=t}get template(){return function(t){const e=t.map(((t,e)=>function(t,e){const{type:n,count:i}=t;return`<div class="trip-filters__filter">\n      <input id="filter-${n}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${n}"  ${e?"checked":""} ${0===i?"disabled":""}>\n      <label class="trip-filters__filter-label" for="filter-${n}">${n}</label>\n    </div>`}(t,0===e))).join("");return`<form class="trip-filters" action="#" method="get">\n      ${e}\n\n      <button class="visually-hidden" type="submit">Accept filter</button>\n    </form>`}(this.#M)}}function at(t,e,n){return`<section class="trip-main__trip-info  trip-info">\n        <div class="trip-info__main">\n          <h1 class="trip-info__title">${function(t,e){const n=((t,e)=>e&&e.length>0?[...new Set(e.map((e=>t.find((t=>e.destination===t.id)))).map((t=>t.name)))]:[...new Set(t.map((t=>t.name)))])(e,t);return n.length>3?`${n.at(0)} &mdash;...&mdash; ${n.at(-1)}`:n.join(" &mdash; ")}(t,n)}</h1>\n\n          <p class="trip-info__dates">${i=t,et(s().min(i.map((t=>s()(t.dateFrom)))),r)}&nbsp;&mdash;&nbsp;${(t=>et(s().max(t.map((t=>s()(t.dateTo)))),r))(t)}</p>\n        </div>\n\n        <p class="trip-info__cost">\n          Total: &euro;&nbsp;<span class="trip-info__cost-value">${((t,e)=>{const n=t.map((t=>t.basePrice)).reduce(((t,e)=>t+e),0),i=t.map((t=>t.offers)).flat(1/0);return n+e.map((t=>t.offers)).flat().filter((t=>i.find((e=>e===t.id)))).map((t=>t.price)).reduce(((t,e)=>t+e),0)})(t,e)}</span>\n        </p>\n      </section>`;var i}class ot extends R{constructor({points:t,offers:e,destinations:n}){super(),this.points=t,this.offers=e,this.destinations=n}get template(){return at(this.points,this.offers,this.destinations)}}const ct={[p]:t=>t,[u]:t=>t.filter((t=>{return(e=t.dateFrom)&&s()().isAfter(e);var e})),[h]:t=>t.filter((t=>{return e=t.dateFrom,n=t.dateTo,s()().isSameOrBefore(e)&&s()().isSameOrAfter(n);var e,n})),[m]:t=>t.filter((t=>{return(e=t.dateTo)&&s()().isBefore(e);var e}))},lt=document.querySelector(".page-header"),dt=lt.querySelector(".trip-main"),ft=lt.querySelector(".trip-controls__filters"),pt=document.querySelector(".page-main").querySelector(".trip-events"),ut=new class{#k=[];#i=[];#s=[];init(){this.#k=function(){const t=Array.from({length:0});for(;t.length<4;){const n=(e=S)[Math.floor(Math.random()*e.length)];t.includes(n)||t.push(n)}var e;return t}(),this.#i=e,this.#s=t}get points(){return this.#k}get offers(){return this.#i}get destinations(){return this.#s}};ut.init();const ht=(mt=ut.points,Object.entries(ct).map((([t,e])=>({type:t,count:e(mt).length}))));var mt;const vt=new class{#S=null;#E=null;constructor({infoContainer:t,pointModel:e}){this.#S=t,this.#E=e}init(){Y(new ot({points:this.#E.points,offers:this.#E.offers,destinations:this.#E.destinations}),this.#S,"afterbegin")}}({infoContainer:dt,pointModel:ut}),bt=new class{#D=null;#M=[];constructor({filterConteiner:t,filters:e}){this.#D=t,this.#M=e}init(){Y(new rt({filters:this.#M}),this.#D)}}({filterConteiner:ft,filters:ht}),yt=new class{#A=null;#E=null;#x=null;#T=new z;#j=new N;#F=[];#O=[];#L=[];#P=new Map;constructor({boardContainer:t,pointModel:e}){this.#A=t,this.#E=e}init(){this.#F=[...this.#E.points],this.#O=[...this.#E.offers],this.#L=[...this.#E.destinations],this.#H()}#B({point:t,offers:e,destinations:n}){const i=new st({pointListContainer:this.#j.element,onDataChange:this.#I,onModeChange:this.#b});i.init(t,e,n),this.#P.set(t.id,i)}#I=t=>{var e,n;this.#F=(e=this.#F,n=t,e.map((t=>t.id===n.id?n:t))),this.#P.get(t.id).init(t,this.#O,this.#L)};#b=()=>{this.#P.forEach((t=>t.resetView()))};#V(){Y(this.#T,this.#A)}#Z({message:t}){this.#x=new U({messageType:t}),Y(this.#x,this.#A)}#R(){this.#P.forEach((t=>t.destroy())),this.#P.clear()}#Y(){Y(this.#j,this.#A);for(let t=0;t<this.#F.length;t++)this.#B({point:this.#F[t],offers:this.#O,destinations:this.#L})}#H(){0!==this.#F.length?(this.#V(),this.#Y()):this.#Z({message:p})}}({boardContainer:pt,pointModel:ut});vt.init(),bt.init(),yt.init()})()})();
//# sourceMappingURL=bundle.559d16d7283ddd187717.js.map