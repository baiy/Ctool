import prettier from "prettier/standalone";
import css from "prettier/plugins/postcss";
import Base from "./base";

export const formatter = new (class extends Base<'scss'> {
    async beautify(): Promise<string> {
        return prettier.format(this.code, {
            plugins: [css],
            parser: "scss",
            tabWidth: this.getOptionValue('tab', 4)
        });
    }
})
