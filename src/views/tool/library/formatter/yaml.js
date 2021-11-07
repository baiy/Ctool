import prettier from "prettier/standalone";
import parser from "prettier/parser-yaml";

export const beautify = (code, option = {}) => {
    return prettier.format(code, {
        plugins: [parser],
        parser: "yaml",
        tabWidth: "tab" in option ? option.tab : 4
    });
}

export default {
    beautify
}
