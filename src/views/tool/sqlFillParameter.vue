<template>
    <heightResize :reduce="5" @resize="resize">
        <Row :gutter="10">
            <Col span="12">
                <autoHeightTextarea v-model="current.sqlStr" :height="inputHeight"
                                    placeholder="SQL:SELECT * FROM T WHERE id=? AND name = ?"/>
                <autoHeightTextarea v-model="current.paramStr" :height="inputHeight" style="margin-top: 10px"
                                    :placeholder="`${$t('sqlFillParameter_parameter')}:1(Integer),zhangshan(String)`"/>
            </Col>
            <Col span="12">
                <input-block :text="`${outStr ? $t('sqlFillParameter_copy') : ''}`"
                             @on-default-right-bottom-click="()=>$copy(outStr)">
                    <autoHeightTextarea v-model="outStr" :height="outputHeight"
                                        :placeholder="`${$t('sqlFillParameter_out')}:SELECT * FROM T WHERE id=1 AND name='zhangshan'`"/>
                </input-block>
            </Col>
        </Row>
    </heightResize>
</template>

<script>
import heightResize from "./components/heightResize";
import autoHeightTextarea from "./components/autoHeightTextarea";

// 1-String 2-NUMBER 3-Timestamp
const TYPE_STR = ['String', 'Integer', 'Long', 'Timestamp']

/**
 * SQL 参数填充
 */
export default {
    components: {
        heightResize,
        autoHeightTextarea
    },
    data() {
        return {
            inputHeight: 100,
            outputHeight: 100,
            current: {
                sqlStr: "",
                paramStr: "",
            },
        }
    },
    created() {
        this.$initToolData()
    },
    computed: {
        outStr() {
            try {
                if (!this.current.sqlStr || !this.current.paramStr) {
                    return "";
                }
                // 解析参数
                let paramList = this.convertParameter()
                // 按字读取SQL，将?做替换
                let tempSqlStr = this.current.sqlStr
                let resultStr = '' // 替换后的字符串
                let paramIndex = 0 // 参数访问索引
                let tempParamStr = '' // 用于存放参数字符串
                for (let i = 0; i < tempSqlStr.length; i++) {
                    // 检查到？就进行参数替换，不考虑SQL本身的合法性，不做SQL的语法和词法分析
                    let c = tempSqlStr.charAt(i)
                    if (c === '?') {
                        // 需要检查参数列表的越界
                        if (paramList.length <= paramIndex) {
                            throw new Error(this.$t('sqlFillParameter_parameter_too_little'))
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
                this.$saveToolData(this.current);
                return resultStr;
            } catch (e) {
                return e.message
            }
        }

    },
    methods: {
        resize(height) {
            this.outputHeight = height
            this.inputHeight = Math.floor((height - 10) / 2)
        },
        clear() {
            this.current.sqlStr = ''
            this.current.paramStr = ''
            this.current.outStr = ''
        },
        fill() {

        },
        convertParameter: function () {
            if (this.current.paramStr) {
                let paramStrList = this.current.paramStr.split(',', -1)
                return paramStrList.map(x => {
                    let valueEndIndex = x.lastIndexOf('(')
                    if (valueEndIndex < 0) {
                        throw new Error(this.$t('sqlFillParameter_invalid_param') + x)
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
    }
}
</script>
