// 算法来源 https://github.com/netnexus/camelcaseplugin

const spaceCaseToPascalCaseSpace = 'spaceCaseToPascalCaseSpace'  // 转换过程  space case to Camel Case
const pascalCaseSpaceToKebabCase = 'pascalCaseSpaceToKebabCase'  // 转换过程  Camel Case to kebab-case
const kebabCaseToUpperSnakeCase = 'kebabCaseToUpperSnakeCase'  // 转换过程  kebab-case to SNAKE_CASE
const upperSnakeCaseToPascalCase = 'upperSnakeCaseToPascalCase'  // 转换过程  SNAKE_CASE to CamelCase
const pascalCaseToCamelCase = 'pascalCaseToCamelCase'  // 转换过程  CamelCase to camelCase
const camelCaseToLowerSnakeCase = 'camelCaseToLowerSnakeCase'  // 转换过程  camelCase to snake_case
const lowerSnakeCaseToSpaceCase = 'lowerSnakeCaseToSpaceCase'  // 转换过程  snake_case to space case

const isUpperCase = (str: string, first = false) => {
    if (!first) {
        return str.toUpperCase() === str;
    }
    return str.substring(0, 1).toUpperCase() === str.substring(0, 1)
        && (str.length === 1 || str.substring(1, 2).toLowerCase() === str.substring(1, 2));
}

const isLowerCase = (str: string, first = false) => {
    if (!first) {
        return str.toLowerCase() === str;
    }
    return str.substring(0, 1).toLowerCase() === str.substring(0, 1);
}
const firstToUpper = (str: string) => {
    return str !== "" ? str.replace(str[0], str[0].toUpperCase()) : "";
}
const firstToLower = (str: string) => {
    return str !== "" ? str.replace(str[0], str[0].toLowerCase()) : "";
}

const getMethodName = (str: string) => {
    str = str.trim();
    if (isLowerCase(str) && str.includes('_')) {
        return lowerSnakeCaseToSpaceCase;
    }
    if (isLowerCase(str) && str.includes('-')) {
        return kebabCaseToUpperSnakeCase;
    }
    if (isLowerCase(str) && str.includes(' ')) {
        return spaceCaseToPascalCaseSpace;
    }
    if (isUpperCase(str, true) && str.includes(' ')) {
        return pascalCaseSpaceToKebabCase;
    }
    if (isUpperCase(str) && str.includes('_')) {
        return upperSnakeCaseToPascalCase;
    }
    if (isUpperCase(str, true) && !str.includes('_') && !str.includes(' ')) {
        return pascalCaseToCamelCase;
    }
    return camelCaseToLowerSnakeCase;
}


class Convent {
    private str: string;
    private result: Record<string, string> = {}

    constructor(str: string) {
        this.str = str.trim()
        this.convert()
    }

    // @ts-ignore
    // space case to Camel Case
    private spaceCaseToPascalCaseSpace() {
        return this.str.split(' ').map((str) => {
            return firstToUpper(str)
        }).join(' ').trim()
    }

    // @ts-ignore
    // Camel Case to kebab-case
    private pascalCaseSpaceToKebabCase() {
        return this.str.replace(/ /g, "-").toLowerCase().trim();
    }

    // @ts-ignore
    // kebab-case to SNAKE_CASE
    private kebabCaseToUpperSnakeCase() {
        return this.str.toUpperCase().replace(/-/g, "_").trim()
    }

    // @ts-ignore
    // SNAKE_CASE to PascalCase
    private upperSnakeCaseToPascalCase() {
        return this.str.split('_').map((str) => {
            return firstToUpper(str.toLowerCase())
        }).join('').trim()
    }

    // @ts-ignore
    // PascalCase to camelCase
    private pascalCaseToCamelCase() {
        return firstToLower(this.str).trim()
    }

    // @ts-ignore
    // camelCase to snake_case
    private camelCaseToLowerSnakeCase() {
        const str = this.str
        if ((isUpperCase(str) || isLowerCase(str)) && !str.includes('_') && !str.includes(' ')) {
            // 全部大写/小写
            return str.toLowerCase();
        }
        let temp = "";
        for (let i = 0; i < this.str.length; i++) {
            let c = this.str.substring(i, i + 1);
            if (isUpperCase(this.str.substring(i, i + 1))) {
                temp = temp + '_';
            }
            temp = temp + c.toLowerCase();
        }
        return temp.trim();
    }

    // @ts-ignore
    // snake_case to space case
    private lowerSnakeCaseToSpaceCase() {
        return this.str.replace(/_/g, " ").trim();
    }

    private convert() {
        let methods = [
            spaceCaseToPascalCaseSpace,
            pascalCaseSpaceToKebabCase,
            kebabCaseToUpperSnakeCase,
            upperSnakeCaseToPascalCase,
            pascalCaseToCamelCase,
            camelCaseToLowerSnakeCase,
            lowerSnakeCaseToSpaceCase,
        ];
        let current = methods.indexOf(getMethodName(this.str));
        let executeMethods;
        if (current === 0) {
            executeMethods = methods;
        } else {
            executeMethods = [...methods.slice(current), ...methods.slice(0, current)]
        }
        let str = this.str;
        for (let i = 0; i < executeMethods.length; i++) {
            this.str = str.trim()
            str = this[executeMethods[i]](str);
            this.result[executeMethods[i]] = str;
        }
    }

    // space case
    spaceCase() {
        return this.result[lowerSnakeCaseToSpaceCase] || ""
    }

    // Camel Case
    pascalCaseSpace() {
        return this.result[spaceCaseToPascalCaseSpace] || ""
    }

    // kebab-case
    kebabCase() {
        return this.result[pascalCaseSpaceToKebabCase] || ""
    }

    // SNAKE_CASE
    upperSnakeCase() {
        return this.result[kebabCaseToUpperSnakeCase] || ""
    }

    // CamelCase
    pascalCase() {
        return this.result[upperSnakeCaseToPascalCase] || ""
    }

    // camelCase
    camelCase() {
        return this.result[pascalCaseToCamelCase] || ""
    }

    // snake_case
    lowerSnakeCase() {
        return this.result[camelCaseToLowerSnakeCase] || ""
    }
}

const _typeLists = [
    {value: "spaceCase", label: "space case"},
    {value: "pascalCaseSpace", label: "Camel Case"},
    {value: "kebabCase", label: "kebab-case"},
    {value: "upperSnakeCase", label: "SNAKE_CASE"},
    {value: "pascalCase", label: "CamelCase"},
    {value: "camelCase", label: "camelCase"},
    {value: "lowerSnakeCase", label: "snake_case"},
] as const

export type TypeLists = typeof _typeLists[number]['value']
export const typeLists: { label: string, value: string }[] = _typeLists as any

export const convent = (str: string, type: TypeLists) => {
    return (new Convent(str))[type]()
}

export default (str: string) => {
    return new Convent(str)
}
