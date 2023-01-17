<template>
    <HeightResize v-slot="{height}" v-row="'10-14'">
        <TextInput v-model="action.current.input" upload="file" :height="height" :allow="['text','hex']"/>
        <Align direction="vertical">
            <template v-for="key in ['Hex','Dec','Oct','Bin']">
                <Textarea
                    :model-value="output[key]"
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
import {Bcc} from "./util";

const action = useAction(await initialize({
    input: createTextInput('hex', ""),
}, {paste: false}))

const output = $computed(() => {
    if (action.current.input.text.isEmpty()) {
        return {
            Hex: "",
            Dec: "",
            Oct: "",
            Bin: "",
            Count: "",
        }
    }

    const handle = new Bcc(action.current.input.text)
    if (!handle.isError()){
        action.save()
    }
    return {
        Hex: handle.isError() ? handle.error : handle.hex,
        Dec: handle.isError() ? handle.error : handle.dec,
        Oct: handle.isError() ? handle.error : handle.oct,
        Bin: handle.isError() ? handle.error : handle.bin,
        Count: handle.count,
    }
})
</script>
