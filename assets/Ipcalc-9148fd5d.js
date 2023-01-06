var K=Object.defineProperty;var Q=(p,n,o)=>n in p?K(p,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):p[n]=o;var N=(p,n,o)=>(Q(p,typeof n!="symbol"?n+"":n,o),o);import{u as W,i as Y}from"./action-0127191c.js";import{c as Z}from"./_commonjsHelpers-87174ba5.js";import{c as R}from"./radix-56f2acb1.js";import{A,as as V,o as D,p as w,aT as z,bi as tt,aA as $,be as et,x as a,bj as d,m as U,n as M,F as lt,aF as k,a$ as I,w as T}from"./history-91b4f808.js";import{_ as at}from"./_plugin-vue_export-helper-c27b6911.js";var H,E,S;(function(){var p,n,o,f,v,g,h,m;m=function(e){var t,s,i,u;return t=(e&255<<24)>>>24,s=(e&255<<16)>>>16,i=(e&255<<8)>>>8,u=e&255,[t,s,i,u].join(".")},h=function(e){var t,s,i,u,l,c;for(t=[],i=u=0;u<=3&&e.length!==0;i=++u){if(i>0){if(e[0]!==".")throw new Error("Invalid IP");e=e.substring(1)}c=n(e),l=c[0],s=c[1],e=e.substring(s),t.push(l)}if(e.length!==0)throw new Error("Invalid IP");switch(t.length){case 1:if(t[0]>4294967295)throw new Error("Invalid IP");return t[0]>>>0;case 2:if(t[0]>255||t[1]>16777215)throw new Error("Invalid IP");return(t[0]<<24|t[1])>>>0;case 3:if(t[0]>255||t[1]>255||t[2]>65535)throw new Error("Invalid IP");return(t[0]<<24|t[1]<<16|t[2])>>>0;case 4:if(t[0]>255||t[1]>255||t[2]>255||t[3]>255)throw new Error("Invalid IP");return(t[0]<<24|t[1]<<16|t[2]<<8|t[3])>>>0;default:throw new Error("Invalid IP")}},o=function(e){return e.charCodeAt(0)},f=o("0"),g=o("a"),v=o("A"),n=function(e){var t,s,i,u,l;for(u=0,t=10,s="9",i=0,e.length>1&&e[i]==="0"&&(e[i+1]==="x"||e[i+1]==="X"?(i+=2,t=16):"0"<=e[i+1]&&e[i+1]<="9"&&(i++,t=8,s="7")),l=i;i<e.length;){if("0"<=e[i]&&e[i]<=s)u=u*t+(o(e[i])-f)>>>0;else if(t===16)if("a"<=e[i]&&e[i]<="f")u=u*t+(10+o(e[i])-g)>>>0;else if("A"<=e[i]&&e[i]<="F")u=u*t+(10+o(e[i])-v)>>>0;else break;else break;if(u>4294967295)throw new Error("too large");i++}if(i===l)throw new Error("empty octet");return[u,i]},p=function(){function e(t,s){var i,u,l;if(typeof t!="string")throw new Error("Missing `net' parameter");if(s||(l=t.split("/",2),t=l[0],s=l[1]),s||(s=32),typeof s=="string"&&s.indexOf(".")>-1){try{this.maskLong=h(s)}catch{throw new Error("Invalid mask: "+s)}for(i=u=32;u>=0;i=--u)if(this.maskLong===4294967295<<32-i>>>0){this.bitmask=i;break}}else if(s||s===0)this.bitmask=parseInt(s,10),this.maskLong=0,this.bitmask>0&&(this.maskLong=4294967295<<32-this.bitmask>>>0);else throw new Error("Invalid mask: empty");try{this.netLong=(h(t)&this.maskLong)>>>0}catch{throw new Error("Invalid net address: "+t)}if(!(this.bitmask<=32))throw new Error("Invalid mask for ip4: "+s);this.size=Math.pow(2,32-this.bitmask),this.base=m(this.netLong),this.mask=m(this.maskLong),this.hostmask=m(~this.maskLong),this.first=this.bitmask<=30?m(this.netLong+1):this.base,this.last=this.bitmask<=30?m(this.netLong+this.size-2):m(this.netLong+this.size-1),this.broadcast=this.bitmask<=30?m(this.netLong+this.size-1):void 0}return e.prototype.contains=function(t){return typeof t=="string"&&(t.indexOf("/")>0||t.split(".").length!==4)&&(t=new e(t)),t instanceof e?this.contains(t.base)&&this.contains(t.broadcast||t.last):(h(t)&this.maskLong)>>>0===(this.netLong&this.maskLong)>>>0},e.prototype.next=function(t){return t==null&&(t=1),new e(m(this.netLong+this.size*t),this.mask)},e.prototype.forEach=function(t){var s,i,u;for(u=h(this.first),i=h(this.last),s=0;u<=i;)t(m(u),u,s),s++,u++},e.prototype.toString=function(){return this.base+"/"+this.bitmask},e}(),S=h,E=m,H=p}).call(Z);const j=p=>p.includes(".")&&p.substring(0,2).toUpperCase()==="0B"?b(p,10,2,"0b"):p,b=(p,n=10,o=10,f="")=>p.split(".").map(v=>(f&&v.length>f.length&&v.substring(0,f.length).toUpperCase()===f.toUpperCase()&&(v=v.substring(f.length)),v=v.replace(/\b(0+)/gi,"")||"0",n===o?`${v}`:`${R(v,o,n).padStart(n===2?8:n===8?4:2,"0").toUpperCase()}`)).join("."),it=p=>{if(isNaN(p)||p>4294967294||p<1)throw new Error("Available Size Invalid");let n=parseInt(`${Math.log(p)/Math.log(2)}`)+1;return Math.pow(2,n)-p<2&&(n+=1),32-n};class x{constructor(n="192.168.0.1",o="24"){N(this,"netmask");N(this,"ip","");!`${o}`.includes(".")&&parseInt(`${o}`,10)>32&&(o=E(parseInt(`${o}`,10))),n=j(n),o=j(o),this.netmask=new H(`${n}/${o}`),this.ip=`${E(S(n))}`}available(){return Math.max(this.netmask.size-2,0)}size(){return this.netmask.size}base(){return this.netmask.base}first(){return this.netmask.first}last(){return this.netmask.last}broadcast(){return this.netmask.broadcast||"-"}ipInfo(){return{ip:this.ip,long:`${S(this.ip)}`,ip2:b(this.ip,2),ip8:b(this.ip,8),ip16:b(this.ip,16)}}maskInfo(){const n=`${E(this.netmask.maskLong)}`;return{bit:`${this.netmask.bitmask}`,long:`${this.netmask.maskLong}`,mask:n,mask2:b(n,2),mask8:b(n,8),mask16:b(n,16),opposite:`${this.netmask.hostmask}`}}}const nt={class:"ctool-ipcalc-item-value"},ot={class:"ctool-ipcalc-item-title"},st=A({__name:"Item",props:{title:{type:String,default:""},value:{type:[String,Number],default:""}},setup(p){return(n,o)=>(V(),D("div",{style:{cursor:"pointer"},onClick:o[0]||(o[0]=f=>n.$copy(`${p.value}`)),class:"ctool-ipcalc-item"},[w("div",nt,z(p.value),1),w("div",ot,z(p.title),1)]))}});const r=at(st,[["__scopeId","data-v-c4e3a55f"]]),rt={style:{display:"grid","grid-template-columns":"1fr 1fr 1fr"}},ut={style:{display:"grid","grid-template-columns":"1fr 1fr 1fr 1fr"}},pt={style:{display:"grid","grid-template-columns":"1fr 1fr 1fr"}},ct={style:{display:"grid","grid-template-columns":"1fr 1fr 1fr"}},ft={style:{display:"grid","grid-template-columns":"8fr 8fr 10fr 10fr"}},gt=A({__name:"Ipcalc",async setup(p){let n,o;const f=W(([n,o]=tt(()=>Y({input:"192.168.0.1",mask:"24"},l=>/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(l))),n=await n,o(),n));let v=$(!1),g=$(!1),h=$(254),m=$(""),e=$(new x),t=$(""),s=$(!1);const i=()=>{t.value="",e.value.netmask.forEach((l,c,F)=>{t.value=`${t.value?t.value+`
`:""}${F+1}: ${l}`}),s.value=!0},u=()=>{f.current.mask=`${it(h.value)}`,g.value=!1};return et(()=>({input:f.current.input,mask:f.current.mask}),({input:l,mask:c})=>{m.value="";try{e.value=new x(l,c),f.save()}catch(F){m.value=$error(F)}},{immediate:!0}),(l,c)=>{const F=k("Input"),O=k("Icon"),B=k("Button"),P=k("HelpTip"),L=k("Align"),y=k("Card"),G=k("Exception"),X=k("HeightResize"),C=k("Modal"),q=k("InputNumber"),J=k("Textarea");return V(),D(lt,null,[a(L,{horizontal:"center",class:"ctool-page-option",bottom:"default"},{default:d(()=>[a(F,{size:"large",width:300,modelValue:I(f).current.input,"onUpdate:modelValue":c[0]||(c[0]=_=>I(f).current.input=_),label:l.$t("ipcalc_ip")},null,8,["modelValue","label"]),a(F,{size:"large",width:280,modelValue:I(f).current.mask,"onUpdate:modelValue":c[2]||(c[2]=_=>I(f).current.mask=_),label:l.$t("ipcalc_mask")},{append:d(()=>[a(B,{onClick:c[1]||(c[1]=_=>g.value=!0)},{default:d(()=>[a(O,{hover:"",name:"setting",tooltip:l.$t("ipcalc_mask_set_title")},null,8,["tooltip"])]),_:1})]),_:1},8,["modelValue","label"]),a(P,{onClick:c[3]||(c[3]=_=>v.value=!0),text:l.$t("ipcalc_format")},null,8,["text"])]),_:1}),m.value===""?(V(),U(L,{key:0,direction:"vertical"},{default:d(()=>[a(y,{title:l.$t("ipcalc_ip_info"),padding:"0"},{extra:d(()=>[T(z(I(f).current.input),1)]),default:d(()=>[w("div",rt,[a(r,{title:l.$t("ipcalc_ip_info_ip10"),value:e.value.ipInfo().ip},null,8,["title","value"]),a(r,{title:l.$t("ipcalc_ip_info_long"),value:e.value.ipInfo().long},null,8,["title","value"]),a(r,{title:l.$t("ipcalc_ip_info_ip8"),value:e.value.ipInfo().ip8},null,8,["title","value"]),a(r,{title:l.$t("ipcalc_ip_info_ip16"),value:e.value.ipInfo().ip16},null,8,["title","value"]),a(r,{title:l.$t("ipcalc_ip_info_ip2"),value:e.value.ipInfo().ip2,style:{"grid-column-start":"2","grid-column-end":"4"}},null,8,["title","value"])])]),_:1},8,["title"]),a(y,{title:l.$t("ipcalc_mask_info"),padding:"0"},{extra:d(()=>[T(z(I(f).current.mask),1)]),default:d(()=>[w("div",ut,[a(r,{title:l.$t("ipcalc_mask"),value:e.value.maskInfo().bit},null,8,["title","value"]),a(r,{title:l.$t("ipcalc_mask_info_mask"),value:e.value.maskInfo().mask},null,8,["title","value"]),a(r,{title:l.$t("ipcalc_mask_info_long"),value:e.value.maskInfo().long},null,8,["title","value"]),a(r,{title:l.$t("ipcalc_mask_info_opposite"),value:e.value.maskInfo().opposite},null,8,["title","value"]),a(r,{title:l.$t("ipcalc_mask_info_mask8"),value:e.value.maskInfo().mask8},null,8,["title","value"]),a(r,{title:l.$t("ipcalc_mask_info_mask16"),value:e.value.maskInfo().mask16},null,8,["title","value"]),a(r,{title:l.$t("ipcalc_mask_info_mask2"),value:e.value.maskInfo().mask2,style:{"grid-column-start":"3","grid-column-end":"5"}},null,8,["title","value"])])]),_:1},8,["title"]),a(y,{title:l.$t("ipcalc_network_info"),padding:"0"},{extra:d(()=>[a(B,{type:"primary",size:"small",text:l.$t("ipcalc_network_export"),onClick:i},null,8,["text"])]),default:d(()=>[w("div",pt,[a(r,{title:l.$t("ipcalc_network_info_available"),value:e.value.available()},null,8,["title","value"]),a(r,{title:l.$t("ipcalc_network_info_size"),value:e.value.size()},null,8,["title","value"]),a(r,{title:l.$t("ipcalc_network_info_base"),value:e.value.base()},null,8,["title","value"]),a(r,{title:l.$t("ipcalc_network_info_first"),value:e.value.first()},null,8,["title","value"]),a(r,{title:l.$t("ipcalc_network_info_last"),value:e.value.last()},null,8,["title","value"]),a(r,{title:l.$t("ipcalc_network_info_broadcast"),value:e.value.broadcast()},null,8,["title","value"])])]),_:1},8,["title"])]),_:1})):M("",!0),m.value!==""?(V(),U(X,{key:1,append:[".ctool-page-option"]},{default:d(()=>[a(G,{content:m.value},null,8,["content"])]),_:1},8,["append"])):M("",!0),a(C,{title:l.$t("ipcalc_format"),modelValue:v.value,"onUpdate:modelValue":c[4]||(c[4]=_=>v.value=_),width:"98%","footer-type":"normal"},{default:d(()=>[a(L,{direction:"vertical"},{default:d(()=>[a(y,{title:l.$t("ipcalc_ip"),padding:"0"},{default:d(()=>[w("div",ct,[a(r,{title:l.$t("ipcalc_ip_info_ip10"),value:"192.168.0.1"},null,8,["title"]),a(r,{title:l.$t("ipcalc_ip_info_long"),value:"3232235521"},null,8,["title"]),a(r,{title:l.$t("ipcalc_ip_info_ip8"),value:"0300.0250.0000.0001"},null,8,["title"]),a(r,{title:l.$t("ipcalc_ip_info_ip16"),value:"0xC0.0xA8.0x00.0x01"},null,8,["title"]),a(r,{title:l.$t("ipcalc_ip_info_ip2"),value:"0b11000000.0b10101000.0b00000000.0b00000001",style:{"grid-column-start":"2","grid-column-end":"4"}},null,8,["title"])])]),_:1},8,["title"]),a(y,{title:l.$t("ipcalc_mask"),padding:"0"},{default:d(()=>[w("div",ft,[a(r,{title:l.$t("ipcalc_mask"),value:"24"},null,8,["title"]),a(r,{title:l.$t("ipcalc_mask_info_long"),value:"4294967040"},null,8,["title"]),a(r,{title:l.$t("ipcalc_mask_info_mask16"),value:"0xFF.0xFF.0xFF.0x00"},null,8,["title"]),a(r,{title:l.$t("ipcalc_mask_info_mask8"),value:"0377.0377.0377.0000"},null,8,["title"]),a(r,{title:l.$t("ipcalc_mask_info_mask"),value:"255.255.255.0"},null,8,["title"]),a(r,{title:l.$t("ipcalc_mask_info_mask2"),value:"0b11111111.0b11111111.0b11111111.0b00000000",style:{"grid-column-start":"2","grid-column-end":"5"}},null,8,["title"])])]),_:1},8,["title"])]),_:1})]),_:1},8,["title","modelValue"]),a(C,{title:l.$t("ipcalc_mask_set_title"),modelValue:g.value,"onUpdate:modelValue":c[6]||(c[6]=_=>g.value=_),"footer-type":"long",onOk:u},{default:d(()=>[a(q,{size:"large",modelValue:h.value,"onUpdate:modelValue":c[5]||(c[5]=_=>h.value=_),label:l.$t("ipcalc_network_info_available")},null,8,["modelValue","label"])]),_:1},8,["title","modelValue"]),a(C,{modelValue:s.value,"onUpdate:modelValue":c[7]||(c[7]=_=>s.value=_),"footer-type":"none"},{default:d(()=>[a(J,{height:300,"model-value":t.value,copy:""},null,8,["model-value"])]),_:1},8,["modelValue"])],64)}}});export{gt as default};