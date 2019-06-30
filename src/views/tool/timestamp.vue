<template>
    <div>
        <Input v-model="current.input" :rows="7" type="textarea" placeholder="内容(标准时间(YYYY-MM-DD HH:II:SS)/时间戳(秒))"></Input>
        <option-block>
            <FormItem>
                <ButtonGroup>
                    <Button type="primary" @click="handle()">转换</Button>
                    <Button type="primary" @click="currentTime">当前时间</Button>
                </ButtonGroup>
            </FormItem>
        </option-block>
        <Input v-model="current.output" :rows="7" type="textarea" placeholder="结果"></Input>
    </div>
</template>
<script>
    import {formatDate} from "../../helper";
    export default {
        created() {
            this.current = Object.assign(this.current, this.$getToolData("input"))
        },
        methods: {
            handle() {
                if (isNaN(this.current.input)) {
                    this.current.output = (Date.parse((new Date(this.current.input)).toString())) / 1000;
                } else {
                    let newDate = new Date();
                    newDate.setTime(this.current.input * 1000);
                    this.current.output = formatDate(newDate);
                }
                this.$clipboardCopy(this.current.output);
                this.$saveToolData(this.current);
            },
            currentTime() {
                this.current.input = formatDate(new Date())
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