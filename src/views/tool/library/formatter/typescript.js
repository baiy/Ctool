import prettier from "prettier/standalone";
import parserTypeScript from "prettier/parser-typescript";
export const beautify = (code, option = {}) => {
    return prettier.format(code, {
        plugins: [parserTypeScript],
        parser: "typescript",
        tabWidth: "tab" in option ? option.tab : 4
    });
}

export default {
    beautify
}
