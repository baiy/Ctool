import prettier from "prettier/standalone";
import parserSql from "prettier-plugin-sql";
export const beautify = (code, option = {}) => {
    return prettier.format(code, {
        plugins: [parserSql],
        parser: "sql",
        tabWidth: "tab" in option ? option.tab : 4
    });
}
// eslint-disable-next-line no-unused-vars
export const compress = (code, options = {}) => {
    return code.replace(/\s+/g, " ").replace(/\s+\(/, "(").replace(/\s+\)/, ")")
}

export default {
    beautify,compress
}
