import {camelCase, indent} from "./utils";


function buildSetter(property, {typedMethods}) {
    const methodName = camelCase("set" + "_" + property.name);
    let result = "";

    let declaration = `public function ${methodName}`;
    declaration += `(${(typedMethods && property.type !== undefined) ? property.type + " " : ""}$${property.name})`;
    result += indent(declaration + "\n", 1);
    result += indent("{\n", 1);
    result += indent(`$this->${property.name} = $${property.name};\n`, 2);
    result += indent(`return $this;\n`, 2);
    result += indent("}", 1);
    return result;
}

function buildGetter(property, {typedMethods}) {
    const prefix = property.type === "bool" ? "is" : "get";
    const methodName = camelCase(prefix + "_" + property.name);
    let result = "";
    let declaration = `public function ${methodName}()`;
    if (typedMethods && property.type !== undefined) {
        declaration += ":" + property.type;
    }
    result += indent(declaration + "\n", 1);
    result += indent("{\n", 1);
    result += indent(`return $this->${property.name};\n`, 2);
    result += indent("}", 1);
    return result;
}


function buildMethod(callback, properties, config) {
    if (!config.getters && !config.setters) return "";
    let result = "\n";
    const l = properties.length;
    properties.forEach((p, i) => {
        result += "\n";
        result += callback(p, config);
        if (i < (l - 1)) {
            result += "\n";
        }
    })
    return result;
}

export const buildSetters = (properties, config) => {
    if (!config.setters) return "";
    return buildMethod(buildSetter, properties, config);
}

export const buildGetters = (properties, config) => {
    if (!config.getters) return "";
    return buildMethod(buildGetter, properties, config);
}
