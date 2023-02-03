<template>
    <HeightResize v-slot="{small,large}" ignore :append="['.ctool-page-option']" :reduce="10">
        <Align direction="vertical">
            <div v-row="`1-1`">
                <TextInput
                    v-model="action.current.sourceData"
                    :height="large"
                    :placeholder="$t(`sm2_source_data`)"
                    upload="file"
                />
                <TextInput
                    v-model="action.current.signValue"
                    :height="large"
                    :placeholder="$t(`sm2_sign_value`)"
                    :allow="['hex','base64']"
                />
            </div>
            <Card :title="$t(`main_ui_config`)" class="ctool-page-option">
                <Align horizontal="center">
                    <Input v-model="action.current.option.public_key" :label="$t(`sm2_public_key`)"/>
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
                :allow="['hex']"
                :content="output"
                :height="small"
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
    sourceData: createTextInput('text'),
    signValue: createTextInput('hex'),
    option: {
        public_key: "",
        user_id: "1234567812345678",
    },
    output: createTextOutput('text'),
}))


const output = $computed<Text>(() => {
    if (action.current.sourceData.text.isEmpty() || action.current.signValue.text.isEmpty() || action.current.option.public_key === "") {
        return Text.empty()
    }

    if (action.current.sourceData.text.isError()) {
        return action.current.sourceData.text
    }

    if (action.current.signValue.text.isError()) {
        return action.current.signValue.text
    }
    try {
        let publicKey = action.current.option.public_key
        if(publicKey.length == 128){
            publicKey = '04'+publicKey
        } else if(publicKey.length != 130 || !publicKey.startsWith('04')) {
            return Text.fromError($error($t(`public_key_error`)))
        }

        let verifyResult = sm2.doVerifySignature(
            action.current.sourceData.text.toArray() as any,
            action.current.signValue.text.toHexString(),
            publicKey,
            {
                hash: true,
                // @ts-ignore
                userId: action.current.option.user_id
            }
        )
        if (!verifyResult) {
            return Text.fromString($t(`sign_verify_fail`))
        }
        return Text.fromString($t(`sign_verify_ok`))

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
