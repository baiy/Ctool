// 工具操作
import {onUnmounted, reactive, toRaw} from 'vue'
import {instanceOfInput, instanceOfHistorySerializable} from "@/helper/util"
import {paste, copy as copyText, copyImage} from "@/helper/clipboard"
import useOperate from "@/store/operate"
import getHistoryInstance from "@/helper/history"
import useSetting from "@/store/setting"
import {useRoute} from "vue-router"
import {debounce, cloneDeep, isNumber, toNumber, mergeWith, isObject} from "lodash"
import {MessageType} from '@/types'
import Message from '@/helper/message'
import storage from '@/helper/storage'

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

/**
 * 初始化页面数据
 * 自动解析输入 优先级从高到低
 * 固定输入:url?input = string | _temp_storage
 * 强制历史数据:url?history = index
 * 最新历史数据 / 剪贴板数据 / 默认数据
 *
 * 固定输入/剪贴板数据 inputField != ""
 * @param defaultItems 默认数据
 * @param inputField 输入字段名
 * @param pasteCheck 剪贴板数据校验方法
 */
export const initialize = async <T extends Record<string, any>>(defaultItems: T, pasteCheck: ((str: string) => boolean) | boolean = true, inputField: string = "input") => {
    const storeOperate = useOperate()
    const history = getHistoryInstance<T>(storeOperate.items.tool, storeOperate.items.feature)
    const route = useRoute()
    const storeSetting = useSetting()

    // 默认数据中无输入字段 默认处理
    if (inputField && !(inputField in defaultItems)) {
        inputField = ""
        pasteCheck = false
    }

    // 是否使用通用输入组件
    const isTextInput = inputField && instanceOfInput(defaultItems[inputField])

    const result = (value: T): InitializeReturn<T> => {
        // input 为数字
        if (inputField && isNumber(defaultItems[inputField]) && value[inputField]) {
            // @ts-ignore
            value[inputField] = toNumber(value[inputField])
        }
        return {
            items: cloneDeep(value),
            field: inputField
        }
    }

    let items = cloneDeep(defaultItems)

    // 固定数据
    if (inputField && route.query?.input) {
        let fixeInput = `${route.query.input}`
        if (fixeInput === "_temp_storage") {
            fixeInput = storage.get(fixeInput) || ""
        }
        if (fixeInput !== "") {
            if (isTextInput) {
                items[inputField]['value'] = fixeInput
                return result(items);
            }
            return result({...items, [inputField]: fixeInput})
        }
    }

    // 强制历史数据 && 最新历史数据
    if (history.length() > 0) {
        const historyItem = history.get(parseInt((route.query?.history || "").toString()) || 0)
        if (historyItem) {
            return result(
                mergeWith(items, historyItem, (objValue, srcValue) => {
                    if (instanceOfHistorySerializable(objValue)) {
                        return objValue.unserialize(srcValue)
                    }
                })
            )
        }
    }

    // 剪贴板数据
    if (inputField && pasteCheck !== false && storeSetting.items.auto_read_copy) {
        const pasteInput = await paste()
        if (pasteInput.trim() && (pasteCheck === true || pasteCheck(pasteInput))) {
            // 是否使用通用输入组件
            if (isTextInput) {
                items[inputField]['value'] = storeSetting.items.auto_read_copy_filter ? pasteInput.trim() : pasteInput
                return result(items);
            }
            return result({
                ...items,
                [inputField]: storeSetting.items.auto_read_copy_filter ? pasteInput.trim() : pasteInput
            })
        }
    }

    // 默认数据
    return result(items)
}

export const useAction = <T extends Record<string, any>>(input: InitializeReturn<T>) => {
    const storeOperate = useOperate()
    const history = getHistoryInstance<T>(storeOperate.items.tool, storeOperate.items.feature)
    const storeSetting = useSetting()

    const current: T = reactive(input.items)

    onUnmounted(() => {
        history.save()
    });

    const historyPush = debounce(function () {
        // 检查是否可以保存数据
        const handle = (items) => {
            if (!isObject(items)) {
                return items
            }
            if (instanceOfHistorySerializable(items)) {
                if (!items.isSaveHistory()) {
                    throw new Error("Do not save")
                }
                return items.serialize()
            }

            for (let key in items) {
                items[key] = handle(items[key])
            }
            return items
        }
        try {
            history.push(handle(cloneDeep(toRaw(current))))
        } catch (e) {
        }
    }, 500)

    // 保存历史数据
    const save = () => {
        historyPush()
    }

    // 处理成功
    const success = (
        {
            message = $t('main_ui_success'),
            message_type = "success",
            copy_text = "",
            copy_image = "",
            is_save = true
        }: Success = {}
    ): void => {
        // 自动保存
        is_save && save()
        // 复制文本
        if (copy_text !== "" && storeSetting.items.auto_save_copy) {
            return copyText(copy_text, () => {
                Message.success($t('main_ui_copy_text_ok'))
            })
        }
        // 复制图片
        if (copy_image !== "" && storeSetting.items.auto_save_copy) {
            return copyImage(copy_image, () => {
                Message.success($t('main_ui_copy_image_ok'))
            })
        }
        // 提示
        if (message !== "") {
            Message[message_type](message, {offset: 150, showClose: true})
        }
    }

    return {
        current,
        save,
        success
    }
}
