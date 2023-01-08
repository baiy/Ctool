<template>
    <HeightResize v-slot="{height}" v-row="'1-1'">
        <SerializeInput v-model="action.current.input" :height="height"/>
        <SerializeOutput v-model="action.current.output" :height="height" :content="action.current.input.serialization" @success="action.save()"/>
    </HeightResize>
</template>

<script lang="ts" setup>
import {useAction, initialize} from "@/store/action";
import {createSerializeInput, createSerializeOutput} from "@/components/serialize";

const action = useAction(await initialize({
    input: createSerializeInput('json'),
    output: createSerializeOutput('xml')
}, {paste: false}))
</script>
