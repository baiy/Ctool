import nzh from "nzh";

export const convertType = ["number", "lower", "upper", "money"] as const;
export type ConvertType = typeof convertType[number];
export const convert = (value: string, source: ConvertType, target: ConvertType, traditional: boolean = false): string => {
    if (value === "" || source === target) {
        return value;
    }

    const instance = traditional ? nzh.hk : nzh.cn;

    if (source === "money") {
        throw new Error("money convert is not support");
    }

    if (source === "number") {
        // 移除千分位
        value = value.replaceAll(",", "").replaceAll(" ", "");
    }

    if (source === "number" && target === "lower") {
        return instance.encodeS(value);
    }

    if (source === "number" && target === "upper") {
        return instance.encodeB(value);
    }

    if (source === "number" && target === "money") {
        return instance.toMoney(value);
    }

    if (source === "lower" && target === "number") {
        return instance.decodeS(value);
    }

    if (source === "upper" && target === "number") {
        return instance.decodeB(value);
    }
    return convert(convert(value, source, "number", traditional), "number", target, traditional);
};
