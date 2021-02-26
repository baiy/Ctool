export default {
    _allClass: [],
    format: function (string, ...replace) {
        return string.replace(/\{(\d+)\}/g,
            function (m, i) {
                return replace[i];
            });
    },
    _genClassCode: function (obj, name, pag) {
        let clas = this.format("// ========= "+name+".cs file ========= \nnamespace {0}\n{\n", pag);
        clas += this.format("    public class {0}\n    {\n", name);
        for (let n in obj) {
            let v = obj[n];
            n = n.trim();
            clas += this.format(
                "        {0}        public {1} {2} { get; set; }\n",
                this._genComment(v),
                this._genTypeByProp(n, v,pag),
                n
            );
        }
        clas += "    }\n";
        clas += "}\n";
        console.log(pag)
        this._allClass.push(clas);
        return this._allClass.join("\n");
    },
    _genTypeByProp: function (name, val,pag) {
        switch (Object.prototype.toString.apply(val)) {
            case "[object Number]": {
                return val.toString().indexOf(".") > -1 ? "double" : "int";
            }
            case "[object Date]": {
                return "DateTime";
            }
            case "[object Object]": {
                name = name.substring(0, 1).toUpperCase() + name.substring(1);
                this._genClassCode(val, name,pag);
                return name;
            }
            case "[object Array]": {
                return this.format("List <{0}>", this._genTypeByProp(name + "Item", val[0],pag));
            }
            default: {
                return "string";
            }
        }
    },
    _genComment: function (val) {
        let commm = typeof (val) == "string" && /.*[\u4e00-\u9fa5]+.*$/.test(val) ? val : "";
        return "/// <summary>\n        /// " + commm + "\n        /// </summary>\n";
    },
    convert: function (jsonObj, cls, pag) {
        this._allClass = [];
        return this._genClassCode(jsonObj, cls, pag);
    }
}