<template>
    <Input class="ctool-page-option" label="Offset (hex) 0x" v-model="action.current.offset" placeholder="0 - for branch and LDR put hex value here"
           style="margin-bottom: 5px">
        <template #append>
            <Align>
                <Bool v-model="action.current.prefix_0x" label="0x"/>
                <Bool v-model="action.current.swap_endian" label="GDB/LLDB"/>
                <HelpTip link="https://armconverter.com/"/>
            </Align>
        </template>
    </Input>
    <div>
        <HeightResize v-slot="{height}" :append="['.ctool-page-option']" v-row="'10-14'">
            <Align direction="vertical">
                <Textarea
                    v-model="action.current.input"
                    :height="height - 37"
                    :placeholder="inputPlaceholder"
                />
                <Button type="primary" :loading="loading" @click="convert" long :text="$t('arm_convert')"/>
            </Align>
            <Align direction="vertical">
                <Textarea
                    :model-value="result.arm64"
                    :placeholder="outputPlaceholder(`ARM64`)"
                    :height="(height - 10) / 3"
                    :copy="outputPlaceholder(`ARM64`)"
                />
                <Textarea
                    :model-value="result.arm"
                    :placeholder="outputPlaceholder(`ARM`)"
                    :height="(height - 10) / 3"
                    :copy="outputPlaceholder(`ARM`)"
                />
                <Textarea
                    :model-value="result.thumb"
                    :placeholder="outputPlaceholder(`THUMB`)"
                    :height="(height - 10) / 3"
                    :copy="outputPlaceholder(`THUMB`)"
                />
            </Align>
        </HeightResize>
    </div>
</template>

<script lang="ts" setup>
import {initialize, useAction} from "@/store/action";
import {handleResult, InitializeType, request} from "./util";

const action = useAction(await initialize<InitializeType>({
    input: "",
    offset: "",
    prefix_0x: false,
    swap_endian: false,
    response: "",
}))

let loading = $ref(false)

const convert = async () => {
    loading = true
    if (action.current.input.trim() === "") {
        action.current.response = "";
        return;
    }
    request({
        "asm": action.current.input,
        "offset": action.current.offset,
        "arch": ["arm64", "arm", "thumb"]
    }).then(({data}) => {
        action.current.response = data
        action.success()
    }).finally(() => {
        loading = false
    })
}

const result = $computed(() => {
    return {
        arm64: handleResult("hex", 'arm64', action.current),
        arm: handleResult("hex", 'arm', action.current),
        thumb: handleResult("hex", 'thumb', action.current),
    }
})

const inputPlaceholder = `Input Assembly code:
NOP
RET
B #0x1018DE444
MOV X0, #0x11FE00000000
BEQ #0x10020C
CBNZ R0, #0x682C4
`
const outputPlaceholder = (field: string) => {
    return `${field}${action.current.swap_endian ? " Big Endian" : ""}`
}
</script>
