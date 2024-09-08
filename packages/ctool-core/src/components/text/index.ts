// 文本数据输入/输出组件
import { TextInputEncoderType, TextOutputEncoderType } from "@/types";
import Input from "./input";
import Output from "./output";

// 输入
export type TextInput = Input
export const createTextInput = (type: TextInputEncoderType = "text", value: string = "") => new Input(type, value);

// 输出
export type TextOutput = Output
export const createTextOutput = (type: TextOutputEncoderType = "text") => new Output(type);


