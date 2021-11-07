import prettier from "prettier/standalone";
import parserCss from "prettier/parser-postcss";
export const beautify = (code, option = {}) => {
    return prettier.format(code, {
        plugins: [parserCss],
        parser: "less",
        tabWidth: "tab" in option ? option.tab : 4
    });
}

export default {
    beautify
}
