export const _typeLists = [
    "unicode_point_default",
    "unicode_point_wide",
    "unicode_point_wide_brace",
    "unicode_number",
    "html_entity_10",
    "html_entity_16",
    "css_entity",
] as const;

export type TypeLists = (typeof _typeLists)[number];
export default {
    decode(str: string, type: TypeLists = "unicode_point_default") {
        const errorListener = (item, callback) => {
            try {
                return callback && callback();
            } catch (e) {
                throw new Error(`${item} decode error:${$error(e)}`);
            }
        };

        switch (type) {
            case "unicode_point_default":
                return str.replace(/\\[Uu]{1}[0-9a-fA-F]{4}/g, item => {
                    return errorListener(item, () =>
                        String.fromCodePoint(parseInt(`0x${item.toLowerCase().replace("\\u", "")}`)),
                    );
                });
            case "unicode_point_wide":
                return str.replace(/\\[Uu]{1}[0-9a-fA-F]{1,6}/g, item => {
                    return errorListener(item, () =>
                        String.fromCodePoint(parseInt(`0x${item.toLowerCase().replace("\\u", "")}`)),
                    );
                });
            case "unicode_point_wide_brace":
                return str.replace(/\\[Uu]{1}{[0-9a-fA-F]{1,6}}/g, item => {
                    return errorListener(item, () =>
                        String.fromCodePoint(
                            parseInt(`0x${item.toLowerCase().replace("\\u", "").replace("{", "").replace("}", "")}`),
                        ),
                    );
                });
            case "unicode_number":
                return str.replace(/U\+[0-9a-fA-F]{1,6}/g, item => {
                    return errorListener(item, () =>
                        String.fromCodePoint(parseInt(`0x${item.replace("U", "").toLowerCase().replace("+", "")}`)),
                    );
                });
            case "html_entity_10":
                return str.replace(/&#[0-9]+;/g, item => {
                    return errorListener(item, () =>
                        String.fromCodePoint(parseInt(`${item.replace("&#", "").replace(";", "")}`)),
                    );
                });
            case "html_entity_16":
                return str.replace(/&#x[0-9a-fA-F]{1,6};/g, item => {
                    return errorListener(item, () =>
                        String.fromCodePoint(parseInt(`0x${item.replace("&#x", "").toLowerCase().replace(";", "")}`)),
                    );
                });
            case "css_entity":
                return str.replace(/\\[0-9a-fA-F]{1,6}/g, item => {
                    return errorListener(item, () =>
                        String.fromCodePoint(parseInt(`0x${item.replace("\\", "").toLowerCase()}`)),
                    );
                });
        }
        throw new Error("decode type error");
    },
    encode(str: string, type: TypeLists = "unicode_point_default", ignore_ascii = false) {
        let code: string[] = [];
        for (let s of str) {
            let decimalStr = s.codePointAt(0)?.toString(10) || "";
            let hexStr = s.codePointAt(0)?.toString(16) || "";
            if (hexStr.length < 3 && ignore_ascii) {
                // 忽略ascii字符
                code.push(s);
                continue;
            }
            // 补零
            let hexRepairStr = this.repair(hexStr);
            switch (type) {
                case "unicode_point_default":
                    if (hexStr.length > 4) {
                        // 宽字符处理
                        code.push(...this.charToUtf16(s).map(item => `\\u${item}`));
                    } else {
                        code.push(`\\u${hexRepairStr}`);
                    }
                    break;
                case "unicode_point_wide":
                    code.push(`\\u${hexRepairStr}`);
                    break;
                case "unicode_point_wide_brace":
                    code.push(`\\u{${hexStr}}`);
                    break;
                case "unicode_number":
                    code.push(`U+${hexRepairStr.toUpperCase()}`);
                    break;
                case "html_entity_10":
                    code.push(`&#${decimalStr};`);
                    break;
                case "html_entity_16":
                    code.push(`&#x${hexStr};`);
                    break;
                case "css_entity":
                    code.push(`\\${hexRepairStr}`);
                    break;
                default:
                    throw new Error("encode type error");
            }
        }
        return code.join("");
    },
    charToUtf16(str: string) {
        let arr: string[] = [];
        for (let i = 0; i < str.length; i++) {
            arr[i] = this.repair(str.charCodeAt(i).toString(16));
        }
        return arr;
    },
    repair(str: string) {
        return str.length > 3 ? str : `${"0".repeat(4 - str.length)}${str}`;
    },
};
