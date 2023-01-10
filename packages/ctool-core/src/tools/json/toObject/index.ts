import {Transform, Option as TargetOption} from "./type";
import QuickType from "./quickType";
import Protobuf from "./protobuf";
import Php from "./php/";
import {HistorySerializable} from "@/types";
import {has, isEmpty, merge} from "lodash";

const handlers: Transform[] = [
    new Protobuf,
    new Php,
    new QuickType,
]

const getHandler = (lang: string) => {
    for (let handler of handlers) {
        if (handler.getLanguages().includes(lang)) {
            return handler
        }
    }
    throw new Error("Error Lang")
}

export const languages = (() => {
    let lists: string[] = []
    for (let handler of handlers) {
        lists.push(...handler.getLanguages())
    }
    return [...(new Set(lists))];
})()

export const transform = async (lang: string, input: string, options: Record<string, any>) => {
    return getHandler(lang).execute(lang, input, options);
}

const getDefaultOption = (lang: string) => {
    const data: Record<string, any> = {}
    for (let item of getHandler(lang).getOptionDefine(lang)) {
        data[item.name] = item.defaultValue
    }
    return data
}

export class Option implements HistorySerializable<Option> {
    public __: "_history_serializable_" = "_history_serializable_";

    public lang: string = ""
    public option: Record<string, any> = {}

    constructor(lang: string = "") {
        this.lang = lang;

        let lists: Record<string, any> = {}
        for (let language of languages) {
            lists[language] = getDefaultOption(language)
        }

        this.option = lists
    }

    define(): TargetOption[] {
        if (this.lang === ""){
            return []
        }
        return getHandler(this.lang).getOptionDefine(this.lang).sort((a, b) => {
            const index = {
                'string': 1,
                'boolean': 2,
                'select': 3,
            }
            if (a.type === b.type) {
                return 0
            }
            return index[a.type] < index[b.type] ? -1 : 1
        })
    }

    isSaveHistory(): boolean {
        return true;
    }

    serialize(): Record<string, any> {
        const option: Record<string, any> = {}
        if (this.lang in this.option) {
            option[this.lang] = this.option[this.lang]
        }
        return {
            __: this.__,
            lang: this.lang,
            ...(isEmpty(option) ? {} : {option}),
        }
        return {};
    }

    unserialize(data?: Record<string, any>) {
        if (!data) {
            return this;
        }
        const item = new Option()
        if (has(data, 'lang')) {
            item.lang = data.lang
        }
        if (has(data, 'option')) {
            item.option = merge(item.option, data.option)
        }
        return item
    }
}

export const getOption = (lang: string = "") => {
    return new Option(lang)
}


