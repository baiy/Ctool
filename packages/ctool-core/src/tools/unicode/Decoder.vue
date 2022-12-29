<template>
    <HeightResize v-slot="{small,large}" :reduce="5">
        <Align direction="vertical">
            <Display>
                <Textarea v-model="action.current.input" :placeholder="$t(`main_ui_input`)" :height="small"/>
                <template #extra>
                    <Select
                        :size="'small'"
                        v-model="action.current.type"
                        :options="_typeLists.map(item=>{return {value:item,label:$t(`unicode_mode_${item}`)}})"
                    />
                </template>
            </Display>
            <Textarea :model-value="output" :placeholder="$t(`main_ui_output`)" :height="large" copy/>
        </Align>
    </HeightResize>
</template>

<script lang="ts" setup>
import {useAction, initialize} from "@/store/action"
import Unicode, {_typeLists, TypeLists} from "./util"

const action = useAction(await initialize({
    input: "",
    type: "unicode_point_default",
}))

const output = $computed(() => {
    if (action.current.input === "") {
        return;
    }
    action.save()
    try {
        return Unicode.decode(
            action.current.input,
            action.current.type as TypeLists,
        );
    } catch (e) {
        return $error(e)
    }
})
</script>
