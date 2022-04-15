<template>
    <div>
        <div style="margin-bottom: 10px">
            <Input v-model="options.path">
                <span slot="prepend">JsonPath</span>
                <Button slot="append" icon="md-help-circle" to="https://goessner.net/articles/JsonPath/" target="_blank"></Button>
            </Input>
        </div>
        <div :style="`height:${height - 42}px`">
            <code-editor :value="output" language="json"></code-editor>
        </div>
    </div>
</template>
<script>
import codeEditor from "../../../components/codeEditor";
import {JSONPath} from "jsonpath-plus";
import jsonInstance from "../../../library/json";

export default {
    components: {
        codeEditor
    },
    props: {
        value: {
            type: Object,
            default: function () {
                return {}
            }
        },
        json: {
            type: String,
            default: ""
        },
        height: {
            type: Number,
            default: 100
        }
    },
    created() {
        this.options = Object.assign(this.options, this.value)
    },
    computed: {
        output() {
            try{
                const json = this.json.trim();
                if (!json || !this.options.path) {
                    return "";
                }
                const result = JSONPath({path: this.options.path, json:JSON.parse(json)});
                this.$emit('input', this.options);
                // 保存数据
                this.$emit('saveToolData');
                return jsonInstance.beautify(JSON.stringify(result));
            }catch (e) {
                return e.message
            }
        },
    },
    data() {
        return {
            options: {
                path: ""
            }
        }
    },
}
</script>
