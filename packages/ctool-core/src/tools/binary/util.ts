/**
 * 算法来源 @link https://github.com/leizelong/binary
 */

export const lengthLists = [2 ** 3, 2 ** 4, 2 ** 5, 2 ** 6, 2 ** 7, 2 ** 8, 2 ** 9, 2 ** 10, 2 ** 11, 2 ** 12]

export type GenerateType = "trueForm" | "inverse" | "complement"

const toFixed = (d = '', length = 32, symbol = 0) => {
    if (d.length < length) {
        return symbol + '0'.repeat(length - 1 - d.length) + d;
    }
    return d;
}

class Transform {
    private readonly input: string;
    private readonly length: number;

    constructor(input: string, length: number) {
        if (!/^[0-9+-]+$/.test(input)) {
            throw new Error("input error")
        }
        if (!lengthLists.includes(length)) {
            throw new Error("length error")
        }
        this.input = input;
        this.length = length;
        this.check()
    }

    isNegative() {
        return this.input[0] === "-";
    }

    getNumberString() {
        return ["+", "-"].includes(this.input[0]) ? this.input.slice(1) : this.input
    }

    number() {
        return BigInt(`${this.isNegative() ? `-` : ``}${this.getNumberString()}`)
    }

    check() {
        if (this.getNumberString() === "0") {
            return;
        }
        const max = 2n ** BigInt(this.length - 1) - 1n
        const min = -1n * (2n ** BigInt(this.length - 1))
        if (
            this.number() > max || this.number() < min
        ) {
            throw new Error(`length:${this.length} input:${min} ~ ${max}`)
        }
    }

    trueForm() {
        const two = (this.isNegative() ? -1n * this.number() : this.number()).toString(2);
        if (!this.isNegative()) {
            return toFixed(two, this.length, 0);
        }
        return toFixed(two, this.length, 1);
    }

    inverse() {
        const trueForm = this.trueForm();
        if (!this.isNegative()) {
            return trueForm;
        }
        let data = '';
        for (let index = 0; index < this.length; index++) {
            const item = trueForm[index];
            if (index === 0) {
                data += item;
            } else {
                data += Math.abs(parseInt(item) - 1);
            }
        }
        return data;
    }

    complement() {
        const trueForm = this.trueForm();
        if (!this.isNegative()) {
            return trueForm;
        }
        return toFixed(
            (BigInt(`0b${this.inverse()}`) + 1n).toString(2),
            this.length,
            1
        );
    }
}


export const generate = (input: string, length: number, type: GenerateType) => (new Transform(input, length))[type]()
