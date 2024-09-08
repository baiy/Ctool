import Base from "./base";
import UglifyJS from "uglify-js-export";
import { format } from "prettier/standalone";
import babel from "prettier/plugins/babel";
import estree from "prettier/plugins/estree";

export const formatter = new (class extends Base<"javascript"> {
    async beautify(): Promise<string> {
        return format(this.code, {
            plugins: [babel, estree],
            parser: "babel",
            tabWidth: this.getOptionValue("tab", 4),

        });
    }

    async compress(): Promise<string> {
        let result = UglifyJS.minify(this.code, {
            keep_fnames: true,
            compress: false,
            mangle: false,
            output: {
                beautify: false,
            },
        });
        if (!("code" in result) || !result.code) {
            throw new Error(JSON.stringify(result.error));
        }
        return result.code;
    }
});
