<template>
    <HeightResize v-slot="{small,large}" :reduce="5">
        <Align direction="vertical">
            <TextInput
                :allow="['hex']"
                v-model="action.current.input"
                :height="small"
                upload="file"
            />
            <TextOutput
                v-model="action.current.output"
                :allow="['text','base64']"
                :content="action.current.input.text"
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

const action = useAction(await initialize({
    input: createTextInput('hex'),
    output: createTextOutput('text'),
}))
</script>
