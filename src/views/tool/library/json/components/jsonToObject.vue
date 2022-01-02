<template>
    <div>
        <div>
            <option-block disable-padding>
                <Input v-model="options.packageName">
                    <div slot="prepend">namespace/package</div>
                </Input>
            </option-block>
            <option-block>
                <Input v-model="options.className">
                    <div slot="prepend">class/struct</div>
                </Input>
            </option-block>
        </div>
        <input-block bottom="10px" right="10px">
            <code-editor :height="`${height - 84}px`" :placeholder="`Object ${$t('json_output')}`" :value="output"
                         :language="languages[options.type]"/>
            <template slot="extra">
                <RadioGroup size="small" v-model="options.type" type="button" button-style="solid">
                    <Radio :label="type" v-for="(type) in types" :key="type">
                        <span>{{ type }}</span>
                    </Radio>
                </RadioGroup>
            </template>
        </input-block>
    </div>
</template>
<script>
import codeEditor from "../../../components/codeEditor";
import json2Go from '../json2Go'
import json2CSharp from '../json2CSharp'
import json2Java from '../json2Java'
import json2Dart from '../json2Dart'

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
                let result = "";
                require('jsonlint').parse(json)
                switch (this.options.type) {
                    case "Go":
                        result = json2Go(json, this.options.className, this.options.packageName).go
                        break
                    case "Java":
                        result = json2Java(JSON.parse(json), this.options.className, this.options.packageName)
                        break
                    case "Dart":
                        result = json2Dart(JSON.parse(json), this.options.className)
                        break
                    case "C#":
                        result = json2CSharp.convert(JSON.parse(json), this.options.className, this.options.packageName)
                        break
                    default:
                        throw new Error('language type error')
                }
                this.$emit('input', this.options);
                // 保存数据
                this.$emit('saveToolData');
                return result;
            } catch (error) {
                return this.$t('json_error', [error.message]).toString()
            }
        },
        types() {
            return Object.keys(this.languages)
        }
    },
    data() {
        return {
            options: {
                type: "Java",
                packageName: "pag",
                className: "RootName",
            },
            languages: {
                "Java": "java",
                "Dart": "dart",
                "C#": "csharp",
                "Go": "go"
            },
        }
    },
}
</script>
