<template>
    <HeightResize v-slot="{small,large}" :reduce="10" ignore :append="['.ctool-page-option']">
        <Align direction="vertical">
            <div v-row="`1-1`">
                <Textarea
                    :height="small"
                    v-model="action.current.signData"
                    :placeholder="$t('sign_sign_data')"
                    :copy="$t('sign_sign_data')"
                />
                <Textarea
                    :height="small"
                    v-model="action.current.verifyCode"
                    :placeholder="$t('sign_verify_code')"
                    :copy="$t('sign_verify_code')"
                />
            </div>
            <div v-row="`1-1`" class="ctool-page-option">
                <Align horizontal="right">
                    <Select :options="algorithm" v-model="action.current.algorithm" />
                    <Button type="primary" :text="$t('sign_sign')" @click="sign"/>
                </Align>
                <Align>
                    <Button type="primary" :text="$t('sign_verify')" @click="verify"/>
                    <Button :text="$t('sign_generate_keypair')" @click="generateKeypair.show = true"/>
                </Align>
            </div>
            <div v-row="`1-1`">
                <Textarea
                    :height="large"
                    v-model="action.current.publicKey"
                    :placeholder="$t('sign_public_key')"
                    :copy="$t('sign_public_key')"
                />
                <Textarea
                    :height="large"
                    v-model="action.current.privateKey"
                    :placeholder="$t('sign_private_key')"
                    :copy="$t('sign_private_key')"
                />
            </div>
        </Align>
    </HeightResize>
    <Modal :title="$t('sign_generate_keypair')" :loading="generateKeypair.loading" v-model="generateKeypair.show" :width="550" footer-type="long"
           @ok="generateKeypairExecute">
        <div v-row="`1-1`">
            <Select size="large" :options="generateKeypairType" v-model="generateKeypair.type" :label="$t('sign_keypair_type')"/>
            <Select size="large" :options="generateKeypairLength" v-model="generateKeypair.length" :label="$t('sign_keypair_length')"/>
        </div>
    </Modal>
</template>

<script lang="ts" setup>
import {initialize, useAction} from "@/store/action";
import rs from "jsrsasign";
import {onUnmounted} from "vue";

// 加密过程较慢 使用 worker 避免页面卡死
const worker = new Worker(new URL('./worker', import.meta.url), {type: 'module'})
onUnmounted(() => {
    worker.terminate();
})

const action = useAction(await initialize({
    signData: '',
    privateKey: '',
    publicKey: '',
    verifyCode: '',
    algorithm: 'MD5withRSA'
}, {paste: false}))
let generateKeypair = $ref({
    show: false,
    loading: false,
    length: 1024,
    type: "PKCS8PRV",
})

worker.onmessage = function (event) {
    const data = event.data
    console.log('main accept', data)
    if (data.method === "generate_keypair") {
        return generateKeypairCallback(data.data.public_key, data.data.private_key)
    }
}
const workerPost = (method: string, data: any) => {
    let send = {method, data}
    console.log("main send", send)
    worker.postMessage(send);
}

const algorithm = ["MD5withRSA", "SHA1withRSA", "SHA256withRSA", "SHA512withRSA"]

const generateKeypairType = [
    {value: "PKCS8PRV", label: "PKCS#8"},
    {value: "PKCS1PRV", label: "PKCS#1"},
];

const generateKeypairLength = [
    {value: 512, label: "512 bit"},
    {value: 1024, label: "1024 bit"},
    {value: 2048, label: "2048 bit"},
    {value: 4096, label: "4096 bit"},
];

const generateKeypairExecute = () => {
    generateKeypair.loading = true;
    workerPost('generate_keypair', {type: generateKeypair.type, length: generateKeypair.length})
}

const sign = () => {
    try {
        if (!action.current.signData || !action.current.privateKey) {
            return;
        }
        const rsaPrivateKey = rs.KEYUTIL.getKey(action.current.privateKey)
        const sign = new rs.KJUR.crypto.Signature({alg: action.current.algorithm})
        sign.init(rsaPrivateKey)
        sign.updateString(action.current.signData)
        action.current.verifyCode = rs.hextob64(sign.sign())
        action.success({copy_text: action.current.verifyCode});
    } catch (e) {
        action.current.verifyCode = $error(e)
    }
}

const verify = () => {
    try {
        if (!action.current.verifyCode || !action.current.publicKey) {
            return;
        }
        const rsaPublicKey = rs.KEYUTIL.getKey(action.current.publicKey)
        const sign = new rs.KJUR.crypto.Signature({alg: action.current.algorithm})
        sign.init(rsaPublicKey)
        sign.updateString(action.current.signData)
        let hexData = rs.b64tohex(action.current.verifyCode)
        let verifyResult = sign.verify(hexData)
        if (!verifyResult) {
            return action.success({message: $t(`sign_verify_fail`), message_type: "error", is_save: false})
        }
        return action.success({message: $t(`sign_verify_ok`)})
    } catch (e) {
        return action.success({message: $error(e), message_type: "error", is_save: false})
    }
}

const generateKeypairCallback = (publicKey, privateKey) => {
    generateKeypair.show = false
    generateKeypair.loading = false;
    action.current.privateKey = privateKey
    action.current.publicKey = publicKey
}
</script>
