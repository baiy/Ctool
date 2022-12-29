import {HistorySerializable, OutputBase, TextOutputEncoderType} from "@/types";
import {Encoding} from "@/helper/text";
import {FormatOptions as hexyFormatOptions} from "hexy";
import {has, merge, isEmpty} from "lodash";

type Option = {
    base64: {
        is_url_safe: boolean,
        data_url_show: boolean
    },
    hex: hexyFormatOptions & { type: "hex" | "dump", width: number },
    text: {
        encoding: Encoding | "analyse"
    }
}

const defaultOption: Option = {
    base64: {is_url_safe: false, data_url_show: false},
    hex: {
        type: "hex",
        format: "twos",
        caps: "lower",
        width: 16
    },
    text: {
        encoding: "analyse"
    }
}

export default class Output implements OutputBase<TextOutputEncoderType>, HistorySerializable<Output> {
    public _: '_output_' = '_output_'
    public __: '_history_serializable_' = '_history_serializable_'
    public type: TextOutputEncoderType;
    public option: Option

    constructor(type: TextOutputEncoderType = 'text') {
        this.type = type;
        this.option = defaultOption;
    }

    isSaveHistory() {
        return true
    }

    serialize() {
        const option: Record<string, any> = {}
        if (this.type in this.option) {
            option[this.type] = this.option[this.type]
        }
        return {
            _: '_output_',
            __: '_history_serializable_',
            type: this.type,
            ...(isEmpty(option) ? {} : {option}),
        }
    }

    unserialize(data?: Record<string, any>) {
        if (!data) {
            return this;
        }
        const item = new Output()
        if (has(data, 'type')) {
            item.type = data.type
        }
        if (has(data, 'option')) {
            item.option = merge(item.option, data.option)
        }
        return item
    }
}
