import {v4 as uuidV4} from 'uuid';
import {InputBase, OutputBase, InputOutputBase, HistorySerializable} from "@/types";
import {isObject} from "lodash";
import rdiff from "recursive-diff";

// 版本号
export const version = document.querySelector('meta[name="ctool-version"]')?.getAttribute('content') || "dev"
// 构建时间
export const buildTimestamp = parseInt(document.querySelector('meta[name="ctool-build-timestamp"]')?.getAttribute('content') || `${Date.parse((new Date()).toString()) / 1000}`)

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
    // @ts-ignore
    return isObject(object) && object['_'] === '_input_';
}

export const instanceOfOutput = (object: any): object is OutputBase => {
    // @ts-ignore
    return isObject(object) && object['_'] === '_output_';
}

export const instanceOfHistorySerializable = (object: any): object is HistorySerializable => {
    // @ts-ignore
    return isObject(object) && object['__'] === '_history_serializable_';
}

export const objectInObject = (A: any, B: any) => {
    return rdiff.getDiff(B, A).filter(item => item.op !== "delete").length === 0
}

export const getInArrayOnlyOneItem = (value: string, lists: string[]) => {
    const exist = lists.filter(item => item.includes(value))
    return exist.length === 1 ? exist[0] : ""
}
