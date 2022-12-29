<template>
    <HeightResize v-slot="{small,large}" :father-height="height" ignore :reduce="5">
        <Align direction="horizontal" width="100%">
            <Editor
                v-model="current.exp"
                disable-line-numbers
                :placeholder="`JSON schema ${$t('main_ui_input')}`"
                lang="json"
                :height="small"
            />
            <Editor
                :model-value="output"
                disable-line-numbers
                :placeholder="`JSON schema validator ${$t('main_ui_output')}`"
                :height="large"
            >
                <HelpTip link="https://github.com/ajv-validator/ajv" />
            </Editor>
        </Align>
    </HeightResize>
</template>
<script lang="ts" setup>
import Ajv from "ajv"
import AjvEn from "ajv-i18n/localize/en"
import AjvZh from "ajv-i18n/localize/zh"
import Serialize from "@/helper/serialize";
import {PropType, watch} from "vue";
import {SchemaOptionType} from "@/tools/json/define";
import Json from "@/helper/json";

const props = defineProps({
    modelValue: {
        type: Object as PropType<SchemaOptionType>,
        default: () => {
            return {
                exp: "",
                option: {}
            }
        }
    },
    json: {
        type: Object as PropType<Serialize>,
        default: () => {
            return Serialize.empty()
        }
    },
    height: {
        type: Number,
        default: 0
    },
})

const emit = defineEmits<{ (e: 'update:modelValue', modelValue: SchemaOptionType): void, (e: 'success'): void }>()

const current: SchemaOptionType = $computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

let output = $ref("")
const ajv = new Ajv({allErrors: true, messages: false})

watch(() => {
    return {
        json: props.json,
        current
    }
}, async ({json, current}) => {
    if (json.isError()) {
        output = json.error();
        return;
    }
    if (json.isEmpty() || current.exp.trim() === "") {
        output = "";
        return;
    }
    try {
        const validate = ajv.compile(Json.parse(current.exp))
        if (validate(json?.content())) {
            output = "ok ^o^"
        } else {
            (($t('main_locale') === "zh_CN") ? AjvZh : AjvEn)(validate.errors)
            output = ajv.errorsText(validate.errors, {separator: '\n'})
        }
        emit('success')
    } catch (e) {
        output = $error(e)
    }
}, {immediate: true, deep: true})
</script>




