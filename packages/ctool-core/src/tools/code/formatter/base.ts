import {Languages, Format, OptionMap} from "./types"


export default abstract class<T extends Languages> implements Format<T> {
    protected name: T | string = "";
    protected code: string = ""
    protected option?: OptionMap[T]

    getOptionValue<K extends keyof OptionMap[T]>(key: K, defaultValue: OptionMap[T][K]) {
        if (this.option === undefined || this.option[key] === undefined) {
            return defaultValue
        }
        return this.option[key]
    }

    setName(value: T) {
        this.name = value;
        return this
    }

    set(code: string, option?: OptionMap[T]) {
        this.code = code;
        this.option = option;
        return this
    }

    async beautify(): Promise<string> {
        throw new Error($t(`code_not_support`, [`${this.name}`, $t(`code_beautify`)]))
    }

    async compress(): Promise<string> {
        throw new Error($t(`code_not_support`, [`${this.name}`, $t(`code_compress`)]))
    }

    async format(type: "beautify" | "compress"): Promise<string> {
        const result = type === "beautify" ? await this.beautify() : await this.compress()
        return new Promise((resolve) => {
            resolve(result)
        })
    }
}
