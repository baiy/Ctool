<template>
    <HeightResize v-slot="{small,large}" :reduce="5" ignore>
        <Align direction="vertical">
            <Textarea :height="small" :placeholder="$t(`main_ui_input`)" v-model="action.current.input"/>
            <div :style="{height: `${large}px`}" style="display: grid;grid-template-rows: auto minmax(0,1fr);gap: 5px">
                <Align direction="vertical">
                    <Input label="Base" :model-value="output.base"/>
                    <Input label="Path" :model-value="output.path"/>
                    <Input label="Hash" :model-value="output.hash"/>
                </Align>
                <SerializeOutput
                    placeholder="Query"
                    :content="output.query"
                    v-model="action.current.querySerializeOption"
                    @success="action.save()"
                />
            </div>
        </Align>
    </HeightResize>
</template>

<script lang="ts" setup>
import {initialize, useAction} from "@/store/action";
import {watch} from "vue";
import {createSerializeOutput} from "@/components/serialize";
import Serialize from "@/helper/serialize";

const action = useAction(await initialize({
    input: "",
    querySerializeOption: createSerializeOutput('json')
}, {paste: (item) => item.includes("://")}))

const output = $computed(() => {
    const input = action.current.input.trim()
    if (input === "") {
        return {
            base: "",
            path: "",
            query: Serialize.formQueryString(""),
            hash: ""
        }
    }
    try {
        const url = new URL(action.current.input)
        return {
            base: url.origin,
            path: url.pathname,
            query: Serialize.formQueryString((url.search.startsWith("?") ? url.search.substring(1) : url.search) || ""),
            hash: url.hash
        }
    } catch (e) {
        return {
            base: $error(e),
            path: "",
            query: Serialize.formQueryString(""),
            hash: ""
        }
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
