<template>
    <HeightResize v-slot="{small,large}" :reduce="5">
        <Align direction="vertical">
            <TextInput
                v-model="action.current.input"
                :height="small"
                upload="file"
                :allow="['base64', 'hex', 'upload', 'url']"
                encoding
            />
            <TextOutput
                v-model="action.current.output"
                :allow="['text']"
                :content="output"
                :height="large"
                @success="action.save()"
                encoding
            />
        </Align>
    </HeightResize>
</template>

<script lang="ts" setup>
import {useAction, initialize} from "@/store/action"
import {createTextInput, createTextOutput} from "@/components/text"
import Text from "@/helper/text";
import pako from "pako";

const action = useAction(await initialize({
    input: createTextInput('base64'),
    output: createTextOutput('text'),
}))

const output = $computed(() => {
    if (
        action.current.input.text.isEmpty()
    ) {
        return Text.empty()
    }
    if (action.current.input.text.isError()) {
        return action.current.input.text
    }
    try {
        return Text.fromUint8Array(pako.inflate(action.current.input.text.toUint8Array()))
    } catch (e) {
        return Text.fromError($error(e))
    }
})
</script>
