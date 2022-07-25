import {pinyin} from 'pinyin-pro';

const getChar = (char, option = {}) => {
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
const getString = (str, option) => {
    let multipleFlag = "multiple_flag" in option && option['multiple_flag']
    let result = []
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

export default (str, delimiter, option = {}) => {
    str = str.split("\n");
    for (let i = 0; i < str.length; i++) {
        str[i] = getString(str[i], option).join(delimiter);
    }
    return str.join("\n");
}
