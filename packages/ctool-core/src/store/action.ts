// 工具操作
import { reactive, toRaw } from "vue";
import dayjs from "dayjs";
import { instanceOfInput, instanceOfHistorySerializable } from "@/helper/util";
import { paste, copy as copyText, copyImage } from "@/helper/clipboard";
import useOperate from "@/store/operate";
import getHistoryInstance from "@/helper/history";
import useSetting from "@/store/setting";
import { useRoute } from "vue-router";
import { debounce, cloneDeep, isNumber, toNumber, mergeWith, isObject, isString, merge } from "lodash";
import { MessageType } from "@/types";
import { objectInObject } from "@/helper/util";
import Message from "@/helper/message";
import storage from "@/helper/storage";

type Success = {
    message?: string,
    message_type?: MessageType,
    copy_text?: string,
    copy_image?: string,
    is_save?: boolean
}

type InitializeReturn<T extends Record<string, any> = {}> = {
    items: T,
    field: string
}

// initialize option
type initializeOption = {
    // 主要输入字段 可以接受剪贴板数据
    input?: string,
    // 剪贴板校验函数
    paste?: ((str: string) => boolean) | false,
    //
    /**
     * 搜索关键字处理函数
     * 返回 `!false` 时 做如下操作
     * 1. 使用返回值覆盖 `defaultItems` 中对应值
     * 2. 使用返回值过滤历史数据
     */
    keyword?: (keyword: string) => Record<string, any> | false
}
/**
 * 初始化页面数据
 * 自动解析输入 优先级从高到低
 * * 固定输入: storage:_temp_input_storage | url?input=value
 * * 强制历史数据: url?history = index
 * * 剪贴板数据 || 最新历史数据 根据配置`fill_history_expire`确定
 * * 默认数据
 *
 * 固定输入/剪贴板数据 inputField != ""
 * @param defaultItems 默认数据
 * @param {initializeOption} option
 */
export const initialize = async <T extends Record<string, any>>(
    defaultItems: T,
    {
        input: inputField = "input",
        keyword: keywordCheck = (_keyword: string) => false,
        paste: pasteCheck = (_str: string) => true,
    }: initializeOption = {},
) => {
    const storeOperate = useOperate();
    const history = getHistoryInstance<T>(storeOperate.items.tool, storeOperate.items.feature);
    const route = useRoute();
    const storeSetting = useSetting();

    // 获取url参数
    const getUrlInput = (key: string) => {
        const value = route.query?.[key];
        return isString(value) ? value : "";
    };

    // 获取搜索关键字处理结果
    const keywordItems = (() => {
        // 搜索关键字处理
        const keyword = getUrlInput("keyword");
        if (keyword === "") {
            return false;
        }
        return keywordCheck(keyword);
    })();

    // 返回数据处理
    const result = (value: T): InitializeReturn<T> => {
        // input 为数字
        if (inputField && isNumber(defaultItems[inputField]) && value[inputField]) {
            // @ts-ignore
            value[inputField] = toNumber(value[inputField]);
        }
        return {
            items: cloneDeep(value),
            field: inputField,
        };
    };

    // 默认数据中无输入字段 默认处理
    if (inputField && !(inputField in defaultItems)) {
        inputField = "";
        pasteCheck = false;
    }

    // 是否使用通用输入组件
    const isTextInput = inputField && instanceOfInput(defaultItems[inputField]);

    // 默认输入搜索关键字处理
    defaultItems = keywordItems ? merge(defaultItems, keywordItems) : defaultItems;

    let items = cloneDeep(defaultItems);

    // 固定数据
    if (inputField) {
        let fixeInput = storage.get<string>(`_temp_input_storage`) || getUrlInput("input");
        if (fixeInput !== "") {
            if (isTextInput) {
                items[inputField]["value"] = fixeInput;
                return result(items);
            }
            return result({ ...items, [inputField]: fixeInput });
        }
    }

    // 强制历史数据
    const historyIndexItem = getUrlInput("history") !== "" ? history.get(parseInt(getUrlInput("history"))) : null;
    if (historyIndexItem) {
        return result(
            mergeWith(items, historyIndexItem, (objValue, srcValue) => {
                if (instanceOfHistorySerializable(objValue)) {
                    return objValue.unserialize(srcValue);
                }
            }),
        );
    }

    // 最新历史数据
    const latestHistory = (() => {
        if (history.length() < 1) {
            return null;
        }

        if (keywordItems) {
            const all = history.all();
            for (let itemIndex in all) {
                if (objectInObject(keywordItems, all[itemIndex].v)) {
                    // 最新历史数据 根据索关键字过滤
                    return history.getWithTime(parseInt(itemIndex));
                }
            }
            return null;
        }
        return history.getWithTime(0);
    })();

    // 剪贴板数据
    const pasteInput = await (async () => {
        if (inputField && pasteCheck !== false && storeSetting.items.auto_read_copy) {
            const pasteInput = await paste();
            if (pasteInput.trim() && pasteCheck(pasteInput)) {
                return storeSetting.items.auto_read_copy_filter ? pasteInput.trim() : pasteInput;
            }
        }
        return "";
    })();

    if (
        latestHistory
        && (
            pasteInput === "" // 剪贴板为空
            || dayjs().unix() - dayjs(latestHistory.t).unix() < storeSetting.items.fill_history_expire // 配置优先访问内
        )
    ) {
        console.log(`use latest history data`);
        return result(
            mergeWith(items, latestHistory.v, (objValue, srcValue) => {
                if (instanceOfHistorySerializable(objValue)) {
                    return objValue.unserialize(srcValue);
                }
            }),
        );
    }

    if (pasteInput) {
        console.log(`use paste data`);
        // 是否使用通用输入组件
        if (isTextInput) {
            items[inputField]["value"] = storeSetting.items.auto_read_copy_filter ? pasteInput.trim() : pasteInput;
            return result(items);
        }
        return result({
            ...items,
            [inputField]: storeSetting.items.auto_read_copy_filter ? pasteInput.trim() : pasteInput,
        });
    }

    // 默认数据
    return result(items);
};

export const useAction = <T extends Record<string, any>>(input: InitializeReturn<T>) => {
    const storeOperate = useOperate();
    const history = getHistoryInstance<T>(storeOperate.items.tool, storeOperate.items.feature);
    const storeSetting = useSetting();

    const current = reactive<T>(input.items);

    const historyPush = debounce(function() {
        // 检查是否可以保存数据
        const handle = (items: any) => {
            if (!isObject(items)) {
                return items;
            }
            if (instanceOfHistorySerializable(items)) {
                if (!items.isSaveHistory()) {
                    throw new Error("Do not save");
                }
                return items.serialize();
            }

            for (let key in items) {
                items[key] = handle(items[key]);
            }
            return items;
        };
        try {
            history.push(handle(cloneDeep(toRaw(current))));
        } catch (e) {
        }
    }, 500);

    // 保存历史数据
    const save = () => {
        historyPush();
    };

    // 处理成功
    const success = (
        {
            message = $t("main_ui_success"),
            message_type = "success",
            copy_text = "",
            copy_image = "",
            is_save = true,
        }: Success = {},
    ): void => {
        // 自动保存
        is_save && save();
        // 复制文本
        if (copy_text !== "" && storeSetting.items.auto_save_copy) {
            return copyText(copy_text, () => {
                Message.success($t("main_ui_copy_text_ok"));
            });
        }
        // 复制图片
        if (copy_image !== "" && storeSetting.items.auto_save_copy) {
            return copyImage(copy_image, () => {
                Message.success($t("main_ui_copy_image_ok"));
            });
        }
        // 提示
        if (message !== "") {
            Message[message_type](message, { offset: 150 });
        }
    };

    return {
        current:current as T,
        save,
        success,
    };
};
