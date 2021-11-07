import xmlFormatter from "xml-formatter"

export const beautify = (code, option = {}) => {
    return xmlFormatter(code, {
        indentation: " ".repeat("tab" in option ? option.tab : 4),
        collapseContent: true,
        lineSeparator: '\n'
    });
}
// eslint-disable-next-line no-unused-vars
export const compress = (code, options = {}) => {
    return xmlFormatter(code, {
        indentation: '',
        collapseContent: true,
        lineSeparator: ''
    });
}

export default {
    beautify, compress
}
