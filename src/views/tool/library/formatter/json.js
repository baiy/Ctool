export const beautify = (code, option = {}) => {
    return JSON.stringify(JSON.parse(code.trim()), null, "tab" in option ? option.tab : 4)
}
// eslint-disable-next-line no-unused-vars
export const compress = (code, options = {}) => {
    return JSON.stringify(JSON.parse(code.trim()), null, 0)
}

export default {
    beautify, compress
}
