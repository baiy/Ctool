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
                <Alert>ip信息来源 <a href="https://get.geojs.io/" target="_blank">https://get.geojs.io/</a></Alert>
            </FormItem>
        </option-block>
        <div style="border: 1px solid #dcdee2;border-radius: 4px;">
            <code-editor v-model="current.output" language="json"></code-editor>
        </div>
    </div>
</template>
<script>
import axios from "axios"
import _ from "lodash"
import codeEditor from "./components/codeEditor";

export default {
    components: {
        codeEditor,
    },
    created() {
        this.current = Object.assign(this.current, this.$getToolData("input"))
    },
    methods: {
        handle() {
            if (this.current.input) {
                axios({
                    url: 'https://get.geojs.io/v1/ip/geo.json',
                    params: this.current.input !== "localhost" ? {ip: this.current.input} : {}
                }).then(({data}) => {
                    this.current.output = JSON.stringify(_.isArray(data) && data.length < 2 ? data[0] : data,null, 4);
                    this.$saveToolData(this.current);
                    this.$Message.success("查询成功")
                }).catch((error) => {
                    return this.$Message.error("ip地址信息查询错误:" + error);
                });
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
            }
        }
    },
}
</script>
