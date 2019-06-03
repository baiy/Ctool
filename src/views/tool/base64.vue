<template>
    <div>
        <Input v-model="current.input" :rows="7" type="textarea" placeholder="内容"></Input>
        <option-block>
            <FormItem>
                <ButtonGroup>
                    <Button type="primary" @click="handle('encode')">编码</Button>
                    <Button type="primary" @click="handle('decode')">解密</Button>
                </ButtonGroup>
            </FormItem>
        </option-block>
        <Input v-model="current.output" :rows="7" type="textarea" placeholder="结果"></Input>
    </div>
</template>
<script>
    import { Base64 } from 'js-base64';

    export default {
        created() {
            this.current = Object.assign(this.current,this.$getToolData("input"))
        },
        methods: {
            handle(v) {
                if (this.current.input) {
                    this.current.output = Base64[v](this.current.input);
                    this.current.operation = v;
                    this.$clipboardCopy(this.current.output);
                    this.$saveToolData(this.current);
                }
            }
        },
        data() {
            return {
                current:{
                    input: "",
                    output: "",
                    operation:""
                }
            }
        },
    }
</script>