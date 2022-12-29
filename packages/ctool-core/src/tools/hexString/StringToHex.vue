<template>
    <HeightResize v-slot="{small,large}" :reduce="5">
        <Align direction="vertical">
            <TextInput
                :allow="['text','base64','url','upload']"
                v-model="action.current.input"
                :height="small"
                upload="file"
                encoding
            />
            <TextOutput
                v-model="action.current.output" :allow="['hex']"
                :content="action.current.input.text"
                :height="large"
                @success="action.save()"
            />
        </Align>
    </HeightResize>
</template>

<script lang="ts" setup>
import {useAction, initialize} from "@/store/action"
import {createTextInput, createTextOutput} from "@/components/text"

const action = useAction(await initialize({
    input: createTextInput('text'),
    output: createTextOutput('hex'),
}))
</script>
