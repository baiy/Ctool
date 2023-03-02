import prettier from "prettier/standalone";
import parserJson5 from "prettier/parser-babel";
import Base from "./base";

export const formatter = new (class extends Base<'json'> {
    async beautify(): Promise<string> {
        return prettier.format(this.code, {
            parser: "json",
            plugins: [parserJson5],
            quoteProps: "preserve",
            trailingComma: "none",
            tabWidth: this.getOptionValue('tab', 4),
            printWidth: 1
        });
    }

    async compress(): Promise<string> {
        return prettier.format(this.code, {
            parser: "json",
            plugins: [parserJson5],
            quoteProps: "preserve",
            trailingComma: "none",
            tabWidth: 0,
        }).replace(/[\n\r]/g, "")
    }
})


