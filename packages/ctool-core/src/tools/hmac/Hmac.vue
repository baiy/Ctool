<template>
    <div v-row="'10-14'">
        <Align direction="vertical">
            <TextInput
                class="ctool-page-option"
                v-model="action.current.secret"
                :use-input="$t(`hmac_secret`)"
                :allow="['text','hex','base64']"
            />
            <Display>
                <HeightResize v-slot="{height}" :append="['.ctool-page-option']" :reduce="5">
                    <TextInput v-model="action.current.input" :height="height" upload="file" encoding/>
                </HeightResize>
                <template #extra>
                    <Align>
                        <Bool size="small" v-model="action.current.is_uppercase" border :label="$t(`hmac_uppercase`)"/>
                        <Tooltip :content="$t(`hmac_multiple_tooltip`)">
                            <Bool :disabled="!isAllowMultiple" size="small" v-model="action.current.multiple" border :label="$t(`hmac_multiple`)"/>
                        </Tooltip>
                    </Align>
                </template>
            </Display>
        </Align>
        <HeightResize v-slot="{height}">
            <Align direction="vertical">
                <template v-for="item in methods">
                    <Textarea
                        :model-value="result[item]"
                        :height="(height - 20) / methods.length"
                        :placeholder="`HMAC-${item}`"
                        :copy="`HMAC-${item}`"
                    />
                </template>
            </Align>
        </HeightResize>
    </div>
</template>

<script lang="ts" setup>
import {useAction, initialize} from "@/store/action"
import {createTextInput} from "@/components/text"
import handle, {methods, methodType} from "./util"
import Text from "@/helper/text"

const action = useAction(await initialize({
    input: createTextInput(),
    secret: createTextInput('text'),
    is_uppercase: false,
    multiple: false,
}))

const isAllowMultiple = $computed(() => {
    return ["text"].includes(action.current.input.type)
})

const result = $computed(() => {
    let r: Record<methodType, string> = {
        md5: "",
        sha1: "",
        sha256: "",
        sha512: "",
        sm3: "",
        ripemd160: "",
    }
    if (action.current.input.text.isEmpty() || action.current.secret.text.isEmpty()) {
        return r;
    }

    let isError = false
    for (let type of methods) {
        try {
            if (action.current.input.text.isError()) {
                throw new Error(`input:${action.current.input.text.toString()}`)
            }
            if (action.current.secret.text.isError()) {
                throw new Error(`secret:${action.current.secret.text.toString()}`)
            }
            const temp = hmac(
                type,
                action.current.input.text as Text,
                action.current.secret.text as Text,
                isAllowMultiple && action.current.multiple
            );
            r[type] = action.current.is_uppercase ? temp.toUpperCase() : temp.toLowerCase()
        } catch (e) {
            isError = true
            r[type] = $error(e)
        }
    }
    isError || action.save()
    return r;
})

const hmac = (type: methodType, content: Text, secret: Text, multiple: boolean) => {
    if (!multiple) {
        return handle(type, content, secret)
    }
    return content.toString().split("\n").map(item => {
        return handle(type, Text.fromString(item, content.encoding()), secret)
    }).join("\n")

}
</script>
