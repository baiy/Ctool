import prettier from "prettier/standalone";
import parser from "prettier/parser-babel";
import parserJson5 from "prettier/parser-babel";
import parserTypeScript from "prettier/parser-typescript";
import parserGraphql from "prettier/parser-graphql";
import parserMarkdown from "prettier/parser-markdown";
import parserCss from "prettier/parser-postcss";
import parserYaml from "prettier/parser-yaml";
import parserHtml from "prettier/parser-html";
import parserJava from "prettier-plugin-java";
import parserSql from "prettier-plugin-sql";
import parserPhp from "@prettier/plugin-php";
import parserXml from "@prettier/plugin-xml";

//https://github.com/prettier/prettier/issues/6264#issuecomment-507535391
const options = {
    js: {parser: "babel", plugins: [parser]},
    ts: {parser: "typescript", plugins: [parserTypeScript]},
    vue: {parser: "vue", plugins: [parserHtml]},
    graphql: {parser: "graphql", plugins: [parserGraphql]},
    markdown: {parser: "markdown", plugins: [parserMarkdown]},
    css: {parser: "css", plugins: [parserCss]},
    less: {parser: "less", plugins: [parserCss]},
    scss: {parser: "scss", plugins: [parserCss]},
    yaml: {parser: "yaml", plugins: [parserYaml]},
    html: {parser: "html", plugins: [parserHtml]},
    angular: {parser: "angular", plugins: [parserHtml]},
    json: {parser: "json5", plugins: [parserJson5]},
    xml: {parser: "xml", plugins: [parserXml]},
    sql: {parser: "sql", plugins: [parserSql]},
    php: {parser: "php", plugins: [parserPhp]},
    java: {parser: "java", plugins: [parserJava]},
};
export default (code, lang) => {
    if (!(lang in options)) {
        throw new Error(`${lang} can't format`);
    }
    return prettier.format(code, options[lang]);
};
