import { format } from "prettier/standalone";
import html from "prettier/plugins/html";
import Base from "./base";

export const formatter = new (class extends Base<"vue"> {
    async beautify(): Promise<string> {
        return format(this.code, {
            plugins: [html],
            parser: "vue",
            tabWidth: this.getOptionValue("tab", 4),
        });
    }
});
