import {v4 as uuidV4} from 'uuid';
import {InputBase, OutputBase, InputOutputBase, HistorySerializable} from "@/types";
import {isObject} from "lodash";

// 版本号
export const version = CTOOL_VERSION
// 更新时间
export const updateTime = parseInt(CTOOL_UPDATE_TIME)

// uuid
export const uuid = (): string => {
    return uuidV4().toLowerCase();
}

// 调试日志
export const debug = (value: any) => {
    console.log(value)
}

export const instanceOfInputOutput = (object: any): object is InputOutputBase => {
    return instanceOfInput(object) || instanceOfOutput(object);
}

export const instanceOfInput = (object: any): object is InputBase => {
    return isObject(object) && object['_'] === '_input_';
}

export const instanceOfOutput = (object: any): object is OutputBase => {
    return isObject(object) && object['_'] === '_output_';
}

export const instanceOfHistorySerializable = (object: any): object is HistorySerializable => {
    return isObject(object) && object['__'] === '_history_serializable_';
}
