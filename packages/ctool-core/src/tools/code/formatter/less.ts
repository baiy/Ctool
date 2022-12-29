import prettier from "prettier/standalone";
import parserCss from "prettier/parser-postcss";
import Base from "./base";

export const formatter = new (class extends Base<'less'> {

    async beautify(): Promise<string> {
        return prettier.format(this.code, {
            plugins: [parserCss],
            parser: "less",
            tabWidth: this.getOptionValue('tab', 4)
        });
    }
})
