<template>
    <HeightResize v-slot="{small,large}" :reduce="5">
        <Align direction="vertical">
            <Textarea v-model="action.current.input" :height="small" :placeholder="$t('main_ui_input')"/>
            <Textarea :model-value="output" :height="large" :placeholder="$t('main_ui_output')" :copy="!!output"/>
        </Align>
    </HeightResize>
</template>

<script lang="ts" setup>
import decodeUriComponent from "decode-uri-component";
import {useAction, initialize} from "@/store/action"

const action = useAction(await initialize({
    input: ""
}))

const output = $computed(() => {
    if (action.current.input === "") {
        return ""
    }
    try {
        action.save()
        return decodeUriComponent(action.current.input)
    } catch (e) {
        return $error(e)
    }
})
</script>
