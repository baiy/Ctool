<template>
    <div>
        <heightResize :append="['.page-option-block']" ignore @resize="resize">
            <Row :gutter="10">
                <Col span="12">
                    <input-block top="5px" type="default" :text="$t('sign_sign_data')" @on-default-right-bottom-click="()=>copy('signData')">
                        <autoHeightTextarea :height="height1"  v-model="current.signData"></autoHeightTextarea>
                    </input-block>
                </Col>
                <Col span="12">
                    <input-block top="5px" type="default" :text="$t('sign_verify_code')" @on-default-right-bottom-click="()=>copy('verifyCode')">
                        <autoHeightTextarea :height="height1"  v-model="current.verifyCode"></autoHeightTextarea>
                    </input-block>
                </Col>
            </Row>
            <option-block class="page-option-block" center>
                <FormItem>
                    <Select v-model="current.algorithm" style="width: 200px">
                        <Option v-for="v in algorithm" :value="v" :key="v">{{ v }}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <ButtonGroup>
                        <Button type="primary" @click="sign()">{{ $t('sign_sign') }}</Button>
                        <Button type="primary" @click="verify()">{{ $t('sign_verify') }}</Button>
                    </ButtonGroup>
                </FormItem>
                <FormItem>
                    <Button type="default" @click="openGenerateKeypairBlock()">{{ $t('sign_generate_keypair') }}</Button>
                </FormItem>
            </option-block>
            <Row :gutter="10">
                <Col span="12">
                    <input-block top="5px" type="default" :text="$t('sign_public_key')" @on-default-right-bottom-click="()=>copy('publicKey')">
                        <autoHeightTextarea :height="height2"  v-model="current.publicKey"></autoHeightTextarea>
                    </input-block>
                </Col>
                <Col span="12">
                    <input-block top="5px" type="default" :text="$t('sign_private_key')" @on-default-right-bottom-click="()=>copy('privateKey')">
                        <autoHeightTextarea :height="height2"  v-model="current.privateKey"></autoHeightTextarea>
                    </input-block>
                </Col>
            </Row>
        </heightResize>
        <Modal v-model="generateKeypairData.show" :title="$t('sign_generate_keypair')">
            <Form :label-width="80">
                <FormItem :label="$t('sign_keypair_type')">
                    <Select v-model="generateKeypairData.type">
                        <Option value="PKCS8PRV">PKCS#8</Option>
                        <Option value="PKCS1PRV">PKCS#1</Option>
                    </Select>
                </FormItem>
                <FormItem :label="$t('sign_keypair_length')">
                    <Select v-model="generateKeypairData.length">
                        <Option :value="512">512 bit</Option>
                        <Option :value="1024">1024 bit</Option>
                        <Option :value="2048">2048 bit</Option>
                        <Option :value="4096">4096 bit</Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="generateKeypairData.show = false">{{ $t('sign_generate_cancel') }}</Button>
                <Button type="primary" disabled v-if="generateKeypairData.loading">{{ $t('sign_generate_in') }}</Button>
                <Button v-else type="primary" @click="generateKeypair()">{{ $t('sign_generate') }}</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import rs from "jsrsasign";
import autoHeightTextarea from "./components/autoHeightTextarea";
import heightResize from "./components/heightResize";

export default {
    components:{
        autoHeightTextarea,
        heightResize
    },
    created() {
        this.$initToolData()
    },
    methods: {
        sign() {
            try {
                if (!this.current.signData || !this.current.privateKey){
                    throw new Error(this.$t('sign_error_sign_content_empty').toString())
                }
                let rsaPrivateKey = rs.KEYUTIL.getKey(this.current.privateKey)
                let sign = new rs.KJUR.crypto.Signature({alg: this.current.algorithm})
                sign.init(rsaPrivateKey)
                sign.updateString(this.current.signData)
                let signResult = sign.sign()
                // 转为base64
                this.current.verifyCode = rs.hex2b64(signResult)
                // 自动复制签名结果到剪切板
                this.$clipboardCopy(this.current.verifyCode);
                // 保存历史记录
                this.$saveToolData(this.current);
            }catch (e){
                this.$Message.error(this.$t('sign_error',[e.message]).toString())
            }
        },
        verify() {
            try {
                if (!this.current.verifyCode || !this.current.publicKey){
                    throw new Error(this.$t('sign_error_verify_content_empty').toString())
                }
                let rsaPublicKey = rs.KEYUTIL.getKey(this.current.publicKey)
                let sign = new rs.KJUR.crypto.Signature({alg: this.current.algorithm})
                sign.init(rsaPublicKey)
                sign.updateString(this.current.signData)
                let hexData = rs.b64tohex(this.current.verifyCode)
                let verifyResult = sign.verify(hexData)
                if (!verifyResult) {
                    throw new Error(this.$t('sign_verify_fail').toString())
                }
                // 保存历史记录
                this.$saveToolData(this.current);
                this.$Message.info(this.$t('sign_verify_ok').toString())
            }catch (e){
                this.$Message.error(this.$t('sign_error',[e.message]).toString())
            }
        },
        generateKeypair() {
            this.generateKeypairData.loading = true;
            setTimeout(() => {
                try {
                    const rsaKeypair = rs.KEYUTIL.generateKeypair("RSA", this.generateKeypairData.length);
                    this.current.privateKey = rs.KEYUTIL.getPEM(rsaKeypair.prvKeyObj, this.generateKeypairData.type)
                    this.current.publicKey = rs.KEYUTIL.getPEM(rsaKeypair.pubKeyObj)
                    this.generateKeypairData.show = false
                } catch (e) {
                    this.$Message.error(this.$t('sign_error',[e.message]).toString())
                }
                this.generateKeypairData.loading = false;
            }, 500)
        },
        openGenerateKeypairBlock() {
            this.generateKeypairData.show = true;
            this.generateKeypairData.loading = false;
            this.generateKeypairData.type = "PKCS8PRV";
            this.generateKeypairData.length = 2048;
        },
        resize(height){
            this.height1 = Math.min(160,Math.ceil(height/2))
            this.height2 = height - this.height1
        },
        copy(type){
            if ((type in this.current) && this.current[type]){
                this.$copy(this.current[type],true);
            }
        }
    },
    data() {
        return {
            current: {
                signData: '',
                privateKey: '',
                publicKey: '',
                verifyCode: '',
                algorithm: 'MD5withRSA'
            },
            algorithm: ["MD5withRSA", "SHA1withRSA", "SHA256withRSA", "SHA512withRSA"],
            generateKeypairData: {
                show: false,
                loading: false,
                length: 2048,
                type: "PKCS8PRV",
            },
            height1:100,
            height2:100,
        }
    }
}
</script>
