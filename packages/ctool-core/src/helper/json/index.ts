import {parse, stringify} from "when-json-met-bigint";
import {jsonrepair} from "jsonrepair";


type Stringify<T = any> = Parameters<typeof stringify<T>>

export default {
    parse: (str: string, {BIGINT_TO_STING = false, JSON_REPAIR = false} = {}) => {
        return parse(
            JSON_REPAIR ? jsonrepair(str) : str,
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
