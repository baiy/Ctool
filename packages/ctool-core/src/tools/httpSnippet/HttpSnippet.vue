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
            <Editor :lang="targetInfo.targetId" :model-value="output" :height="height" :placeholder="$t(`main_ui_output`)"/>
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

const action = useAction(await initialize({
    input: "",
    source: "cURL",
    target: "javascript-|-axios",
}, {paste: false}))

const targetInfo = $computed(() => getTarget(action.current.target))

const output = $computed(() => {
    if (action.current.input === "") {
        return "";
    }
    try {
        const result = generate(action.current.input, action.current.source, action.current.target)
        action.save()
        return result;
    } catch (e) {
        console.error(e)
        return $error(e)
    }
})
</script>
