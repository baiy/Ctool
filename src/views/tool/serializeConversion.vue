<template>
    <Row :gutter="10">
        <Col span="12">
            <input-block top="10px" right="15px">
                <heightResize>
                    <code-editor v-model="current.input" :placeholder="$t('serializeConversion_input')"
                                 :language="language[current.source]"/>
                </heightResize>
                <template slot="extra">
                    <Select v-model="current.source" style="width:100px">
                        <Option v-for="v in type" :value="v" :key="v">{{ v }}</Option>
                    </Select>
                </template>
            </input-block>
        </Col>
        <Col span="12">
            <input-block top="10px" right="15px">
                <heightResize>
                    <code-editor :value="output" :placeholder="$t('serializeConversion_output')" :language="language[current.target]"/>
                </heightResize>
                <template slot="extra">
                    <Select v-model="current.target" style="width:100px">
                        <Option v-for="v in type" :value="v" :key="v">{{ v }}</Option>
                    </Select>
                </template>
            </input-block>
        </Col>
    </Row>
</template>
<script>
import {conversion, TYPE as conversionType} from "./library/serializeConversion"
import codeEditor from "./components/codeEditor";
import heightResize from "./components/heightResize";

export default {
    components: {
        codeEditor,
        heightResize
    },
    created() {
        this.$initToolData('input')
    },
    computed: {
        output() {
            let result = "";
            if (this.current.input) {
                try {
                    result = conversion(this.current.input, this.current.source).getByTarget(this.current.target);
                    this.$saveToolData(this.current);
                } catch (e) {
                    result = this.$t('serializeConversion_error', [e.message])
                }
            }
            return result;
        }
    },
    data() {
        return {
            current: {
                input: "",
                output: "",
                source: "json",
                target: "xml"
            },
            type: conversionType,
            language: {
                json: "json",
                xml: "xml",
                yaml: "yaml",
                phpArray: "php",
                phpSerialize: "text",
                properties: "text",
            }
        }
    },
}
</script>
