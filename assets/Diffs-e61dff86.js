import{P as we,E as C,a as oe,S as N,i as te,F as Ve,V as Ge,aa as Ne,R as $,D,a9 as Z,ab as $e,ac as be,W as Ae,ad as Fe,p as ze}from"./index-1a29e17b.js";import{a as Ue,b as We,c as Ie}from"./index-5c79985c.js";import{A as Pe,bi as qe,by as He,aA as J,al as je,aq as Je,be as K,m as Ke,bj as V,aF as L,as as Qe,x as k,p as Ye,ae as Ze,a$ as S}from"./history-a84013f3.js";import{u as Xe,i as et}from"./action-741b65e4.js";import{f as le}from"./index-fb843950.js";import{b as tt,a as rt}from"./code-2d861646.js";import"./index-2e6f94de.js";import"./shim-03580cdb.js";import"./_commonjsHelpers-87174ba5.js";import"./index-395898e3.js";class v{constructor(e,n,i,o){this.fromA=e,this.toA=n,this.fromB=i,this.toB=o}offset(e,n){return new v(this.fromA+e,this.toA+e,this.fromB+n,this.toB+n)}}function F(t,e,n,i,o,r){if(t==i)return[];let l=re(t,e,n,i,o,r),s=ne(t,e+l,n,i,o+l,r);e+=l,n-=s,o+=l,r-=s;let u=n-e,f=r-o;if(!u||!f)return[new v(e,n,o,r)];if(u>f){let c=t.slice(e,n).indexOf(i.slice(o,r));if(c>-1)return[new v(e,e+c,o,o),new v(e+c+f,n,r,r)]}else if(f>u){let c=i.slice(o,r).indexOf(t.slice(e,n));if(c>-1)return[new v(e,e,o,o+c),new v(n,n,o+c+u,r)]}if(u==1||f==1)return[new v(e,n,o,r)];let a=ke(t,e,n,i,o,r);if(a){let[c,d,h]=a;return F(t,e,c,i,o,d).concat(F(t,c+h,n,i,d+h,r))}return nt(t,e,n,i,o,r)}function nt(t,e,n,i,o,r){let l=n-e,s=r-o,u=Math.ceil((l+s)/2);Q.reset(u),Y.reset(u);let f=(h,m)=>t.charCodeAt(e+h)==i.charCodeAt(o+m),a=(h,m)=>t.charCodeAt(n-h-1)==i.charCodeAt(r-m-1),c=(l-s)%2!=0?Y:null,d=c?null:Q;for(let h=0;h<u;h++){let m=Q.advance(h,l,s,u,c,!1,f)||Y.advance(h,l,s,u,d,!0,a);if(m)return it(t,e,n,e+m[0],i,o,r,o+m[1])}return[new v(e,n,o,r)]}class xe{constructor(){this.vec=[]}reset(e){this.len=e<<1;for(let n=0;n<this.len;n++)this.vec[n]=-1;this.vec[e+1]=0,this.start=this.end=0}advance(e,n,i,o,r,l,s){for(let u=-e+this.start;u<=e-this.end;u+=2){let f=o+u,a=u==-e||u!=e&&this.vec[f-1]<this.vec[f+1]?this.vec[f+1]:this.vec[f-1]+1,c=a-u;for(;a<n&&c<i&&s(a,c);)a++,c++;if(this.vec[f]=a,a>n)this.end+=2;else if(c>i)this.start+=2;else if(r){let d=o+(n-i)-u;if(d>=0&&d<this.len&&r.vec[d]!=-1)if(l){let h=r.vec[d];if(h>=n-a)return[h,o+h-d]}else{let h=n-r.vec[d];if(a>=h)return[a,c]}}}return null}}const Q=new xe,Y=new xe;function it(t,e,n,i,o,r,l,s){let u=!1;return!T(t,i)&&++i==n&&(u=!0),!T(o,s)&&++s==l&&(u=!0),u?[new v(e,n,r,l)]:F(t,e,i,o,r,s).concat(F(t,i,n,o,s,l))}function Ce(t,e){let n=1,i=Math.min(t,e);for(;n<i;)n=n<<1;return n}function re(t,e,n,i,o,r){if(e==n||e==r||t.charCodeAt(e)!=i.charCodeAt(o))return 0;let l=Ce(n-e,r-o);for(let s=e,u=o;;){let f=s+l,a=u+l;if(f>n||a>r||t.slice(s,f)!=i.slice(u,a)){if(l==1)return s-e-(T(t,s)?0:1);l=l>>1}else{if(f==n||a==r)return f-e;s=f,u=a}}}function ne(t,e,n,i,o,r){if(e==n||o==r||t.charCodeAt(n-1)!=i.charCodeAt(r-1))return 0;let l=Ce(n-e,r-o);for(let s=n,u=r;;){let f=s-l,a=u-l;if(f<e||a<o||t.slice(f,s)!=i.slice(a,u)){if(l==1)return n-s-(T(t,s)?0:1);l=l>>1}else{if(f==e||a==o)return n-f;s=f,u=a}}}function ke(t,e,n,i,o,r){let l=n-e,s=r-o;if(l<s){let d=ke(i,o,r,t,e,n);return d&&[d[1],d[0],d[2]]}if(l<4||s*2<l)return null;let u=i.slice(o,r);function f(d){let h=d+Math.floor(l/4);if(T(t,d)||d++,T(t,h)||h--,d>=h)return null;let m=t.slice(d,h),g=-1,p;for(;(g=u.indexOf(m,g+1))!=-1;){let x=re(t,h,n,i,o+g+m.length,r),A=ne(t,e,d,i,o,o+g),b=m.length+x+A;(!p||p[2]<b)&&(p=[d-A,o+g-A,b])}return p&&p[2]*2>l?p:null}let a=f(e+Math.ceil(l/4)),c=f(e+Math.ceil(l/2));return a&&(!c||c[2]<a[2])?a:c}function Be(t,e){for(let n=1;n<t.length;n++){let i=t[n-1],o=t[n];i.toA>o.fromA-e&&i.toB>o.fromB-e&&(t[n-1]=new v(i.fromA,o.toA,i.fromB,o.toB),t.splice(n--,1))}}function ot(t,e,n){for(;;){Be(n,1);let i=!1;for(let o=0;o<n.length;o++){let r=n[o],l,s;(l=re(t,r.fromA,r.toA,e,r.fromB,r.toB))&&(r=n[o]=new v(r.fromA+l,r.toA,r.fromB+l,r.toB)),(s=ne(t,r.fromA,r.toA,e,r.fromB,r.toB))&&(r=n[o]=new v(r.fromA,r.toA-s,r.fromB,r.toB-s));let u=r.toA-r.fromA,f=r.toB-r.fromB;if(u&&f)continue;let a=r.fromA-(o?n[o-1].toA:0),c=(o<n.length-1?n[o+1].fromA:t.length)-r.toA;if(!a||!c)continue;let d=u?t.slice(r.fromA,r.toA):e.slice(r.fromB,r.toB);a<=d.length&&t.slice(r.fromA-a,r.fromA)==d.slice(d.length-a)?(n[o]=new v(r.fromA-a,r.toA-a,r.fromB-a,r.toB-a),i=!0):c<=d.length&&t.slice(r.toA,r.toA+c)==d.slice(0,c)&&(n[o]=new v(r.fromA+c,r.toA+c,r.fromB+c,r.toB+c),i=!0)}if(!i)break}return n}function lt(t,e,n){for(let i=0,o=0;o<t.length;o++){let r=t[o],l=r.toA-r.fromA,s=r.toB-r.fromB;if(l&&s||l>3||s>3){let u=o==t.length-1?e.length:t[o+1].fromA,f=r.fromA-i,a=u-r.toA,c=ae(e,r.fromA,Math.min(f,5)),d=se(e,r.toA,Math.min(a,5)),h=r.fromA-c,m=d-r.toA;if(!l||!s){let g=Math.max(l,s),[p,x,A]=l?[e,r.fromA,r.toA]:[n,r.fromB,r.toB],b,M;h&&m?(g>h&&e.slice(c,r.fromA)==p.slice(A-h,A)?(r=t[o]=new v(c,c+l,r.fromB-h,r.toB-h),c=r.fromA,d=se(e,r.toA,Math.min(u-r.toA,5))):g>m&&e.slice(r.toA,d)==p.slice(x,x+m)&&(r=t[o]=new v(d-l,d,r.fromB+m,r.toB+m),d=r.toA,c=ae(e,r.fromA,Math.min(r.fromA-i,5))),h=r.fromA-c,m=d-r.toA):!h&&!m&&(M=r.fromA-(b=st(e,r.fromA,f)))&&e.slice(b,r.fromA)==p.slice(A-M,A)&&(r=t[o]=new v(b,b+l,r.fromB-M,r.toB-M))}(h||m)&&(r=t[o]=new v(r.fromA-h,r.toA+m,r.fromB-h,r.toB+m)),i=r.toA}}return Be(t,3),t}let y;try{y=new RegExp("[\\p{Alphabetic}\\p{Number}]","u")}catch{}function Me(t){return t>48&&t<58||t>64&&t<91||t>96&&t<123}function De(t,e){if(e==t.length)return 0;let n=t.charCodeAt(e);return n<192?Me(n)?1:0:y?!Le(n)||e==t.length-1?y.test(String.fromCharCode(n))?1:0:y.test(t.slice(e,e+2))?2:0:0}function Se(t,e){if(!e)return 0;let n=t.charCodeAt(e-1);return n<192?Me(n)?1:0:y?!ye(n)||e==1?y.test(String.fromCharCode(n))?1:0:y.test(t.slice(e-2,e))?2:0:0}function se(t,e,n){if(e==t.length||!Se(t,e))return e;for(let i=e,o=e+n;;){let r=De(t,i);if(!r)return i;if(i+=r,i>o)return e}}function ae(t,e,n){if(!e||!De(t,e))return e;for(let i=e,o=e-n;;){let r=Se(t,i);if(!r)return i;if(i-=r,i<o)return e}}function st(t,e,n){for(let i=e,o=e-n;;){let r=i?t.charCodeAt(i-1):10;if(r==10)return i;if(i--,i<o||r!=32&&r!=9)return e}}const Le=t=>t>=55296&&t<=56319,ye=t=>t>=56320&&t<=57343;function T(t,e){return!e||e==t.length||!Le(t.charCodeAt(e-1))||!ye(t.charCodeAt(e))}function at(t,e){return ot(t,e,F(t,0,t.length,e,0,e.length))}function Oe(t,e){return lt(at(t,e),t,e)}class ie{constructor(e,n,i,o,r){this.changes=e,this.fromA=n,this.toA=i,this.fromB=o,this.toB=r}offset(e,n){return e||n?new ie(this.changes,this.fromA+e,this.toA+e,this.fromB+n,this.toB+n):this}get endA(){return Math.max(this.fromA,this.toA-1)}get endB(){return Math.max(this.fromB,this.toB-1)}}function ue(t,e,n,i){let o=n.lineAt(t),r=i.lineAt(e);return o.to==t&&r.to==e?[Math.min(n.length,t+1),Math.min(i.length,e+1)]:[o.from,r.from]}function he(t,e,n,i){let o=n.lineAt(t),r=i.lineAt(e);return o.from==t&&r.from==e?[t,e]:[o.to+1,r.to+1]}function _e(t,e,n,i,o){let r=[];for(let l=0;l<t.length;l++){let s=t[l],[u,f]=ue(s.fromA+i,s.fromB+o,e,n),[a,c]=he(s.toA+i,s.toB+o,e,n),d=[s.offset(-u+i,-f+o)];for(;l<t.length-1;){let h=t[l+1],[m,g]=ue(h.fromA+i,h.fromB+o,e,n);if(m>a+1&&g>c+1)break;d.push(h.offset(-u+i,-f+o)),[a,c]=he(h.toA+i,h.toB+o,e,n),l++}r.push(new ie(d,u,Math.max(u,a),f,Math.max(f,c)))}return r}function ut(t,e){return _e(Oe(t.toString(),e.toString()),t,e,0,0)}const z=1e3;function fe(t,e,n,i){let o=0,r=t.length;for(;;){if(o==r){let a=0,c=0;o&&({toA:a,toB:c}=t[o-1]);let d=e-(n?a:c);return[a+d,c+d]}let l=o+r>>1,s=t[l],[u,f]=n?[s.fromA,s.toA]:[s.fromB,s.toB];if(u>e)r=l;else if(f<=e)o=l+1;else return i?[s.fromA,s.fromB]:[s.toA,s.toB]}}function Te(t,e,n,i){let o=[];return e.iterChangedRanges((r,l,s,u)=>{let f=0,a=n?e.length:i,c=0,d=n?i:e.length;r>z&&([f,c]=fe(t,r-z,n,!0)),l<e.length-z&&([a,d]=fe(t,l+z,n,!1));let h=u-s-(l-r),m,[g,p]=n?[h,0]:[0,h];o.length&&(m=o[o.length-1]).toA>=f?o[o.length-1]={fromA:m.fromA,fromB:m.fromB,toA:a,toB:d,diffA:m.diffA+g,diffB:m.diffB+p}:o.push({fromA:f,toA:a,fromB:c,toB:d,diffA:g,diffB:p})}),o}function Ee(t,e,n,i){if(!t.length)return e;let o=0,r=0,l=0,s=[];for(let u of t){let f=u.fromA+r,a=u.toA+r+u.diffA,c=u.fromB+l,d=u.toB+l+u.diffB;for(;o<e.length;){let h=e[o];if(h.toA+r<=f)s.push(h.offset(r,l));else if(h.fromA+r>a)break;o++}for(let h of _e(Oe(n.sliceString(f,a),i.sliceString(c,d)),n,i,f,c))s.push(h);r+=u.diffA,l+=u.diffB}for(;o<e.length;)s.push(e[o++].offset(r,l));return s}function ht(t,e,n){return Ee(Te(t,e.changes,!0,n.length),t,e.newDoc,n)}function ft(t,e,n){return Ee(Te(t,e.changes,!1,n.length),t,n,e.newDoc)}const X=N.define(),E=te.define({create(t){return null},update(t,e){for(let n of e.effects)n.is(X)&&(t=n.value);return t}}),B=Ve.define({combine:t=>t[0]}),Re=Ge.fromClass(class{constructor(t){({deco:this.deco,gutter:this.gutter}=me(t))}update(t){(t.docChanged||t.viewportChanged||ct(t.startState,t.state)||dt(t.startState,t.state))&&({deco:this.deco,gutter:this.gutter}=me(t.view))}},{decorations:t=>t.deco}),U=we.low(Ne({class:"cm-changeGutter",markers:t=>{var e;return((e=t.plugin(Re))===null||e===void 0?void 0:e.gutter)||Z.empty},renderEmptyElements:!1}));function ct(t,e){return t.field(E,!1)!=e.field(E,!1)}function dt(t,e){return t.facet(B)!=e.facet(B)}const ce=D.line({class:"cm-changedLine"}),mt=D.mark({class:"cm-changedText"}),de=new class extends Fe{constructor(){super(...arguments),this.elementClass="cm-changedLineGutter"}};function gt(t,e,n,i,o,r){let l=n?t.fromA:t.fromB,s=n?t.toA:t.toB,u=0;if(l!=s){o.add(l,l,ce),r&&r.add(l,l,de);for(let f=e.iterRange(l,s-1),a=l;!f.next().done;){if(f.lineBreak){a++,o.add(a,a,ce),r&&r.add(a,a,de);continue}let c=a+f.value.length;if(i)for(;u<t.changes.length;){let d=t.changes[u],h=l+(n?d.fromA:d.fromB),m=l+(n?d.toA:d.toB),g=Math.max(a,h),p=Math.min(c,m);if(g<p&&o.add(g,p,mt),m<c)u++;else break}a=c}}}function me(t){let e=t.state.field(E),{side:n,highlightChanges:i,markGutter:o}=t.state.facet(B),r=n=="a",l=new $,s=o?new $:null,{from:u,to:f}=t.viewport;for(let a of e){if((r?a.fromA:a.fromB)>=f)break;(r?a.toA:a.toB)>u&&gt(a,t.state.doc,r,i,l,s)}return{deco:l.finish(),gutter:s&&s.finish()}}class W extends Ae{constructor(e){super(),this.height=e}eq(e){return this.height==e.height}toDOM(){let e=document.createElement("div");return e.className="cm-mergeSpacer",e.style.height=this.height+"px",e}updateDOM(e){return e.style.height=this.height+"px",!0}get estimatedHeight(){return this.height}ignoreEvent(){return!1}}const q=N.define({map:(t,e)=>t.map(e)}),G=te.define({create:()=>D.none,update:(t,e)=>{for(let n of e.effects)if(n.is(q))return n.value;return t.map(e.changes)},provide:t=>C.decorations.from(t)}),I=1e-4;function pt(t,e,n){let i=new $,o=new $,r=t.viewportLineBlocks,l=e.viewportLineBlocks,s=0,u=0,f=t.state.field(G).iter(),a=e.state.field(G).iter(),c=0,d=0,h=0,m=0;e:for(let A=0;;A++){let b=A<n.length?n[A]:null,[M,R]=b?[b.fromA,b.fromB]:[t.state.doc.length,e.state.doc.length];if(c<M&&d<R)for(;;){if(s==r.length||u==l.length)break e;let w=r[s],O=l[u];for(;f.value&&f.from<w.from;)h-=f.value.spec.widget.height,f.next();for(;a.value&&a.from<O.from;)m-=a.value.spec.widget.height,a.next();if(w.from>=M||O.from>=R)break;let H=w.from-c,j=O.from-d;if(H<0||H<j)s++;else if(j<0||j<H)u++;else{let _=w.top+h-(O.top+m);_<-I?(h-=_,i.add(w.from,w.from,D.widget({widget:new W(-_),block:!0,side:-1}))):_>I&&(m+=_,o.add(O.from,O.from,D.widget({widget:new W(_),block:!0,side:-1}))),s++,u++}}if(!b)break;c=b.toA,d=b.toB}for(;f.value;)h-=f.value.spec.widget.height,f.next();for(;a.value;)m-=a.value.spec.widget.height,a.next();let g=t.contentHeight+h-(e.contentHeight+m);g<I?i.add(t.state.doc.length,t.state.doc.length,D.widget({widget:new W(-g),block:!0,side:1})):g>I&&o.add(e.state.doc.length,e.state.doc.length,D.widget({widget:new W(g),block:!0,side:1}));let p=i.finish(),x=o.finish();Z.eq([p],[t.state.field(G)])||t.dispatch({effects:q.of(p)}),Z.eq([x],[e.state.field(G)])||e.dispatch({effects:q.of(x)})}const ee=N.define({map:(t,e)=>e.mapPos(t)});class vt extends Ae{constructor(e){super(),this.lines=e}eq(e){return this.lines==e.lines}toDOM(e){let n=document.createElement("div");return n.className="cm-collapsedLines",n.textContent="⦚ "+e.state.phrase("$ unchanged lines",this.lines)+" ⦚",n.addEventListener("click",i=>{let o=e.posAtDOM(i.target);e.dispatch({effects:ee.of(o)});let{side:r,sibling:l}=e.state.facet(B);l().dispatch({effects:ee.of(wt(o,e.state.field(E),r=="a"))})}),n}ignoreEvent(e){return e instanceof MouseEvent}get estimatedHeight(){return 27}}function wt(t,e,n){let i=0,o=0;for(let r=0;;r++){let l=r<e.length?e[r]:null;if(!l||(n?l.fromA:l.fromB)>=t)return o+(t-i);[i,o]=n?[l.toA,l.toB]:[l.toB,l.toA]}}const bt=te.define({create(t){return D.none},update(t,e){t=t.map(e.changes);for(let n of e.effects)n.is(ee)&&(t=t.update({filter:i=>i!=n.value}));return t},provide:t=>C.decorations.from(t)});function ge({margin:t=3,minSize:e=4}){return bt.init(n=>At(n,t,e))}function At(t,e,n){let i=new $,o=t.facet(B).side=="a",r=t.field(E),l=1;for(let s=0;;s++){let u=s<r.length?r[s]:null,f=s?l+e:1,a=u?t.doc.lineAt(o?u.fromA:u.fromB).number-1-e:t.doc.lines,c=a-f+1;if(c>=n&&i.add(t.doc.line(f).from,t.doc.line(a).to,D.replace({widget:new vt(c),block:!0})),!u)break;l=t.doc.lineAt(Math.min(t.doc.length,o?u.toA:u.toB)).number}return i.finish()}const xt=C.styleModule.of(new $e({".cm-mergeView":{overflowY:"auto"},".cm-mergeViewEditors":{display:"flex",alignItems:"stretch"},".cm-mergeViewEditor":{flexGrow:1,flexBasis:0,overflow:"hidden"},".cm-merge-revert":{width:"1.6em",flexGrow:0,flexShrink:0,position:"relative"},".cm-merge-revert button":{position:"absolute",display:"block",width:"100%",boxSizing:"border-box",textAlign:"center",background:"none",border:"none",font:"inherit",cursor:"pointer"}})),Ct=C.baseTheme({"& .cm-scroller, &":{height:"auto !important",overflowY:"visible !important"},"&.cm-merge-a .cm-changedLine":{backgroundColor:"rgba(160, 128, 100, .08)"},"&.cm-merge-b .cm-changedLine":{backgroundColor:"rgba(100, 160, 128, .08)"},"&light.cm-merge-a .cm-changedText":{background:"linear-gradient(#ee443366, #ee443366) bottom/100% 2px no-repeat"},"&dark.cm-merge-a .cm-changedText":{background:"linear-gradient(#ffaa9966, #ffaa9966) bottom/100% 2px no-repeat"},"&light.cm-merge-b .cm-changedText":{background:"linear-gradient(#22bb2266, #22bb2266) bottom/100% 2px no-repeat"},"&dark.cm-merge-b .cm-changedText":{background:"linear-gradient(#88ff8866, #88ff8866) bottom/100% 2px no-repeat"},".cm-collapsedLines":{padding:"5px 5px 5px 10px",cursor:"pointer"},"&light .cm-collapsedLines":{color:"#444",background:"linear-gradient(to bottom, transparent 0, #f3f3f3 30%, #f3f3f3 70%, transparent 100%)"},"&dark .cm-collapsedLines":{color:"#ddd",background:"linear-gradient(to bottom, transparent 0, #222 30%, #222 70%, transparent 100%)"},".cm-changeGutter":{width:"3px",paddingLeft:"1px"},"&light.cm-merge-a .cm-changedLineGutter":{background:"#e43"},"&dark.cm-merge-a .cm-changedLineGutter":{background:"#fa9"},"&light.cm-merge-b .cm-changedLineGutter":{background:"#2b2"},"&dark.cm-merge-b .cm-changedLineGutter":{background:"#8f8"}}),pe=new be,P=new be;class kt{constructor(e){this.revertDOM=null,this.revertToA=!1,this.revertToLeft=!1,this.measuring=-1;let n=[we.low(Re),Ct,xt,G,C.updateListener.of(c=>{this.measuring<0&&(c.heightChanged||c.viewportChanged)&&!c.transactions.some(d=>d.effects.some(h=>h.is(q)))&&this.measure()})],i=[B.of({side:"a",sibling:()=>this.b,highlightChanges:e.highlightChanges!==!1,markGutter:e.gutter!==!1})];e.gutter!==!1&&i.push(U);let o=oe.create({doc:e.a.doc,selection:e.a.selection,extensions:[e.a.extensions||[],C.editorAttributes.of({class:"cm-merge-a"}),P.of(i),n]}),r=[B.of({side:"b",sibling:()=>this.a,highlightChanges:e.highlightChanges!==!1,markGutter:e.gutter!==!1})];e.gutter!==!1&&r.push(U);let l=oe.create({doc:e.b.doc,selection:e.b.selection,extensions:[e.b.extensions||[],C.editorAttributes.of({class:"cm-merge-b"}),P.of(r),n]});this.chunks=ut(o.doc,l.doc);let s=[E.init(()=>this.chunks),pe.of(e.collapseUnchanged?ge(e.collapseUnchanged):[])];o=o.update({effects:N.appendConfig.of(s)}).state,l=l.update({effects:N.appendConfig.of(s)}).state,this.dom=document.createElement("div"),this.dom.className="cm-mergeView",this.editorDOM=this.dom.appendChild(document.createElement("div")),this.editorDOM.className="cm-mergeViewEditors";let u=e.orientation||"a-b",f=document.createElement("div");f.className="cm-mergeViewEditor";let a=document.createElement("div");a.className="cm-mergeViewEditor",this.editorDOM.appendChild(u=="a-b"?f:a),this.editorDOM.appendChild(u=="a-b"?a:f),this.a=new C({state:o,parent:f,root:e.root,dispatch:c=>this.dispatch(c,this.a)}),this.b=new C({state:l,parent:a,root:e.root,dispatch:c=>this.dispatch(c,this.b)}),this.setupRevertControls(!!e.revertControls,e.revertControls=="b-to-a",e.renderRevertControl),e.parent&&e.parent.appendChild(this.dom),this.scheduleMeasure()}dispatch(e,n){if(e.docChanged){this.chunks=n==this.a?ht(this.chunks,e,this.b.state.doc):ft(this.chunks,e,this.a.state.doc),n.update([e,e.state.update({effects:X.of(this.chunks)})]);let i=n==this.a?this.b:this.a;i.update([i.state.update({effects:X.of(this.chunks)})]),this.scheduleMeasure()}else n.update([e])}reconfigure(e){if("orientation"in e){let r=e.orientation!="b-a";if(r!=(this.editorDOM.firstChild==this.a.dom.parentNode)){let l=this.a.dom.parentNode,s=this.b.dom.parentNode;l.remove(),s.remove(),this.editorDOM.insertBefore(r?l:s,this.editorDOM.firstChild),this.editorDOM.appendChild(r?s:l),this.revertToLeft=!this.revertToLeft,this.revertDOM&&(this.revertDOM.textContent="")}}if("revertControls"in e||"renderRevertControl"in e){let r=!!this.revertDOM,l=this.revertToA,s=this.renderRevert;"revertControls"in e&&(r=!!e.revertControls,l=e.revertControls=="b-to-a"),"renderRevertControl"in e&&(s=e.renderRevertControl),this.setupRevertControls(r,l,s)}let n="highlightChanges"in e,i="gutter"in e,o="collapseUnchanged"in e;if(n||i||o){let r=[],l=[];if(n||i){let s=this.a.state.facet(B),u=i?e.gutter!==!1:s.markGutter,f=n?e.highlightChanges!==!1:s.highlightChanges;r.push(P.reconfigure([B.of({side:"a",sibling:()=>this.b,highlightChanges:f,markGutter:u}),u?U:[]])),l.push(P.reconfigure([B.of({side:"b",sibling:()=>this.a,highlightChanges:f,markGutter:u}),u?U:[]]))}if(o){let s=pe.reconfigure(e.collapseUnchanged?ge(e.collapseUnchanged):[]);r.push(s),l.push(s)}this.a.dispatch({effects:r}),this.b.dispatch({effects:l})}this.scheduleMeasure()}setupRevertControls(e,n,i){this.revertToA=n,this.revertToLeft=this.revertToA==(this.editorDOM.firstChild==this.a.dom.parentNode),this.renderRevert=i,!e&&this.revertDOM?(this.revertDOM.remove(),this.revertDOM=null):e&&!this.revertDOM?(this.revertDOM=this.editorDOM.insertBefore(document.createElement("div"),this.editorDOM.firstChild.nextSibling),this.revertDOM.addEventListener("mousedown",o=>this.revertClicked(o)),this.revertDOM.className="cm-merge-revert"):this.revertDOM&&(this.revertDOM.textContent="")}scheduleMeasure(){if(this.measuring<0){let e=this.dom.ownerDocument.defaultView||window;this.measuring=e.requestAnimationFrame(()=>{this.measuring=-1,this.measure()})}}measure(){pt(this.a,this.b,this.chunks),this.revertDOM&&this.updateRevertButtons()}updateRevertButtons(){let e=this.revertDOM,n=e.firstChild,i=this.a.viewport,o=this.b.viewport;for(let r=0;r<this.chunks.length;r++){let l=this.chunks[r];if(l.fromA>i.to||l.fromB>o.to)break;if(l.fromA<i.from||l.fromB<o.from)continue;let s=this.a.lineBlockAt(l.fromA).top+"px";for(;n&&+n.dataset.chunk<r;)n=ve(n);n&&n.dataset.chunk==String(r)?(n.style.top!=s&&(n.style.top=s),n=n.nextSibling):e.insertBefore(this.renderRevertButton(s,r),n)}for(;n;)n=ve(n)}renderRevertButton(e,n){let i;if(this.renderRevert)i=this.renderRevert();else{i=document.createElement("button");let o=this.a.state.phrase("Revert this chunk");i.setAttribute("aria-label",o),i.setAttribute("title",o),i.textContent=this.revertToLeft?"⇜":"⇝"}return i.style.top=e,i.setAttribute("data-chunk",String(n)),i}revertClicked(e){let n=e.target,i;for(;n&&n.parentNode!=this.revertDOM;)n=n.parentNode;if(n&&(i=this.chunks[n.dataset.chunk])){let[o,r,l,s,u,f]=this.revertToA?[this.b,this.a,i.fromB,i.toB,i.fromA,i.toA]:[this.a,this.b,i.fromA,i.toA,i.fromB,i.toB],a=o.state.sliceDoc(l,Math.max(l,s-1));l!=s&&(a+=o.state.lineBreak),r.dispatch({changes:{from:u,to:Math.min(r.state.doc.length,f),insert:a},userEvent:"revert"}),e.preventDefault()}}destroy(){this.a.destroy(),this.b.destroy(),this.measuring>-1&&(this.dom.ownerDocument.defaultView||window).cancelAnimationFrame(this.measuring),this.dom.remove()}}function ve(t){let e=t.nextSibling;return t.remove(),e}const Rt=Pe({__name:"Diffs",async setup(t){let e,n;const i=Xe(([e,n]=qe(()=>et({a:"",b:"",option:{lineWrapping:!0,lang:"Text",collapse:!1,revert:"b-to-a"}},{paste:!1})),e=await e,n(),e)),o=He();let r=J(null),l=J(null);const s=J({index:0,chunks:[]}),u=async h=>{const m=rt(h);return m?await m.load():[]},f=async()=>[o.theme.raw==="dark"?Ue:We,C.updateListener.of(h=>{l.value&&h.docChanged&&(h.view.dom.contains(l.value.a.dom)&&h.state.doc.toString()!==i.current.a&&(i.current.a=h.state.doc.toString()),h.view.dom.contains(l.value.b.dom)&&h.state.doc.toString()!==i.current.b&&(i.current.b=h.state.doc.toString()))}),await u(i.current.option.lang),i.current.option.lineWrapping?C.lineWrapping:[],ze($t("main_ui_input")),Ie()],a=async h=>{l.value&&l.value.destroy(),l.value=new kt({a:{doc:i.current.a,extensions:await f()},b:{doc:i.current.b,extensions:await f()},parent:h,revertControls:i.current.option.revert,collapseUnchanged:i.current.option.collapse?{}:void 0,highlightChanges:!0,gutter:!0})},c=async()=>{i.current.a=await le.simple(i.current.option.lang,"beautify",i.current.a),i.current.b=await le.simple(i.current.option.lang,"beautify",i.current.b),a(r.value)},d=h=>{if(!l.value)return;const m=h==="next"?s.value.index+1:s.value.index-1,g=s.value.chunks[m];g&&(l.value.dom.scrollTo({top:l.value.a.lineBlockAt(g.fromA).top,behavior:"smooth"}),s.value.index=m)};return je(()=>{setTimeout(()=>{a(r.value)},200)}),Je(()=>{var h;(h=l.value)==null||h.destroy()}),K(()=>({color:o.theme.raw,option:i.current.option}),()=>a(r.value),{deep:!0}),K(()=>({a:i.current.a,b:i.current.b}),()=>{setTimeout(()=>{l.value&&(s.value.index=0,s.value.chunks=l.value.chunks.map(h=>({fromA:h.fromA}))||[])},1e3)},{immediate:!0}),K(()=>i.current,()=>{i.current.a===""||i.current.b===""||i.save()},{deep:!0}),(h,m)=>{const g=L("HeightResize"),p=L("Select"),x=L("Button"),A=L("Bool"),b=L("Dropdown"),M=L("Input"),R=L("Align");return Qe(),Ke(R,{direction:"vertical",class:"ctool-diff"},{default:V(()=>[k(g,{ignore:"",append:[".ctool-page-option"],reduce:5},{default:V(({height:w})=>[Ye("div",{ref_key:"container",ref:r,style:Ze({height:`${w}px`,width:"100%",overflow:"hidden"})},null,4)]),_:1},8,["append"]),k(R,{class:"ctool-page-option",horizontal:"center"},{default:V(()=>[k(p,{modelValue:S(i).current.option.lang,"onUpdate:modelValue":m[0]||(m[0]=w=>S(i).current.option.lang=w),options:S(tt)},null,8,["modelValue","options"]),k(x,{text:h.$t("code_beautify"),onClick:c},null,8,["text"]),k(A,{modelValue:S(i).current.option.lineWrapping,"onUpdate:modelValue":m[1]||(m[1]=w=>S(i).current.option.lineWrapping=w),label:h.$t("component_editor_line_wrapping"),border:""},null,8,["modelValue","label"]),k(A,{modelValue:S(i).current.option.collapse,"onUpdate:modelValue":m[2]||(m[2]=w=>S(i).current.option.collapse=w),label:h.$t("diffs_collapse"),border:""},null,8,["modelValue","label"]),k(b,{onSelect:m[3]||(m[3]=w=>S(i).current.option.revert=w),placeholder:h.$t("diffs_revert_direction"),options:[{value:"b-to-a",label:h.$t("diffs_right_to_left")},{value:"a-to-b",label:h.$t("diffs_left_to_right")}]},null,8,["placeholder","options"]),k(M,{center:"",disabled:s.value.chunks.length===0,"model-value":`${s.value.chunks.length?s.value.index+1:0} / ${s.value.chunks.length}`,width:130},{prepend:V(()=>[k(x,{disabled:s.value.chunks.length===0||s.value.index===0,text:"<",onClick:m[4]||(m[4]=w=>d("last"))},null,8,["disabled"])]),append:V(()=>[k(x,{disabled:s.value.chunks.length===0||s.value.index===s.value.chunks.length-1,text:">",onClick:m[5]||(m[5]=w=>d("next"))},null,8,["disabled"])]),_:1},8,["disabled","model-value"])]),_:1})]),_:1})}}});export{Rt as default};
