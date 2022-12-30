import{J as u}from"./index-da14ef80.js";let $="abstract,dynamic,implements,show,as,else,import,static,assert,enum,in,super,async,export,interface,switch,await,extends,is,sync,break,external,library,this,case,factory,mixin,throw,catch,false,new,true,class,final,null,try,const,finally,on,typedef,continue,for,operator,var,covariant,Function,part,void,default,get,rethrow,while,deferred,hide,return,with,do,if,set,yield,List",m=$.split(",");const y=s=>s[0].toUpperCase()+s.substring(1),b=s=>{let o=s.split("_"),i=o[0];for(let p=1;p<o.length;p++)i+=y(o[p]);return m.includes(i)&&(i="m"+y(i)),i},f=s=>s.split("_").map(y).join(""),l=(s,o)=>{let i=[],p=[];for(let t in o){if(!o.hasOwnProperty(t))continue;let e="",c=!1,a=!1;switch(typeof o[t]){case"number":case"bigint":e="double";break;case"string":e="String";break;case"boolean":e="bool";break;case"object":if(Array.isArray(o[t]))if(c=!0,o[t].length>0){let n=o[t][0];switch(typeof n){case"number":e="double";break;case"string":e="String";break;case"boolean":e="bool";break;case"object":Array.isArray(n)?e="dynamic":(a=!0,e=s+f(t),p.push(l(e,n)));break}}else e="dynamic";else a=!0,e=s+f(t),p.push(l(e,o[t]));break}e!==""&&i.push({key:t,propertyName:b(t),propertyType:e,isSubclass:a,isArray:c})}let r=`class ${s} {

`;for(let t in i){let e=i[t];if(e.isArray)r+=`  List<${e.propertyType}> ${e.propertyName} = List<${e.propertyType}>();

`;else switch(e.propertyType){case"double":r+=`  ${e.propertyType} ${e.propertyName} = 0;

`;break;case"String":r+=`  ${e.propertyType} ${e.propertyName} = "";

`;break;case"bool":r+=`  ${e.propertyType} ${e.propertyName} = false;

`;break;default:r+=`  ${e.propertyType} ${e.propertyName} = ${e.propertyType}();

`;break}}r+=`  ${s}();

`,r+=`  ${s}.fromJson(Map<String, dynamic> json) {

`;for(let t in i){let e=i[t];e.isArray?r+=`    if (json["${e.key}"] != null && json["${e.key}"] is List) {
`:e.isSubclass?r+=`    if (json["${e.key}"] != null && json["${e.key}"] is Map) {
`:e.propertyType=="double"?r+=`    if (json["${e.key}"] != null && (json["${e.key}"] is int || json["${e.key}"] is double)) {
`:r+=`    if (json["${e.key}"] != null && json["${e.key}"] is ${e.propertyType}) {
`,e.isArray?e.isSubclass?(r+=`        final objs = List<${e.propertyType}>();
`,r+=`        for (var item in json["${e.key}"]) {
`,r+=`          objs.add(${e.propertyType}.fromJson(item));
`,r+=`        }
`,r+=`        this.${e.propertyName} = objs;
`):(r+=`        final objs = List<${e.propertyType}>();
`,r+=`        for (var item in json["${e.key}"]) {
`,r+=`          objs.add(item);
`,r+=`        }
`,r+=`        this.${e.propertyName} = objs;
`):e.isSubclass?r+=`        this.${e.propertyName} = ${e.propertyType}.fromJson(json["${e.key}"]);
`:e.propertyType=="double"?r+=`        this.${e.propertyName} = json["${e.key}"].toDouble();
`:r+=`        this.${e.propertyName} = json["${e.key}"];
`,r+=`    }
`}r+=`  }

`,r+=`  Map<String, dynamic> toJson() {
`,r+=`    final map = Map<String, dynamic>();
`;for(let t in i){let e=i[t];r+=`    if (this.${e.propertyName} != null) {
`,e.isArray&&e.isSubclass?r+=`        map["${e.key}"] = this.${e.propertyName}.map((e) => e.toJson()).toList();
`:e.isSubclass?r+=`        map["${e.key}"] = this.${e.propertyName}.toJson();
`:r+=`        map["${e.key}"] = this.${e.propertyName};
`,r+=`    }
`}r+=`    return map;
`,r+=`  }

`,r+=`}

`;for(let t in p)r+=p[t];return r},k=(s,o)=>l(o,u.parse(s));export{k as convert};
