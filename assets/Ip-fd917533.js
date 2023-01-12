import{u as w,i as B}from"./action-c0645e21.js";import{b,S as _}from"./index-815f1273.js";import{a as E}from"./index-01831826.js";import{A as N,bi as O,aA as q,k as g,o as y,x as r,bj as l,aF as a,as as p,p as D,a$ as n,w as h,aT as v,n as x,m as I,bu as L}from"./history-cad96479.js";import"./___vite-browser-external_commonjs-proxy-d2112d3c.js";import"./_commonjsHelpers-87174ba5.js";import"./index-97821989.js";const R={style:{height:"100%",display:"flex","justify-content":"center","align-items":"center"}},T={style:{display:"grid","grid-template-columns":"1fr 80px","column-gap":"5px"}},U={key:0,style:{"text-align":"center"}},W=N({__name:"Ip",async setup(F){let s,c;const k=/((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/ig,e=w(([s,c]=O(()=>B({input:"",option:b("json"),result:""},{paste:t=>k.test(t)||t==="localhost"})),s=await s,c(),s));let d=q(!1);const u=g(()=>e.current.result===""?_.empty():_.formObject(e.current.result)),m=g(()=>!u.value.isEmpty()||u.value.isError()),V=()=>{e.current.input="localhost",f()},f=()=>{d.value=!0,E({url:"https://get.geojs.io/v1/ip/geo.json",params:e.current.input!=="localhost"?{ip:e.current.input}:{}}).then(({data:t})=>{e.current.result=L.isArray(t)&&t.length<2?t[0]:t,e.save()}).catch(t=>{e.current.result={error:$error(t,!1)},e.save()}).then(()=>{d.value=!1})};return(t,o)=>{const j=a("Input"),$=a("Display"),z=a("Button"),S=a("Link"),A=a("SerializeOutput"),C=a("Align");return p(),y("div",R,[r(C,{width:600,direction:"vertical"},{default:l(()=>[D("div",T,[r($,{type:"general",text:n(e).current.input===""?t.$t("ip_local"):"",onClick:V,position:"right-center"},{default:l(()=>[r(j,{modelValue:n(e).current.input,"onUpdate:modelValue":o[0]||(o[0]=i=>n(e).current.input=i),size:"large",placeholder:t.$t("ip_input")},null,8,["modelValue","placeholder"])]),_:1},8,["text"]),r(z,{type:"primary",loading:d.value,size:"large",onClick:f},{default:l(()=>[h(v(t.$t("ip_query")),1)]),_:1},8,["loading"])]),m.value?x("",!0):(p(),y("div",U,[r(S,{href:"https://geojs.io/"},{default:l(()=>[h(v(t.$t("ip_info_source"))+": https://geojs.io/",1)]),_:1})])),m.value?(p(),I(A,{key:1,allow:["json","xml","yaml","toml","php_array","properties","http_query_string"],content:u.value,height:300,modelValue:n(e).current.option,"onUpdate:modelValue":o[1]||(o[1]=i=>n(e).current.option=i),onSuccess:o[2]||(o[2]=i=>n(e).save())},null,8,["content","modelValue"])):x("",!0)]),_:1})])}}});export{W as default};