import prettier from "prettier/standalone";
import parserGraphql from "prettier/parser-graphql";
export const beautify = (code, option = {}) => {
    return prettier.format(code, {
        plugins: [parserGraphql],
        parser: "graphql",
        tabWidth: "tab" in option ? option.tab : 4
    });
}

export default {
    beautify
}
