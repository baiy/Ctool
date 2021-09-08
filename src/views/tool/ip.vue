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
                <Alert v-if="!isWeb">ip信息来源 <a href="https://ifconfig.co/json" target="_blank">https://ifconfig.co/json</a></Alert>
                <Alert v-else>ip信息来源 <a href="https://whois.pconline.com.cn/" target="_blank">https://whois.pconline.com.cn/</a></Alert>
            </FormItem>
        </option-block>
        <div style="border: 1px solid #dcdee2;border-radius: 4px;">
            <codemirror ref="code" v-model="current.output" :options="options"></codemirror>
        </div>
    </div>
</template>
<script>
import axios from "axios"
import axiosJsonp from 'axios-jsonp';
import {codemirror} from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
import 'codemirror/addon/fold/foldgutter.css'
import {isWeb} from "../../helper"

export default {
    components: {
        codemirror,
    },
    created() {
        this.current = Object.assign(this.current, this.$getToolData("input"))
    },
    mounted() {
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
                if (!this.isWeb){
                    axios({
                        url: 'https://ifconfig.co/json',
                        responseType: 'json',
                        params: this.current.input !== "localhost" ? {ip: this.current.input} : {}
                    }).then(({data}) => {
                        this.current.output = JSON.stringify(data, null, 4);
                        this.$saveToolData(this.current);
                    }).catch((error) => {
                        return this.$Message.error("ip地址信息查询错误:" + error);
                    });
                }
                else{
                    axios({
                        url: 'https://whois.pconline.com.cn/ipJson.jsp',
                        adapter: axiosJsonp,
                        params: this.current.input !== "localhost" ? {ip: this.current.input} : {},
                    }).then(({data}) => {
                        this.current.output = JSON.stringify(data, null, 4);
                        this.$saveToolData(this.current);
                    }).catch((error) => {
                        return this.$Message.error("ip地址信息查询错误:" + error);
                    });
                }
            }
        },
        local() {
            this.current.input = 'localhost';
            this.handle()
        }
    },
    data() {
        return {
            current: {
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
            isWeb: isWeb
        }
    },
}
</script>
