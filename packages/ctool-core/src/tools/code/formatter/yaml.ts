import prettier from "prettier/standalone";
import yaml from "prettier/plugins/yaml";
import Base from "./base";

export const formatter = new (class extends Base<"yaml"> {

    async beautify(): Promise<string> {
        return prettier.format(this.code, {
            plugins: [yaml],
            parser: "yaml",
            tabWidth: this.getOptionValue("tab", 4),
        });
    }
});
