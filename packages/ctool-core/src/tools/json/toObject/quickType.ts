import {getTargetLanguage, inferenceFlagNames, inferenceFlags, InputData, jsonInputForTargetLanguage, quicktype, defaultTargetLanguages} from "quicktype-core";
import {pick, omit} from "lodash";
import {Transform, Option} from "./type";

const getTargetOption = (lang: string) => {
    return getTargetLanguage(lang).optionDefinitions.map(({name}) => name)
}

export default class implements Transform {
    getLanguages() {
        return defaultTargetLanguages.map(item => item.displayName)
            .filter(name => {
                // 禁用php quick type 支持不太完善
                return !["php"].includes(name.toLowerCase())
            })
    }

    async execute(lang: string, input: string, options: Record<string, any>): Promise<string> {
        const targetOption = getTargetOption(lang)
        const jsonInput = jsonInputForTargetLanguage(lang);
        await jsonInput.addSource({
            name: 'ctool',
            samples: [input]
        });
        const inputData = new InputData();
        inputData.addInput(jsonInput);
        return (await quicktype({
            inputData,
            lang,
            ...omit(options, targetOption),
            rendererOptions: pick(options, targetOption)
        })).lines.join("\n")
    }

    getOptionDefine(lang: string) {
        const define: Option[] = []
        if (lang !== "") {
            const quickTypeLanguage = getTargetLanguage(lang)
            // @ts-ignore
            for (let option of quickTypeLanguage.getOptions()) {
                const optionType = option.constructor?.name || ""
                if ("EnumOption" === optionType) {
                    define.push({
                        name: option.definition.name,
                        description: option.definition.description,
                        type: "select",
                        value: option.definition.legalValues,
                        defaultValue: option.definition.defaultValue
                    })

                }
                if ("BooleanOption" === optionType) {
                    define.push({
                        name: option.definition.name,
                        description: option.definition.description,
                        type: "boolean",
                        defaultValue: option.definition.defaultValue
                    })
                }
                if ("StringOption" === optionType) {
                    define.push({
                        name: option.definition.name,
                        description: option.definition.description,
                        type: "string",
                        defaultValue: option.definition.defaultValue
                    })
                }
            }
            for (let item of inferenceFlagNames) {
                const stringType = ("stringType" in inferenceFlags[item] ? inferenceFlags[item].stringType : "") || ""
                if (stringType === "" || quickTypeLanguage.stringTypeMapping.has(stringType)) {
                    define.push({
                        name: item,
                        description: inferenceFlags[item].description,
                        type: "boolean",
                        defaultValue: true
                    })
                }
            }
            define.push({
                name: "allPropertiesOptional",
                description: "Make all class property optional",
                type: "boolean",
                defaultValue: false
            })
        }
        return define
    }
}
