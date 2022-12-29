import nameConvert from "@/helper/nameConvert"

export const indent = (string, level = 0, spaceCount = 4) => {
    let space = " ".repeat(spaceCount * level);
    return space + string;
}

export const camelCase = (str) => {
    return nameConvert(str).camelCase()
}

export const pascalCase = (str) => {
    return nameConvert(str).pascalCase()
}
