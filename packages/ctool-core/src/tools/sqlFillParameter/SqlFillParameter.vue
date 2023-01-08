<template>
    <HeightResize v-slot="{height}" ignore :reduce="5">
        <Align direction="vertical">
            <div v-row="`1-1`">
                <Textarea
                    v-model="action.current.input"
                    :height="height/2"
                    :placeholder="`Sql:SELECT * FROM T WHERE id=? AND name = ?`"
                    copy="Sql"
                />
                <Textarea
                    v-model="action.current.params"
                    :height="height/2"
                    :placeholder="`${$t('sqlFillParameter_parameter')}:1(Integer),zhangshan(String)`"
                    :copy="$t('sqlFillParameter_parameter')"
                />
            </div>
            <Textarea
                :model-value="output"
                copy
                :height="height/2"
                :placeholder="`${$t('main_ui_output')}:SELECT * FROM T WHERE id=1 AND name='zhangshan'`"
            />
        </Align>
    </HeightResize>
</template>

<script lang="ts" setup>
import {initialize, useAction} from "@/store/action";

// 1-String 2-NUMBER 3-Timestamp
const TYPE_STR = ['String', 'Integer', 'Long', 'Timestamp']

const action = useAction(await initialize({
    input: "",
    params: "",
}, {paste: false}))

const convert = (params: string) => {
    if (params) {
        let paramStrList = params.split(',', -1)
        return paramStrList.map(x => {
            let valueEndIndex = x.lastIndexOf('(')
            if (valueEndIndex < 0) {
                throw new Error($t('sqlFillParameter_invalid_param', [x]))
            }
            let value = x.substring(0, valueEndIndex)
            let len = x.length
            let type = x.substring(valueEndIndex + 1, len - 1)
            return {value, type}
        })
    } else {
        return []
    }
}

const output = $computed(() => {
    try {
        if (!action.current.input || !action.current.params) {
            return "";
        }
        // 解析参数
        let paramList = convert(action.current.params)
        // 按字读取SQL，将?做替换
        let tempSqlStr = action.current.input
        let resultStr = '' // 替换后的字符串
        let paramIndex = 0 // 参数访问索引
        let tempParamStr = '' // 用于存放参数字符串
        for (let i = 0; i < tempSqlStr.length; i++) {
            // 检查到？就进行参数替换，不考虑SQL本身的合法性，不做SQL的语法和词法分析
            let c = tempSqlStr.charAt(i)
            if (c === '?') {
                // 需要检查参数列表的越界
                if (paramList.length <= paramIndex) {
                    throw new Error($t('sqlFillParameter_parameter_too_little'))
                }
                let param = paramList[paramIndex]
                switch (param.type) {
                    // String
                    case TYPE_STR[0]:
                        tempParamStr = '\'' + param.value + '\''
                        break
                    // Integer
                    // Long
                    case TYPE_STR[1]:
                    case TYPE_STR[2]:
                        tempParamStr = param.value
                        break
                    // Timestamp
                    case TYPE_STR[3]:
                        tempParamStr = 'timestamp' + param.value
                        break
                    // 其他类型直接拼接原始字符
                    default:
                        tempParamStr = param.value
                }
                // 字符拼接
                resultStr += tempParamStr
                paramIndex++
            } else { // 正常拼接
                resultStr += c
            }
        }
        action.save()
        return resultStr
    } catch (e) {
        return $error(e)
    }
})
</script>
