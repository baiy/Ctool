import prettier from "prettier/standalone";
import Base from "./base";

export const formatter = new (class extends Base<'java'> {
    async beautify(): Promise<string> {
        return prettier.format(this.code, {
            parser: "java",
            tabWidth: this.getOptionValue('tab', 4)
        });
    }
})
