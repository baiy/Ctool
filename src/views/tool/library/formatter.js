import codeFormatter from "code-formatter";
import xmlFormatter from "xml-formatter";
import prettier from "prettier/standalone";
import parser from "prettier/parser-babel";
import parserTypeScript from "prettier/parser-typescript";
import parserGraphql from "prettier/parser-graphql";
import parserMarkdown from "prettier/parser-markdown";
import parserCss from "prettier/parser-postcss";
import parserYaml from "prettier/parser-yaml";
import parserHtml from "prettier/parser-html";
import parserJson5 from "prettier/parser-babel";
//https://github.com/prettier/prettier/issues/6264#issuecomment-507535391
const options = {
  js: { parser: "babel", plugins: [parser] },
  ts: { parser: "typescript", plugins: [parserTypeScript] },
  vue: { parser: "vue", plugins: [parserHtml] },
  graphql: { parser: "graphql", plugins: [parserGraphql] },
  markdown: { parser: "markdown", plugins: [parserMarkdown] },
  css: { parser: "css", plugins: [parserCss] },
  less: { parser: "less", plugins: [parserCss] },
  scss: { parser: "scss", plugins: [parserCss] },
  yaml: { parser: "yaml", plugins: [parserYaml] },
  html: { parser: "html", plugins: [parserHtml] },
  angular: { parser: "angular", plugins: [parserHtml] },
  json5: { parser: "json5", plugins: [parserJson5] },
};
export default (code, type, isCompress = false) => {
  if (type === "xml") {
    return xmlFormatter(code, {
      indentation: isCompress ? "" : "  ",
      collapseContent: true,
      lineSeparator: isCompress ? "" : "\n",
    });
  } else if (type === "sql") {
    return codeFormatter(code, {
      method: isCompress ? type + "min" : type,
    });
  } else {
    return prettier.format(code, options[type]);
  }
};
