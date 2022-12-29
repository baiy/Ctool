import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";
import Base from "./base";

export const formatter = new (class extends Base<'vue'> {
    async beautify(): Promise<string> {
        return prettier.format(this.code, {
            plugins: [parserHtml],
            parser: "vue",
            tabWidth: this.getOptionValue('tab', 4)
        });
    }
})
