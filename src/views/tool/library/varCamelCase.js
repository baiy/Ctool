// 算法来源 https://github.com/netnexus/camelcaseplugin

const SPACE_CASE = 'spaceCaseToPascalCaseSpace'  // 转换过程  space case to Camel Case
const PASCAL_CASE_SPACE = 'pascalCaseSpaceToKebabCase'  // 转换过程  Camel Case to kebab-case
const KEBAB_CASE = 'kebabCaseToUpperSnakeCase'  // 转换过程  kebab-case to SNAKE_CASE
const UPPER_SNAKE_CASE = 'upperSnakeCaseToPascalCase'  // 转换过程  SNAKE_CASE to CamelCase
const PASCAL_CASE = 'pascalCaseToCamelCase'  // 转换过程  CamelCase to camelCase
const CAMEL_CASE = 'camelCaseToLowerSnakeCase'  // 转换过程  camelCase to snake_case
const LOWER_SNAKE_CASE = 'lowerSnakeCaseToSpaceCase'  // 转换过程  snake_case to space case

const isUpperCase = (str, first = false) => {
    if (first === false) {
        return str.toUpperCase() === str;
    }
    return str.substr(0, 1).toUpperCase() === str.substr(0, 1)
        && (str.length === 1 || str.substr(1, 1).toLowerCase() === str.substr(1, 1));
}

const isLowerCase = (str, first = false) => {
    if (first === false) {
        return str.toLowerCase() === str;
    }
    return str.substr(0, 1).toLowerCase() === str.substr(0, 1);
}
const firstToUpper = (str) => {
    return str.replace(str[0], str[0].toUpperCase());
}
const firstToLower = (str) => {
    return str.replace(str[0], str[0].toLowerCase());
}

const getMethodName = (str) => {
    str = str.trim();
    if (isLowerCase(str) && str.indexOf('_') !== -1) {
        return LOWER_SNAKE_CASE;
    }
    if (isLowerCase(str) && str.indexOf('-') !== -1) {
        return KEBAB_CASE;
    }
    if (isLowerCase(str) && str.indexOf(' ') !== -1) {
        return SPACE_CASE;
    }
    if (isUpperCase(str, true) && str.indexOf(' ') !== -1) {
        return PASCAL_CASE_SPACE;
    }
    if (isUpperCase(str) && str.indexOf('_') !== -1) {
        return UPPER_SNAKE_CASE;
    }
    if (isUpperCase(str, true) && str.indexOf('_') === -1 && str.indexOf(' ') === -1 && str.indexOf('0') === -1) {
        return PASCAL_CASE;
    }
    return CAMEL_CASE;
}

class Conversion {
    constructor(str) {
        this.setStr(str);

    }

    setStr(str) {
        this.str = str.trim()
        return this;
    }

    // space case to Camel Case
    spaceCaseToPascalCaseSpace() {
        return this.str.split(' ').map((str) => {
            return firstToUpper(str)
        }).join(' ').trim()
    }

    // Camel Case to kebab-case
    pascalCaseSpaceToKebabCase() {
        return this.str.replace(/ /g, "-").toLowerCase().trim();
    }

    // kebab-case to SNAKE_CASE
    kebabCaseToUpperSnakeCase() {
        return this.str.toUpperCase().replace(/-/g, "_").trim()
    }

    // SNAKE_CASE to PascalCase
    upperSnakeCaseToPascalCase() {
        return this.str.split('_').map((str) => {
            return firstToUpper(str.toLowerCase())
        }).join('').trim()
    }

    // PascalCase to camelCase
    pascalCaseToCamelCase() {
        return firstToLower(this.str).trim()
    }

    // camelCase to snake_case
    camelCaseToLowerSnakeCase() {
        let temp = "";
        for (let i = 0; i < this.str.length; i++) {
            let c = this.str.substr(i, 1);
            if (isUpperCase(this.str.substr(i, 1))) {
                temp = temp + '_';
            }
            temp = temp + c.toLowerCase();
        }
        return temp.trim();
    }


    // snake_case to space case
    lowerSnakeCaseToSpaceCase() {
        return this.str.replace(/_/g, " ").trim();
    }

    get() {
        let methods = [
            SPACE_CASE,
            PASCAL_CASE_SPACE,
            KEBAB_CASE,
            UPPER_SNAKE_CASE,
            PASCAL_CASE,
            CAMEL_CASE,
            LOWER_SNAKE_CASE,
        ];
        let current = methods.indexOf(getMethodName(this.str));
        let executeMethods;
        if (current === 0) {
            executeMethods = methods;
        } else {
            executeMethods = [...methods.slice(current), ...methods.slice(0, current)]
        }
        let result = {};
        let str = this.str;
        for (let i = 0; i < executeMethods.length; i++) {
            str = this.setStr(str)[executeMethods[i]](str);
            result[executeMethods[i]] = str;
        }
        return result;
    }
}

const resultKey = [
    {key: SPACE_CASE, name: 'Var Name'},
    {key: PASCAL_CASE_SPACE, name: 'var-name'},
    {key: KEBAB_CASE, name: 'VAR_NAME'},
    {key: UPPER_SNAKE_CASE, name: 'VarName'},
    {key: PASCAL_CASE, name: 'varName'},
    {key: CAMEL_CASE, name: 'var_name'},
    {key: LOWER_SNAKE_CASE, name: 'var name'},
]
export default {
    resultKey,
    convent: (str) => {
        let result = {
            [SPACE_CASE]: [],
            [PASCAL_CASE_SPACE]: [],
            [KEBAB_CASE]: [],
            [UPPER_SNAKE_CASE]: [],
            [PASCAL_CASE]: [],
            [CAMEL_CASE]: [],
            [LOWER_SNAKE_CASE]: [],
        };
        let list = str.split("\n").map((_str) => {
            return _str.trim()
        }).filter((_str) => !!_str);
        for (let item of list) {
            let conversion = new Conversion(item)
            let conversionResult = conversion.get()
            for (let key of Object.keys(conversionResult)) {
                result[key].push(conversionResult[key])
            }
        }
        for (let key of Object.keys(result)) {
            result[key] = result[key].join("\n");
        }
        return result;
    }
}