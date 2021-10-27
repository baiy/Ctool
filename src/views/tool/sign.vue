<template>
  <div>
    <Input v-model="current.signData" :rows="7" type="textarea" placeholder="待签名内容/验签数据"></Input>
    <Input v-model="current.privateKey" :rows="7" type="textarea" placeholder="PEM格式私钥"></Input>
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
    </option-block>
    <Input v-model="current.publicKey" :rows="7" type="textarea" placeholder="PEM格式公钥"></Input>
    <Input v-model="current.verifyCode" :rows="7" type="textarea" placeholder="Base64编码后签名"></Input>
  </div>
</template>

<script>
import rs from "jsrsasign";

export default {
  created() {
    this.current = Object.assign(this.current, this.$getToolData('input'))
  },
  methods: {
    sign() {
      let rs = require('jsrsasign')
      if (this.current.signData && this.current.privateKey) {
        let rsaPrivateKey
        try {
          rsaPrivateKey = rs.KEYUTIL.getKey(this.current.privateKey)
        } catch (e) {
          this.$Message.error("无效私钥"+e)
        }
        let sign
        try {
          sign = new rs.KJUR.crypto.Signature({alg: this.current.algorithm})
        } catch (e) {
          this.$Message.error("无效签名算法")
        }
        sign.init(rsaPrivateKey)
        sign.updateString(this.current.signData)
        let signResult
        try {
          signResult = sign.sign()
        } catch (e) {
          this.$Message.error("签名时出现异常" + e)
        }
        // 转为base64
        this.current.verifyCode = rs.hex2b64(signResult)
        // 自动复制签名结果到剪切板
        this.$clipboardCopy(this.current.verifyCode);
        // 保存历史记录
        this.$saveToolData(this.current);
      }
    },
    verify() {
      if (this.current.verifyCode && this.current.publicKey) {
        let rsaPublicKey
        try {
          rsaPublicKey = rs.KEYUTIL.getKey(this.current.publicKey)
        } catch (e) {
          this.$Message.error("无效公钥")
        }
        let sign
        try {
          sign = new rs.KJUR.crypto.Signature({alg: this.current.algorithm})
        } catch (e) {
          this.$Message.error("无效签名算法")
        }
        sign.init(rsaPublicKey)
        sign.updateString(this.current.signData)
        let hexData = rs.b64tohex(this.current.verifyCode)
        let verifyResult = sign.verify(hexData)
        if (verifyResult) {
          this.$Message.info("验签成功")
        } else {
          this.$Message.error("验签失败")
        }
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
      algorithm: ["MD5withRSA", "SHA1withRSA", "SHA256withRSA", "SHA512withRSA"]
    }
  }
}
</script>

<style scoped>

</style>