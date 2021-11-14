<template>
    <Row :gutter="10">
        <Col span="10">
            <div class="page-option-block">
                <option-block style="padding: 0 0">
                    <Input v-model="current.package">
                        <div slot="prepend">namespace/package</div>
                    </Input>
                </option-block>
                <option-block>
                    <Input v-model="current.class">
                        <div slot="prepend">class/struct</div>
                    </Input>
                </option-block>
            </div>
            <input-block top="10px" right="10px" :text="$t('jsonToObject_format')" @on-default-right-bottom-click="format">
                <heightResize :append="['.page-option-block']">
                    <code-editor v-model="current.input" :placeholder="$t('jsonToObject_input')" language="json"/>
                </heightResize>
            </input-block>
        </Col>
        <Col span="14">
            <input-block top="10px" right="10px">
                <heightResize>
                    <code-editor :placeholder="$t('jsonToObject_output')" :value="output" :language="languages[current.type]"/>
                </heightResize>
                <template slot="extra">
                    <RadioGroup v-model="current.type" type="button" button-style="solid">
                        <Radio :label="type" v-for="(type) in types" :key="type">
                            <span>{{ type }}</span>
                        </Radio>
                    </RadioGroup>
                </template>
            </input-block>
        </Col>
    </Row>
</template>
<script>
import codeEditor from "./components/codeEditor";
import json2Go from './library/json2Go'
import jsonFormatter from './library/formatter/json'
import json2CSharp from './library/json2CSharp'
import json2Java from './library/json2Java'
import json2Dart from './library/json2Dart'
import heightResize from "./components/heightResize";

export default {
    components: {
        codeEditor,
        heightResize
    },
    created() {
        this.current = Object.assign(this.current, this.$getToolData())
    },
    computed: {
        output() {
            if (!this.current.input.trim()) {
                return "";
            }
            try {
                let result = "";
                require('jsonlint').parse(this.current.input)
                switch (this.current.type) {
                    case "Go":
                        result = json2Go(this.current.input, this.current.class, this.current.package).go
                        break
                    case "Java":
                        result = json2Java(JSON.parse(this.current.input), this.current.class, this.current.package)
                        break
                    case "Dart":
                        result = json2Dart(JSON.parse(this.current.input), this.current.class)
                        break
                    case "C#":
                        result = json2CSharp.convert(JSON.parse(this.current.input), this.current.class, this.current.package)
                        break
                    default:
                        throw new Error(this.$t('jsonToObject_type_error').toString())
                }
                this.$saveToolData(this.current)
                return result;
            } catch (error) {
                return this.$t('jsonToObject_error', [error.message]).toString()
            }
        },
        types(){
            return Object.keys(this.languages)
        }
    },
    methods:{
        format(){
            if (this.current.input.trim()){
                this.current.input = jsonFormatter.beautify(this.current.input)
            }
        }
    },
    data() {
        return {
            current: {
                input: "",
                type: "Java",
                package: "pag",
                class: "RootName",
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
