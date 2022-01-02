const IMPORT_MAP = {'Date': 'java.util.Date', 'List': 'java.util.List'}
let attrClassAry = [];

function firstToUpperCase(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}

function camelCase(input) {
    return input.toLowerCase().replace(/_(.)/g, function (match, group1) {
        return group1.toUpperCase();
    });
}

function camelCaseWithFirstCharUpper(input) {
    if (!input) {
        return ""
    }
    input = camelCase(input);
    return input[0].toUpperCase() + input.substr(1);
}

function isDate(date) {
    return new Date(date) !== "Invalid Date" && !isNaN(new Date(date)) && isNaN(+date);
}

function isInt(n) {
    return n % 1 === 0;
}

function toBeanText(bean, packageName) {
    let beanFields = bean.val;
    let className = bean.name;
    let importText = "";
    let fieldText = "";
    let setterText = "";
    let typeSet = {};
    let shoudImportJackson = false;
    let tpl = "    public void setA(T a) {\n \
        this.a = a;\n \
    }\n \
    public T getA() {\n \
        return a;\n \
    }\n";
    for (let key in beanFields) {
        let camelKey = camelCase(key);
        if (camelKey !== key) {
            fieldText += '    @JsonProperty("' + key + '")\n';
            shoudImportJackson = true;
        }
        fieldText += "    private " + beanFields[key] + " " + camelKey + ";\n";
        let type = beanFields[key];
        if (type.indexOf("List<") > -1) {
            type = beanFields[key].replace('List<', "");
            type = type.replace('>', "");
            typeSet["List"] = 'true';
        }
        typeSet[type] = 'true';
        let tplMap = {a: camelKey, A: firstToUpperCase(camelKey), T: beanFields[key]};
        setterText += tpl.replace(/a|A|T/g, function (matched) {
            return tplMap[matched];
        });
    }
    for (let t in typeSet) {
        if (IMPORT_MAP[t]) {
            importText += "import " + IMPORT_MAP[t] + ";\n";
        }
    }
    if (shoudImportJackson) {
        importText += "import org.codehaus.jackson.annotate.JsonIgnoreProperties;\nimport org.codehaus.jackson.annotate.JsonProperty;\n"
    }
    if (packageName) {
        importText = "package " + packageName + ";\n" + importText;
    }
    return "/*=============="+className+".java file============*/\n"+importText + "\n" + "public class " + className + " {\n" + fieldText + setterText + "}\n\n";
}

function getBeanFieldFromJson(json, className) {
    let jsonObject;
    let text = JSON.stringify(json);
    if (text[0] === "[" && text[text.length - 1] === "]") {
        text = '{ "list": ' + text + '}';
        jsonObject = JSON.parse(text).list[0];
    } else {
        jsonObject = JSON.parse(text);
    }
    let bean = {};
    attrClassAry = []
    for (let key in jsonObject) {
        const val = jsonObject[key];
        bean[key] = getTypeFromJsonVal(val, key, attrClassAry);
    }
    if (!className) {
        className = "AtoolBean";
    }
    bean = {name: className, val: bean};
    return [bean, ...attrClassAry];
}

function getTypeFromJsonVal(val, key, attrClassAry) {
    if (val && val.replace) {
        val = val.replace(/ /g, "");
    }
    let typeofStr = typeof (val);
    if (typeofStr === 'number') {
        if (isInt(val)) {
            return "int";
        } else {
            return "double";
        }
    } else if (typeofStr === 'boolean') {
        return typeofStr;
    } else if (isDate(val)) {
        return "Date";
    } else if (!val) {
        return "String";
    } else if (typeofStr === 'string') {
        return "String";
    } else {
        if (Array.isArray(val)) {
            let type = getTypeFromJsonVal(val[0], key, attrClassAry);
            return "List<" + type + ">";
        } else {
            let typeName = camelCaseWithFirstCharUpper(key);
            let bean = {};
            for (key in val) {
                let fieldValue = val[key];
                bean[key] = getTypeFromJsonVal(fieldValue, key, attrClassAry);
            }
            attrClassAry.push({name: typeName, val: bean});
            return typeName;
        }
    }
}

export default (json, cls = "JsonRootBean", pag = "pag.json2bean") => {
    let beans = [];
    let temp = getBeanFieldFromJson(json, cls);
    for (let key in temp) {
        beans.push(toBeanText(temp[key], pag));
    }
    return beans.join("\n");
}