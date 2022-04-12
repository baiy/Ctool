import {pascalCase as pascalCaseHandle} from "pascal-case"
import {camelCase as camelCaseHandle} from "camel-case"

export const indent = (string, level = 0, spaceCount = 4) => {
    let space = " ".repeat(spaceCount * level);
    return space + string;
}
export const isEmpty = (val) => {
    return Array.isArray(val) && val.length === 0;
}

export const camelCase = (str) => {
    return camelCaseHandle(str)
}

export const pascalCase = (str) => {
    return pascalCaseHandle(str)
}
