<template>
    <div>
        <Align direction="vertical" class="ctool-json-path" :bottom="'default'">
            <Input v-model="option.json_path" v-if="option.type === 'json_path'" :label="$t(`json_json_path`)">
                <template #append>
                    <HelpTip link="https://www.npmjs.com/package/jsonpath-plus" />
                </template>
            </Input>
            <Input v-model="option.jmes_path" v-if="option.type === 'jmes_path'" :label="$t(`json_jmes_path`)">
                <template #append>
                    <HelpTip link="https://www.npmjs.com/package/jmespath" />
                </template>
            </Input>
        </Align>
        <HeightResize @resize="resize" :father-height="height" :append="['.ctool-json-path']">
            <Editor :model-value="output" :placeholder="`${$t(`json_${option.type}`)} ${$t('main_ui_output')}`" lang="json" :height="`${editorHeight}px`" />
        </HeightResize>
    </div>
</template>

<script lang="ts" setup>
import {JSONPath} from "jsonpath-plus";
import jmespath from "jmespath";
import {PropType, watch} from "vue";
import {isObject} from "lodash";
import {PathOptionType} from "./define";
import formatter from "../code/formatter";
import Serialize from "@/helper/serialize";

const props = defineProps({
    modelValue: {
        type: Object as PropType<PathOptionType>,
        default: () => {
            return {
                type: "json_path",
                json_path: "",
                jmes_path: "",
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
const emit = defineEmits<{ (e: 'update:modelValue', modelValue: PathOptionType): void, (e: 'success'): void }>()

const option: PathOptionType = $computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

let output = $ref("")

watch(() => {
    return {
        json: props.json,
        option
    }
}, async ({json, option}) => {
    if (json.isError()) {
        output = json.error();
        return;
    }
    if (json.isEmpty()) {
        output = "";
        return;
    }
    const jsonPathExp = option.json_path.trim() || ""
    const jmesPathExp = option.jmes_path.trim() || ""
    try {
        if (option.type === "json_path" && jsonPathExp !== "") {
            const result = JSONPath({path: jsonPathExp, json: json.content()})
            if (isObject(result)) {
                output = await formatter.simple('json', 'beautify', result)
            } else {
                output = result.toString()
            }
            emit('success')
            return
        }
        if (option.type === "jmes_path" && jmesPathExp !== "") {
            const result = jmespath.search(json.content(), jmesPathExp)
            if (isObject(result)) {
                output = await formatter.simple('json', 'beautify', result)
            } else {
                output = result.toString()
            }
            emit('success')
            return
        }
    } catch (e) {
        output = $error(e)
        return
    }
    output = ""
}, {immediate: true, deep: true})

let editorHeight = $ref(100)
const resize = (height) => {
    editorHeight = height
}
</script>




