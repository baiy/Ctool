<template>
    <heightResize @resize="resize">
        <Row :gutter="10">
            <Col span="12">
                <input-block bottom="4px">
                    <code-editor :height="editorheight" :placeholder="$t('jwt_input')"  hideLineNumbers v-model="current.input"></code-editor>
                    <template slot="extra">
                        <Checkbox v-model="current.header">header</Checkbox>
                        <Checkbox v-model="current.payload">payload</Checkbox>
                    </template>
                </input-block>
            </Col>
            <Col span="12">
                <code-editor :height="editorheight" :placeholder="$t('jwt_output')" :value="output" language="json"></code-editor>
            </Col>
        </Row>
    </heightResize>
</template>
<script>
import jwtDecode from "jwt-decode"
import codeEditor from "./components/codeEditor";
import jsonFormatter from "./library/formatter/json";
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
            if(!this.current.input.trim()){
                return ""
            }
            try {
                let data = {};
                if (this.current.header) {
                    data.header = jwtDecode(this.current.input, {header: true})
                }
                if (this.current.payload) {
                    data.payload = jwtDecode(this.current.input)
                }
                this.$saveToolData(this.current);
                return jsonFormatter.objectBeautify(
                    Object.keys(data).length === 1 ? data[Object.keys(data)[0]] : data,
                );
            } catch (e) {
                return this.$t('jwt_decode_fail',[e.message])
            }
        }
    },
    methods:{
        resize(height){
            this.editorheight = height+"px"
        }
    },
    data() {
        return {
            current: {
                input: "",
                header: false,
                payload: true,
            },
            editorheight:"100%",
        }
    },
}
</script>
