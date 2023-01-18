<template>
    <HeightResize v-slot="{height}" v-row="'10-14'">
        <TextInput v-model="action.current.input" upload="file" :height="height">
            <Align>
                <Select :size="'small'" :options="crcTypeLists" v-model="action.current.type"/>
                <HelpTip link="https://www.npmjs.com/package/crc" />
            </Align>
        </TextInput>
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
import {crc, result, crcTypeLists, CrcType} from "./util";
import {watch} from "vue";
import Input from "@/components/text/input";

const action = useAction(await initialize<{ input: Input, type: CrcType }>({
    input: createTextInput('hex', ""),
    type: "crc32",
}, {paste: false}))
let output = $ref<null | number>(null)
let error = $ref('')

watch(() => {
    return {
        text: action.current.input.text,
        type:action.current.type
    }
}, async ({text,type}) => {
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
        output = await crc(text, type)
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
