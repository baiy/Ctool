<template>
    <div>
        <Input v-model="current.input" :rows="7" type="textarea" placeholder="内容"></Input>
        <option-block>
            <FormItem>
                <Select v-model="current.type" style="width:200px">
                    <Option v-for="v in type" :value="v" :key="v">{{ v }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Input v-model="current.password" placeholder="密码"></Input>
            </FormItem>
            <FormItem>
                <ButtonGroup>
                    <Button type="primary" @click="handle('encrypt')">加密</Button>
                    <Button type="primary" @click="handle('decrypt')">解密</Button>
                </ButtonGroup>
            </FormItem>
        </option-block>
        <Input v-model="current.output" :rows="7" type="textarea" placeholder="结果"></Input>
    </div>
</template>
<script>
    import crypto from "crypto-js"
    export default {
        created() {
            this.current = Object.assign(this.current,this.$getToolData("input"))
        },
        methods: {
            handle(v) {
                if (this.current.input) {
                    switch (this.current.type) {
                        case "AES":
                        case "DES":
                        case "RC4":
                        case "Rabbit":
                        case "TripleDes":
                            if (v === "encrypt") {
                                this.current.output = crypto[this.current.type].encrypt(
                                    this.current.input,
                                    this.current.password
                                ).toString();
                            }
                            else{
                                this.current.output = crypto[this.current.type].decrypt(
                                    this.current.input,
                                    this.current.password
                                ).toString(crypto.enc.Utf8);
                            }
                            break;
                        default:
                            return;
                    }
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
                    password:"",
                    output: "",
                    type:"AES",
                    operation:""
                },
                type: ["AES","DES","RC4","Rabbit","TripleDes"],
            }
        },
    }
</script>