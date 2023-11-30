import { VNode } from "vue";
import Text from "@/helper/text";
import Serialize from "@/helper/serialize";
import {
    ComponentSizeType,
    ButtonType,
    DisplayPosition,
    UploadFileType,
    UploadFileMode,
    UploadFileButtonType,
    TextInputUpload,
    SelectOption,
    SelectValue,
    RadioOption,
    RadioValue,
    TableConfig,
    TableLists,
    LinkType,
    ModalFooterType,
    TabsListsType,
    SelectType,
    AlignSize,
    AlignDirection,
    AlignHorizontal,
    AlignVertical,
    TextInputEncoderType,
    TextOutputEncoderType,
    SerializeInputEncoderType,
    SerializeOutputEncoderType,
    CheckboxValue,
    CheckboxOption,
} from "@/types";
import { SerializeInput, SerializeOutput } from "./serialize";
import { TextInput, TextOutput } from "./text";
import { IconType } from "@/helper/icon";

type ComponentType<T> = T | any;

declare module "@vue/runtime-core" {
    interface GlobalComponents {
        Input: new () => {
            $props: {
                modelValue?: string;
                placeholder?: string;
                disabled?: boolean;
                readonly?: boolean;
                center?: boolean;
                label?: string;
                size?: ComponentSizeType;
                width?: number | string;
                disableClear?: boolean;
            };
            $emit: { (e: "change", value: string): void; (e: "load", value: HTMLInputElement): void };
            $slots: {
                prepend: () => VNode[];
                prefix: () => VNode[];
                append: () => VNode[];
                suffix: () => VNode[];
            };
        };
        InputNumber: new () => {
            $props: {
                modelValue: number;
                placeholder?: string;
                center?: boolean;
                disabled?: boolean;
                readonly?: boolean;
                label?: string;
                step?: number | string;
                min?: number | boolean;
                max?: number | boolean;
                width?: number | string;
                size?: ComponentSizeType;
                disableClear?: boolean;
            };
            $emit: { (e: "change", value: number): void };
            $slots: {
                prepend: () => VNode[];
                append: () => VNode[];
                suffix: () => VNode[];
                prefix: () => VNode[];
            };
        };
        Select: new () => {
            $props: {
                modelValue?: SelectValue;
                placeholder?: string;
                label?: string;
                options: SelectOption;
                disabled?: boolean;
                center?: boolean;
                dialog?: boolean;
                disabledDialogClickClose?: boolean;
                size?: ComponentSizeType;
                width?: number | string;
                type?: SelectType;
            };
            $emit: (e: "change", value: ComponentType<SelectValue>) => void;
            $slots: {
                prepend: () => VNode[];
                prefix: () => VNode[];
            };
        };
        Dropdown: new () => {
            $props: {
                placeholder: string;
                options: SelectOption;
                size?: ComponentSizeType;
                disabled?: boolean;
                dialog?: boolean;
                disabledDialogClickClose?: boolean;
                type?: SelectType;
            };
            $emit: (e: "select", value: ComponentType<SelectValue>) => void;
        };
        Button: new () => {
            $props: {
                type?: ButtonType;
                text?: string;
                long?: boolean;
                loading?: boolean;
                disabled?: boolean;
                size?: ComponentSizeType;
                tooltip?: string;
            };
            $slots: {
                default: () => VNode[];
            };
            $emit: (e: "click") => void;
        };
        Radio: new () => {
            $props: {
                modelValue?: RadioValue;
                options: RadioOption;
                size?: ComponentSizeType;
                disabled?: boolean;
            };
            $emit: (e: "change", value: ComponentType<RadioValue>) => void;
        };
        Bool: new () => {
            $props: {
                modelValue?: boolean;
                label?: string;
                size?: ComponentSizeType;
                border?: boolean;
                disabled?: boolean;
            };
            $emit: (e: "change", value: boolean) => void;
        };
        Checkbox: new () => {
            $props: {
                modelValue?: CheckboxValue;
                direction?: AlignDirection;
                options: CheckboxOption;
                size?: ComponentSizeType;
                border?: boolean;
            };
        };
        Textarea: new () => {
            $props: {
                modelValue?: string;
                placeholder?: string;
                height?: number | string;
                copy?: boolean | string;
                floatText?: string;
                floatPosition?: DisplayPosition;
                floatType?: ButtonType;
                disabled?: boolean;
                readonly?: boolean;
                disableClear?: boolean;
            };
            $emit: (e: "clickFloatText", value: boolean) => void;
        };
        Icon: new () => {
            $props: {
                name: IconType;
                hover?: boolean;
                highlight?: boolean;
                reverse?: boolean;
                color?: string;
                size?: number | string;
                rotate?: number;
                tooltip?: string;
            };
        };
        UploadFile: new () => {
            $emit: (e: "success", content: File) => void;
            $props: {
                modelValue?: string | File;
                type?: UploadFileType | string;
                disabled?: boolean;
                size?: ComponentSizeType;
                mode?: UploadFileMode[];
                buttonType?: UploadFileButtonType;
            };
        };
        HeightResize: new () => {
            $props: {
                append?: string[];
                fatherHeight?: number; // 外部高度 默认为窗口高度
                reduce?: number;
                remove?: string[];
                ignore?: boolean;
            };
            $emit: (e: "resize", height: number) => void;
            $slots: {
                default: (arg: { height: number; small: number; large: number }) => VNode[];
            };
        };
        Display: new () => {
            $props: {
                position?: DisplayPosition;
                bottom?: number;
                right?: number;
                left?: number;
                top?: number;
                text?: string;
                enable?: boolean;
                toggle?: boolean;
                type?: ButtonType;
            };
            $slots: {
                default: () => VNode[];
                extra: () => VNode[];
            };
            $emit: { (e: "click"): void };
        };
        TextInput: new () => {
            $props: {
                modelValue: TextInput;
                height?: number | string;
                placeholder?: string;
                disabled?: boolean;
                allow?: TextInputEncoderType[];
                upload?: TextInputUpload;
                encoding?: boolean;
                useInput?: boolean | string;
            };
            $slots: {
                default: () => VNode[];
            };
        };
        TextOutput: new () => {
            $props: {
                modelValue: TextOutput;
                height?: number | string;
                placeholder?: string;
                allow?: TextOutputEncoderType[];
                content: ComponentType<Text>;
                encoding?: boolean;
            };
            $emit: (e: "success") => void;
        };
        SerializeInput: new () => {
            $props: {
                modelValue: SerializeInput;
                height?: number | string;
                placeholder?: string;
                allow?: SerializeInputEncoderType[];
            };
        };
        SerializeOutput: new () => {
            $props: {
                modelValue: SerializeOutput;
                height?: number | string;
                placeholder?: string;
                disabledBorder?: boolean;
                allow?: SerializeOutputEncoderType[];
                content: ComponentType<Serialize>;
            };
            $emit: (e: "success") => void;
            $slots: {
                default: () => VNode[];
            };
        };
        Editor: new () => {
            $props: {
                modelValue?: string;
                "v-model"?: string;
                toolbar?: DisplayPosition;
                lang?: string;
                placeholder?: string;
                height?: string | number;
                disableLineWrapping?: boolean;
                disableBorder?: boolean;
                disableLineNumbers?: boolean;
                lineInfo?: boolean;
                reload?: number;
                langCallback?: () => string | void;
                disableClear?: boolean;
            };
        };
        Tooltip: new () => {
            $props: {
                content: string;
            };
            $slots: {
                default: () => VNode[];
            };
        };
        Tabs: new () => {
            $props: {
                modelValue?: string;
                lists: TabsListsType;
                padding?: string;
            };
            $slots: {
                default: () => VNode[];
                extra: () => VNode[];
            };
        };
        HelpTip: new () => {
            $props: {
                link?: string;
                icon?: IconType;
                iconSize?: number | string;
                text?: string;
            };
            $emit: (e: "click") => void;
            $slots: {
                default: () => VNode[];
            };
        };
        Table: new () => {
            $props: {
                columns: TableConfig;
                lists: TableLists;
                border?: boolean;
                height?: number | string;
                actionWidth?: number | string;
            };
            $slots: {
                default: (row: Record<string, any>, index: number) => VNode[];
                column: (row: Record<string, any>, index: number) => VNode[];
            };
        };
        Color: new () => {
            $props: {
                modelValue: string;
                label?: string;
                disabled?: boolean;
                size?: ComponentSizeType;
            };
        };
        Link: new () => {
            $props: {
                type?: LinkType;
                href?: string;
                self?: boolean;
                tooltip?: string;
            };
            $emit: (e: "click") => void;
            $slots: {
                default: () => VNode[];
            };
        };
        Card: new () => {
            $props: {
                title?: string;
                padding?: string;
                height?: string | number;
            };
            $slots: {
                default: () => VNode[];
                extra: () => VNode[];
            };
        };
        Modal: new () => {
            $props: {
                modelValue: boolean;
                title?: string;
                padding?: string;
                loading?: boolean;
                width?: string | number;
                footerType?: ModalFooterType;
            };
            $emit: { (e: "ok"): void; (e: "cancel"): void; (e: "close"): void };
            $slots: {
                default: () => VNode[];
                footer: () => VNode[];
            };
        };
        ExtendPage: new () => {
            $props: {
                modelValue: boolean;
                disableReplace?: boolean;
                offset?: number;
                closeText?: string;
            };
            $slots: {
                default: () => VNode[];
            };
        };
        Align: new () => {
            $props: {
                gap?: AlignSize;
                top?: AlignSize;
                bottom?: AlignSize;
                direction?: AlignDirection;
                horizontal?: AlignHorizontal;
                vertical?: AlignVertical;
                width?: string | number;
                height?: string | number;
            };
            $slots: {
                default: () => VNode[];
            };
        };
        Exception: new () => {
            $props: {
                content?: string;
            };
        };
    }
}
