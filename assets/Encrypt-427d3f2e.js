import{s as h}from"./index-636623a5.js";import{u as E,i as T}from"./action-61e8d757.js";import{c as a,a as H,T as s}from"./index-4c022386.js";import{A,bi as C,k as U,m as _,bj as c,aF as i,aG as B,as as b,x as r,a$ as o,bl as I}from"./history-fda1b5d3.js";import"./_commonjsHelpers-87174ba5.js";import"./index-b1ff2442.js";import"./shim-03580cdb.js";const j=A({__name:"Encrypt",async setup(S){let p,d;const t=E(([p,d]=C(()=>T({input:a("text"),option:{key:a("hex"),padding:!0,is_cbc:!1,iv:a("hex")},output:H("hex")})),p=await p,d(),p)),f=U(()=>{if(t.current.input.text.isEmpty()||t.current.option.key.text.isEmpty()||t.current.option.is_cbc&&t.current.option.iv.text.isEmpty())return s.empty();if(t.current.input.text.isError())return t.current.input.text;if(t.current.option.key.text.isError())return t.current.option.key.text;if(t.current.option.is_cbc&&t.current.option.iv.text.isError())return t.current.option.iv.text;try{if(!t.current.input.text.isText())throw new Error("input content must text / text file");const u=h.sm4.encrypt(t.current.input.text.toString(),t.current.option.key.text.toHexString(),{padding:t.current.option.padding?"pkcs#5":"none",mode:t.current.option.is_cbc?"cbc":void 0,iv:t.current.option.is_cbc?t.current.option.iv.text.toHexString():void 0});if(u==="")throw new Error("Encrypt Failure");return s.fromHex(u)}catch(u){return s.fromError($error(u))}});return(u,e)=>{const l=i("TextInput"),m=i("Bool"),g=i("HelpTip"),x=i("Align"),V=i("TextOutput"),v=i("HeightResize"),y=B("row");return b(),_(v,{ignore:"",append:[".ctool-page-option"],reduce:10},{default:c(({small:w,large:k})=>[r(x,{direction:"vertical"},{default:c(()=>[r(l,{modelValue:o(t).current.input,"onUpdate:modelValue":e[0]||(e[0]=n=>o(t).current.input=n),height:w,upload:"file"},null,8,["modelValue","height"]),I((b(),_(x,{class:"ctool-page-option"},{default:c(()=>[r(l,{modelValue:o(t).current.option.key,"onUpdate:modelValue":e[1]||(e[1]=n=>o(t).current.option.key=n),"use-input":"Key",allow:["text","hex","base64"]},null,8,["modelValue"]),r(m,{modelValue:o(t).current.option.padding,"onUpdate:modelValue":e[2]||(e[2]=n=>o(t).current.option.padding=n),label:"Padding",border:""},null,8,["modelValue"]),r(m,{modelValue:o(t).current.option.is_cbc,"onUpdate:modelValue":e[3]||(e[3]=n=>o(t).current.option.is_cbc=n),label:"CBC",border:""},null,8,["modelValue"]),r(l,{disabled:!o(t).current.option.is_cbc,modelValue:o(t).current.option.iv,"onUpdate:modelValue":e[4]||(e[4]=n=>o(t).current.option.iv=n),"use-input":"IV",allow:["text","hex","base64"]},null,8,["disabled","modelValue"]),r(g,{link:"https://github.com/JuneAndGreen/sm-crypto"})]),_:1})),[[y,"1-auto-auto-1-auto"]]),r(V,{modelValue:o(t).current.output,"onUpdate:modelValue":e[5]||(e[5]=n=>o(t).current.output=n),allow:["base64","hex"],content:f.value,height:k,onSuccess:e[6]||(e[6]=n=>o(t).save())},null,8,["modelValue","content","height"])]),_:2},1024)]),_:1},8,["append"])}}});export{j as default};