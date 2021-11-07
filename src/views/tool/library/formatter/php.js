import prettier from "prettier/standalone";
import phpPlugin from "@prettier/plugin-php/standalone";
export const beautify = (code, option = {}) => {
    return prettier.format(code, {
        plugins: [phpPlugin],
        parser: "php",
        tabWidth: "tab" in option ? option.tab : 4
    });
}

export default {
    beautify
}
