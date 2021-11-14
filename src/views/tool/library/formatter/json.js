export const beautify = (code, option = {}) => {
    return objectBeautify(JSON.parse(code.trim()), option)
}
export const objectBeautify = (codeObject, option = {}) => {
    return JSON.stringify(codeObject, null, "tab" in option ? option.tab : 4)
}
// eslint-disable-next-line no-unused-vars
export const compress = (code, options = {}) => {
    try {
        return JSON.stringify(JSON.parse(code.trim()), null, 0)
    } catch (e) {
        return code.replace(/\n/g, '').replace(/\r/g, '')
    }
}

export default {
    beautify, compress,objectBeautify
}
