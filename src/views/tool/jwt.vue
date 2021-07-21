<template>
    <div>
        <Input v-model="current.input" :rows="7" type="textarea" placeholder="内容"></Input>
        <option-block>
            <FormItem>
                <ButtonGroup>
                    <Button type="primary" @click="handle('decode')">解码</Button>
                </ButtonGroup>
            </FormItem>
            <FormItem>
                <Checkbox v-model="current.header">header</Checkbox>
                <Checkbox v-model="current.payload">payload</Checkbox>
            </FormItem>
        </option-block>
        <Input v-model="current.output" :rows="7" type="textarea" placeholder="结果"></Input>
    </div>
</template>
<script>
import jwtDecode from "jwt-decode"

export default {
    created() {
        this.current = Object.assign(this.current, this.$getToolData("input"))
    },
    methods: {
        handle(v) {
            if (this.current.input) {
                try {
                    let data = {};
                    if (this.current.header) {
                        data.header = jwtDecode(this.current.input, {header: true})
                    }
                    if (this.current.payload) {
                        data.payload = jwtDecode(this.current.input)
                    }
                    this.current.output = JSON.stringify(
                        Object.keys(data).length === 1 ? data[Object.keys(data)[0]] : data,
                        null,4
                    );
                    this.current.operation = v;
                    this.$clipboardCopy(this.current.output);
                    this.$saveToolData(this.current);
                } catch (e) {
                    this.$Message.error("解码失败")
                    console.log(e)
                }
            }
        }
    },
    data() {
        return {
            current: {
                input: "",
                output: "",
                header: false,
                payload: true,
                operation: ""
            }
        }
    },
}
</script>