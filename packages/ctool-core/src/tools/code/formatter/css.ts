import prettier from "prettier/standalone";
import css from "prettier/plugins/postcss";
import {minify} from 'csso';
import Base from "./base";

export const formatter = new (class extends Base<'css'> {
    async beautify(): Promise<string> {
        return prettier.format(this.code, {
            plugins: [css],
            parser: "css",
            tabWidth: this.getOptionValue('tab', 4)
        });
    }

    async compress(): Promise<string> {
        return minify(this.code, {restructure: false}).css;
    }
})

