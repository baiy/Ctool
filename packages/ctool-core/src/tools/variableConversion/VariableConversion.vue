<template>
    <HeightResize v-row="`1-1-1-1`" v-slot="{height}" ignore :reduce="5">
        <Textarea
            :height="height/2"
            v-model="action.current.input"
            :placeholder="$t(`variableConversion_input_placeholder`)"
            :float-text="$t('variableConversion_input')"
        />
        <Textarea
            v-for="item in output"
            :model-value="item.value"
            :copy="item.label"
            :height="height/2"
            :float-type="'general'"
            :placeholder="item.label"
        />
    </HeightResize>
</template>

<script lang="ts" setup>
import {initialize, useAction} from "@/store/action";
import {TypeLists, convent, typeLists} from "@/helper/nameConvert";

const action = useAction(await initialize({
    input: "",
}))

const output = $computed(() => {
    const input = action.current.input.trim()
    const result = typeLists.map(({value, label}) => {
        return {key: value, label, value: ""}
    })
    if (input === "") {
        return result
    }
    action.save()
    return result.map(item => {
        item.value = batchConvent(input, item.key as TypeLists)
        return item
    })
})

const batchConvent = (str: string, type: TypeLists) => {
    return str.split("\n").map(line => {
        line = line.trim()
        if (line === "") {
            return ""
        }
        return convent(line, type)
    }).join("\n")
}
</script>
