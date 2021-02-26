import codeFormatter from 'code-formatter'
import xmlFormatter from "xml-formatter"

export default (code, type, isCompress = false) => {
    if (type === "xml") {
        return xmlFormatter(code, {
            indentation: isCompress ? '' : '  ',
            collapseContent: true,
            lineSeparator: isCompress ? '' : '\n'
        });
    }
    return codeFormatter(code, {
        method: isCompress ? type + "min" : type
    })
}