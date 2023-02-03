<template>
    <HeightResize v-slot="{small,large}" ignore :append="['.ctool-page-option']" :reduce="10">
        <Align direction="vertical">
            <TextInput
                v-model="action.current.input"
                :allow="['base64','hex']"
                :height="small"
            />
            <Align v-row="`1-auto-auto`" class="ctool-page-option">
                <Input v-model="action.current.option.private_key"
                       :label="$t(`sm2_private_key`)"/>
                <Select
                    :options="[{value:1,label:'C1-C3-C2'},{value:0,label:'C1-C2-C3'}]"
                    v-model="action.current.option.cipher_mode"
                />
                <HelpTip link="https://github.com/JuneAndGreen/sm-crypto"/>
            </Align>
            <TextOutput
                v-model="action.current.output"
                :allow="['text','hex','base64','image', 'down']"
                :content="output"
                :height="large"
            />
        </Align>
    </HeightResize>
</template>

<script lang="ts" setup>
import {useAction, initialize} from "@/store/action"
import {createTextInput, createTextOutput} from "@/components/text"
import Text from "@/helper/text"
import {CipherMode, sm2} from "sm-crypto"
import {watch} from "vue";

const action = useAction(await initialize({
    input: createTextInput('hex'),
    option: {
        private_key: "",
        cipher_mode: 1,
    },
    output: createTextOutput('text'),
}))

const output = $computed(() => {
    if (action.current.input.text.isEmpty() || action.current.option.private_key === "") {
        return Text.empty()
    }
    try {
        if (action.current.input.text.isError()) {
            return action.current.input.text
        }
        let result = sm2.doDecrypt(
            action.current.input.text.toHexString(),
            action.current.option.private_key,
            action.current.option.cipher_mode as CipherMode,
            // @ts-ignore
            {output: 'array'}
        )
        if (result === "") {
            throw new Error("failure")
        }
        return Text.fromArray(result as any)
    } catch (e) {
        return Text.fromError($error(e))
    }
})

watch(() => output, (output) => {
    if (output.isEmpty()) {
        return
    }
    action.save()
}, {immediate: true, deep: true})
</script>
