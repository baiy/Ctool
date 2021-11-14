import jsonToPhpArray from "phparr"
import phpArrayToJson from "php-array-reader"
import phpSerialize from "serialize-php"
import propertiesToJSON from "properties-to-json"
import jsonToPropertiesParser from "json-to-properties/src/scripts/parser"
import yaml from "js-yaml"
import formatter from "./formatter"
import X2JS from "x2js"

export const TYPE = ["json", "xml", "yaml", "phpArray", "phpSerialize", "properties"];

class serializeConversion {
    constructor(input, source) {
        if (!TYPE.includes(source)) {
            throw new Error("source error");
        }
        try {
            switch (source) {
                case "json":
                    this.input = JSON.parse(input);
                    break;
                case "xml":
                    this.input = (new X2JS()).xml_str2json(input);
                    if(Object.keys(this.input).length === 1 && Object.keys(this.input).includes('default_root')){
                        this.input = this.input['default_root'];
                    }
                    break
                case "yaml":
                    this.input = yaml.load(input);
                    break;
                case "phpArray":
                    this.input = phpArrayToJson.fromString(input);
                    break;
                case "phpSerialize":
                    this.input = phpSerialize.unserialize(input);
                    break;
                case "properties":
                    console.log(propertiesToJSON(input))
                    this.input = propertiesToJSON(input);
                    break;
            }
        } catch (e) {
            throw new Error("source error:" + e.message);
        }
    }

    getByTarget(target) {
        if (!TYPE.includes(target)) {
            throw new Error('target error');
        }
        try {
            switch (target) {
                case "json":
                    return this.getJson();
                case "xml":
                    return this.getXml();
                case "yaml":
                    return this.getYaml();
                case "phpArray":
                    return this.getPhpArray();
                case "phpSerialize":
                    return this.getPhpSerialize();
                case "properties":
                    return this.getProperties();
            }
        } catch (e) {
            throw new Error("target error:" + e.message);
        }
    }

    getJson() {
        return JSON.stringify(this.input,null,4)
    }

    getXml() {
        let x2js = new X2JS();
        this.input = Object.keys(this.input).length > 1 ? {default_root:this.input} : this.input;
        return formatter(x2js.json2xml_str(this.input),'xml');
    }

    getYaml() {
        return yaml.dump(this.input)
    }

    getProperties() {
        return jsonToPropertiesParser.deflate(this.input).join("\n")
    }

    getPhpArray() {
        return jsonToPhpArray(this.input);
    }

    getPhpSerialize() {
        return phpSerialize.serialize(this.input);
    }
}

export const conversion = (data, source) => {
    return new serializeConversion(data, source)
}
