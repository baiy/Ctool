<template>
    <div v-row="'10-14'">
        <Align direction="vertical">
            <Display>
                <HeightResize v-slot="{height}" :append="action.current.is_salt ? ['.ctool-hash-salt'] : []" :reduce="action.current.is_salt ? 5 : 0">
                    <TextInput v-model="action.current.input" :height="height" upload="file" encoding/>
                </HeightResize>
                <template #extra>
                    <Align>
                        <Bool size="small" v-model="action.current.is_salt" border :disabled="['upload','url'].includes(action.current.input.type)"
                              :label="$t(`hash_salt`)"/>
                        <Bool size="small" v-model="action.current.is_uppercase" border :label="$t(`hash_uppercase`)"/>
                        <Tooltip :content="$t(`hash_multiple_tooltip`)">
                            <Bool :disabled="!isAllowMultiple" size="small" v-model="action.current.multiple" border :label="$t(`hash_multiple`)"/>
                        </Tooltip>
                    </Align>
                </template>
            </Display>
            <Align direction="vertical" class="ctool-hash-salt" v-if="action.current.is_salt">
                <Input v-model="action.current.salt" :label="$t(`hash_salt_value`)" :disabled="['upload','url'].includes(action.current.input.type)"/>
                <Input v-model="action.current.salt_exp" :label="$t(`hash_salt_mode`)" :disabled="['upload','url'].includes(action.current.input.type)">
                    <template #append>
                        <Dropdown
                            :disabled="['upload','url'].includes(action.current.input.type)"
                            @select="(value)=>action.current.salt_exp = value"
                            :placeholder="$t(`hash_salt_select`)"
                            :options="saltExpLists"
                        />
                    </template>
                </Input>
            </Align>
        </Align>
        <HeightResize v-slot="{height}">
            <Align direction="vertical">
                <template v-for="item in methods">
                    <Textarea
                        :model-value="result[item]"
                        :height="(height - 20) / methods.length"
                        :placeholder="item"
                        :copy="item"
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
    salt: "",
    salt_exp: "",
    is_salt: false,
    is_uppercase: false,
    multiple: false,
}))

const saltExp = $computed(() => {
    if (!action.current.is_salt || ['upload', 'url'].includes(action.current.input.type)) {
        // 文件上传禁用盐值
        return "";
    }

    return action.current.salt_exp || ""
})

const isAllowMultiple = $computed(() => {
    return ["text"].includes(action.current.input.type)
})

const result = $computed(() => {
    let r = {
        md5: "",
        sha1: "",
        sha256: "",
        sha512: "",
        sm3: "",
    }
    if (!action.current.input.text.isEmpty()) {
        let isError = false
        for (let type of methods) {
            try {
                if (action.current.input.text.isError()) {
                    throw new Error(action.current.input.text.toString())
                }
                const temp = hash(
                    type,
                    action.current.input.text,
                    action.current.salt,
                    saltExp,
                    isAllowMultiple && action.current.multiple
                );
                r[type] = action.current.is_uppercase ? temp.toUpperCase() : temp.toLowerCase()
            } catch (e) {
                isError = true
                r[type] = $error(e)
            }
        }
        isError || action.save()
    }
    return r;
})

const hash = (type: methodType, content: Text, salt: string, exp: string, multiple: boolean) => {
    if (!multiple) {
        return handle(type, content, salt, exp)
    }
    return content.toString().split("\n").map(item => {
        return handle(type, Text.fromString(item, content.encoding()), salt, exp)
    }).join("\n")

}

const saltExpLists = [
    'hash(hash($input))',
    'hash($input.$salt)',
    'hash(hash($input).$salt)',
    'hash($input).hash($salt)',
    'hash(hash(hash($input)))',
    'hash($salt.$input.$salt)',
    'hash(hash($input.$salt).$salt)',
    'hash($salt.hash($input.$salt).$salt)',
    'hash($salt.hash($salt.$input.$salt).$salt)',
]
</script>
