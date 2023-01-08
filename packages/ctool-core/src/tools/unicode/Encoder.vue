<template>
    <HeightResize v-slot="{small,large}" :reduce="5">
        <Align direction="vertical">
            <Display>
                <TextInput :allow="['text','base64','hex']" v-model="action.current.input" :height="small"/>
                <template #extra>
                    <Align>
                        <Select
                            :size="'small'"
                            v-model="action.current.type"
                            :options="_typeLists.map(item=>{return {value:item,label:$t(`unicode_mode_${item}`)}})"
                        />
                        <Bool
                            border
                            :size="'small'"
                            v-model="action.current.ignore_ascii"
                            :label="$t('unicode_ignore_ascii')"
                            :disabled="disableIgnoreAsciiSelect.includes(action.current.type)"
                        />
                    </Align>
                </template>
            </Display>
            <Textarea :model-value="output" :placeholder="$t(`main_ui_output`)" :height="large" copy/>
        </Align>
    </HeightResize>
</template>

<script lang="ts" setup>
import {useAction, initialize} from "@/store/action"
import {createTextInput} from "@/components/text"
import Unicode, {_typeLists, TypeLists} from "./util"

const action = useAction(await initialize({
    input: createTextInput(),
    type: "unicode_point_default",
    ignore_ascii: true,
}))
const disableIgnoreAsciiSelect = ['unicode_point_wide', 'unicode_number', 'css_entity']

const output = $computed(() => {
    if (action.current.input.text.isEmpty()) {
        return ""
    }
    action.save()
    if (action.current.input.text.isError()) {
        return action.current.input.text.toString()
    }
    try {
        return Unicode.encode(
            action.current.input.text.toString(),
            action.current.type as TypeLists,
            disableIgnoreAsciiSelect.includes(action.current.type) ? false : action.current.ignore_ascii
        );
    } catch (e) {
        return $error(e)
    }
})
</script>
