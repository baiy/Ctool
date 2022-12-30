import{J as c}from"./index-da14ef80.js";const i={_allClass:[],format(t,...e){return t.replace(/\{(\d+)\}/g,(s,r)=>e[r])},genClassCode(t,e,s){let r="// ========= "+e+`.cs file ========= 
namespace ${s}
{
`;r+=`    public class ${e}
    {
`;for(let n in t){let o=t[n];n=n.trim(),r+=`        ${this._genComment(o)}        public ${this._genTypeByProp(n,o,s)} ${n} { get; set; }
`}return r+=`    }
`,r+=`}
`,this._allClass.push(r),this._allClass.join(`
`)},_genTypeByProp(t,e,s){switch(Object.prototype.toString.apply(e)){case"[object Number]":case"[object BigInt]":return e.toString().includes(".")?"double":"int";case"[object Date]":return"DateTime";case"[object Object]":return t=t.substring(0,1).toUpperCase()+t.substring(1),this.genClassCode(e,t,s),t;case"[object Array]":return`List <${this._genTypeByProp(t+"Item",e[0],s)}>`;default:return"string"}},_genComment(t){return`/// <summary>
        /// `+(typeof t=="string"&&/.*[\u4e00-\u9fa5]+.*$/.test(t)?t:"")+`
        /// </summary>
`},convert(t,e,s){return this._allClass=[],this.genClassCode(t,e,s)}},u=(t,e,s)=>i.convert(c.parse(t),e,s);export{u as convert};
