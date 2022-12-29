import prettier from "prettier/standalone";
import parser from "prettier/parser-yaml";
import Base from "./base";

export const formatter = new (class extends Base<'yaml'> {

    async beautify(): Promise<string> {
        return prettier.format(this.code, {
            plugins: [parser],
            parser: "yaml",
            tabWidth: this.getOptionValue('tab', 4)
        });
    }
})
