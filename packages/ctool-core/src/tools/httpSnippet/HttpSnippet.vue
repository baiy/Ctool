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
            <template v-if="!isArray(output)">
                <Editor :lang="targetInfo.targetId" :model-value="output" :height="height" :placeholder="$t(`main_ui_output`)"/>
            </template>
            <Tabs v-else
                  :lists="range(0,output.length).map(index=>{return {name:`${index}`,label:`Entry ${index+1}`}})"
                  padding="0"
            >
                <Editor
                    v-for="item in output"
                    :lang="targetInfo.targetId"
                    :model-value="item"
                    :height="height -36"
                    :placeholder="$t(`main_ui_output`)"
                    disableBorder
                />
            </Tabs>
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
import {isArray, range} from 'lodash';

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
        return $error(e)
    }
})
</script>
