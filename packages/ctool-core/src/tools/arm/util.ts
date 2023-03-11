import {axios} from "@/helper/proxy";

export type Field = "arm64" | "arm" | "thumb" | "armbe" | "thumbbe"
export type Response = { asm?: Partial<Record<Field, [boolean, string]>>, hex?: Partial<Record<Field, [boolean, string]>> } | ""
export type InitializeType = {
    input: string,
    offset: string,
    prefix_0x?: false,
    swap_endian?: false,
    response: Response,
}

const swap = (text: string, size: number, prefix: string, swap_endian: boolean) => {
    if (!text || text.startsWith('#')) {
        // this is an error, not actual code
        return text;
    }
    if (!swap_endian) {
        return prefix + text;
    }
    const size_chars = size * 2;
    let result = '';
    for (let i = 0; i < text.length; i += size_chars) {
        const chunk = text.slice(i, i + size_chars);
        for (let j = chunk.length; j > 0; j -= 2) {
            result += chunk.slice(j - 2, j);
        }
    }
    return prefix + result;
}

export const handleResult = (type: "asm" | "hex", field: Field, {response, prefix_0x = false, swap_endian = false}: InitializeType) => {
    if (response === "") {
        return ""
    }

    let text = response[type]?.[field]?.[1]
    if (text === undefined) {
        return "";
    }
    if (!prefix_0x && !swap_endian) {
        return text;
    }

    const size: Record<Field, number> = {
        arm64: 4,
        arm: 4,
        armbe: 4,
        thumb: 2,
        thumbbe: 2
    }
    // prefix_0x && swap_endian
    return text.split('\n').map((line) => {
        return swap(line, size[field], prefix_0x ? "0x" : "", swap_endian)
    }).join('\n');
}

export const request = (data: object) => {
    return axios().post("https://armconverter.com/api/convert", data)
}

