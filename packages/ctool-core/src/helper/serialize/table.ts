import {unescape, isArray} from "lodash";

const createTempElement = (innerHTML = "", type = "div", id = "") => {
    const el = document.createElement(type);
    el.id = id ? id : `ctool-temp-${Math.ceil(Math.random() * 99999)}`
    el.style.cssText = "display:none;"
    document.body.appendChild(el);
    // 移除script标签
    el.innerHTML = innerHTML.replace(/<script/gmi, "<xxxxx")
    return el;
}

const nodeFilter = (item: string): string => {
    if (item === null) {
        return "";
    }
    const re = new RegExp("</?\\w+((\\s+\\w+(\\s*=\\s*(?:\".*?\"|'.*?'|[^'\">\\s]+))?)+\\s*|\\s*)/?>", 'igm');
    item = item.replace(/\r\n|\r|\n/gmi, ' ');
    item = item.replace(/\n|<br>|<br\/>|<br \/>/gmi, '\n');
    item = item.replace(re, '');
    item = unescape(item);
    item = item.replace(/&nbsp;/gmi, " ");
    return item.trim();
}

const jsonOutputFormat = (json, type = "json", keyed_key = 0) => {
    if (type === "keyed") {
        const keys = Object.keys(json[0])
        let result = {}
        for (let item of json) {
            let item_key = keys[keyed_key]
            result[item[item_key]] = item
        }
        return result
    }
    if (type === "row_array") {
        let result = json.map((item) => {
            return Object.values(item)
        })
        if (result.length > 0) {
            result = [
                Object.keys(json[0]),
                ...result
            ]
        }
        return result
    }
    if (type === "column_array") {
        const keys = Object.keys(json[0])
        let result = {}
        for (let key of keys) {
            result[key] = json.map((item) => {
                return item[key]
            })
        }
        return result
    }
    return json
}


export const tableKeys = (table) => {
    table = table.trim();
    if (!table) {
        return [];
    }
    const tableElement = createTempElement(table).getElementsByTagName('table')[0];
    let cells = tableElement.getElementsByTagName('tr')[0].querySelectorAll('td,th');
    let result: string[] = [];
    for (let n = 0; n < cells.length; n++) {
        result.push(nodeFilter(cells[n].innerHTML))
    }
    return result;
}

export const parse = (table = "", {
    keyed_key = 0,
    type = "row_object"
} = {}) => {
    table = table.trim();
    if (!table) {
        return "";
    }
    let keys = tableKeys(table)
    const rows = createTempElement(table).getElementsByTagName('table')[0].getElementsByTagName('tr')
    let result: any[] = [];
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i].querySelectorAll('td');
        let resultRow = {}
        for (let k = 0; k < keys.length; k++) {
            resultRow[keys[k]] = nodeFilter(k in row ? row[k].innerHTML : "")
        }
        result.push(resultRow)
    }
    return jsonOutputFormat(
        result,
        type,
        keyed_key
    )
}


const stringify = (json:any, {header = true} = {}) => {
    if (!isArray(json) || json.length < 1) {
        throw new Error("records is not iterable")
    }
    let html = ["<table>"];
    let keys = Object.keys(json[0])
    if (header) {
        html.push(
            '<thead>',
            '<tr>',
            ...keys.map((item) => {
                return `<th>${item}</th>`
            }),
            '</tr>',
            '</thead>'
        )
    }
    html.push("<tbody>")
    for (let row of json) {
        html.push("<tr>", ...keys.map((item) => {
            return `<td>${item in row ? row[item] : ""}</td>`
        }), '</tr>');
    }
    html.push("</tbody></table>")
    return html.join("")
}

export default {
    parse, stringify
}
