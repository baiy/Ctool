<template>
    <HeightResize v-slot="{small,large}" ignore :append="['.ctool-page-option']" :reduce="10">
        <Align direction="vertical">
            <TextInput
                v-model="action.current.input"
                :allow="['base64','hex']"
                :height="small"
            />
            <Tabs
                v-model="action.current.option.type"
                class="ctool-page-option"
                :lists="[{name:`advanced`,label:$t('main_ui_advanced')},{name:`simple`,label:$t('main_ui_simple')}]"
            >
                <Align>
                    <Select v-model="action.current.option.mode" :options="modeLists"/>
                    <Select v-model="action.current.option.padding" :options="paddingLists"/>
                    <Input v-model="action.current.option.key" :width="200" label="key"/>
                    <Input v-model="action.current.option.iv" :width="220" label="iv" :disabled="action.current.option.mode === 'ECB'">
                        <template #append>
                            <Tooltip :content="$t('aes_iv_auto_fill')">
                                <Bool v-model="action.current.option.fill" :disabled="action.current.option.mode === 'ECB'"/>
                            </Tooltip>
                        </template>
                    </Input>
                </Align>
                <Input v-model="action.current.option.key" label="key"/>
                <template #extra>
                    <HelpTip link="https://github.com/brix/crypto-js"/>
                </template>
            </Tabs>
            <TextOutput
                v-model="action.current.output"
                :allow="['text']"
                :content="output"
                :height="large"
                encoding
            />
        </Align>
    </HeightResize>
</template>

<script lang="ts" setup>
import {useAction, initialize} from "@/store/action"
import {createTextInput, createTextOutput} from "@/components/text"
import Text from "@/helper/text"
import {modeLists, paddingLists, des, tripleDES, Option} from "../cryptoJS"
import {watch} from "vue";

const props = defineProps({
    type: {
        type: String,
        default: "des"
    }
})

const option: Omit<Option, 'key_size'> = {
    iv: "",
    type: "advanced",
    key: "",
    fill: true,
    mode: "CBC",
    padding: "Pkcs7"
}

const action = useAction(await initialize({
    input: createTextInput('base64'),
    option: option,
    output: createTextOutput('text'),
}))

const output = $computed(() => {
    if (
        action.current.input.text.isEmpty()
        || action.current.option.key === ""
        || (action.current.option.type === 'advanced' && action.current.option.mode !== 'ECB' && action.current.option.iv === "")
    ) {
        return Text.empty()
    }
    if (action.current.input.text.isError()) {
        return action.current.input.text
    }
    try {
        return Text.fromBase64((props.type === "des" ? des : tripleDES).decrypt(action.current.input.text.toBase64(), action.current.option))
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
