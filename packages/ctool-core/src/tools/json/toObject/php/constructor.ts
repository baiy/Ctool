import {indent} from "./utils";

function buildParameters(properties, {typedMethods}) {
    let result = "";
    const propertiesCount = properties.length;
    properties.forEach((property, i) => {
        if (typedMethods && property.type !== undefined) {
            result += property.type + " "
        }
        result += "$" + property.name;
        if (i < (propertiesCount - 1)) {
            result += ", ";
        }
    })
    return result;
}

function buildBody(properties) {
    let result = "";
    const propertiesCount = properties.length;
    properties.forEach((property, i) => {
        let line = "";
        line += `$this->${property.name} = $${property.name};`;
        if (i < (propertiesCount - 1)) {
            line += "\n";
        }
        result += indent(line, 2)
    })
    return result + "\n";
}

export const buildConstructor = (properties, config) => {
    let result = "\n";
    let declaration = "";
    declaration += "public function __construct(";
    declaration += buildParameters(properties, config);
    declaration += ")\n";
    result += indent(declaration, 1);
    result += indent(`{\n`, 1);
    result += buildBody(properties);
    result += indent("}", 1)
    return result;

}
