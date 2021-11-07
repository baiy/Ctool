import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";

export const beautify = (code, option = {}) => {
    return prettier.format(code, {
        plugins: [parserHtml],
        parser: "vue",
        tabWidth: "tab" in option ? option.tab : 4
    });
}

export default {
    beautify
}
