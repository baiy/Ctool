import { format } from "prettier/standalone";
import babel from "prettier/plugins/babel";
import estree from "prettier/plugins/estree";
import Base from "./base";
import jsonMinify from "./jsonMinify";


export const formatter = new (class extends Base<"json"> {
    async beautify(): Promise<string> {
        return format(this.code, {
            parser: "json5",
            plugins: [babel, estree],
            quoteProps: "preserve",
            trailingComma: "none",
            tabWidth: this.getOptionValue("tab", 4),
            printWidth: 1,
        });
    }

    async compress(): Promise<string> {
        return jsonMinify(this.code);
    }
});


