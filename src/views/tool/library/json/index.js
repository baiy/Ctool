import Unicode from "../unicode";
import formatter from "../formatter/json";
import csvToJson from './csvToJson';
import tableToJson from './tableToJson';
import jsonToTable from './jsonToTable';
import {stringify} from 'csv-stringify/lib/sync';
// 校验语法
export const check = (content) => {
    require('jsonlint').parse(content)
    return content;
}

// 美化
export const beautify = (content) => {
    return formatter.beautify(check(content))
}

// 压缩
export const compress = (content) => {
    return formatter.compress(content)
}

// unicode2zh
export const unicode2zh = (content) => {
    return Unicode.decode(
        content.replace(/\\U[0-9a-fA-F]{4}/g, (item) => {
            // \Uxxxx=>\uxxxx
            return item.replace("\\U", "\\u");
        })
    )
}

// zh2unicode
export const zh2unicode = (content) => {
    if (content) {
        let newStr = ''
        for (let i = 0; i < content.length; i++) {
            let str = content.charAt(i)
            newStr += /[\u4e00-\u9fa5]/.test(str) ? '\\u' + str.charCodeAt(0).toString(16) : str
        }
        return newStr
    }
    return content
}

// 转义
export const escape = (content) => {
    return content.trim().replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

// 去转义
export const clearEscape = (content) => {
    return content.trim().replace(/\\\\/g, '\\').replace(/\\"/g, '"')
}

// 转get参数
export const toGet = (content) => {
    check(content)
    return require('query-string').stringify(
        JSON.parse(content), {arrayFormat: 'bracket'}
    )
}

// get转json
export const fromGet = (content) => {
    return beautify(JSON.stringify(require('query-string').parse(content.trim(), {arrayFormat: 'bracket'})))
}

export default {
    check,
    beautify,
    compress,
    unicode2zh,
    zh2unicode,
    escape,
    clearEscape,
    toGet,
    fromGet,
    csvToJson: (csv = "", option = {}) => {
        return beautify(JSON.stringify(csvToJson(csv, option)))
    },
    jsonToCsv: (json = [], {quoted = false, header = true} = {}) => {
        return stringify(json, {quoted, header})
    },
    tableToJson: (table = "", option = {}) => {
        return beautify(JSON.stringify(tableToJson(table, option)))
    },
    jsonToTable: (json = [], option = {}) => {
        return jsonToTable(json, option)
    },
}
