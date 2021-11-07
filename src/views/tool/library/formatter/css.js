import prettier from "prettier/standalone";
import parserCss from "prettier/parser-postcss";
export const beautify = (code, option = {}) => {
    return prettier.format(code, {
        plugins: [parserCss],
        parser: "css",
        tabWidth: "tab" in option ? option.tab : 4
    });
}

// eslint-disable-next-line no-unused-vars
export const compress = (code, options = {}) => {
    return code
        // .replace(/\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\//g, "") // 移除注释
        .replace(/\s+/g, " ").replace(/{\s+/g, "{").replace(/}\s+/g, "}").replace(/;\s+/g, ";").replace(/\/\*\s+/g, "/*").replace(/\*\/\s+/g, "*/")
}

export default {
    beautify,compress
}
