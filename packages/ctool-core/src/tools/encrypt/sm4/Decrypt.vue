<template>
    <HeightResize v-slot="{small,large}" ignore :append="['.ctool-page-option']" :reduce="10">
        <Align direction="vertical">
            <TextInput
                v-model="action.current.input"
                :height="small"
                :allow="['hex','base64']"
            />
            <Align v-row="`1-auto-auto-1-auto`" class="ctool-page-option">
                <TextInput
                    v-model="action.current.option.key"
                    use-input="Key"
                    :allow="['text','hex','base64']"
                />
                <Bool v-model="action.current.option.padding" label="Padding" border/>
                <Bool v-model="action.current.option.is_cbc" label="CBC" border/>
                <TextInput
                    :disabled="!action.current.option.is_cbc"
                    v-model="action.current.option.iv"
                    use-input="IV"
                    :allow="['text','hex','base64']"
                />
                <HelpTip link="https://github.com/JuneAndGreen/sm-crypto"/>
            </Align>
            <TextOutput
                v-model="action.current.output"
                :allow="['base64','hex','text']"
                :content="output"
                :height="large"
            />
        </Align>
    </HeightResize>
</template>

<script lang="ts" setup>
import {sm4} from "sm-crypto"
import {initialize, useAction} from "@/store/action";
import {createTextInput, createTextOutput} from "@/components/text";
import Text from "@/helper/text";
import {watch} from "vue";

const action = useAction(await initialize({
    input: createTextInput('hex'),
    option: {
        key: createTextInput('hex'),
        padding: true,
        is_cbc: false,
        iv: createTextInput('hex'),
    },
    output: createTextOutput('text'),
}))


const output = $computed<Text>(() => {
    if (
        action.current.input.text.isEmpty()
        || action.current.option.key.text.isEmpty()
        || (action.current.option.is_cbc && action.current.option.iv.text.isEmpty())
    ) {
        return Text.empty()
    }
    if (action.current.input.text.isError()) {
        return action.current.input.text
    }
    if (action.current.option.key.text.isError()) {
        return action.current.option.key.text
    }
    if (action.current.option.is_cbc && action.current.option.iv.text.isError()) {
        return action.current.option.iv.text
    }
    try {
        const result = sm4.decrypt(
            action.current.input.text.toHexString(),
            action.current.option.key.text.toHexString(),
            {
                padding: action.current.option.padding ? "pkcs#5" : "none",
                mode: action.current.option.is_cbc ? "cbc" : undefined,
                iv: action.current.option.is_cbc ? action.current.option.iv.text.toHexString() : undefined
            }
        )
        if (result === "") {
            throw new Error("Decrypt Failure")
        }
        return Text.fromString(result)
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
