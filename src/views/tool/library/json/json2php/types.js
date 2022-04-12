import {pascalCase} from "./utils";

export const guessType = (value, name) => {
    const type = typeof value;
    switch (type) {
        case "object":
            if (Array.isArray(value)) {
                return "array";
            }
            if (value === null) {
                return undefined;
            }
            return pascalCase(name);
        case "boolean":
            return "bool";
        case "number":
            return Number.isInteger(value) ? "int" : "float";
        case "bigint":
            return "int";
        case "string":
            return "string";
        default:
            return undefined;
    }
}

export const isScalarType = (type) => {
    return ["bool", "int", "float", "string"].includes(type) || type === null || type === undefined;
}
