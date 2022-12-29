/**
 * https://github.com/dani-gouken/json_to_php
 */
import buildClass from "./class";
import {Visibility} from "./property";
import deps from "./deps";
import Json from "@/helper/json"
const defaultConfig = {
    className: "",
    namespace: "",
    visibility: Visibility.PRIVATE,
    typedProperties: false,
    getters: true,
    typedMethods: false,
    setters: true,
    arraySerialization: true,
    includeDeps: true
}

export const convert = (jsonString: string, option = {}) => {
    const config = {...defaultConfig, ...option}
    if (!config.className) {
        config.className = 'ClassName'
    }
    let json = Json.parse(jsonString);
    if (Array.isArray(json)) {
        json = json[0];
    }
    const res = buildDeps(config, deps().add({
        className: config.className,
        key: null,
        value: json
    }));
    let result = "";
    if (config.namespace) {
        result = "namespace " + config.namespace + ";\n\n" + result;
    }
    if (!config.includeDeps) {
        return result + res[0];
    }
    res.forEach((v, i) => {
        if (i !== 0) {
            result += "\n\n" + v;
        } else {
            result += v;
        }
    });
    return result !== "" ? `<?php\n${result}` : "";
}

function buildDeps(config, deps, classes: string[] = []) {
    let classContent = deps.get();
    if (classContent == null) {
        return classes;
    }
    classes.push(buildClass(config, deps, classContent.value, classContent.className));
    return buildDeps(config, deps, classes);
}
