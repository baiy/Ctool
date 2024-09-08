import prettier from "prettier/standalone";
import markdown from "prettier/plugins/markdown";
import Base from "./base";

export const formatter = new (class extends Base<'markdown'> {
    async beautify(): Promise<string> {
        return prettier.format(this.code, {
            plugins: [markdown],
            parser: "markdown",
            tabWidth: this.getOptionValue('tab', 4)
        });
    }
})
