<template>
    <heightResize @resize="resize">
        <Row :gutter="10">
            <Col span="8">
                <input-block top="5px">
                    <autoHeightTextarea v-model="current.input" :height="inputHeight"
                                        :placeholder="$t('binary_input')"/>
                    <Select slot="extra" v-model="current.length" style="width:100px">
                        <Option :value="8">{{ $t('binary_length', [8]) }}</Option>
                        <Option :value="16">{{ $t('binary_length', [16]) }}</Option>
                        <Option :value="32">{{ $t('binary_length', [32]) }}</Option>
                    </Select>
                </input-block>
            </Col>
            <Col span="16">
                <input-block top="5px" :text="$t('binary_true_form')"
                             @on-default-right-bottom-click="()=>$copy(result('trueForm'))">
                    <autoHeightTextarea :value="result('trueForm')" :height="outputHeight"
                                        :placeholder="$t('binary_true_form')" style="margin-bottom: 10px"/>
                </input-block>
                <input-block top="5px" :text="$t('binary_inverse')"
                             @on-default-right-bottom-click="()=>$copy(result('inverse'))">
                    <autoHeightTextarea :value="result('inverse')" :height="outputHeight"
                                        :placeholder="$t('binary_inverse')" style="margin-bottom: 10px"/>
                </input-block>
                <input-block top="5px" :text="$t('binary_complement')"
                             @on-default-right-bottom-click="()=>$copy(result('complement'))">
                    <autoHeightTextarea :value="result('complement')" :height="outputHeight"
                                        :placeholder="$t('binary_complement')"/>
                </input-block>
            </Col>
        </Row>
    </heightResize>
</template>
<script>
import caculate from "./library/binary"
import heightResize from "./components/heightResize";
import autoHeightTextarea from "./components/autoHeightTextarea";

export default {
    components: {
        heightResize,
        autoHeightTextarea
    },
    created() {
        this.$initToolData('input', (data) => {
            return /^[\d\-+\n]+$/.test(data)
        })
    },
    methods: {
        resize(height) {
            this.inputHeight = height
            this.outputHeight = Math.ceil((height - 20) / 3)
        },
        result(type) {
            if (this.current.input.trim() === "") {
                return ""
            }
            let output = []
            for (let input of this.current.input.trim().split("\n")) {
                try {
                    output.push(caculate(input, this.current.length, type))
                } catch (e) {
                    output.push(this.$t('binary_error', [e.message]).toString())
                }
            }
            this.$saveToolData(this.current)
            return output.join("\n");
        }
    },
    data() {
        return {
            current: {
                input: "",
                length: 8,
            },
            inputHeight: 100,
            outputHeight: 100
        }
    },
}
</script>
