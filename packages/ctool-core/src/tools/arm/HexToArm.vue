<template>
    <Input class="ctool-page-option" label="Offset (hex) 0x" v-model="action.current.offset" placeholder="0 - for branch and LDR put hex value here"
           style="margin-bottom: 5px">
        <template #append>
            <HelpTip link="https://armconverter.com/"/>
        </template>
    </Input>
    <div>
        <HeightResize v-slot="{height}" :append="['.ctool-page-option']" style="display: grid;grid-template-columns: 10fr 14fr;grid-column-gap:5px">
            <Align direction="vertical">
                <Textarea
                    v-model="action.current.input"
                    :height="height - 37"
                    :placeholder="inputPlaceholder"
                />
                <Button type="primary" :loading="loading" @click="convert" long>{{ $t('arm_convert') }}</Button>
            </Align>
            <Align direction="vertical">
                <Textarea
                    :model-value="result.arm64"
                    placeholder="ARM64"
                    copy="ARM64"
                    :height="(height - 20) / 5"
                />
                <Textarea
                    :model-value="result.arm"
                    placeholder="ARM"
                    copy="ARM"
                    :height="(height - 20) / 5"
                />
                <Textarea
                    :model-value="result.armbe"
                    placeholder="ARM Big Endian"
                    copy="ARM Big Endian"
                    :height="(height - 20) / 5"
                />
                <Textarea
                    :model-value="result.thumb"
                    placeholder="THUMB"
                    copy="THUMB"
                    :height="(height - 20) / 5"
                />
                <Textarea
                    :model-value="result.thumbbe"
                    placeholder="THUMB Big Endian"
                    copy="THUMB Big Endian"
                    :height="(height - 20) / 5"
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
        "hex": action.current.input,
        "offset": action.current.offset,
        "arch": ["arm64", "arm", "armbe", "thumb", "thumbbe"]
    }).then(({data}) => {
        action.current.response = data;
        action.success()
    }).finally(() => {
        loading = false
    })
}

const result = $computed(() => {
    return {
        arm64: handleResult("asm", 'arm64', action.current),
        arm: handleResult("asm", 'arm', action.current),
        thumb: handleResult("asm", 'thumb', action.current),
        armbe: handleResult("asm", 'armbe', action.current),
        thumbbe: handleResult("asm", 'thumbbe', action.current),
    }
})

const inputPlaceholder = `Input Hex code:
40000494
C0035FD6
F0 B5 03 AF81b0`
</script>
