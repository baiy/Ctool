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
                <Input v-model="current.password" placeholder="密码/秘钥"></Input>
            </FormItem>
            <FormItem v-if="current.type === 'SM2'">
                <Select v-model="current.sm2CipherMode" style="width:100px">
                    <Option value="C1C3C2">C1C3C2</Option>
                    <Option value="C1C2C3">C1C2C3</Option>
                </Select>
            </FormItem>
            <FormItem>
                <ButtonGroup>
                    <Button type="primary" @click="handle('encrypt')">加密</Button>
                    <Button type="primary" @click="handle('decrypt')">解密</Button>
                    <Button type="primary" @click="sm2Generate()" v-if="current.type === 'SM2'">生成密钥对</Button>
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
                const sm2 = require('sm-crypto').sm2
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
                        case "SM2":
                            if (v === "encrypt") {
                                this.current.output =sm2.doEncrypt(
                                    this.current.input,
                                    this.current.password,
                                    this.current.sm2CipherMode
                                );
                            }
                            else{
                                this.current.output =sm2.doDecrypt(
                                    this.current.input,
                                    this.current.password,
                                    this.current.sm2CipherMode
                                );
                            }
                            break;
                        default:
                            return;
                    }
                    this.current.operation = v;
                    this.$clipboardCopy(this.current.output);
                    this.$saveToolData(this.current);
                }
            },
            sm2Generate(){
                const sm2 = require('sm-crypto').sm2
                let keypair = sm2.generateKeyPairHex()
                let string = "公钥:\n"+keypair.publicKey+"\n"+"私钥:\n"+keypair.privateKey+"\n\n"+
                    "请及时保存秘钥对, 关闭对话框后无法恢复当前秘钥数据"
                this.$Modal.info({
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: string,
                                type:"textarea",
                                rows:9
                            }
                        })
                    },
                    okText:"关闭",
                    width:600
                })
            },
        },
        data() {
            return {
                current:{
                    input: "",
                    password:"",
                    sm2CipherMode:"C1C3C2",
                    output: "",
                    type:"AES",
                    operation:""
                },
                type: ["AES","DES","RC4","Rabbit","TripleDes","SM2"],
            }
        },
    }
</script>