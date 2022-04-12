// https://github.com/json-to-proto/json-to-proto.github.io/blob/master/src/convert.ts
const defaultImport = "google/protobuf/any.proto";
const defaultAny = "google.protobuf.Any";

class Result {
    constructor(success, error) {
        this.success = success;
        this.error = error;
    }
}

class ProtoPrimitiveType {
    constructor(name, complex, merge) {
        this.name = name;
        this.complex = complex;
        this.merge = merge;
    }
}

const boolProtoPrimitiveType = new ProtoPrimitiveType("bool", false, false);
const stringProtoPrimitiveType = new ProtoPrimitiveType("string", false, false);
const int64ProtoPrimitiveType = new ProtoPrimitiveType("int64", false, true);
const complexProtoType = new ProtoPrimitiveType(defaultAny, true, false);


class Collector {
    constructor() {
        this.imports = new Set();
        this.messages = [];
        this.messageNameSuffixCounter = {};
    }

    addImport(importPath) {
        this.imports.add(importPath);
    }

    generateUniqueName(source) {
        if (this.messageNameSuffixCounter.hasOwnProperty(source)) {
            const suffix = this.messageNameSuffixCounter[source];
            this.messageNameSuffixCounter[source] = suffix + 1;
            return `${source}${suffix}`;
        }
        this.messageNameSuffixCounter[source] = 1;
        return source;
    }

    addMessage(lines) {
        this.messages.push(lines);
    }

    getImports() {
        return this.imports;
    }

    getMessages() {
        return this.messages;
    }
}


function addShift(inline) {
    if (inline) {
        return `    `;
    }
    return "";
}

function analyze(json, options) {
    if (directType(json)) {
        return analyzeObject({"first": json}, options);
    }
    if (Array.isArray(json)) {
        return analyzeArray(json, options);
    }
    return analyzeObject(json, options);
}

function analyzeArray(array, options) {
    const inlineShift = addShift(options.inline);
    const collector = new Collector();
    const lines = [];
    const typeName = analyzeArrayProperty("nested", array, collector, inlineShift);
    lines.push(`    ${typeName} items = 1;`);
    return render(collector.getImports(), collector.getMessages(), lines, options);
}

function analyzeObject(json, options) {
    const inlineShift = addShift(options.inline);
    const collector = new Collector();
    const lines = [];
    let index = 1;
    for (const [key, value] of Object.entries(json)) {
        const typeName = analyzeProperty(key, value, collector, inlineShift);
        lines.push(`    ${typeName} ${key} = ${index};`);
        index += 1;
    }
    return render(collector.getImports(), collector.getMessages(), lines, options);
}

function analyzeArrayProperty(key, value, collector, inlineShift) {
    // [] -> any
    const length = value.length;
    if (length === 0) {
        collector.addImport(defaultImport);
        return `repeated ${defaultAny}`;
    }
    // [[...], ...] -> any
    const first = value[0];
    if (Array.isArray(first)) {
        collector.addImport(defaultImport);
        return `repeated ${defaultAny}`;
    }
    if (length > 1) {
        const primitive = samePrimitiveType(value);
        if (primitive.complex === false) {
            return `repeated ${primitive.name}`;
        }
    }
    return `repeated ${analyzeObjectProperty(key, first, collector, inlineShift)}`;
}

function analyzeProperty(key, value, collector, inlineShift) {
    if (Array.isArray(value)) {
        return analyzeArrayProperty(key, value, collector, inlineShift);
    }
    return analyzeObjectProperty(key, value, collector, inlineShift);
}

function analyzeObjectProperty(key, value, collector, inlineShift) {
    const typeName = analyzeType(value, collector);
    if (typeName === "object") {
        const messageName = collector.generateUniqueName(toMessageName(key));
        addNested(collector, messageName, value, inlineShift);
        return messageName;
    }
    return typeName;
}

function addNested(collector, messageName, source, inlineShift) {
    const lines = [];
    lines.push(`${inlineShift}message ${messageName} {`);
    let index = 1;
    for (const [key, value] of Object.entries(source)) {
        const typeName = analyzeProperty(key, value, collector, inlineShift);
        lines.push(`${inlineShift}    ${typeName} ${key} = ${index};`);
        index += 1;
    }
    lines.push(`${inlineShift}}`);
    collector.addMessage(lines);
}

function toMessageName(source) {
    return source.charAt(0).toUpperCase() + source.substr(1).toLowerCase();
}

function render(imports, messages, lines, options) {
    const result = [];
    result.push(`syntax = "proto3";`);
    if (imports.size > 0) {
        result.push("");
        for (const importName of imports) {
            result.push(`import "${importName}";`);
        }
    }
    result.push("");
    if (options.inline) {
        result.push("message SomeMessage {");
        if (messages.length > 0) {
            result.push("");
            for (const message of messages) {
                result.push(...message);
                result.push("");
            }
        }
        result.push(...lines);
        result.push("}");
    } else {
        for (const message of messages) {
            result.push(...message);
            result.push("");
        }
        result.push("message SomeMessage {");
        result.push(...lines);
        result.push("}");
    }
    return result.join("\n");
}

function directType(value) {
    switch (typeof value) {
        case "string":
        case "number":
        case "boolean":
            return true;
        case "object":
            return value === null;
    }
    return false;
}

function samePrimitiveType(array) {
    let current = toPrimitiveType(array[0]);
    if (current.complex) {
        return current;
    }
    for (let i = 1; i < array.length; i++) {
        const next = toPrimitiveType(array[i]);
        if (next.complex) {
            return next;
        }
        current = mergePrimitiveType(current, next);
        if (current.complex) {
            return current;
        }
    }
    return current;
}

function mergePrimitiveType(a, b) {
    if (a.name === b.name) {
        return a;
    }
    if (a.merge && b.merge) {
        if (a.name === "double") {
            return a;
        }
        if (b.name === "double") {
            return b;
        }
        if (a.name === "int64") {
            return a;
        }
        if (b.name === "int64") {
            return b;
        }
        if (a.name === "uint64") {
            if (b.name === "uint32") {
                return a;
            }
        } else if (b.name === "uint64") {
            if (a.name === "uint32") {
                return b;
            }
        }
        return int64ProtoPrimitiveType;
    }
    return complexProtoType;
}

function toPrimitiveType(value) {
    switch (typeof value) {
        case "string":
            return stringProtoPrimitiveType;
        case "number":
            return new ProtoPrimitiveType(numberType(value), false, true);
        case "boolean":
            return boolProtoPrimitiveType;
    }
    return complexProtoType;
}

function analyzeType(value, collector) {
    switch (typeof value) {
        case "string":
            return "string";
        case "number":
            return numberType(value);
        case "boolean":
            return "bool";
        case "object":
            if (value === null) {
                collector.addImport(defaultImport);
                return defaultAny;
            }
            return "object";
    }
    collector.addImport(defaultImport);
    return defaultAny;
}

function numberType(value) {
    if (value % 1 === 0) {
        if (value < 0) {
            if (value < -2147483648) {
                return "int64";
            }
            return "int32";
        }
        if (value > 4294967295) {
            return "uint64";
        }
        return "uint32";
    }
    return "double";
}

export default (source, inline = true) => {
    // hack that forces floats to stay as floats
    return analyze(JSON.parse( source.replace(/\.0/g, ".1")), {inline})
}
