<template>
    <HeightResize v-slot="{height}" v-row="'1-1'">
        <Display position="top-right">
            <Textarea
                :height="height"
                v-model="decimalValue"
                :placeholder="$t('ipDecimal_decimal_placeholder')"
                :copy="false"
            />
        </Display>
        <Display position="top-right">
            <Textarea
                :height="height"
                v-model="dottedValue"
                :placeholder="$t('ipDecimal_ipv4_placeholder')"
                :copy="false"
            />
        </Display>
    </HeightResize>
</template>

<script lang="ts" setup>
import {initialize, useAction} from "@/store/action";
import {computed, ref, watch} from "vue";

const action = useAction(await initialize({
    decimal: "",
    dotted: "",
}, {
    paste: (value) => /^[\s0-9.]*$/.test(value),
}))

const MAX_IPV4 = 0xffffffff
const DECIMAL_REG = /^\d+$/
const OCTET_REG = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/

const normalize = (content: string) => content.replace(/\r\n/g, "\n")

const decimalLineToDotted = (line: string) => {
    const trimmed = line.trim()
    if (trimmed === "") {
        return ""
    }
    if (!DECIMAL_REG.test(trimmed)) {
        return $t('ipDecimal_invalid_decimal', [trimmed])
    }
    const numeric = Number.parseInt(trimmed, 10)
    if (!Number.isFinite(numeric) || !Number.isSafeInteger(numeric) || numeric < 0 || numeric > MAX_IPV4) {
        return $t('ipDecimal_invalid_decimal', [trimmed])
    }
    const value = numeric >>> 0
    return [
        (value >>> 24) & 0xff,
        (value >>> 16) & 0xff,
        (value >>> 8) & 0xff,
        value & 0xff,
    ].join('.')
}

const dottedLineToDecimal = (line: string) => {
    const trimmed = line.trim()
    if (trimmed === "") {
        return ""
    }
    const parts = trimmed.split('.')
    if (parts.length !== 4 || parts.some((part) => !OCTET_REG.test(part))) {
        return $t('ipDecimal_invalid_ipv4', [trimmed])
    }
    const [a, b, c, d] = parts.map((part) => Number.parseInt(part, 10))
    const value = ((a * 256 + b) * 256 + c) * 256 + d
    if (!Number.isFinite(value) || value < 0 || value > MAX_IPV4) {
        return $t('ipDecimal_invalid_ipv4', [trimmed])
    }
    return `${value}`
}

const convertDecimalBlock = (content: string) => normalize(content).split("\n").map(decimalLineToDotted).join("\n")
const convertDottedBlock = (content: string) => normalize(content).split("\n").map(dottedLineToDecimal).join("\n")

const lastEdited = ref<"decimal" | "dotted" | "">("")

const decimalValue = computed({
    get: () => action.current.decimal,
    set: (value: string) => {
        lastEdited.value = "decimal"
        action.current.decimal = value
    }
})

const dottedValue = computed({
    get: () => action.current.dotted,
    set: (value: string) => {
        lastEdited.value = "dotted"
        action.current.dotted = value
    }
})

watch(() => action.current.decimal, (value) => {
    if (lastEdited.value !== "decimal") {
        return
    }
    action.current.dotted = convertDecimalBlock(value)
    lastEdited.value = ""
    action.save()
})

watch(() => action.current.dotted, (value) => {
    if (lastEdited.value !== "dotted") {
        return
    }
    action.current.decimal = convertDottedBlock(value)
    lastEdited.value = ""
    action.save()
})
</script>
