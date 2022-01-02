import prettier from "prettier/standalone";
import parserJson5 from "prettier/parser-babel";

export const beautify = (code, {tab = 4} = {}) => {
    return prettier.format(code, {
        parser: "json5",
        plugins: [parserJson5],
        quoteProps: "preserve",
        trailingComma: "none",
        tabWidth: tab,
        printWidth: 1
    })
}
export const objectBeautify = (codeObject, option = {}) => {
    return beautify(JSON.stringify(codeObject), option)
}
// eslint-disable-next-line no-unused-vars
export const compress = (code, options = {}) => {
    let result = []
    for (let i = !1, o = 0, r = (code = code.split("\n").join(" ")).length; o < r; o++) {
        let a = code.charAt(o);
        i && a === i ? "\\" !== code.charAt(o - 1) && (i = !1) : i || '"' !== a && "'" !== a ? i || " " !== a && "\t" !== a || (a = "") : i = a
        result.push(a)
    }
    return result.join("")
}

export default {
    beautify, compress, objectBeautify
}
