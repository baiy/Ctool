import prettier from "prettier/standalone";
import parser from "prettier/parser-markdown";

export const beautify = (code, option = {}) => {
    return prettier.format(code, {
        plugins: [parser],
        parser: "markdown",
        tabWidth: "tab" in option ? option.tab : 4
    });
}

export default {
    beautify
}
