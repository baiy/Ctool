import{u as C,i as w}from"./action-61e8d757.js";import{c as E,a as z,T as d}from"./index-4c022386.js";import{m as A,k as I,p as $,a as H}from"./cryptoJS-48f8ee02.js";import{A as S,bi as L,k as O,m as j,bj as r,aF as i,as as R,x as l,a$ as e}from"./history-fda1b5d3.js";import"./_commonjsHelpers-87174ba5.js";import"./index-b1ff2442.js";import"./shim-03580cdb.js";import"./index-bdc3fa98.js";import"./_commonjs-dynamic-modules-302442b1.js";import"./string_decoder-7fdcd1c7.js";import"./callBound-7203e6b7.js";import"./index-71a93be5.js";const Y=S({__name:"Encrypt",async setup(F){let p,m;const V={iv:"",type:"advanced",key:"",fill:!0,mode:"CBC",padding:"Pkcs7",key_size:"128"},t=C(([p,m]=L(()=>w({input:E("text"),option:V,output:z("base64")})),p=await p,m(),p)),_=O(()=>{if(t.current.input.text.isEmpty()||t.current.option.key===""||t.current.option.type==="advanced"&&t.current.option.mode!=="ECB"&&t.current.option.iv==="")return d.empty();if(t.current.input.text.isError())return t.current.input.text;try{if(!t.current.input.text.isText())throw new Error("input content must text / text file");return d.fromBase64(H.encrypt(t.current.input.text.toBase64(),t.current.option))}catch(u){return d.fromError($error(u))}}),f=()=>{t.save()};return(u,o)=>{const y=i("TextInput"),a=i("Select"),s=i("Input"),x=i("Bool"),k=i("Tooltip"),c=i("Align"),b=i("HelpTip"),g=i("Tabs"),T=i("TextOutput"),v=i("HeightResize");return R(),j(v,{ignore:"",append:[".ctool-page-option"],reduce:10},{default:r(({small:B,large:U})=>[l(c,{direction:"vertical"},{default:r(()=>[l(y,{modelValue:e(t).current.input,"onUpdate:modelValue":o[0]||(o[0]=n=>e(t).current.input=n),height:B,upload:"file",encoding:""},null,8,["modelValue","height"]),l(g,{modelValue:e(t).current.option.type,"onUpdate:modelValue":o[8]||(o[8]=n=>e(t).current.option.type=n),class:"ctool-page-option",lists:[{name:"advanced",label:u.$t("main_ui_advanced")},{name:"simple",label:u.$t("main_ui_simple")}]},{extra:r(()=>[l(b,{link:"https://github.com/brix/crypto-js"})]),default:r(()=>[l(c,null,{default:r(()=>[l(a,{modelValue:e(t).current.option.mode,"onUpdate:modelValue":o[1]||(o[1]=n=>e(t).current.option.mode=n),options:e(A)},null,8,["modelValue","options"]),l(a,{modelValue:e(t).current.option.key_size,"onUpdate:modelValue":o[2]||(o[2]=n=>e(t).current.option.key_size=n),options:e(I)},null,8,["modelValue","options"]),l(a,{modelValue:e(t).current.option.padding,"onUpdate:modelValue":o[3]||(o[3]=n=>e(t).current.option.padding=n),options:e($)},null,8,["modelValue","options"]),l(s,{modelValue:e(t).current.option.key,"onUpdate:modelValue":o[4]||(o[4]=n=>e(t).current.option.key=n),width:220,label:"key"},null,8,["modelValue"]),l(s,{modelValue:e(t).current.option.iv,"onUpdate:modelValue":o[6]||(o[6]=n=>e(t).current.option.iv=n),width:220,label:"iv",disabled:e(t).current.option.mode==="ECB"},{append:r(()=>[l(k,{content:u.$t("aes_iv_auto_fill")},{default:r(()=>[l(x,{modelValue:e(t).current.option.fill,"onUpdate:modelValue":o[5]||(o[5]=n=>e(t).current.option.fill=n),disabled:e(t).current.option.mode==="ECB"},null,8,["modelValue","disabled"])]),_:1},8,["content"])]),_:1},8,["modelValue","disabled"])]),_:1}),l(s,{modelValue:e(t).current.option.key,"onUpdate:modelValue":o[7]||(o[7]=n=>e(t).current.option.key=n),label:"key"},null,8,["modelValue"])]),_:1},8,["modelValue","lists"]),l(T,{modelValue:e(t).current.output,"onUpdate:modelValue":o[9]||(o[9]=n=>e(t).current.output=n),allow:["base64","hex"],content:_.value,height:U,onSuccess:f},null,8,["modelValue","content","height"])]),_:2},1024)]),_:1},8,["append"])}}});export{Y as default};