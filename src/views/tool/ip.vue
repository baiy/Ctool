<template>
    <div>
        <option-block>
            <FormItem>
                <Input v-model="current.input" placeholder="请输入ip地址" style="width:200px"></Input>
            </FormItem>
            <FormItem>
                <ButtonGroup>
                    <Button type="primary" @click="handle()">查询</Button>
                    <Button type="primary" @click="local()">本地IP</Button>
                </ButtonGroup>
            </FormItem>
            <FormItem>
                <Alert>ip信息来源 <a href="https://ifconfig.co/json" target="_blank">https://ifconfig.co/json</a></Alert>
            </FormItem>
        </option-block>
        <div style="border: 1px solid #dcdee2;border-radius: 4px;">
            <codemirror ref="code" v-model="current.output" :options="options"></codemirror>
        </div>
    </div>
</template>
<script>
    import axios from "axios"
    import { codemirror } from 'vue-codemirror'
    import 'codemirror/lib/codemirror.css'
    import 'codemirror/mode/javascript/javascript.js'
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
            this.current = Object.assign(this.current,this.$getToolData("input"))
        },
        mounted(){
            this.codemirror.setSize(null, 350)
        },
        computed: {
            codemirror() {
                return this.$refs.code.codemirror
            }
        },
        methods: {
            handle() {
                if (this.current.input) {
                    axios({
                        url: 'https://ifconfig.co/json',
                        responseType: 'json',
                        params: this.current.input !== "localhost" ? {ip:this.current.input} : {}
                    }).then((response)=>{
                        console.log(response)
                        // if (err) return this.$Message.error("ip地址信息查询错误:"+err);
                        // this.current.output = JSON.stringify(JSON.parse(result),null, 4);
                        // this.$saveToolData(this.current);
                    }).catch((error)=>{
                        console.log(error)
                    });
                }
            },
            local(){
                this.current.input = 'localhost';
                this.handle()
            }
        },
        data() {
            return {
                current:{
                    input: "",
                    output: "",
                },
                options: {
                    mode: 'application/json',
                    lineNumbers: true,
                    lineWrapping: false,
                    foldGutter: true,
                    indentUnit: 4,
                    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                },
            }
        },
    }
</script>