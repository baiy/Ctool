<template>
    <div>
        <Row :gutter="16">
            <Col span="8">
                <Input v-model="current.length">
                    <div slot="prepend" style="width: 70px">长度</div>
                </Input>
            </Col>
            <Col span="8">
                <Input v-model="current.amount">
                    <div slot="prepend" style="width: 70px">生成数量</div>
                </Input>
            </Col>
            <Col span="8">
                <Input v-model="current.delimiter">
                    <div slot="prepend" style="width: 70px">分隔符</div>
                </Input>
            </Col>
        </Row>
        <option-block>
            <FormItem>
                <Checkbox v-model="current.isDigital">数字</Checkbox>
            </FormItem>
            <FormItem>
                <Checkbox v-model="current.isLowercase">小写字母</Checkbox>
            </FormItem>
            <FormItem>
                <Checkbox v-model="current.isUppercase">大写字母</Checkbox>
            </FormItem>
            <FormItem>
                <Checkbox v-model="current.isSymbol">特殊符号</Checkbox>
            </FormItem>
            <FormItem>
                <Checkbox v-model="current.isUnique">唯一</Checkbox>
            </FormItem>
            <FormItem>
                <Checkbox v-model="current.isAddQuote">添加引号</Checkbox>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handle()">生成</Button>
            </FormItem>
        </option-block>
        <Input v-model="current.output" :rows="12" type="textarea" placeholder="结果"></Input>
    </div>
</template>
<script>
    export default {
        created() {
            this.current = Object.assign(this.current,this.$getToolData())
        },
        methods: {
            handle() {
                let chars = "";
                if (this.current.isDigital) chars += "0123456789";
                if (this.current.isLowercase) chars += "abcdefghijklmnopqrstuvwxyz";
                if (this.current.isUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                if (this.current.isSymbol) chars += "`~!@#$%^&*()-_=+[{]}|;:',<.>/?";

                let randomStringLists = [];
                for (let i = 0, l = this.current.amount; i < l; i++) {
                    let _chars = chars.split(""),
                        random_string = "";
                    for (let j = 0, k = this.current.length; j < k; j++) {
                        if (_chars.length < 1) break;
                        let index = Math.floor(Math.random() * _chars.length);
                        random_string += _chars[index];
                        if (this.current.isUnique) _chars.splice(index, 1);
                    }
                    randomStringLists.push(this.current.isAddQuote ? '"'+random_string+'"' : random_string);
                }
                this.current.output = randomStringLists.join(this.current.delimiter.replace(/\\n/, "\n"));
                this.$saveToolData(this.current);
            }
        },
        data() {
            return {
                current:{
                    length:8,
                    amount:10,
                    delimiter:",\\n",
                    isDigital:true,
                    isLowercase:true,
                    isUppercase:true,
                    isSymbol:false,
                    isUnique:false,
                    isAddQuote:false,
                    output: "",
                }
            }
        },
    }
</script>