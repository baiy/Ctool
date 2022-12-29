import prettier from "prettier/standalone";
import parserTypeScript from "prettier/parser-typescript";
import Base from "./base";

export const formatter = new (class extends Base<'typescript'> {
    async beautify(): Promise<string> {
        return prettier.format(this.code, {
            plugins: [parserTypeScript],
            parser: "typescript",
            tabWidth: this.getOptionValue('tab', 4)
        });
    }
})



