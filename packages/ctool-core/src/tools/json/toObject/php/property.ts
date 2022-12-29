import {guessType, isScalarType} from "./types";
import {camelCase, indent} from "./utils";
import {isEmpty} from "lodash"

export const Visibility = {
    PUBLIC: "public",
    PRIVATE: "private",
    PROTECTED: "protected"
};

export const buildProperties = (properties, {visibility, typedProperties}) => {
    let result = "";
    properties.forEach((p) => {
        if (p.type) {
            result += indent(`/** @var ${p.type} */\n`, 1);
        }
        result += indent(`${visibility}${(p.type && typedProperties) ? " " + p.type : ""} $${p.name};\n`, 1);

    });
    return result;
}

const subtype = (type, value, key) => {
    if (isScalarType(type) || isEmpty(value)) return null;
    let subKey = key;
    if (type === "array") {
        return guessType(
            value.length > 0 ? value[0] : null,
            subKey,
        )
    }
    return guessType(
        value,
        subKey,
    )
}

export const getPropertyInfo = (key, value) => {
    let type = guessType(value, key);
    return {
        name: camelCase(key),
        type: type,
        originalName: key,
        value: value,
        subtype: subtype(type, value, key)
    }
}
