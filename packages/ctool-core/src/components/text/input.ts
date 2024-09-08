import {InputBase, TextInputEncoderType, HistorySerializable} from "@/types";
import Text, {Encoding} from "@/helper/text";
import {has, isEmpty, merge} from "lodash";

type Option = {
    text: {
        encoding: Encoding
    },
    hex: {
        // 是否保留换行符
        preserve_line_breaks: boolean
    }
}
const defaultOption: Option = {
    text: {
        encoding: "utf-8"
    },
    hex: {
        preserve_line_breaks: false
    }
}

export default class Input implements InputBase<TextInputEncoderType, string | File>, HistorySerializable<Input> {
    public _: '_input_' = '_input_'
    public __: '_history_serializable_' = '_history_serializable_'

    public type: TextInputEncoderType;
    public value: string | File | any;
    public option: Option

    public text = Text.empty()

    constructor(type: TextInputEncoderType = 'text', value: string = "") {
        this.type = type;
        this.value = value;
        this.option = defaultOption
    }

    isSaveHistory() {
        // 文件上传不保存历史数据
        return this.type !== "upload"
    }

    serialize() {
        const option: Record<string, any> = {}
        if (this.type in this.option) {
            // @ts-ignore
            option[this.type] = this.option[this.type]
        }
        return {
            _: '_input_',
            __: '_history_serializable_',
            type: this.type,
            value: this.value,
            ...(isEmpty(option) ? {} : {option}),
        }
    }

    unserialize(data?: Record<string, any>) {
        if (!data) {
            return this;
        }
        const item = new Input()
        if (has(data, 'type')) {
            item.type = data.type
        }
        if (has(data, 'value')) {
            item.value = data.value
        }
        if (has(data, 'option')) {
            item.option = merge(item.option, data.option)
        }
        return item
    }
}
