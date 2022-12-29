import prettier from "prettier/standalone";
import parserCss from "prettier/parser-postcss";
import {minify} from 'csso';
import Base from "./base";

export const formatter = new (class extends Base<'css'> {
    async beautify(): Promise<string> {
        return prettier.format(this.code, {
            plugins: [parserCss],
            parser: "css",
            tabWidth: this.getOptionValue('tab', 4)
        });
    }

    async compress(): Promise<string> {
        return minify(this.code, {restructure: false}).css;
    }
})

