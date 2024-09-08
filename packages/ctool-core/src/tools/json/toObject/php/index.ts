/**
 * https://github.com/dani-gouken/json_to_php
 */
import buildClass from "./class";
import {Visibility} from "./property";
import deps from "./deps";
import Json from "@/helper/json"
import {Option, Transform} from "@/tools/json/toObject/type";

function buildDeps(config, deps, classes: string[] = []) {
    let classContent = deps.get();
    if (classContent == null) {
        return classes;
    }
    classes.push(buildClass(config, deps, classContent.value, classContent.className));
    return buildDeps(config, deps, classes);
}

const convert = (jsonString: string, option: Record<string, any> = {}) => {
    if (!option.className) {
        option.className = 'ClassName'
    }
    let json = Json.parse(jsonString);
    if (Array.isArray(json)) {
        json = json[0];
    }
    const res = buildDeps(option, deps().add({
        className: option.className,
        key: null,
        value: json
    }));
    let result = "";
    if (option.namespace) {
        result = "namespace " + option.namespace + ";\n\n" + result;
    }
    if (!option.includeDeps) {
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


export default class implements Transform {
    getLanguages() {
        return ['PHP']
    }

    async execute(_lang: string, input: string, options: Record<string, any>): Promise<string> {
        return new Promise<string>((resolve) => {
            return resolve(convert(input, options))
        })
    }

    getOptionDefine(_lang: string) {
        const define: Option[] = [
            {
                name: 'namespace',
                description: 'Namespace',
                type: "string",
                defaultValue: "Ctool"
            },
            {
                name: 'className',
                description: 'Class Name',
                type: "string",
                defaultValue: "Json"
            },
            {
                name: 'visibility',
                description: 'Visibility',
                type: "select",
                value: Object.values(Visibility),
                defaultValue: Visibility.PRIVATE
            },
            {
                name: 'getters',
                description: 'Getters',
                type: "boolean",
                defaultValue: true
            },
            {
                name: 'setters',
                description: 'Setters',
                type: "boolean",
                defaultValue: true
            },
            {
                name: 'typedProperties',
                description: 'Typed Properties',
                type: "boolean",
                defaultValue: false
            },
            {
                name: 'typedMethods',
                description: 'Typed Methods',
                type: "boolean",
                defaultValue: false
            },
            {
                name: 'includeDeps',
                description: 'Include Class Dependencies',
                type: "boolean",
                defaultValue: true
            }
        ]
        return define
    }
}
