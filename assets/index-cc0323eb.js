import{n as $}from"./nameConvert-75d645d2.js";import{bu as h}from"./history-91cfa0f9.js";import{J as N}from"./index-da14ef80.js";import"./_commonjsHelpers-87174ba5.js";const s=(t,r=0,e=4)=>" ".repeat(e*r)+t,d=t=>$(t).camelCase(),C=t=>$(t).pascalCase();function A(t,{typedMethods:r}){let e="";const n=t.length;return t.forEach((i,a)=>{r&&i.type!==void 0&&(e+=i.type+" "),e+="$"+i.name,a<n-1&&(e+=", ")}),e}function E(t){let r="";const e=t.length;return t.forEach((n,i)=>{let a="";a+=`$this->${n.name} = $${n.name};`,i<e-1&&(a+=`
`),r+=s(a,2)}),r+`
`}const g=(t,r)=>{if(!r.arraySerialization)return"";let e=`
`,n="";return n+="public function __construct(",n+=A(t,r),n+=`)
`,e+=s(n,1),e+=s(`{
`,1),e+=E(t),e+=s("}",1),e};function _(t,{typedMethods:r}){const e=d("set_"+t.name);let n="",i=`public function ${e}`;return i+=`(${r&&t.type!==void 0?t.type+" ":""}$${t.name})`,n+=s(i+`
`,1),n+=s(`{
`,1),n+=s(`$this->${t.name} = $${t.name};
`,2),n+=s(`return $this;
`,2),n+=s("}",1),n}function S(t,{typedMethods:r}){const e=t.type==="bool"?"is":"get",n=d(e+"_"+t.name);let i="",a=`public function ${n}()`;return r&&t.type!==void 0&&(a+=":"+t.type),i+=s(a+`
`,1),i+=s(`{
`,1),i+=s(`return $this->${t.name};
`,2),i+=s("}",1),i}function b(t,r,e){if(!e.getters&&!e.setters)return"";let n=`
`;const i=r.length;return r.forEach((a,l)=>{n+=`
`,n+=t(a,e),l<i-1&&(n+=`
`)}),n}const p=(t,r)=>r.setters?b(_,t,r):"",P=(t,r)=>r.getters?b(S,t,r):"",f=(t,r)=>{switch(typeof t){case"object":return Array.isArray(t)?"array":t===null?void 0:C(r);case"boolean":return"bool";case"number":return Number.isInteger(t)?"int":"float";case"bigint":return"int";case"string":return"string";default:return}},o=t=>["bool","int","float","string"].includes(t)||t===null||t===void 0,D={PUBLIC:"public",PRIVATE:"private",PROTECTED:"protected"},T=(t,{visibility:r,typedProperties:e})=>{let n="";return t.forEach(i=>{i.type&&(n+=s(`/** @var ${i.type} */
`,1)),n+=s(`${r}${i.type&&e?" "+i.type:""} $${i.name};
`,1)}),n},I=(t,r,e)=>{if(o(t)||h.isEmpty(r))return null;let n=e;return f(t==="array"?r.length>0?r[0]:null:r,n)},v=(t,r)=>{let e=f(r,t);return{name:d(t),type:e,originalName:t,value:r,subtype:I(e,r,t)}};function J(t,r,e,n){const a=Object.keys(t).map(l=>{let u=v(l,t[l]);if(o(u.type)||o(u.subtype)||u.subtype===null)return u;let c=u.type==="array"?u.subtype:u.type;return n.has(c)||n.add({className:c,key:l,value:u.type==="array"?t[l][0]:t[l]}),u});return{className:r,properties:a}}function O(t,r,e){return r.arraySerialization||r.includeDeps?x(t,r,e)+z(t,r)+L(t,r):""}function x(t,{typedMethods:r},e){let n=`

`,i="public static function fromArray(";i+=r?"array $data":"$data",i+=r?"):"+e:")",n+=s(i+`
`,1),n+=s(`{
`,1),n+=s(`return new ${e}(
`,2);const a=t.length;return t.forEach((l,u)=>{let c="",m=u>=a-1;if(o(l.type)||o(l.subtype)){c=`$data["${l.originalName}"]${m?"":","}`,n+=s(c+`
`,3);return}if(l.type==="array"&&!o(l.subtype)){c+=s(`array_map(function($item){
`,3),c+=s(`return ${l.subtype}::fromArray($item);
`,4),c+=s(`},$data["${l.originalName}"])${m?"":","}`,3),n+=c+`
`;return}c=`${l.subtype}::fromArray($data["${l.originalName}"])${m?"":","}`,n+=s(c+`
`,3)}),n+=s(`);
`,2),n+=s(`}
`,1),n}function z(t,{typedMethods:r}){let e=`
`,n="public function toArray(";n+=r?"):array":")",e+=s(n+`
`,1),e+=s(`{
`,1),e+=s(`return [
`,2);const i=t.length;return t.forEach((a,l)=>{let u="",c=l>=i-1;if(o(a.type)||o(a.subtype)){u=`"${a.originalName}"=>$this->${a.name}${c?"":","}`,e+=s(u+`
`,3);return}if(a.type==="array"){u+=s(`"${a.originalName}"=>array_map(function($item){
`,3),u+=s(`return $item->toArray();
`,4),u+=s(`},$this->${a.name})${c?"":","}`,3),e+=u+`
`;return}u=`"${a.originalName}"=>$this->${a.name}->toArray()${c?"":","}`,e+=s(u+`
`,3)}),e+=s(`];
`,2),e+=s(`}
`,1),e}function L(t,{typedMethods:r}){let e=`
`,n="public function toJson(";return n+=r?"):string":")",e+=s(n+`
`,1),e+=s(`{
`,1),e+=s(`return json_encode($this->toArray(), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
`,2),e+=s("}",1),e}const U=(t,r,e,n=null)=>{const{className:i,properties:a}=J(e,n,t,r);let l=T(a,t)+g(a,t)+P(a,t)+p(a,t)+O(a,t,i);return`class ${i}
{
${l}
}
`},R=()=>{let t=[],r=[],e=0;const u={add:c=>(r.push(c.className),t[c.className]=c,u),has:c=>t.includes(c),all:()=>t,get:()=>{if(Object.keys(t).length===0)return null;const c=r[e],m=t[c];return delete t[c],e++,m}};return u},V={className:"",namespace:"",visibility:D.PRIVATE,typedProperties:!1,getters:!0,typedMethods:!1,setters:!0,arraySerialization:!0,includeDeps:!0},F=(t,r={})=>{const e={...V,...r};e.className||(e.className="ClassName");let n=N.parse(t);Array.isArray(n)&&(n=n[0]);const i=y(e,R().add({className:e.className,key:null,value:n}));let a="";return e.namespace&&(a="namespace "+e.namespace+`;

`+a),e.includeDeps?(i.forEach((l,u)=>{u!==0?a+=`

`+l:a+=l}),a!==""?`<?php
${a}`:""):a+i[0]};function y(t,r,e=[]){let n=r.get();return n==null?e:(e.push(U(t,r,n.value,n.className)),y(t,r,e))}export{F as convert};
