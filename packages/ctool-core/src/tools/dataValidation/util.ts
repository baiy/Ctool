import Text from "@/helper/text";
import {padStart} from "lodash";
import radix from "@/helper/radix";

// 算法来源: http://www.ip33.com/bcc.html
export class Bcc {
    private _dec: number = 0
    private _count: number = 0
    private readonly _error: string = ""

    constructor(input: Text) {
        
    }

    isError() {
        return this._error !== ""
    }

    get error() {
        return this._error
    }

    get dec() {
        return `${this._dec}`
    }

    get oct() {
        return radix(this._dec, 10, 8)
    }

    get hex() {
        return padStart(radix(this._dec, 10, 16), 2, "0")
    }

    get bin() {
        return padStart(radix(this._dec, 10, 2), 8, "0")
    }

    get count() {
        return `${this._count} Bytes`;
    }
}
