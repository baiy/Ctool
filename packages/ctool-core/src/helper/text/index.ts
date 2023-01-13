import filetype from 'magic-bytes.js'
import {isText, isBinary} from 'istextorbinary'
import dayjs from 'dayjs'
import {FormatOptions as hexyFormatOptions, hexy} from "hexy";
import {Base64} from 'js-base64'
import validDataUrl from 'valid-data-url'
import {Buffer} from 'buffer'
import Uint from './uint';
import extList from 'ext-list';

const _encoding = ["gbk", "utf-8"] as const
export type Encoding = typeof _encoding[number]
export const encodings: string[] = _encoding as any

const extMimeList: Map<string, string> = extList()

// 通用数据类型
class Text {
    private uint: Uint
    private fileName: string = ""
    private width = 0
    private height = 0
    // 是否为错误内容类型
    private _isError: boolean = false

    constructor(uint: Uint) {
        this.uint = uint
    }

    static empty(): Text {
        return Text.fromString("");
    }

    static fromError(error: string) {
        const instance = Text.fromString(error)
        instance._isError = true
        return instance
    }

    static async fromBlob(item: Blob) {
        return new Promise<Text>((resolve) => {
            const reader = new FileReader()
            reader.readAsArrayBuffer(item)
            reader.onloadend = () => {
                resolve(new Text(new Uint(new Uint8Array(reader.result as ArrayBuffer))))
            }
        })
    }

    static async fromUrl(url: string) {
        return new Promise<Text>((resolve) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.onload = async () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(await Text.fromBlob(xhr.response))
                } else {
                    resolve(Text.fromError(`[${url}] load fail, status code:${xhr.status}`));
                }
            };
            xhr.onerror = (e) => {
                resolve(Text.fromError(`[${url}] load fail`))
            };
            xhr.send();
        })
    }

    static fromUint8Array(item: Uint8Array, encoding: Encoding = "utf-8") {
        return new Text(new Uint(item, encoding))
    }

    static fromString(str: string, toEncoding: Encoding = "utf-8"): Text {
        return new Text(Uint.fromString(str).to(toEncoding))
    }

    static fromHex(str: string): Text {
        return Text.fromBuffer(Buffer.from(str.trim(), 'hex'))
    }

    static fromBuffer(item: Buffer): Text {
        return Text.fromUint8Array(Uint8Array.from(item))
    }

    static fromArray(item: number[]): Text {
        return Text.fromUint8Array(Uint8Array.from(item))
    }

    static fromBase64(str: string): Text {
        let item = str.trim()
        // 兼容DataUrl
        if (validDataUrl(item)) {
            item = item.split(',')?.pop() || ""
        }
        if (item === "") {
            return Text.empty()
        }
        const buffer = Base64.toUint8Array(item)
        if (buffer.length < 1) {
            throw new Error("Base64 Decode Is Empty")
        }
        return Text.fromUint8Array(buffer)
    }


    toString(encoding?: Encoding) {
        return this.isEmpty() ? "" : this.uint.toString(encoding)
    }

    toBase64(isUrlSafe: boolean = false, dataUrlShow = false) {
        if (!dataUrlShow) {
            return Base64.fromUint8Array(this.uint.uint8Array, isUrlSafe)
        }
        return `data:${this.mime()};base64,${Base64.fromUint8Array(this.uint.uint8Array)}`
    }

    toHexString() {
        return this.toHex({type: "hex"})
    }

    toHex(options: hexyFormatOptions & { type: "hex" | "dump" }) {
        if (options.type === "dump") {
            return hexy(Buffer.from(this.uint.uint8Array), options)
        }
        return (Buffer.from(this.uint.uint8Array).toString('hex'))[options.caps === "upper" ? "toUpperCase" : 'toLowerCase']()
    }

    toArray() {
        return Array.from(this.uint.uint8Array)
    }

    toDown() {
        let objectUrl = window.URL.createObjectURL(new Blob([this.uint.uint8Array], {type: this.mime()}));
        let aEle = document.createElement("a");
        aEle.download = this.name();
        aEle.href = objectUrl;
        aEle.click();
        aEle.remove();
        window.URL.revokeObjectURL(objectUrl);
    }

    toDataUrl() {
        return this.toBase64(false, true)
    }

    name() {
        if (this.fileName) {
            return this.fileName
        }
        return `ctool-${dayjs().format('YYYY-MM-DD-HH-mm-ss')}${this.extension()}`
    }

    extension(): string {
        let temp = this.fileName.split('.')?.pop() || ""
        if (temp) {
            return `.${temp}`
        }
        if (this.isText()) {
            return ".txt"
        }
        const type = filetype(this.uint.localUint8Array()).filter(item => !!item.extension);
        return type.length > 0 ? `.${type[0].extension}` : ""
    }

    mime() {
        if (this.fileName) {
            const ext = this.fileName.split('.')?.pop() || ""
            if (ext && extMimeList.has(ext)) {
                return extMimeList.get(ext)
            }
        }
        const type = filetype(this.uint.localUint8Array()).filter(item => !!item.mime);
        if (type.length > 0 && type[0].mime) {
            return type[0].mime
        }
        return this.isText() ? "text/plain" : "application/octet-stream"
    }

    isImage(): boolean {
        return !this.isEmpty() && [".jpg", ".jpeg", ".png", ".gif", ".webp", ".ico", ".bmp"].includes(this.extension())
    }

    isText() {
        return !this.isEmpty() && isText("", Buffer.from(this.uint.localUint8Array()))
    }

    isBinary() {
        return !this.isEmpty() && isBinary("", Buffer.from(this.uint.localUint8Array()))
    }

    isEmpty() {
        return this.uint.length < 1
    }

    isError() {
        return this._isError
    }

    setFileName(name: string) {
        this.fileName = name
        return this
    }

    encoding() {
        return this.uint.encoding
    }

    analyseEncoding() {
        return this.uint.analyseEncoding()
    }

    async calculateImageSize() {
        return new Promise<boolean>((resolve) => {
            this.width = 0;
            this.height = 0;
            if (!this.isImage()) {
                resolve(false)
            }
            const img = new Image();
            img.onload = () => {
                this.width = Math.ceil(img.width);
                this.height = Math.ceil(img.height);
                resolve(true)
            }
            img.onerror = () => resolve(false)
            img.src = this.toDataUrl();
        })
    }

    get imageSizeString() {
        if (!this.width || !this.height) {
            return ""
        }
        return `${this.width}x${this.height}`
    }
}

export default Text
