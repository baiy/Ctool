<template>
    <input-block right="10px" bottom="40px">
        <input-block right="10px" bottom="10px">
            <code-editor :height="`${height}px`" :placeholder="`Html Table ${$t('json_input')}`" v-model="options.input" language="html"/>
            <template slot="extra">
                <RadioGroup size="small" v-model="options.type" type="button" button-style="solid">
                    <Radio :label="item.k" v-for="item in types" :key="item.k">
                        <span>{{ item.n }}</span>
                    </Radio>
                </RadioGroup>
            </template>
        </input-block>
        <template slot="extra">
            <Select size="small" v-model="options.keyed_key" v-if="options.type === 'keyed'" style="width: 150px">
                <Option v-for="(key,k) in tableKeys" :key="k" :value="k">{{ key }}</Option>
            </Select>
        </template>
    </input-block>
</template>
<script>
import jsonInstance from "../index";
import codeEditor from "../../../components/codeEditor";
import {tableKeys} from '../tableToJson';

export default {
    props: {
        value: {
            type: Object,
            default: function () {
                return {}
            }
        },
        height: {
            type: Number,
            default: 100
        }
    },
    components: {
        codeEditor
    },
    created() {
        this.options = Object.assign(this.options, this.value)
    },
    computed: {
        tableKeys() {
            try {
                let input = this.options.input.trim();
                if (this.options.type === "keyed" && input) {
                    return tableKeys(this.options.input)
                }
            } catch {
                //
            }
            return [];
        }
    },
    watch: {
        options: {
            handler(val) {
                let input = val.input.trim();
                if (input) {
                    try {
                        const option = {
                            keyed_key: val.keyed_key,
                            type: val.type
                        }
                        // json变化事件
                        this.$emit('change', jsonInstance.tableToJson(input, option));
                        this.$emit('input', val);
                        // 保存数据
                        this.$emit('saveToolData');
                    } catch (e) {
                        console.log(e)
                        this.$emit('change', this.$t('json_error', [e.message]).toString());
                    }
                }
            },
            deep: true
        }
    },
    data() {
        return {
            options: {
                input: "",
                type: "json",
                keyed_key: 0
            },
            types: [
                {k: "json", n: this.$t('json_json_type_json')},
                {k: "keyed", n: this.$t('json_json_type_keyed')},
                {k: "array", n: this.$t('json_json_type_array')},
                {k: "column", n: this.$t('json_json_type_column')},
            ]
        }
    },
}
</script>
