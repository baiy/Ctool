import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";

export const beautify = (code, option = {}) => {
    return prettier.format(code, {
        plugins: [parserHtml],
        parser: "html",
        tabWidth: "tab" in option ? option.tab : 4
    });
}
// eslint-disable-next-line no-unused-vars
export const compress = (code, options = {}) => {
    let headHTML = "";
    code = code.replace(/(\r\n|\n|\r|\t)/gm, "");
    code = code.replace(/\s+/g, " ");
    code = code.replace(new RegExp("</HEAD", "gi"), '</head');
    code = code.replace(new RegExp("</head ", "gi"), '</head');
    let bodySplit = "</head>";
    let i = code.indexOf(bodySplit) !== -1;
    if (i === true) {
        let tempo = code.split(new RegExp(bodySplit, 'i'));
        headHTML = tempo[0];
        code = tempo[1];
    } else {
        bodySplit = "";
    }
    code = code.replace(/(\r\n|\n|\r|\t)/gm, "");
    code = code.replace(/\s+/g, " ");
    return headHTML + bodySplit + '\n' + code;
}

export default {
    beautify, compress
}
