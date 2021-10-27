<template>
    <div>
        <Row :gutter="10">
            <Col span="12">
                <Card :padding="0">
                    <p slot="title">PEM格式公钥</p>
                    <Input v-model="current.publicKey" :rows="6" type="textarea" placeholder="PEM格式公钥"></Input>
                </Card>
            </Col>
            <Col span="12">
                <Card :padding="0">
                    <p slot="title">PEM格式私钥</p>
                    <Input v-model="current.privateKey" :rows="6" type="textarea" placeholder="PEM格式私钥"></Input>
                </Card>
            </Col>
        </Row>
        <Row :gutter="10" style="margin-top: 5px">
            <Col span="12">
                <Card :padding="0">
                    <p slot="title">待签名内容/验签数据</p>
                    <Input v-model="current.signData" :rows="6" type="textarea"></Input>
                </Card>
            </Col>
            <Col span="12">
                <Card :padding="0">
                    <p slot="title">Base64编码后签名</p>
                    <Input v-model="current.verifyCode" :rows="6" type="textarea"></Input>
                </Card>
            </Col>
        </Row>
        <option-block>
            <FormItem>
                <Select v-model="current.algorithm" style="width: 200px">
                    <Option v-for="v in algorithm" :value="v" :key="v">{{ v }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <ButtonGroup>
                    <Button type="primary" @click="sign()">签名</Button>
                    <Button type="primary" @click="verify()">验签</Button>

                </ButtonGroup>
            </FormItem>
            <FormItem>
                <Button type="default" @click="openGenerateKeypairBloack()">生成公钥/私钥</Button>
            </FormItem>
        </option-block>
        <Modal
            v-model="generateKeypairData.show"
            title="生成公钥/私钥"
        >
            <Form :label-width="80">
                <FormItem label="密钥格式">
                    <Select v-model="generateKeypairData.type">
                        <Option value="PKCS8PRV">PKCS#8</Option>
                        <Option value="PKCS1PRV">PKCS#1</Option>
                    </Select>
                </FormItem>
                <FormItem label="密钥长度">
                    <Select v-model="generateKeypairData.length">
                        <Option :value="512">512 bit</Option>
                        <Option :value="1024">1024 bit</Option>
                        <Option :value="2048">2048 bit</Option>
                        <Option :value="4096">4096 bit</Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="generateKeypairData.show = false">取消</Button>
                <Button type="primary" disabled v-if="generateKeypairData.loading">生成中</Button>
                <Button v-else type="primary" @click="generateKeypair()">生成</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import rs from "jsrsasign";

export default {
    created() {
        this.current = Object.assign(this.current, this.$getToolData())
    },
    methods: {
        sign() {
            if (!this.current.signData || !this.current.privateKey){
                return this.$Message.error('待签名内容/验签数据/PEM格式私钥 必填')
            }
            let rsaPrivateKey
            try {
                rsaPrivateKey = rs.KEYUTIL.getKey(this.current.privateKey)
            } catch (e) {
                return this.$Message.error("无效私钥" + e)
            }
            let sign
            try {
                sign = new rs.KJUR.crypto.Signature({alg: this.current.algorithm})
            } catch (e) {
                return this.$Message.error("无效签名算法")
            }
            sign.init(rsaPrivateKey)
            sign.updateString(this.current.signData)
            let signResult
            try {
                signResult = sign.sign()
            } catch (e) {
                return this.$Message.error("签名时出现异常" + e)
            }
            // 转为base64
            this.current.verifyCode = rs.hex2b64(signResult)
            // 自动复制签名结果到剪切板
            this.$clipboardCopy(this.current.verifyCode);
            // 保存历史记录
            this.$saveToolData(this.current);
        },
        verify() {
            if (!this.current.verifyCode || !this.current.publicKey){
                return this.$Message.error('Base64编码后签名/PEM格式公钥 必填')
            }
            let rsaPublicKey
            try {
                rsaPublicKey = rs.KEYUTIL.getKey(this.current.publicKey)
            } catch (e) {
                return this.$Message.error("无效公钥")
            }
            let sign
            try {
                sign = new rs.KJUR.crypto.Signature({alg: this.current.algorithm})
            } catch (e) {
                return this.$Message.error("无效签名算法")
            }
            sign.init(rsaPublicKey)
            sign.updateString(this.current.signData)
            let hexData = rs.b64tohex(this.current.verifyCode)
            let verifyResult = sign.verify(hexData)
            if (verifyResult) {
                return this.$Message.info("验签成功")
            }
            return this.$Message.error("验签失败")
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
                    this.$Message.error("秘钥生成失败")
                }
                this.generateKeypairData.loading = false;
            }, 500)
        },
        openGenerateKeypairBloack() {
            this.generateKeypairData.show = true;
            this.generateKeypairData.loading = false;
            this.generateKeypairData.type = "PKCS8PRV";
            this.generateKeypairData.length = 2048;
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
            }
        }
    }
}
</script>
