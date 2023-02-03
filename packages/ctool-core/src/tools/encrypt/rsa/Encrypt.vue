<template>
    <HeightResize v-slot="{small,large}" ignore :reduce="5">
        <Align direction="vertical">
            <div v-row="`1-1`">
                <Textarea :height="small" v-model="action.current.key" :placeholder="$t(`rsa_public`)"/>
                <TextInput
                    v-model="action.current.input"
                    :placeholder="$t(`rsa_encrypt_input`)"
                    :height="small"
                />
            </div>
            <Display :position="'top-right'" toggle>
                <TextOutput v-model="action.current.output" :allow="['base64','hex']" :content="output" :height="large"/>
                <template #extra>
                    <Select :size="'small'" v-model="action.current.algName" :options="algNames"/>
                </template>
            </Display>
        </Align>
    </HeightResize>
</template>

<script lang="ts" setup>
import {useAction, initialize} from "@/store/action"
import {createTextInput, createTextOutput} from "@/components/text"
import Text from "@/helper/text"
import jsrsasign from "jsrsasign";
import {watch} from "vue";

const algNames = [
    {value: 'RSA', label: 'PKCS1'},
    {value: 'RSAOAEP', label: 'PKCS1_OAEP'}
]

const action = useAction(await initialize({
    input: createTextInput('text'),
    algName: "RSA",
    key: "",
    output: createTextOutput('base64'),
}))

const output = $computed(() => {
    if (action.current.input.text.isEmpty() || action.current.key.trim() === "") {
        return Text.empty()
    }
    if (action.current.input.text.isError()) {
        return action.current.input.text
    }
    try {
        if (!action.current.input.text.isText()) {
            throw new Error("input content must text / text file")
        }
        return Text.fromHex(jsrsasign.KJUR.crypto.Cipher.encrypt(
            action.current.input.text.toString(),
            jsrsasign.KEYUTIL.getKey(action.current.key.trim()) as jsrsasign.RSAKey,
            action.current.algName
        ))
    } catch (e) {
        return Text.fromError($error(e))
    }
})

watch(() => output, (output) => {
    if (output.isEmpty()) {
        return
    }
    action.save()
}, {immediate: true, deep: true})
</script>
