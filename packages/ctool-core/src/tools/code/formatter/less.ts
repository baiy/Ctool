import prettier from "prettier/standalone";
import css from "prettier/plugins/postcss";
import Base from "./base";

export const formatter = new (class extends Base<'less'> {

    async beautify(): Promise<string> {
        return prettier.format(this.code, {
            plugins: [css],
            parser: "less",
            tabWidth: this.getOptionValue('tab', 4)
        });
    }
})
