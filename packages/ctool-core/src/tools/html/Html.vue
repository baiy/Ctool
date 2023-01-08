<template>
    <HeightResize v-slot="{height}" v-row="'1-1'">
        <Textarea v-model="input1"
                  :placeholder="$t('html_input_encode')"
                  :height="height"
                  copy
        />
        <Textarea v-model="input2"
                  :placeholder="$t('html_input_decode')"
                  :height="height"
                  copy
        />
    </HeightResize>
</template>

<script lang="ts" setup>
import {initialize, useAction} from "@/store/action";
import {htmlEncode, htmlDecode} from 'js-htmlencode';

type ConvertType = "encode" | "decode" | ""
const action = useAction(await initialize<{ input: string, type: ConvertType }>({
    type: "",
    input: "",
}, {paste: false}))

const getHandle = (target: ConvertType) => {
    if (action.current.type === "" || action.current.input === "") {
        return ""
    }
    if (action.current.type === target) {
        return action.current.input
    }
    try {
        if (action.current.type === "encode") {
            return htmlEncode(action.current.input)
        }
        return htmlDecode(action.current.input)
    } catch (e) {
        return $error(e)
    }
}
const setHandle = (source: ConvertType, value: string) => {
    action.current.input = value
    action.current.type = source
    if (action.current.input !== "") {
        action.save()
    }
}

const input1 = $computed({
    get: () => {
        return getHandle('encode')
    },
    set: (value) => {
        return setHandle('encode', value)
    }
})

const input2 = $computed({
    get: () => {
        return getHandle('decode')
    },
    set: (value) => {
        return setHandle('decode', value)
    }
})
</script>
