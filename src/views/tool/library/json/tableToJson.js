import {createTempElement, jsonOutputFormat} from "./helper";
import _ from "lodash";

const nodeFilter = (item) => {
    if (item == null) {
        return "";
    }
    const re = new RegExp("<\/?\\w+((\\s+\\w+(\\s*=\\s*(?:\".*?\"|'.*?'|[^'\">\\s]+))?)+\\s*|\\s*)\/?>", 'igm');
    item = item.replace(/\r\n|\r|\n/gmi, ' ');
    item = item.replace(/\n|<br>|<br\/>|<br \/>/gmi, '\n');
    item = item.replace(re, '');
    item = _.unescape(item);
    item = item.replace(/&nbsp;/gmi, " ");
    return item.trim();
}

export const tableKeys = (table) => {
    table = table.trim();
    if (!table) {
        return [];
    }
    const tableElement = createTempElement(table).getElementsByTagName('table')[0];
    let cells = tableElement.getElementsByTagName('tr')[0].querySelectorAll('td,th');
    let result = [];
    for (let n = 0; n < cells.length; n++) {
        result.push(nodeFilter(cells[n].innerHTML))
    }
    return result;
}

const convert = (table = "", {
    keyed_key = 0,
    type = "json"
} = {}) => {
    table = table.trim();
    if (!table) {
        return "";
    }
    let keys = tableKeys(table)
    const rows = createTempElement(table).getElementsByTagName('table')[0].getElementsByTagName('tr')
    let result = [];
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

export default convert
