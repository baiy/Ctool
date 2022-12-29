import prettier from "prettier/standalone";
import parser from "prettier/parser-markdown";
import Base from "./base";

export const formatter = new (class extends Base<'markdown'> {
    async beautify(): Promise<string> {
        return prettier.format(this.code, {
            plugins: [parser],
            parser: "markdown",
            tabWidth: this.getOptionValue('tab', 4)
        });
    }
})
