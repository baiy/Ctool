<template>
    <HeightResize v-slot="{height}" v-row="'1-1'">
        <Display position="top-right">
            <Textarea :height="height" v-model="action.current.input" :placeholder="$t('binary_input')"/>
            <template #extra>
                <Select size="small" v-model="action.current.length" :options="lengthLists.map((value)=>{return {value,label:$t('binary_length', [value])}})"/>
            </template>
        </Display>
        <Align direction="vertical">
            <Textarea
                :height="(height -10)/3"
                :model-value="result('trueForm')"
                :placeholder="$t('binary_true_form')"
                :copy="$t('binary_true_form')"
            />
            <Textarea
                :height="(height -10)/3"
                :model-value="result('inverse')"
                :placeholder="$t('binary_inverse')"
                :copy="$t('binary_inverse')"
            />
            <Textarea
                :height="(height -10)/3"
                :model-value="result('complement')"
                :placeholder="$t('binary_complement')"
                :copy="$t('binary_complement')"
            />
        </Align>
    </HeightResize>
</template>

<script lang="ts" setup>
import {initialize, useAction} from "@/store/action";
import {generate, GenerateType, lengthLists} from "./util"

const action = useAction(await initialize({
    input: "",
    length: 8,
}, {
    paste: (str) => /^[\d\-+\n]+$/.test(str)
}))

const result = (type: GenerateType) => {
    if (action.current.input.trim() === "") {
        return "";
    }
    let output: string[] = []
    for (let input of action.current.input.trim().split("\n")) {
        try {
            output.push(`${generate(input.trim(), action.current.length, type)}`)
        } catch (e) {
            output.push($t('binary_error', [$error(e)]))
        }
    }
    if (output.length > 0) {
        action.save();
    }
    return output.join("\n")
}
</script>
