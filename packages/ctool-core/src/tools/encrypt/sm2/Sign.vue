<template>
    <HeightResize v-slot="{small,large}" ignore :append="['.ctool-page-option']" :reduce="10">
        <Align direction="vertical">
            <TextInput
                v-model="action.current.input"
                :height="small"
                upload="file"
            />
            <Card :title="$t(`main_ui_config`)" class="ctool-page-option">
                <Align horizontal="center">
                    <Input v-model="action.current.option.private_key" :label="$t(`sm2_private_key`)"/>
                    <Input v-model="action.current.option.user_id" :label="$t(`sm2_userId`)"/>
                </Align>
                <template #extra>
                    <Align>
                        <HelpTip link="https://github.com/JuneAndGreen/sm-crypto"/>
                    </Align>
                </template>
            </Card>
            <TextOutput
                v-model="action.current.output"
                :allow="['base64','hex']"
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
import {sm2} from "sm-crypto"
import {watch} from "vue";

const action = useAction(await initialize({
    input: createTextInput('text'),
    option: {
        private_key: "",
        user_id: "1234567812345678",
    },
    output: createTextOutput('hex'),
}))

const output = $computed<Text>(() => {
    if (action.current.input.text.isEmpty() || action.current.option.private_key === "") {
        return Text.empty()
    }
    if (action.current.input.text.isError()) {
        return action.current.input.text
    }
    try {
        return Text.fromHex(
            sm2.doSignature(
                action.current.input.text.toArray() as any,
                action.current.option.private_key,
                {
                    hash: true,
                    // @ts-ignore
                    userId: action.current.option.user_id
                }
            )
        )
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
