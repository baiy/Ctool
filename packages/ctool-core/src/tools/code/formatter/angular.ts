import prettier from "prettier/standalone";
import parserAngular from "prettier/parser-angular";
import Base from "./base";

export const formatter = new (class extends Base<'angular'> {
    async beautify(): Promise<string> {
        return prettier.format(this.code, {
            plugins: [parserAngular],
            parser: "angular",
            tabWidth: this.getOptionValue('tab', 4)
        });
    }
})

