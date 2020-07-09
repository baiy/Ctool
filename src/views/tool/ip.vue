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
                <Alert>ip信息来源 <a href="http://ip.taobao.com/" target="_blank">http://ip.taobao.com/</a></Alert>
            </FormItem>
        </option-block>
        <div>
            <code-highlight lang="json" :code="this.current.output"></code-highlight>
        </div>
    </div>
</template>
<script>
    import request from "ajax-request"

    export default {
        created() {
            this.current = Object.assign(this.current,this.$getToolData("input"))
        },
        methods: {
            handle() {
                if (this.current.input) {
                    request({
                        url:"http://ip.taobao.com/outGetIpInfo",
                        data:{
                            "ip":this.current.input === "localhost" ? 'myip' : this.current.input,
                            "accessKey": "alibaba-inc"
                        },
                    },(err, res, result)=>{
                        if (err) return this.$Message.error("ip地址信息查询错误:"+err);
                        this.current.output = JSON.stringify(JSON.parse(result),null, 4);
                        this.$saveToolData(this.current);
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
            }
        },
    }
</script>