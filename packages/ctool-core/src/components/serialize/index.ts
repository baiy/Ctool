// 序列化输入/输出组件
import {SerializeInputEncoderType, SerializeOutputEncoderType} from "@/types";
import Input from "./input";
import Output from "./output";

// 输入
export type SerializeInput = Input
export const createSerializeInput = (type: SerializeInputEncoderType = 'json', value: string = "") => new Input(type, value)

// 输出
export type SerializeOutput = Output
export const createSerializeOutput = (type: SerializeOutputEncoderType = 'json') => new Output(type)


