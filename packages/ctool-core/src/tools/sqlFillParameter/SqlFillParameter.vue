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
import {watch} from "vue";

// 1-String 2-NUMBER 3-Long,4-Timestamp
const TYPE_STR = ['String', 'Integer', 'Long', 'Timestamp']

const action = useAction(await initialize({input: "", params: ""}))

/**
 * 将一行参数转化为值和类型的对象有序列表
 * @param params 参数字符串，字符串的格式为 value(type),value(type),.....
 * 实际例如： 1(String),2023-03-23 12:00:00(Timestamp)
 */
const convertParam = (params: string) => {
    if (params) {
        let tempList = params.split(',', -1)
        // 因为参数中可能存在逗号，例如json数据，为此采取的方案是先分割，后合并的策略
        // 分割后是不包含,的，检查串是否为null或者)结尾，如果是则认为是正常的参数，如果不是则认为是分割后的串的一部分
        // 举例{"goodsService":[],"goodsSpecs":{"id":"db6c56a224a788c5a7458017731c9255","imageFileId":"16925e7fc297452a984d4b3e2e9e6e40"}}(String),
        // null, null, 1(Integer),1(Integer)
        // paramStrList 为合并后的实际参数列表
        let paramStrList:string[] = []
        let paramIndex = 0
        // 标记是否在合并中
        let combining = false
        tempList.forEach((x) => {
            // 对null值采用endsWith的原因是因为有前置空格，直接判断endWith比去掉空格处理更方便
            // 遇到null值直接作为参数
            if (x.endsWith('null')) {
              paramStrList.push(x)
              paramIndex ++
            } else if (x.endsWith(')')) {
                // 前面的串处在合并过程中，遇到了）结尾的情况，说明合并结束
                if (combining) {
                    paramStrList[paramIndex] += ',' + x
                    combining = false
                } else {
                    paramStrList.push(x)
                }
                paramIndex ++
            } else {
                let tempStr = paramStrList[paramIndex]
                if (!tempStr) {
                  paramStrList.push(x)
                  combining= true
                } else {
                  paramStrList[paramIndex] +=  ',' + x
                }
            }
        })
        return paramStrList.map(x => {
            let valueEndIndex = x.lastIndexOf('(')
            if (valueEndIndex < 0) {
                // 直接将整个串作为值，类型为其他
                return {value: x, type: null}
            }
            // 从串中截取出值，并对前后空格进行清除
            let value = x.substring(0, valueEndIndex)
            value = value.trim();
            // 对数据中的'进行转义，mybatis输出的参数中的'是不进行转义的
            value = value.replaceAll('\'', '\\\'')
            // 从串中截取出类型，并进行前后空格清除
            let typeEndIndex = x.lastIndexOf(')')
            if (typeEndIndex < 0) {
                typeEndIndex = x.length
            }
            let type = x.substring(valueEndIndex + 1, typeEndIndex)
            type = type.trim()
            return {value, type}
        })
    } else {
        return []
    }
}

const fill = () => {
    if (!action.current.input || !action.current.params) {
        return ""
    }
    // 解析参数
    let paramList = convertParam(action.current.params)
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
                    tempParamStr = ' \'' + param.value + '\''
                    break
                // Integer
                // Long
                case TYPE_STR[1]:
                case TYPE_STR[2]:
                    tempParamStr = param.value
                    break
                // Timestamp
                case TYPE_STR[3]:
                    tempParamStr = 'Timestamp \'' + param.value + '\''
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
    return resultStr
}

/**
 * 从串中分离sql模板和参数
 */
const splitSqlAndParams = (input: string) => {
    const result = {
        sql: "",
        params: ""
    }
    // 寻找SQL串的开始
    let sqlStartStr = 'Preparing:'
    let sqlStartIndex = input.indexOf(sqlStartStr)
    if (sqlStartIndex < 0) {
        // 没有找到Preparing:则认为整个串是SQL
        sqlStartIndex = 0
    } else {
        sqlStartIndex += sqlStartStr.length
    }
    // mybatis打印的SQL都以行为结束标记，因此寻找到该行的\n即认为结束
    let sqlEndIndex = input.indexOf("\n", sqlStartIndex)
    if (sqlEndIndex < 0) {
        sqlEndIndex = input.length
    }
    result.sql = input.substring(sqlStartIndex, sqlEndIndex)
    // 寻找参数串的开始
    let paramStartStr = 'Parameters:'
    let paramStartIndex = input.indexOf(paramStartStr)
    if (paramStartIndex >= 0) {
        // mybatis打印的SQL都以行为结束标记，因此寻找到该行的\n即认为结束
        let paramEndIndex = input.indexOf("\n", paramStartIndex)
        if (paramEndIndex < 0) {
            paramEndIndex = input.length
        }
        result.params = input.substring(paramStartIndex + paramStartStr.length, paramEndIndex)
    }
    return result
}

const output = $computed(() => {
    try {
        if (!action.current.input || !action.current.params) {
            return ""
        }
        // 做参数填充
        let resultStr = fill()
        action.save()
        return resultStr
    } catch (e) {
        return $error(e)
    }
})

watch(() => {
    return {input: action.current.input, params: action.current.params}
}, ({input}) => {
    // 输入不为空，且输入包含Preparing:和Parameters:，则尝试分离SQL和参数
    if (
        input !== ""
        && input.includes('Preparing:')
        && input.includes('Parameters:')
    ) {
        const result = splitSqlAndParams(input)
        if (result.sql !== "" && result.params !== "") {
            setTimeout(() => {
                action.current.input = result.sql
                action.current.params = result.params
            })
        }
    }
}, {immediate: true})
</script>
