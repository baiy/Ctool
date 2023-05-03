<template>
    <HeightResize v-slot="{height,small,large}" :reduce="5" ignore v-row="`1-300px`">
        <Align direction="vertical">
            <TextInput
                :allow="['base64','hex','upload','url']"
                v-model="action.current.input"
                :height="small"
                upload="image"
            />
            <Textarea :model-value="output" :placeholder="$t(`main_ui_output`)" :height="large"/>
        </Align>
        <Card :height="height+5">
            <Align horizontal="center" vertical="center">
                <img v-if="action.current.input.text.isImage()" style="max-width: 90%;max-height: 90%;" :src="action.current.input.text.toDataUrl()"/>
                <Exception v-else/>
            </Align>
        </Card>
    </HeightResize>
</template>

<script lang="ts" setup>
import {initialize, useAction} from "@/store/action";
import {createTextInput} from "@/components/text";
import {parser} from './util'
import {watch} from "vue";

const action = useAction(await initialize({
    input: createTextInput('upload'),
}, {paste: false}))

let output = $ref("")

watch(() => action.current.input.text, (text) => {
    if (text.isEmpty() || text.isError()) {
        return output = text.toString()
    }
    if (!text.isImage()) {
        return output = $t('qrCode_reader_parsing_failure')
    }
    parser(text).then((data) => {
        output = data
        action.save()
    }).catch((e) => {
        output = $error(e)
    })
}, {immediate: true, deep: true})
</script>
