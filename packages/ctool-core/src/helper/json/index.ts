import {parse, stringify} from "when-json-met-bigint";
import {jsonrepair} from "jsonrepair";


type Stringify<T = any> = Parameters<typeof stringify<T>>
const repair = (str: string) => {
    try {
        return jsonrepair(str);
    } catch (error) {
        const lines = str
            .split(/\r?\n/)
            .map(item => item.trim())
            .filter(item => item !== "");
        if (lines.length < 2) {
            throw error;
        }
        try {
            return `[${lines.map(item => jsonrepair(item)).join(",")}]`;
        } catch {
            throw error;
        }
    }
}

export default {
    parse: (str: string, {BIGINT_TO_STING = false, JSON_REPAIR = false} = {}) => {
        return parse(
            JSON_REPAIR ? repair(str) : str,
            (_key, value) => {
                // 非安全数字转字符串
                if (BIGINT_TO_STING && typeof value === "bigint") {
                    return (value as BigInt).toString()
                }
                return value
            }
        )
    },
    stringify: (value: Stringify[0], replacer?: Stringify[1], space?: Stringify[2]) => stringify(value, replacer, space) as string
}
