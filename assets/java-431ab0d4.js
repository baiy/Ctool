import{n as T}from"./nameConvert-75d645d2.js";import{J as b}from"./index-da14ef80.js";const y={Date:"java.util.Date",List:"java.util.List"};let f=[];function h(e){return new Date(e)!=="Invalid Date"&&!isNaN(new Date(e))&&isNaN(+e)}function x(e){return e%1===0}function A(e,i){let r=e.val,t=e.name,n="",o="",l="",p={},m=!1,d=`    public void setA(T a) {
         this.a = a;
     }
     public T getA() {
         return a;
     }
`;for(let a in r){const g=T(a);let u=g.camelCase();u!==a&&(o+='    @JsonProperty("'+a+`")
`,m=!0),o+="    private "+r[a]+" "+u+`;
`;let s=r[a];s.indexOf("List<")>-1&&(s=r[a].replace("List<",""),s=s.replace(">",""),p.List="true"),p[s]="true";let j={a:u,A:g.pascalCase(),T:r[a]};l+=d.replace(/a|A|T/g,function(J){return j[J]})}for(let a in p)y[a]&&(n+="import "+y[a]+`;
`);return m&&(n+=`import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
`),i&&(n="package "+i+`;
`+n),"/*=============="+t+`.java file============*/
`+n+`
public class `+t+` {
`+o+l+`}

`}function D(e,i){let r,t=e;t[0]==="["&&t[t.length-1]==="]"?(t='{ "list": '+t+"}",r=b.parse(t).list[0]):r=b.parse(t);let n={};f=[];for(let o in r){const l=r[o];n[o]=c(l,o,f)}return i||(i="AtoolBean"),n={name:i,val:n},[n,...f]}function c(e,i,r){e&&e.replace&&(e=e.replace(/ /g,""));let t=typeof e;if(t==="number")return x(e)?"int":"double";if(t==="bigint")return"int";if(t==="boolean")return t;if(h(e))return"Date";if(e){if(t==="string")return"String";if(Array.isArray(e))return"List<"+c(e[0],i,r)+">";{let n=T(i).pascalCase(),o={};for(i in e){let l=e[i];o[i]=c(l,i,r)}return r.push({name:n,val:o}),n}}else return"String"}const P=(e,i="JsonRootBean",r="pag.json2bean")=>{let t=[],n=D(e,i);for(let o in n)t.push(A(n[o],r));return t.join(`
`)};export{P as convert};
