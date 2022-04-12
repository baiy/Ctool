<template>
    <div>
        <div v-if="options.type!=='Protobuf'">
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
        <input-block top="10px" right="10px">
            <input-block bottom="10px" right="10px">
                <code-editor :height="`${height - this.topHeight}px`" :placeholder="`Object ${$t('json_output')}`" :value="output"
                             :language="languages[options.type]"/>
                <template slot="extra">
                    <RadioGroup size="small" v-model="options.type" type="button" button-style="solid">
                        <Radio :label="type" v-for="(type) in types" :key="type">
                            <span>{{ type }}</span>
                        </Radio>
                    </RadioGroup>
                </template>
            </input-block>
            <template slot="extra">
                <Checkbox v-if="options.type==='Protobuf'" v-model="options.inline">{{ $t('json_inline') }}</Checkbox>
            </template>
        </input-block>
    </div>
</template>
<script>
import codeEditor from "../../../components/codeEditor";
import json2Go from '../json2Go'
import json2CSharp from '../json2CSharp'
import json2Protobuf from '../json2Protobuf'
import json2Java from '../json2Java'
import json2php from '../json2php'
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
        topHeight(){
            return this.options.type === 'Protobuf'  ? 0 : 84
        },
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
                    case "Protobuf":
                        result = json2Protobuf(json, this.options.inline)
                        break
                    case "C#":
                        result = json2CSharp.convert(JSON.parse(json), this.options.className, this.options.packageName)
                        break
                    case "PHP":
                        result = json2php(json, {
                            className:this.options.className,
                            namespace:this.options.packageName,
                        })
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
                inline: true,
            },
            languages: {
                "Java": "java",
                "Dart": "dart",
                "C#": "csharp",
                "Protobuf": "protobuf",
                "Go": "go",
                "PHP": "php"
            },
        }
    },
}
</script>
