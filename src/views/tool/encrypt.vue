<template>
    <heightResize ignore :append="['.page-option-block']" @resize="resize">
        <autoHeightTextarea v-model="current.input" :height="inputHeight" :placeholder="$t('encrypt_input')"/>
        <option-block class="page-option-block">
            <FormItem>
                <Select v-model="current.type" style="width:200px">
                    <Option v-for="v in type" :value="v" :key="v">{{ v }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Input v-model="current.password" :placeholder="$t('encrypt_password')"></Input>
            </FormItem>
            <FormItem v-if="current.type === 'SM2'">
                <Select v-model="current.sm2CipherMode" style="width:100px">
                    <Option value="C1C3C2">C1C3C2</Option>
                    <Option value="C1C2C3">C1C2C3</Option>
                </Select>
            </FormItem>
            <FormItem>
                <ButtonGroup>
                    <Button type="primary" @click="handle('encrypt')">{{ $t('encrypt_encrypt') }}</Button>
                    <Button type="primary" @click="handle('decrypt')">{{ $t('encrypt_decrypt') }}</Button>
                    <Button type="primary" @click="sm2Generate()" v-if="current.type === 'SM2'">
                        {{ $t('encrypt_generate_secret_key') }}
                    </Button>
                </ButtonGroup>
            </FormItem>
        </option-block>
        <autoHeightTextarea :value="current.output" :height="outputHeight" :placeholder="$t('encrypt_output')"/>
    </heightResize>
</template>
<script>
import crypto from "crypto-js"
import heightResize from "./components/heightResize";
import autoHeightTextarea from "./components/autoHeightTextarea";
export default {
    components: {
        heightResize,
        autoHeightTextarea
    },
    created() {
        this.$initToolData('input')
    },
    methods: {
        handle(v) {
            const sm2 = require('sm-crypto').sm2
            const sm4 = require('sm-crypto').sm4
            if (this.current.input) {
                try {
                    let output = ""
                    switch (this.current.type) {
                        case "AES":
                        case "DES":
                        case "RC4":
                        case "Rabbit":
                        case "TripleDES":
                            if (v === "encrypt") {
                                output = crypto[this.current.type].encrypt(
                                    this.current.input,
                                    this.current.password
                                ).toString();
                            } else {
                                output = crypto[this.current.type].decrypt(
                                    this.current.input,
                                    this.current.password
                                ).toString(crypto.enc.Utf8);
                            }
                            break;
                        case "SM2":
                            if (v === "encrypt") {
                                output = sm2.doEncrypt(
                                    this.current.input,
                                    this.current.password,
                                    this.current.sm2CipherMode
                                );
                                output = crypto.enc.Base64.stringify(crypto.enc.Hex.parse(output))
                            } else {
                                let inputHex = crypto.enc.Hex.stringify(crypto.enc.Base64.parse(this.current.input));
                                output = sm2.doDecrypt(
                                    inputHex,
                                    this.current.password,
                                    this.current.sm2CipherMode
                                );

                            }
                            break;
                        case "SM4":
                            try{
                                if(v === "encrypt") {
                                    // SM4 加密，将输出转换为 base64 格式，与 AES 对齐
                                    output = sm4.encrypt(this.current.input, this.current.password);
                                    output = crypto.enc.Base64.stringify(crypto.enc.Hex.parse(output))
                                } else {
                                    // SM4 解密，sm-crypto 要求输入为 hex，将 base64 转换为 hex 作为输入
                                    let inputHex = crypto.enc.Hex.stringify(crypto.enc.Base64.parse(this.current.input));
                                    output = sm4.decrypt(inputHex, this.current.password);
                                }
                            }catch (e) {
                                if (e.message === "key is invalid"){
                                    throw new Error("key is invalid key length 128 bit(32 char)")
                                }
                                throw e
                            }
                    }
                    if (!output) {
                        throw new Error("output null")
                    }
                    this.current.output = output
                } catch (e) {
                    return this.$Message.error(
                        this.$t('encrypt_failed', [e.message]).toString()
                    )
                }
                this.current.operation = v;
                this.$clipboardCopy(this.current.output);
                this.$saveToolData(this.current);
            }
        },
        sm2Generate() {
            const sm2 = require('sm-crypto').sm2
            let keypair = sm2.generateKeyPairHex()
            let string = [
                this.$t('encrypt_public_key'),
                keypair.publicKey,
                this.$t('encrypt_private_key'),
                keypair.privateKey, '',
                this.$t('encrypt_secret_key_prompt')
            ].join("\n");
            this.$Modal.info({
                render: (h) => {
                    return h('Input', {
                        props: {
                            value: string,
                            type: "textarea",
                            rows: 9
                        }
                    })
                },
                okText: this.$t('encrypt_close'),
                width: 600
            })
        },
        resize(height) {
            this.inputHeight = Math.min(160, Math.ceil(height / 2))
            this.outputHeight = height - this.inputHeight
        }
    },
    data() {
        return {
            current: {
                input: "",
                password: "",
                sm2CipherMode: "C1C3C2",
                output: "",
                type: "AES",
                operation: ""
            },
            type: ["AES", "DES", "RC4", "Rabbit", "TripleDES", "SM2", "SM4"],
            inputHeight: 100,
            outputHeight: 100
        }
    },
}
</script>
