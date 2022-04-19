<template>
    <heightResize ignore :append="['.page-option-block']" @resize="resize">
        <autoHeightTextarea v-model="current.input" :height="inputHeight" :placeholder="$t('encrypt_input')"/>
        <option-block class="page-option-block">
            <Form :model="formItem" label-position="top">
            <Form-item label="算法: ">
                <Select v-model="current.type">
                    <Option v-for="v in type" :value="v" :key="v">{{ v }}</Option>
                </Select>
            </Form-item>
            <Form-item label="密钥: ">
                <Select v-model="current.keyFormat">
                    <Option value="Hex">Hex</Option>
                    <Option value="Base64">Base64</Option>
                    <Option value="Password">Password</Option>
                </Select>
                <Input v-model="current.password" :placeholder="$t('encrypt_password')" type="textarea" :autosize="{minRows: 2, maxRows: 5}"></Input>
            </Form-item>
            <Form-item label="IV 向量(Hex 格式): ">
                <Input v-model="current.iv" :placeholder="$t('iv')" type="textarea" :autosize="{minRows: 3, maxRows: 5}"></Input>
            </Form-item>
            <Form-item label="加密模式: " v-if="current.type === 'SM2'">
                <Select v-model="current.sm2CipherMode">
                    <Option value="C1C3C2">C1C3C2</Option>
                    <Option value="C1C2C3">C1C2C3</Option>
                </Select>
            </Form-item>
            <Form-item label="加密模式: " v-else-if="current.type === 'SM4'">
                <Select v-model="current.mode">
                    <Option value="ecb">ECB</Option>
                    <Option value="cbc">CBC</Option>
                </Select>
                <Select v-model="current.padding">
                    <Option value="pkcs#7">Pkcs7</Option>
                    <Option value="none">NoPadding</Option>
                </Select>
            </Form-item>
            <Form-item label="加密模式: " v-else>
                <Select v-model="current.mode">
                    <Option value="ECB">ECB</Option>
                    <Option value="CBC">CBC</Option>
                    <Option value="CFB">CFB</Option>
                    <Option value="OFB">OFB</Option>
                    <Option value="CTR">CTR</Option>
                </Select>
                <Select v-model="current.padding">
                    <Option value="Pkcs7">Pkcs7</Option>
                    <Option value="Iso97971">Iso97971</Option>
                    <Option value="AnsiX923">AnsiX923</Option>
                    <Option value="Iso10126">Iso10126</Option>
                    <Option value="ZeroPadding">ZeroPadding</Option>
                    <Option value="NoPadding">NoPadding</Option>
                </Select>
            </Form-item>
            <Form-item>
                <ButtonGroup>
                    <Button type="primary" @click="handle('encrypt')">{{ $t('encrypt_encrypt') }}</Button>
                    <Button type="primary" @click="handle('decrypt')">{{ $t('encrypt_decrypt') }}</Button>
                    <Button type="primary" @click="sm2Generate()" v-if="current.type === 'SM2'">
                        {{ $t('encrypt_generate_secret_key') }}
                    </Button>
                </ButtonGroup>
            </Form-item>
            </Form>
        </option-block>
        <autoHeightTextarea :value="current.output" :height="outputHeight" :placeholder="$t('encrypt_output')"/>
    </heightResize>
</template>
<script>
import crypto from "crypto-js"
import heightResize from "./components/heightResize";
import autoHeightTextarea from "./components/autoHeightTextarea";
import { CryptoJS } from 'jsrsasign';

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
                                if (this.current.keyFormat !== "Password") {
                                    output = crypto[this.current.type].encrypt(
                                        // todo 后续可以考虑支持原文输入的编码格式，以便应对一些二进制格式
                                        this.current.input,
                                        // 转换为 WordArray 形式作为密钥传入
                                        crypto.enc[this.current.keyFormat].parse(this.current.password),
                                        {
                                            // IV 要求为 Hex，按照 Hex 解析为 WordArray
                                            iv: crypto.enc.Hex.parse(this.current.iv),
                                            mode: crypto.mode[this.current.mode],
                                            padding: crypto.pad[this.current.padding]
                                        }
                                    ).ciphertext;
                                } else {
                                    // 兼容 crypto-js 的密码模式
                                    output = crypto[this.current.type].encrypt(this.current.input, this.current.password).toString();
                                }
                            } else {
                                if (this.current.keyFormat !== "Password") {
                                    // crypto-js 要求解密时传入为 CipherParams，使用 CipherText 构建 CipherParams
                                    let cipherData = CryptoJS.lib.CipherParams.create({
                                        ciphertext: crypto.enc.Hex.parse(this.current.input)
                                    });
                                    output = crypto[this.current.type].decrypt(
                                        cipherData, 
                                        // 转换为 WordArray 形式作为密钥传入
                                        crypto.enc[this.current.keyFormat].parse(this.current.password),
                                        {
                                            // IV 要求为 Hex，按照 Hex 解析为 WordArray
                                            iv: crypto.enc.Hex.parse(this.current.iv),
                                            mode: crypto.mode[this.current.mode],
                                            padding: crypto.pad[this.current.padding]
                                        }
                                    ).toString(crypto.enc.Utf8);
                                } else {
                                    // 兼容 crypto-js 的密码模式
                                    output = crypto[this.current.type].decrypt(this.current.input, this.current.password).toString(crypto.enc.Utf8);
                                }
                            }
                            break;
                        case "SM2":
                            if (v === "encrypt") {
                                output = sm2.doEncrypt(
                                    this.current.input,
                                    this.current.password,
                                    this.current.sm2CipherMode
                                );
                            } else {
                                output = sm2.doDecrypt(
                                    this.current.input,
                                    this.current.password,
                                    this.current.sm2CipherMode
                                );
                            }
                            break;
                        case "SM4":
                            // sm-crypto 要求传入的 key 为 Hex 格式，因此对于非 Hex 格式的数据进行转换
                            let sm4Key = this.current.password;
                            if (this.current.keyFormat === "Base64") {
                                sm4Key = crypto.enc.Hex.stringify(crypto.enc[this.current.keyFormat].parse(this.current.password));
                            } else if(this.current.keyFormat === "Password") {
                                // 如果是 Password，按照 Utf8 编码进行处理，转换为 Hex 格式
                                // 注意因为库的区别，password 模式跟 crypto-js 的处理不一样
                                sm4Key = crypto.enc.Hex.stringify(crypto.enc.Utf8.parse(this.current.password));
                            }

                            if(v === "encrypt") {
                                // SM4 加密
                                output = sm4.encrypt(
                                    this.current.input,
                                    sm4Key, 
                                    {
                                        mode: this.current.mode.toLowerCase(), 
                                        // sm-crypto 传入的 iv 为 Hex 格式
                                        iv: this.current.iv,
                                        padding: this.current.padding
                                    }
                                );
                            } else {
                                // SM4 解密
                                output = sm4.decrypt(
                                    this.current.input, 
                                    sm4Key,
                                    {
                                        mode: this.current.mode.toLowerCase(), 
                                        // sm-crypto 传入的 iv 为 Hex 格式
                                        iv: this.current.iv,
                                        padding: this.current.padding
                                    }
                                );
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
                keyFormat: "Hex",
                iv: "",
                mode:"ECB",
                padding:"Pkcs7",
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
