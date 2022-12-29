import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";
import Base from "./base";

export const formatter = new (class extends Base<'html'> {
    async beautify(): Promise<string> {
        return prettier.format(this.code, {
            plugins: [parserHtml],
            parser: "html",
            tabWidth: this.getOptionValue('tab', 4)
        });
    }

    async compress(): Promise<string> {
        let headHtml = "";
        let code = this.code;
        code = code.replace(/(\r\n|\n|\r|\t)/gm, "");
        code = code.replace(/\s+/g, " ");
        code = code.replace(new RegExp("</HEAD", "gi"), '</head');
        code = code.replace(new RegExp("</head ", "gi"), '</head');
        let bodySplit = "</head>";
        if (code.includes(bodySplit)) {
            let tempo = code.split(new RegExp(bodySplit, 'i'));
            headHtml = tempo[0];
            code = tempo[1];
        } else {
            bodySplit = "";
        }
        code = code.replace(/(\r\n|\n|\r|\t)/gm, "");
        code = code.replace(/\s+/g, " ");
        return headHtml + bodySplit + '\n' + code;
    }
})

