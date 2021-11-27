/**
 * @link https://github.com/leizelong/binary
 */


function toFixed(d = '', length = 32, symbol = 0) {
    if (d.length < length) {
        return symbol + '0'.repeat(length - 1 - d.length) + d;
    }
    return d;
}

class Binary {
    constructor(length) {
        this.length = length;
    }

    getBinary(d) {
        return Math.abs(parseInt(d)).toString(2);
    }

    // 原码
    trueForm(d) {
        const two = this.getBinary(d);

        if (d >= 0) {
            return toFixed(two, this.length, 0);
        }
        return toFixed(two, this.length, 1);
    }

    // 反码
    inverse(d) {
        const trueForm = this.trueForm(d);
        if (d >= 0) {
            return trueForm;
        }
        let data = '';
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < this.length; index++) {
            const item = trueForm[index];
            if (index === 0) {
                data += item;
            } else {
                data += Math.abs(+item - 1);
            }
        }
        return data;
    }

    // 补码
    complement(d) {
        const trueForm = this.trueForm(d);
        const inverse = this.inverse(d);
        if (d >= 0) {
            return trueForm;
        }
        const valid = inverse.slice(1);
        const validTenComplete = parseInt(valid, 2) + 1;
        return toFixed(
            validTenComplete.toString(2),
            this.length,
            1
        );
    }
}

export default (input, length, type) => {
    if (!["trueForm", "inverse", "complement"].includes(type)) {
        throw new Error("type error")
    }
    if (![8, 16, 32].includes(length)) {
        throw new Error("length error")
    }
    // 0 特殊处理
    if (
        input === "0"
        || input === "+0"
        || input === "-0"
    ) {
        if (type === "trueForm") {
            return input === "-0" ? ("1" + Array(length).join("0")).slice(0, length - 1) : Array(length).join("0")
        }
        if (type === "inverse") {
            return input === "-0" ? Array(length).join("1") : Array(length).join("0")
        }
        if (type === "complement") {
            return input === "-0" ? Array(length).join("0") : Array(length).join("0")
        }
        return "";
    }

    input = parseInt(input);
    switch (length) {
        case 8:
            if (!(input >= -128 && input <= 127)) {
                throw new Error('length:8 input:-128 ~ 127')
            }
            break;
        case 16:
            if (!(input >= -32768 && input <= 32767)) {
                throw new Error('length:16 input:-32768 ~ 32767')
            }
            break;
        case 32:
            if (!(input >= -2147483648 && input <= 2147483647)) {
                throw new Error('length:32 input:-2147483648 ~ 2147483647')
            }
            break;
        default:
            throw new Error('length error')
    }
    let handle = (new Binary(length))
    switch (type) {
        case "trueForm":
            return handle.trueForm(input)
        case "inverse":
            return handle.inverse(input)
        case "complement":
            return handle.complement(input)
    }
}
