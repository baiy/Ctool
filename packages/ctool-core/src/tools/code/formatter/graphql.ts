import prettier from "prettier/standalone";
import graphql from "prettier/plugins/graphql";
import Base from "./base";

export const formatter = new (class extends Base<"graphql"> {
    async beautify(): Promise<string> {
        return prettier.format(this.code, {
            plugins: [graphql],
            parser: "graphql",
            tabWidth: this.getOptionValue("tab", 4),
        });
    }
});
