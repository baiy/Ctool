<template>
    <div>
        <Input v-model="current.input" :rows="7" type="textarea" placeholder="内容"></Input>
        <option-block>
            <FormItem>
                <ButtonGroup>
                    <Button type="primary" @click="handle('normal')">无声调</Button>
                    <Button type="primary" @click="handle('tone')">有声调</Button>
                    <Button type="primary" @click="handle('abbr')">首字母</Button>
                </ButtonGroup>
            </FormItem>
            <FormItem>
                <Select v-model="current.delimiter" style="width:200px">
                    <Option v-for="(d,k) in delimiter" :value="d.v" :key="k">{{ d.n }}</Option>
                </Select>
            </FormItem>
        </option-block>
        <Input v-model="current.output" :rows="7" type="textarea" placeholder="结果"></Input>
    </div>
</template>
<script>
    import "./pinyin/dict"
    import "ipinyinjs"

    function py (type, str, delimiter) {
        let pinyin = {
            abbr: function (str, delimiter) {
                return window.pinyinUtil.getFirstLetter(str).split('').join(delimiter);
            },
            tone: function (str, delimiter) {
                return window.pinyinUtil.getPinyin(str, delimiter);
            },
            normal: function (str, delimiter) {
                return window.pinyinUtil.getPinyin(str, delimiter, false);
            }
        };
        str = str.split("\n");
        for (let i = 0; i < str.length; i++) {
            str[i] = pinyin[type](str[i], delimiter);
        }
        return str.join("\n");
    }
    export default {
        created() {
            this.current = Object.assign({},this.current,this.$getToolData("input"))
        },
        methods: {
            handle(v) {
                if (this.current.input) {
                    this.current.output = py(
                        v,
                        this.current.input,
                        this.current.delimiter === "null" ? "" : (this.current.delimiter === "blank" ? " " : this.current.delimiter)
                    );
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
                    delimiter:"null",
                    operation:""
                },
                delimiter:[
                    {"n":"无分隔符","v":"null"},
                    {"n":"空格分隔","v":"blank"},
                    {"n":"'-'中划线分隔","v":"-"},
                    {"n":"'_'下划线分隔","v":"_"},
                    {"n":"'.'点分隔","v":"."}
                ]
            }
        },
    }
</script>