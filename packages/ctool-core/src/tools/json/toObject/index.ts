import {Transform} from "./type";
import QuickType from "./quickType";
import Protobuf from "./protobuf";
import Php from "./php/";

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

export const getDefaultOption = (lang: string) => {
    const data: Record<string, any> = {}
    for (let item of getHandler(lang).getOptionDefine(lang)) {
        data[item.name] = item.defaultValue
    }
    return data
}

export const getOptionDefine = (lang: string) => {
    return getHandler(lang).getOptionDefine(lang).sort((a, b) => {
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
