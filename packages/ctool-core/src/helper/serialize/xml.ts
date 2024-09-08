import x2js from "x2js"
import {isPlainObject, isArray} from "lodash"
import Json from "@/helper/json";

const removeEmptyRoot = (obj: any) => {
    if (!isPlainObject(obj) && !isArray(obj)) {
        return obj
    }
    if (isArray(obj)) {
        return obj.map((item) => {
            return removeEmptyRoot(item)
        })
    }
    const keys = Object.keys(obj)
    if (keys.length === 1) {
        return removeEmptyRoot(obj[keys[0]])
    }
    for (let i in keys) {
        obj[keys[i]] = removeEmptyRoot(obj[keys[i]])
    }
    return obj;
}

const parse = (xml: string, {attribute_prefix = ""}: Record<string, any> = {}) => {
    attribute_prefix = attribute_prefix === "" ? "@attribute_" : attribute_prefix
    return removeEmptyRoot((new x2js({attributePrefix: attribute_prefix})).xml_str2json(xml) || {});
}

function fixObjectArray(o) {
    let names = ["row", "entry", "key", "item", "node"];
    let s = Json.stringify(o, null, '\t');
    let a = s.split(/\r\n|\n|\r/gm);
    let c, j, k, x, z;

    function isArrayNoName(text, stop) {
        let count = 0;
        let index = 0;
        while (text.charAt(index) === "\t") {
            count++;
            index++;
        }
        if (text.charAt(index) === stop) return count;
        else return -1;

    }

    for (j = 0; j < a.length; j++) {
        x = isArrayNoName(a[j], '[');
        if (x >= 0) {
            if (a[j].substring(j) === '[]') {
                a[j] = '{ "' + names[x % names.length] + '": ' + a[j] + "}";
                continue;
            }
            if (a[j].substring(j) === '[],') {
                a[j] = '{ "' + names[x % names.length] + '": ' + a[j].substring(0, a[j].length - 1) + "},";
                continue;
            }
            a[j] = '{ "' + names[x % names.length] + '": ' + a[j];
            for (k = j + 1; k < a.length; k++) {
                c = isArrayNoName(a[k], ']');
                if (c === x) {
                    z = a[k].slice(-1);
                    if (z === ",") {
                        a[k] = a[k].substring(0, a[k].length - 1) + "},";
                    } else {
                        a[k] += "}";
                    }
                    break;
                }
            }
        }
    }
    return a.join("\n");
}

const stringify = (data: any, {attribute_prefix = ""}: Record<string, any> = {}) => {
    if (!isPlainObject(data) && !isArray(data)) {
        return ""
    }
    // 对象
    if (
        (isPlainObject(data) && Object.keys(data).length > 1) // 多key对象
        || (isPlainObject(data) && Object.keys(data).length === 0) // 空对象
        || (isPlainObject(data) && Object.keys(data).length === 1 && isArray(data[Object.keys(data)[0]])) // 对象单key数组
    ) {
        data = {root: data}
    }
    // 数组
    if (isArray(data)) {
        data = {root: {row: data}}
    }
    attribute_prefix = attribute_prefix === "" ? "@attribute_" : attribute_prefix
    return (new x2js({attributePrefix: attribute_prefix})).json2xml_str(Json.parse(fixObjectArray(data))) as string;
}
export default {
    parse,
    stringify
}
