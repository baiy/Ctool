import prettier from "prettier/standalone";
import phpPlugin from "@prettier/plugin-php/standalone";
import Base from "./base";

export const formatter = new (class extends Base<"php"> {
    async beautify(): Promise<string> {
        return prettier.format(this.code, {
            plugins: [phpPlugin],
            parser: "php",
            tabWidth: this.getOptionValue("tab", 4),
        });
    }
});
