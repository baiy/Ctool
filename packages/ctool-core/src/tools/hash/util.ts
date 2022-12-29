import CryptoJS from "crypto-js"
import sm from "sm-crypto"
import Text from "@/helper/text"

export const methods = ['md5', 'sha1', 'sha256', 'sha512', 'sm3'] as const
export type methodType = typeof methods[number]

const hashMethod = {
    md5: (message: Text): string => {
        return CryptoJS.MD5(CryptoJS.enc.Base64.parse(message.toBase64())).toString();
    },
    sha1: (message: Text): string => {
        return CryptoJS.SHA1(CryptoJS.enc.Base64.parse(message.toBase64())).toString();
    },
    sha256: (message: Text): string => {
        return CryptoJS.SHA256(CryptoJS.enc.Base64.parse(message.toBase64())).toString();
    },
    sha512: (message: Text): string => {
        return CryptoJS.SHA512(CryptoJS.enc.Base64.parse(message.toBase64())).toString();
    },
    sm3: (message: Text): string => {
        const leftPad = (input, num) => {
            if (input.length >= num) return input

            return (new Array(num - input.length + 1)).join('0') + input
        }

        let hexStr = message.toHex({type: "hex"})

        const words: number[] = []
        let hexStrLength = hexStr.length

        if (hexStrLength % 2 !== 0) {
            hexStr = leftPad(hexStr, hexStrLength + 1)
        }

        hexStrLength = hexStr.length

        for (let i = 0; i < hexStrLength; i += 2) {
            words.push(parseInt(hexStr.substr(i, 2), 16))
        }

        return sm.sm3(words as any);
    }
}

class Expression {
    parameter: Expression[] = []
    flag: string = "";

    constructor(flag = "root") {
        if (!['hash', '$input', '$salt', 'root'].includes(flag)) {
            throw new Error(`Expression Error (${flag})`)
        }
        this.flag = flag;
    }

    add(item) {
        this.parameter.push(item)
    }

    toString() {
        if (this.flag === "root") {
            let str = ""
            for (let i in this.parameter) {
                const item = this.parameter[i].toString()
                str += `${parseInt(i) > 0 ? '.' : ""}${item.toString()}`
            }
            return str
        }
        if (this.flag === "hash") {
            let str = ""
            for (let i in this.parameter) {
                const item = this.parameter[i].toString()
                str += `${parseInt(i) > 0 ? '.' : ""}${item.toString()}`
            }
            return `hash(${str})`
        }
        return this.flag
    }

    getResult(input: string, salt, hashFunc): string {
        if (this.flag === "$input") {
            return input
        }
        if (this.flag === "$salt") {
            return salt
        }
        let result: string[] = []
        for (let i in this.parameter) {
            result.push(this.parameter[i].getResult(input, salt, hashFunc))
        }
        if (this.flag === "root") {
            return result.join("")
        }
        return hashFunc(Text.fromString(result.join("")))
    }
}

const expressionParse = (str = "") => {
    const separator = "__@@@__";
    str = str.replace(/\(/g, `${separator}(${separator}`).replace(/\)/g, `${separator})${separator}`).replace(/\./g, `${separator}.${separator}`)
    const items = str.split(separator).filter((item) => item !== "")
    if (!['hash', '$input', '$salt'].includes(items[0])) {
        throw new Error(`Expression Error ${items[0]}`)
    }
    let root = new Expression();
    let stack: Expression[] = [root]
    let prev: Expression | null = null

    for (let item of items) {
        let current = stack[stack.length - 1]
        let itemExp: Expression | null = null;
        switch (item) {
            case ".":
                break;
            case "hash":
            case "$input":
            case "$salt":
                itemExp = new Expression(item)
                current.add(itemExp)
                prev = itemExp
                break;
            case "(":
                stack.push((prev as Expression))
                break;
            case ")":
                if (stack.length === 1) {
                    throw new Error(`Expression Error invalid ")"`)
                }
                stack.pop()
                break;
            default:
                throw new Error(`Expression Error invalid "${item}"`)
        }
    }
    if (stack.length > 1) {
        throw new Error(`Expression Error invalid "("`)
    }
    return root
}
// exp hash(hash($input.$salt).$salt)
export default (type: methodType, input: Text, salt: string = "", exp: string = ""): string => {
    if (!Object.keys(hashMethod).includes(type)) {
        throw new Error(`hash method 不存在: ${type}`)
    }
    const hashFunc = (str: Text) => hashMethod[type](str)
    if (exp === "") {
        return hashFunc(input)
    }
    return expressionParse(exp).getResult(input.toString(), salt, hashFunc)
}
