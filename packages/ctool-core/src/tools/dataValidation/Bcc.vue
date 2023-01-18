<template>
    <HeightResize v-slot="{height}" v-row="'10-14'">
        <TextInput v-model="action.current.input" upload="file" :height="height"/>
        <Align direction="vertical">
            <template v-for="key in ['Hex','Dec','Oct','Bin']">
                <Textarea
                    :model-value="getResult(key)"
                    :height="(height - 15) / 4"
                    :placeholder="`${$t('main_ui_output')} ${key}`"
                    :copy="key"
                />
            </template>
        </Align>
    </HeightResize>
</template>

<script lang="ts" setup>
import {initialize, useAction} from "@/store/action";
import {createTextInput} from "@/components/text";
import {bcc, result} from "./util";
import {watch} from "vue";

const action = useAction(await initialize({
    input: createTextInput('hex', ""),
}, {paste: false}))
let output = $ref<null | number>(null)
let error = $ref('')

watch(() => {
    return {
        text: action.current.input.text
    }
}, ({text}) => {
    error = ""
    output = null
    if (text.isError()) {
        error = text.toString()
        return;
    }
    if (text.isEmpty()) {
        return;
    }
    try {
        output = bcc(text)
        action.save()
    } catch (e) {
        error = $error(e)
    }
}, {immediate: true, deep: true})

const getResult = (type: string) => {
    if (error !== "") {
        return error
    }
    if (output === null) {
        return ""
    }
    return result(output, type)
}
</script>
