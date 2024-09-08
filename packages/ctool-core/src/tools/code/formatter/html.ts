import prettier from "prettier/standalone";
import html from "prettier/plugins/html";
import Base from "./base";

import { minify } from "html-minifier-terser";

export const formatter = new (class extends Base<'html'> {
    async beautify(): Promise<string> {
        return prettier.format(this.code, {
            plugins: [html],
            parser: "html",
            tabWidth: this.getOptionValue('tab', 4)
        });
    }

    async compress(): Promise<string> {
        return minify(this.code,{
            collapseWhitespace: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            collapseBooleanAttributes: true,
            useShortDoctype: true,
        })
    }
})

