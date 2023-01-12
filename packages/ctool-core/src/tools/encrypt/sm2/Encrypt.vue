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
                    <Input v-model="action.current.option.public_key" :label="$t(`sm2_public_key`)"/>
                    <Input v-model="action.current.option.private_key" :label="$t(`sm2_private_key`)"/>
                </Align>
                <template #extra>
                    <Align>
                        <Select
                            :size="'small'"
                            :options="[{value:1,label:'C1-C3-C2'},{value:0,label:'C1-C2-C3'}]"
                            v-model="action.current.option.cipher_mode"
                        />
                        <Button :type="'primary'" :size="'small'" :text="$t(`sm2_generate_keypair`)" @click="generateKeypair"/>
                        <HelpTip link="https://github.com/JuneAndGreen/sm-crypto"/>
                    </Align>
                </template>
            </Card>
            <TextOutput
                v-model="action.current.output"
                :allow="['base64','hex']"
                :content="output"
                :height="large"
                @success="action.save()"
            />
        </Align>
    </HeightResize>
</template>

<script lang="ts" setup>
import {useAction, initialize} from "@/store/action"
import {createTextInput, createTextOutput} from "@/components/text"
import Text from "@/helper/text"
import {CipherMode, sm2} from "sm-crypto"

const action = useAction(await initialize({
    input: createTextInput('text'),
    option: {
        public_key: "",
        private_key: "",
        cipher_mode: 1,
    },
    output: createTextOutput('hex'),
}))

const output = $computed<Text>(() => {
    if (action.current.input.text.isEmpty() || action.current.option.public_key === "") {
        return Text.empty()
    }
    if (action.current.input.text.isError()) {
        return action.current.input.text
    }
    try {
        let result = sm2.doEncrypt(
            action.current.input.text.toUint8Array() as any,
            action.current.option.public_key,
            action.current.option.cipher_mode as CipherMode
        )
        return Text.fromHex(result)
    } catch (e) {
        return Text.fromError($error(e))
    }
})

const generateKeypair = () => {
    let keypair = sm2.generateKeyPairHex()
    action.current.option.public_key = keypair.publicKey
    action.current.option.private_key = keypair.privateKey
}
</script>
