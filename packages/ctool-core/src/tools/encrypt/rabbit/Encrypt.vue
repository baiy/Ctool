<template>
    <HeightResize v-slot="{small,large}" ignore :append="['.ctool-page-option']" :reduce="10">
        <Align direction="vertical">
            <TextInput
                v-model="action.current.input"
                :height="small"
                upload="file"
                encoding
            />
            <Input class="ctool-page-option" v-model="action.current.option.key" label="key">
                <template #suffix>
                    <HelpTip link="https://github.com/brix/crypto-js"/>
                </template>
            </Input>
            <TextOutput
                v-model="action.current.output"
                :allow="['base64','hex']"
                :content="output"
                :height="large"
            />
        </Align>
    </HeightResize>
</template>

<script lang="ts" setup>
import {useAction, initialize} from "@/store/action"
import {createTextInput, createTextOutput} from "@/components/text"
import Text from "@/helper/text"
import {rabbit, Option} from "../cryptoJS"
import {watch} from "vue";

const option: Option = {
    key: "",
}

const action = useAction(await initialize({
    input: createTextInput('text'),
    option: option,
    output: createTextOutput('base64'),
}))

const output = $computed<Text>(() => {
    if (action.current.input.text.isEmpty() || action.current.option.key === "") {
        return Text.empty()
    }
    if (action.current.input.text.isError()) {
        return action.current.input.text
    }
    try {
        if (!action.current.input.text.isText()) {
            throw new Error("input content must text / text file")
        }
        return Text.fromBase64(rabbit.encrypt(action.current.input.text.toBase64(), action.current.option))
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
