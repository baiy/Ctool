import{u as T,i as $}from"./action-61e8d757.js";import{c as A,a as z,T as a}from"./index-4c022386.js";import{s as _}from"./index-636623a5.js";import{A as E,bi as H,k as I,m as K,bj as p,aF as u,as as U,x as n,a$ as r}from"./history-fda1b5d3.js";import"./_commonjsHelpers-87174ba5.js";import"./index-b1ff2442.js";import"./shim-03580cdb.js";const J=E({__name:"Encrypt",async setup(w){let i,c;const e=T(([i,c]=H(()=>$({input:A("text"),option:{public_key:"",private_key:"",cipher_mode:1},output:z("hex")})),i=await i,c(),i)),d=I(()=>{if(e.current.input.text.isEmpty()||e.current.option.public_key==="")return a.empty();if(e.current.input.text.isError())return e.current.input.text;try{let t=e.current.option.public_key;if(t.length==128)t="04"+t;else if(t.length!=130||!t.startsWith("04"))return a.fromError($error($t("public_key_error")));let o=_.sm2.doEncrypt(e.current.input.text.toArray(),t,e.current.option.cipher_mode);return a.fromHex(o)}catch(t){return a.fromError($error(t))}}),y=()=>{let t=_.sm2.generateKeyPairHex();e.current.option.public_key=t.publicKey,e.current.option.private_key=t.privateKey};return(t,o)=>{const f=u("TextInput"),m=u("Input"),s=u("Align"),b=u("Select"),k=u("Button"),x=u("HelpTip"),g=u("Card"),V=u("TextOutput"),h=u("HeightResize");return U(),K(h,{ignore:"",append:[".ctool-page-option"],reduce:10},{default:p(({small:v,large:C})=>[n(s,{direction:"vertical"},{default:p(()=>[n(f,{modelValue:r(e).current.input,"onUpdate:modelValue":o[0]||(o[0]=l=>r(e).current.input=l),height:v,upload:"file"},null,8,["modelValue","height"]),n(g,{title:t.$t("main_ui_config"),class:"ctool-page-option"},{extra:p(()=>[n(s,null,{default:p(()=>[n(b,{size:"small",options:[{value:1,label:"C1-C3-C2"},{value:0,label:"C1-C2-C3"}],modelValue:r(e).current.option.cipher_mode,"onUpdate:modelValue":o[3]||(o[3]=l=>r(e).current.option.cipher_mode=l)},null,8,["modelValue"]),n(k,{type:"primary",size:"small",text:t.$t("sm2_generate_keypair"),onClick:y},null,8,["text"]),n(x,{link:"https://github.com/JuneAndGreen/sm-crypto"})]),_:1})]),default:p(()=>[n(s,{horizontal:"center"},{default:p(()=>[n(m,{modelValue:r(e).current.option.public_key,"onUpdate:modelValue":o[1]||(o[1]=l=>r(e).current.option.public_key=l),label:t.$t("sm2_public_key")},null,8,["modelValue","label"]),n(m,{modelValue:r(e).current.option.private_key,"onUpdate:modelValue":o[2]||(o[2]=l=>r(e).current.option.private_key=l),label:t.$t("sm2_private_key")},null,8,["modelValue","label"])]),_:1})]),_:1},8,["title"]),n(V,{modelValue:r(e).current.output,"onUpdate:modelValue":o[4]||(o[4]=l=>r(e).current.output=l),allow:["base64","hex"],content:d.value,height:C,onSuccess:o[5]||(o[5]=l=>r(e).save())},null,8,["modelValue","content","height"])]),_:2},1024)]),_:1},8,["append"])}}});export{J as default};