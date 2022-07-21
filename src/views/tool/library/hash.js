import crypto from "crypto-js"

const sm = require('sm-crypto');

const hashMethod = {
    md5: (str) => {
        return crypto.MD5(str).toString();
    },
    sha1: (str) => {
        return crypto.SHA1(str).toString();
    },
    sha256: (str) => {
        return crypto.SHA256(str).toString();
    },
    sha512: (str) => {
        return crypto.SHA512(str).toString();
    },
    sm3: (str) => {
        return sm.sm3(str);
    }
}

class Expression {
    parameter = []
    flag = "";

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
                str += `${i > 0 ? '.' : ""}${item.toString()}`
            }
            return str
        }
        if (this.flag === "hash") {
            let str = ""
            for (let i in this.parameter) {
                const item = this.parameter[i].toString()
                str += `${i > 0 ? '.' : ""}${item.toString()}`
            }
            return `hash(${str})`
        }
        return this.flag
    }

    getResult(input, salt, hashFunc) {
        if (this.flag === "$input") {
            return input
        }
        if (this.flag === "$salt") {
            return salt
        }
        let result = []
        for (let i in this.parameter) {
            result.push(this.parameter[i].getResult(input, salt, hashFunc))
        }
        if (this.flag === "root") {
            return result.join("")
        }
        return hashFunc(result.join(""))
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
    let stack = [root]
    let prev = null

    for (let item of items) {
        let current = stack[stack.length - 1]
        let itemExp = null;
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
                stack.push(prev)
                break;
            case ")":
                if (stack.length === 1){
                    throw new Error(`Expression Error invalid ")"`)
                }
                stack.pop()
                break;
            default:
                throw new Error(`Expression Error invalid "${item}"`)
        }
    }
    if (stack.length > 1){
        throw new Error(`Expression Error invalid "("`)
    }
    return root
}
// exp hash(hash($input.$salt).$salt)
export default (type, input, salt = "", exp = "") => {
    if (!Object.keys(hashMethod).includes(type)) {
        throw new Error(`hash method 不存在: ${type}`)
    }
    const hashFunc = (str) => hashMethod[type](str)
    if (exp === "") {
        return hashFunc(input)
    }
    return expressionParse(exp).getResult(input, salt, hashFunc)
}
