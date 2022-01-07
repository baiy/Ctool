import js from "./javascript"
import json from "./json"
import ts from "./typescript"
import css from "./css"
import html from "./html"
import sql from "./sql"
import xml from "./xml"
import php from "./php"
import yaml from "./yaml"
import markdown from "./markdown"
import graphql from "./graphql"
import vue from "./vue"
import less from "./less"
import scss from "./scss"
import angular from "./angular"

const methods = {
    js,
    json,
    ts,
    vue,
    graphql,
    markdown,
    css,
    less,
    scss,
    yaml,
    html,
    angular,
    xml,
    php,
    sql
};

// 代码格式化
export const format = (code, lang, isCompress = false, options = {}) => {
    let method = isCompress ? "compress" : "beautify";
    if (!(lang in methods) || !(method in methods[lang])){
        throw new Error(`lang:"${lang}" not support ${method}`);
    }
    return methods[lang][method](code,options)
};

export default format

