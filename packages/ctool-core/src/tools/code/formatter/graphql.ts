import prettier from "prettier/standalone";
import parserGraphql from "prettier/parser-graphql";
import Base from "./base";

export const formatter = new (class extends Base<'graphql'> {
    async beautify(): Promise<string> {
        return prettier.format(this.code, {
            plugins: [parserGraphql],
            parser: "graphql",
            tabWidth: this.getOptionValue('tab', 4)
        });
    }
})
