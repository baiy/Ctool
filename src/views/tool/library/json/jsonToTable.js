import _ from "lodash";
import {beautify} from "../formatter/html";

const convert = (json = [], {header = true} = {}) => {
    if (!_.isArray(json) || json.length < 1) {
        return ""
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
    return beautify(html.join(""))
}

export default convert
