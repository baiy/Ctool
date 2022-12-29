import {InputBase, HistorySerializable, SerializeInputEncoderType} from "@/types";
import {has, isEmpty, merge} from "lodash";
import Serialize from "@/helper/serialize";

const _csvTableKeyedType = ['keyed', 'row_object', 'row_array', 'column_array'] as const
export type CsvTableKeyedType = typeof _csvTableKeyedType[number]
export const csvTableKeyedType: CsvTableKeyedType[] = _csvTableKeyedType as any

type Option = {
    csv: {
        type: CsvTableKeyedType,
        keyed_key: number
    },
    html_table: {
        type: CsvTableKeyedType,
        keyed_key: number
    },
    properties: {
        convertToJsonTree: boolean
    },
    xml: {
        attribute_prefix: string,
    }
}
const defaultOption: Option = {
    csv: {
        type: "row_object",
        keyed_key: 0
    },
    html_table: {
        type: "row_object",
        keyed_key: 0
    },
    properties: {
        convertToJsonTree: false
    },
    xml: {
        attribute_prefix: "",
    }
}

export default class Input implements InputBase<SerializeInputEncoderType>, HistorySerializable<Input> {
    public _: '_input_' = '_input_'
    public __: '_history_serializable_' = '_history_serializable_'

    public type: SerializeInputEncoderType;
    public value: string;
    public option: Option

    public serialization = Serialize.empty()

    constructor(type: SerializeInputEncoderType = 'json', value: string = "") {
        this.type = type;
        this.value = value;
        this.option = defaultOption
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
