<template>
    <heightResize ignore @resize="resize">
        <Row :gutter="10">
            <Col span="6">
                <input-block top="4px" :text="$t('variableConversion_input')">
                    <autoHeightTextarea :height="height1" v-model="current.input" :placeholder="$t('variableConversion_input_placeholder')" />
                </input-block>
            </Col>
            <Col span="6" v-for="(item,key) in resultColumns" :key="key" :style="`margin-top: ${key > 2 ? '10px' : '0'}`">
                <input-block top="4px" type="default" :text="item.title" @on-default-right-bottom-click="()=>$copy(output[item.key])">
                    <autoHeightTextarea :height="key > 2 ? height2 : height1" :value="output[item.key]" :placeholder="item.title" />
                </input-block>
            </Col>
        </Row>
    </heightResize>
</template>
<script>
import varCamelCase from "./library/varCamelCase"
import heightResize from "./components/heightResize";
import autoHeightTextarea from "./components/autoHeightTextarea";

export default {
    components: {
        heightResize,
        autoHeightTextarea
    },
    computed: {
        resultColumns() {
            return varCamelCase.resultKey.map((item) => {
                return {
                    title: item.name,
                    key: item.key
                }
            });
        },
        output() {
            let result = varCamelCase.convent(this.current.input)
            this.$saveToolData(this.current);
            return result;
        }
    },
    created() {
        this.$initToolData('input')
    },
    methods: {
        resize(height) {
            this.height1 = Math.ceil(height/2);
            this.height2 = height - this.height1 - 10;
        }
    },
    data() {
        return {
            current: {
                input: ""
            },
            height1: 100,
            height2: 100
        }
    },
}
</script>
