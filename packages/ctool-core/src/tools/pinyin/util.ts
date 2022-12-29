import {pinyin} from 'pinyin-pro';

const getChar = (char: string, option: Record<string, any> = {}) => {
    const result = pinyin(char,
        {
            multiple: true,
            type: 'array',
            pattern: "pattern" in option && option["pattern"] ? option["pattern"] : "pinyin",
            toneType: "tone" in option && option["tone"] ? option["tone"] : "none",
            v: "replace_v" in option && option["replace_v"]
        }
    )
    return [...(new Set(result))]
}
const getString = (str: string, option: Record<string, any> = {}) => {
    let multipleFlag = "multiple_flag" in option && option['multiple_flag']
    let result: string[] = []
    let temp = "";
    for (let i = 0; i < str.length; i++) {
        if (/[^\u4E00-\u9FA5]/.test(str[i])) {
            temp = `${temp}${str[i]}`
        } else {
            if (temp.length > 0) {
                result.push(temp)
                temp = ""
            }
            const char = getChar(str[i], option)
            result.push(`${char[0]}${multipleFlag && char.length > 1 ? `(${char.slice(1).join(',')})` : ""}`)
        }
    }
    if (temp.length > 0) {
        result.push(temp)
    }
    return result
}

export default (str: string, delimiter: string, option: Record<string, any> = {}) => {
    const lists = str.split("\n");
    for (let i = 0; i < lists.length; i++) {
        lists[i] = getString(lists[i], option).join(delimiter);
    }
    return lists.join("\n");
}
