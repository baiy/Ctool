<template>
    <div>
        <Input v-model="current.input" :rows="7" type="textarea" placeholder="内容"></Input>
        <option-block>
            <FormItem>
                <Select v-model="current.source" style="width:200px">
                    <Option v-for="v in type" :value="v" :key="v">源数据:{{ v }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Select v-model="current.target" style="width:200px">
                    <Option v-for="v in type" :value="v" :key="v">目标数据:{{ v }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <ButtonGroup>
                    <Button type="primary" @click="handle()">转换</Button>
                </ButtonGroup>
            </FormItem>
        </option-block>
        <Input v-model="current.output" :rows="7" type="textarea" placeholder="结果"></Input>
    </div>
</template>
<script>
import {TYPE as conversionType,conversion} from "./library/serializeConversion"

export default {
    created() {
        this.current = Object.assign(this.current, this.$getToolData("input"))
    },
    methods: {
        handle() {
            if (this.current.input) {
                try {
                    this.current.output = conversion(this.current.input,this.current.source).getByTarget(this.current.target);
                } catch (e) {
                    this.$Message.error(e.message);
                    return;
                }
                this.$clipboardCopy(this.current.output);
                this.$saveToolData(this.current);
            }
        }
    },
    data() {
        return {
            current: {
                input: "",
                output: "",
                source: "json",
                target: "xml"
            },
            type: conversionType,
        }
    },
}
</script>