import{u as z,i as H}from"./action-b240ad25.js";import{j as u}from"./jsrsasign-a00b5ff7.js";import{D as B,ar as L,bj as M,aB as T,p as g,y as a,bk as d,F as j,aG as p,aH as E,at as c,bm as f,b0 as o}from"./history-85bd2cc3.js";import"./shim-03580cdb.js";import"./_commonjsHelpers-87174ba5.js";const x={class:"ctool-page-option"},O=B({__name:"Sign",async setup(F){let y,K;const h=new Worker(new URL(""+new URL("worker-58949f5a.js",import.meta.url).href,self.location),{type:"module"});L(()=>{h.terminate()});const t=z(([y,K]=M(()=>H({signData:"",privateKey:"",publicKey:"",verifyCode:"",algorithm:"MD5withRSA"},{paste:!1})),y=await y,K(),y));let n=T({show:!1,loading:!1,length:1024,type:"PKCS8PRV"});h.onmessage=function(l){const e=l.data;if(console.log("main accept",e),e.method==="generate_keypair")return A(e.data.public_key,e.data.private_key)};const k=(l,e)=>{let i={method:l,data:e};console.log("main send",i),h.postMessage(i)},w=["MD5withRSA","SHA1withRSA","SHA256withRSA","SHA512withRSA"],C=[{value:"PKCS8PRV",label:"PKCS#8"},{value:"PKCS1PRV",label:"PKCS#1"}],S=[{value:512,label:"512 bit"},{value:1024,label:"1024 bit"},{value:2048,label:"2048 bit"},{value:4096,label:"4096 bit"}],$=()=>{n.value.loading=!0,k("generate_keypair",{type:n.value.type,length:n.value.length})},R=()=>{try{if(!t.current.signData||!t.current.privateKey)return;const l=u.KEYUTIL.getKey(t.current.privateKey),e=new u.KJUR.crypto.Signature({alg:t.current.algorithm});e.init(l),e.updateString(t.current.signData),t.current.verifyCode=u.hextob64(e.sign()),t.success({copy_text:t.current.verifyCode})}catch(l){t.current.verifyCode=$error(l)}},U=()=>{try{if(!t.current.verifyCode||!t.current.publicKey)return;const l=u.KEYUTIL.getKey(t.current.publicKey),e=new u.KJUR.crypto.Signature({alg:t.current.algorithm});e.init(l),e.updateString(t.current.signData);let i=u.b64tohex(t.current.verifyCode);return e.verify(i)?t.success({message:$t("sign_verify_ok")}):t.success({message:$t("sign_verify_fail"),message_type:"error",is_save:!1})}catch(l){return t.success({message:$error(l),message_type:"error",is_save:!1})}},A=(l,e)=>{n.value.show=!1,n.value.loading=!1,t.current.privateKey=e,t.current.publicKey=l};return(l,e)=>{const i=p("Textarea"),m=p("Select"),_=p("Button"),b=p("Align"),D=p("HeightResize"),P=p("Modal"),v=E("row");return c(),g(j,null,[a(D,{reduce:10,ignore:"",append:[".ctool-page-option"]},{default:d(({small:s,large:V})=>[a(b,{direction:"vertical"},{default:d(()=>[f((c(),g("div",null,[a(i,{height:s,modelValue:o(t).current.signData,"onUpdate:modelValue":e[0]||(e[0]=r=>o(t).current.signData=r),placeholder:l.$t("sign_sign_data"),copy:l.$t("sign_sign_data")},null,8,["height","modelValue","placeholder","copy"]),a(i,{height:s,modelValue:o(t).current.verifyCode,"onUpdate:modelValue":e[1]||(e[1]=r=>o(t).current.verifyCode=r),placeholder:l.$t("sign_verify_code"),copy:l.$t("sign_verify_code")},null,8,["height","modelValue","placeholder","copy"])])),[[v,"1-1"]]),f((c(),g("div",x,[a(b,{horizontal:"right"},{default:d(()=>[a(m,{options:w,modelValue:o(t).current.algorithm,"onUpdate:modelValue":e[2]||(e[2]=r=>o(t).current.algorithm=r)},null,8,["modelValue"]),a(_,{type:"primary",text:l.$t("sign_sign"),onClick:R},null,8,["text"])]),_:1}),a(b,null,{default:d(()=>[a(_,{type:"primary",text:l.$t("sign_verify"),onClick:U},null,8,["text"]),a(_,{text:l.$t("sign_generate_keypair"),onClick:e[3]||(e[3]=r=>n.value.show=!0)},null,8,["text"])]),_:1})])),[[v,"1-1"]]),f((c(),g("div",null,[a(i,{height:V,modelValue:o(t).current.publicKey,"onUpdate:modelValue":e[4]||(e[4]=r=>o(t).current.publicKey=r),placeholder:l.$t("sign_public_key"),copy:l.$t("sign_public_key")},null,8,["height","modelValue","placeholder","copy"]),a(i,{height:V,modelValue:o(t).current.privateKey,"onUpdate:modelValue":e[5]||(e[5]=r=>o(t).current.privateKey=r),placeholder:l.$t("sign_private_key"),copy:l.$t("sign_private_key")},null,8,["height","modelValue","placeholder","copy"])])),[[v,"1-1"]])]),_:2},1024)]),_:1},8,["append"]),a(P,{title:l.$t("sign_generate_keypair"),loading:n.value.loading,modelValue:n.value.show,"onUpdate:modelValue":e[8]||(e[8]=s=>n.value.show=s),width:550,"footer-type":"long",onOk:$},{default:d(()=>[f((c(),g("div",null,[a(m,{size:"large",options:C,modelValue:n.value.type,"onUpdate:modelValue":e[6]||(e[6]=s=>n.value.type=s),label:l.$t("sign_keypair_type")},null,8,["modelValue","label"]),a(m,{size:"large",options:S,modelValue:n.value.length,"onUpdate:modelValue":e[7]||(e[7]=s=>n.value.length=s),label:l.$t("sign_keypair_length")},null,8,["modelValue","label"])])),[[v,"1-1"]])]),_:1},8,["title","loading","modelValue"])],64)}}});export{O as default};