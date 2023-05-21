<template>
    <HeightResize v-slot="{height}" v-row="`1-1`">
        <Display :position="'bottom-right'">
            <Editor :lang="action.current.source === 'cURL' ? 'shell' : 'json'" v-model="action.current.input" :height="height" :placeholder="$t(`main_ui_output`)"/>
            <template #extra>
                <Align>
                    <HelpTip
                            :link="action.current.source === 'cURL' ? 'https://everything.curl.dev/usingcurl/copyas' : 'http://www.softwareishard.com/blog/har-12-spec/#request'"
                    />
                    <Select :size="'small'" :options="['cURL','HAR']" v-model="action.current.source"/>
                </Align>
            </template>
        </Display>
        <Display :position="'bottom-right'">
            <Display :position="'top-right'">
                <Editor :lang="targetInfo.targetId" :model-value="output[selected].value" :height="height" :placeholder="$t(`main_ui_output`)"/>
                <template #extra>
                    <Select
                            v-if="output.length > 1"
                            :size="'small'"
                            :options="range(0,output.length).map(index=>{return {value:index,label:`Entry ${index+1}`,description:output[index].url}})"
                            v-model="selected"/>
                </template>
            </Display>
            <template #extra>
                <Align>
                    <HelpTip v-if="targetInfo.url !== ''" :link="targetInfo.url"/>
                    <Select dialog :size="'small'" :options="targets" v-model="action.current.target"/>
                </Align>
            </template>
        </Display>
    </HeightResize>
</template>

<script lang="ts" setup>
import {generate, targets, getTarget} from "./util";
import {initialize, useAction} from "@/store/action";
import {range} from 'lodash';
import {watch} from "vue";

const action = useAction(await initialize({
    input: "",
    source: "cURL",
    target: "javascript-|-axios",
}, {paste: false}))

const targetInfo = $computed(() => getTarget(action.current.target))

let selected = $ref(0);

const output = $computed(() => {
    if (action.current.input === "") {
        return [{value: "", url: ""}];
    }
    try {
        const result = generate(action.current.input, action.current.source, action.current.target)
        action.save()
        return result;
    } catch (e) {
        console.log(e)
        return [{value: $error(e), url: ""}]
    }
})

watch(
    () => {
        return {output}
    },
    () => {
        selected = 0;
    },
    {immediate: true, deep: true}
)

</script>
