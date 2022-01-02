<template>
    <input-block right="10px">
        <code-editor :height="`${height}px`" :placeholder="`Html Table ${$t('json_output')}`" :value="output" language="html"/>
        <template slot="extra">
            <Checkbox v-model="options.header">{{ $t('json_column_name') }}</Checkbox>
        </template>
    </input-block>
</template>
<script>
import codeEditor from "../../../components/codeEditor";
import jsonInstance from "../index";

export default {
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
    components: {
        codeEditor,
    },
    computed: {
        output() {
            const json = this.json.trim();
            if (!json) {
                return "";
            }
            try {
                let result = jsonInstance.jsonToTable(JSON.parse(json), {header:this.options.header})
                this.$emit('input', this.options);
                // 保存数据
                this.$emit('saveToolData');
                return result;
            } catch (error) {
                return this.$t('json_error', [error.message]).toString()
            }
        }
    },
    data() {
        return {
            options: {
                header: true
            }
        }
    },
}
</script>
