// 算法来源 https://github.com/zx1262111739/JsonToDart/blob/main/index.js
let keywrods = "abstract,dynamic,implements,show,as,else,import,static,assert,enum,in,super,async,export,interface,switch,await,extends,is,sync,break,external,library,this,case,factory,mixin,throw,catch,false,new,true,class,final,null,try,const,finally,on,typedef,continue,for,operator,var,covariant,Function,part,void,default,get,rethrow,while,deferred,hide,return,with,do,if,set,yield,List";
let keywrodList = keywrods.split(",");
const caption = (s) => s[0].toUpperCase() + s.substring(1);
// 生成属性名
const generatePropertyName = (name) => {
    let nameParts = name.split("_");

    let output = nameParts[0];
    for (let index = 1; index < nameParts.length; index++) {
        output += caption(nameParts[index])
    }

    if (keywrodList.includes(output)) {
        output = "m" + caption(output);
    }
    return output;
}

// 生成类名
const generateClassName = (name) => {
    return name.split("_").map(caption).join("");
}

const convertObjectToClass = (className, obj) => {
    let propers = [];
    let subClass = [];
    for (let key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }
        let propertyType = "";
        let isArray = false;
        let isSubclass = false;

        switch (typeof obj[key]) {
            case "number":
                propertyType = "double";
                break;
            case "string":
                propertyType = "String";
                break;
            case "boolean":
                propertyType = "bool";
                break;
            case "object":
                if (Array.isArray(obj[key])) {
                    isArray = true;
                    if (obj[key].length > 0) {
                        let subObj = obj[key][0];
                        switch (typeof subObj) {
                            case "number":
                                propertyType = "double";
                                break;
                            case "string":
                                propertyType = "String";
                                break;
                            case "boolean":
                                propertyType = "bool";
                                break;
                            case "object":
                                if (Array.isArray(subObj)) {
                                    propertyType = "dynamic";
                                } else {
                                    isSubclass = true;
                                    propertyType = className + generateClassName(key);
                                    subClass.push(convertObjectToClass(propertyType, subObj));
                                }
                                break;
                        }

                    } else {
                        propertyType = "dynamic";
                    }
                } else {
                    isSubclass = true;
                    propertyType = className + generateClassName(key);
                    subClass.push(convertObjectToClass(propertyType, obj[key]));
                }
                break;
            default:
                break;
        }

        if (propertyType !== "") {
            propers.push({
                key,
                "propertyName": generatePropertyName(key),
                propertyType,
                isSubclass,
                isArray,
            });
        }

    }


    let output = `class ${className} {\n\n`;

    // -- 生成属性
    for (let idx in propers) {
        let prop = propers[idx];
        if (prop.isArray) {
            output += `  List<${prop.propertyType}> ${prop.propertyName} = List<${prop.propertyType}>();\n\n`;
        } else {
            switch (prop.propertyType) {
                case "double":
                    output += `  ${prop.propertyType} ${prop.propertyName} = 0;\n\n`;
                    break;
                case "String":
                    output += `  ${prop.propertyType} ${prop.propertyName} = "";\n\n`;
                    break;
                case "bool":
                    output += `  ${prop.propertyType} ${prop.propertyName} = false;\n\n`;
                    break;
                default:
                    output += `  ${prop.propertyType} ${prop.propertyName} = ${prop.propertyType}();\n\n`;
                    break;
            }
        }
    }

    // -- 生成默认构造方法
    output += `  ${className}();\n\n`

    // -- 生成FromJson方法
    output += `  ${className}.fromJson(Map<String, dynamic> json) {\n\n`;
    for (let idx in propers) {
        let prop = propers[idx];

        // -- 类型检测
        if (prop.isArray) {
            output += `    if (json["${prop.key}"] != null && json["${prop.key}"] is List) {\n`
        } else if (prop.isSubclass) {
            output += `    if (json["${prop.key}"] != null && json["${prop.key}"] is Map) {\n`
        } else if (prop.propertyType == "double") {
            output += `    if (json["${prop.key}"] != null && (json["${prop.key}"] is int || json["${prop.key}"] is double)) {\n`
        } else {
            output += `    if (json["${prop.key}"] != null && json["${prop.key}"] is ${prop.propertyType}) {\n`
        }

        if (prop.isArray) {
            if (prop.isSubclass) {
                output += `        final objs = List<${prop.propertyType}>();\n`;
                output += `        for (var item in json["${prop.key}"]) {\n`;
                output += `          objs.add(${prop.propertyType}.fromJson(item));\n`;
                output += `        }\n`;
                output += `        this.${prop.propertyName} = objs;\n`
            } else {
                output += `        final objs = List<${prop.propertyType}>();\n`;
                output += `        for (var item in json["${prop.key}"]) {\n`;
                output += `          objs.add(item);\n`;
                output += `        }\n`;
                output += `        this.${prop.propertyName} = objs;\n`
            }
        } else if (prop.isSubclass) {
            output += `        this.${prop.propertyName} = ${prop.propertyType}.fromJson(json["${prop.key}"]);\n`;
        } else if (prop.propertyType == "double") {
            output += `        this.${prop.propertyName} = json["${prop.key}"].toDouble();\n`
        } else {
            output += `        this.${prop.propertyName} = json["${prop.key}"];\n`
        }
        output += `    }\n`
    }
    output += `  }\n\n`

    // -- 生成ToJson方法
    output += `  Map<String, dynamic> toJson() {\n`;
    output += `    final map = Map<String, dynamic>();\n`
    for (let idx in propers) {
        let prop = propers[idx];
        output += `    if (this.${prop.propertyName} != null) {\n`

        if (prop.isArray && prop.isSubclass) {
            output += `        map["${prop.key}"] = this.${prop.propertyName}.map((e) => e.toJson()).toList();\n`;
        } else if (prop.isSubclass) {
            output += `        map["${prop.key}"] = this.${prop.propertyName}.toJson();\n`
        } else {
            output += `        map["${prop.key}"] = this.${prop.propertyName};\n`
        }

        output += `    }\n`
    }
    output += `    return map;\n`
    output += "  }\n\n";

    output += "}\n\n"

    for (let idx in subClass) {
        output += subClass[idx];
    }

    return output;
}

export default (json, typename) => convertObjectToClass(typename, json)
