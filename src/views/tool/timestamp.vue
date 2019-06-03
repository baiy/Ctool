<template>
    <div>
        <Input v-model="current.input" :rows="7" type="textarea" placeholder="内容(标准时间(YYYY-MM-DD HH:II:SS)/时间戳(秒))"></Input>
        <option-block>
            <FormItem>
                <ButtonGroup>
                    <Button type="primary" @click="handle()">转换</Button>
                    <Button type="primary" @click="current.input = formatDate(new Date())">当前时间</Button>
                </ButtonGroup>
            </FormItem>
        </option-block>
        <Input v-model="current.output" :rows="7" type="textarea" placeholder="结果"></Input>
    </div>
</template>
<script>
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
                    this.current.output = this.formatDate(newDate);
                }
                this.$clipboardCopy(this.current.output);
                this.$saveToolData(this.current);
            },
            formatDate(date, fmt = "yyyy-MM-dd hh:mm:ss") {
                let o = {
                    "M+": date.getMonth() + 1,
                    "d+": date.getDate(),
                    "h+": date.getHours(),
                    "m+": date.getMinutes(),
                    "s+": date.getSeconds(),
                    "q+": Math.floor((date.getMonth() + 3) / 3),
                    "S": date.getMilliseconds()
                };
                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                for (let k in o) {
                    if (new RegExp("(" + k + ")").test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                    }
                }
                return fmt;
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