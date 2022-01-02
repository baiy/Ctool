export default {
    _allClass: [],
    format(string, ...replace) {
        return string.replace(/\{(\d+)\}/g,
            (m, i) => replace[i]
        );
    },
    _genClassCode(obj, name, pag) {
        let clas = "// ========= " + name + `.cs file ========= \nnamespace ${pag}\n{\n`;
        clas += `    public class ${name}\n    {\n`;
        for (let n in obj) {
            let v = obj[n];
            n = n.trim();
            clas += `        ${this._genComment(v)}        public ${this._genTypeByProp(n, v, pag)} ${n} { get; set; }\n`;
        }
        clas += "    }\n";
        clas += "}\n";
        console.log(pag)
        this._allClass.push(clas);
        return this._allClass.join("\n");
    },
    _genTypeByProp(name, val, pag) {
        switch (Object.prototype.toString.apply(val)) {
            case "[object Number]": {
                return val.toString().includes(".") ? "double" : "int";
            }
            case "[object Date]": {
                return "DateTime";
            }
            case "[object Object]": {
                name = name.substring(0, 1).toUpperCase() + name.substring(1);
                this._genClassCode(val, name, pag);
                return name;
            }
            case "[object Array]": {
                return `List <${this._genTypeByProp(name + "Item", val[0], pag)}>`;
            }
            default: {
                return "string";
            }
        }
    },
    _genComment(val) {
        let commm = typeof (val) == "string" && /.*[\u4e00-\u9fa5]+.*$/.test(val) ? val : "";
        return "/// <summary>\n        /// " + commm + "\n        /// </summary>\n";
    },
    convert(jsonObj, cls, pag) {
        this._allClass = [];
        return this._genClassCode(jsonObj, cls, pag);
    }
}