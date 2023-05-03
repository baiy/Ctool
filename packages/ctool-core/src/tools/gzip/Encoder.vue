<template>
    <HeightResize v-slot="{small,large}" :reduce="5">
        <Align direction="vertical">
            <Display>
                <TextInput
                    v-model="action.current.input"
                    :height="small"
                    upload="file"
                    encoding
                />
                <template #extra>
                    <Bool v-model="action.current.deflate" label="Deflate"/>
                </template>
            </Display>
            <TextOutput
                v-model="action.current.output"
                :allow="['base64','hex','down']"
                :content="output"
                :height="large"
                @success="action.save()"
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
    input: createTextInput('text'),
    deflate: false,
    output: createTextOutput('base64'),
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

        if (!action.current.input.text.isText()) {
            throw new Error("input content must text / text file")
        }
        let result:Text
        if (action.current.deflate) {
            result = Text.fromUint8Array(pako.deflate(action.current.input.text.toUint8Array()))
        }
        else {
            result = Text.fromUint8Array(pako.gzip(action.current.input.text.toUint8Array()))
        }
        result.setExtension('.gz')
        return result;
    } catch (e) {
        return Text.fromError($error(e))
    }
})
</script>
