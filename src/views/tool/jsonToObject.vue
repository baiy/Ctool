<template>
    <Row :gutter="10">
        <Col span="10">
            <Card :padding="0">
                <p slot="title">JSON内容</p>
                <codemirror ref="json" v-model="current.json" :options="options('Json')"></codemirror>
            </Card>
            <option-block>
                <FormItem>
                    <Input v-model="current.package">
                        <div slot="prepend">namespace/package</div>
                    </Input>
                </FormItem>
            </option-block>
            <option-block>
                <FormItem>
                    <Input v-model="current.class">
                        <div slot="prepend">class/struct</div>
                    </Input>
                </FormItem>
            </option-block>
        </Col>
        <Col span="14">
            <Card :padding="0">
                <p slot="title">转换结果</p>
                <template slot="extra">
                    <Button style="margin-right: 5px" size="small" v-for="(item,key) in type" :key="key" type="primary"
                            @click="handle(item)">{{ item }}
                    </Button>
                </template>
                <codemirror ref="output" v-model="current.output"
                            :options="options(this.current.type)"></codemirror>
            </Card>
        </Col>
    </Row>
</template>
<script>
import json2Go from './library/json2Go'
import json2CSharp from './library/json2CSharp'
import json2Java from './library/json2Java'
import json2Dart from './library/json2Dart'
import {codemirror} from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/go/go.js'
import 'codemirror/mode/dart/dart'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
import 'codemirror/addon/fold/foldgutter.css'

export default {
    components: {
        codemirror,
    },
    created() {
        this.current = Object.assign(this.current, this.$getToolData())
    },
    mounted() {
        this.$refs.json.codemirror.setSize(null, window.innerHeight - 330)
        this.$refs.output.codemirror.setSize(null, window.innerHeight - 230)
    },
    methods: {
        handle(type) {
            try {
                require('jsonlint').parse(this.current.json)
                if (!this.type.includes(type)) {
                    throw new Error("转换类型错误")
                }
                this.current.type = type;

                switch (type) {
                    case "Go":
                        this.current.output = json2Go(this.current.json, this.current.class, this.current.package).go
                        break;
                    case "Java":
                        this.current.output = json2Java(JSON.parse(this.current.json), this.current.class, this.current.package)
                        break;
                    case "Dart":
                        this.current.output = json2Dart(JSON.parse(this.current.json), this.current.class)
                        break;
                    case "C#":
                        this.current.output = json2CSharp.convert(JSON.parse(this.current.json), this.current.class, this.current.package)
                        break;
                }
            } catch (error) {
                this.$Notice.error({
                    title: '错误提示',
                    desc: error.message,
                })
                return
            }
            this.$saveToolData(this.current)
        },
        options(mode) {
            return {
                mode: this.codemirrorMode[mode],
                lineWrapping: false,
                foldGutter: true,
                indentUnit: 4,
                gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
            }
        }
    },
    data() {
        return {
            current: {
                json: "",
                type: "Java",
                package: "pag",
                class: "RootName",
                output: "",
            },
            type: ["Java", "C#", "Go",'Dart'],
            codemirrorMode: {
                "Json": "application/json",
                "Java": "text/x-java",
                "Dart": "application/dart",
                "C#": "text/x-csharp",
                "Go": "text/x-go"
            },
        }
    },
}
</script>