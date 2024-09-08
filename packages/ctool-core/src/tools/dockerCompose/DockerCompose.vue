<template>
    <HeightResize v-slot="{height}" v-row="'1-1'">
        <Textarea v-model="action.current.input" :placeholder="$t(`main_ui_input`)" :height="height" />
        <Textarea v-model="output" :placeholder="$t(`main_ui_output`)" :height="height" :content="output" @success="action.save()" />
    </HeightResize>
</template>

<script lang="ts" setup>
import {initialize, useAction} from "@/store/action";
import {watch} from "vue";
import { composerize } from 'composerize-ts';

const action = useAction(await initialize({
    input: "docker run -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock:ro --restart always --log-opt max-size=1g nginx",
}, {paste: false}))

const output = $computed(() => {
    const input = action.current.input.trim()
    if (input === "") {
        return ""
    }
    try {
        return composerize(input).yaml
    } catch (e) {
        return $error(e)
    }
})

watch(() => {
    return {url: action.current.input}
}, () => {
    try {
        new URL(action.current.input)
        action.save()
    } catch (_) {
    }
}, {immediate: true})
</script>
