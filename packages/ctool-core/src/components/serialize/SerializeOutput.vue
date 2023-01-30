<template>
    <Display position="top-right" toggle :style="style" class="ctool-serialize-output" :class="disabledBorder ? ['ctool-serialize-output-disabled-border'] : []">
        <Display position="bottom-right" style="height: 100%" toggle>
            <Textarea
                v-if="['http_query_string','csv'].includes(current.type)"
                :model-value="result"
                :placeholder="getPlaceholder"
            />
            <Editor v-else disable-line-numbers :model-value="result" :lang="current.type" height="100%" :placeholder="getPlaceholder"/>
            <template #extra>
                <template v-if="current.type === 'csv'">
                    <Align>
                        <Bool size="small" v-model="current.option.csv.quoted" border :label="$t(`component_serialize_csv_quoted`)"/>
                        <Bool size="small" v-model="current.option.csv.header" border :label="$t(`component_serialize_csv_table_header`)"/>
                    </Align>
                </template>
                <template v-if="current.type === 'html_table'">
                    <Bool size="small" v-model="current.option.html_table.header" border :label="$t(`component_serialize_csv_table_header`)"/>
                </template>
                <template v-if="current.type === 'xml'">
                    <Input size="small" v-model="current.option.xml.attribute_prefix" :width="180" :label="$t(`component_serialize_xml_attribute_prefix`)"/>
                </template>
                <template v-if="current.type === 'text'">
                    <Align>
                        <Bool size="small" border v-model="current.option.text.is_add_quote" :label="$t('component_serialize_text_add_quote')"/>
                        <Input size="small" v-model="current.option.text.delimiter" :width="120" :label="$t('component_serialize_text_delimiter')"/>
                    </Align>
                </template>
            </template>
        </Display>
        <template #extra>
            <Align>
                <Select
                    :size="'small'"
                    v-model="current.type"
                    v-if="typeLists.length > 1"
                    :options="typeLists.map((item)=>{
                    return {
                        value:item,
                        label:getDisplayName(item)
                    }
                })"
                />
                <slot/>
            </Align>
        </template>
    </Display>
</template>

<script setup lang="ts">
import {SerializeOutput, createSerializeOutput} from "./index"
import {nextTick, PropType, StyleValue, watch} from "vue"
import {serializeOutputEncoderLists, SerializeOutputEncoderType} from "@/types"
import Serialize from "@/helper/serialize"
import formatter from "@/tools/code/formatter";
import {sizeConvert} from "@/components/util";
import {getDisplayName} from "@/helper/code";

const props = defineProps({
    modelValue: {
        type: Object as PropType<SerializeOutput>,
        default: () => createSerializeOutput()
    },
    height: {
        type: [String, Number],
        default: ""
    },
    placeholder: {
        type: String,
        default: () => {
            return $t("main_ui_output")
        }
    },
    disabledBorder: {
        type: Boolean,
        default: false
    },
    allow: {
        type: Array as PropType<SerializeOutputEncoderType[]>,
        default: () => serializeOutputEncoderLists.filter(item => !['text'].includes(item))
    },
    content: {
        type: Object as PropType<Serialize>,
        default: () => Serialize.empty()
    }
})
const emit = defineEmits<{ (e: 'update:modelValue', modelValue: SerializeOutput): void, (e: 'success'): void }>()

const current: SerializeOutput = $computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})
const typeLists = $computed(() => {
    return serializeOutputEncoderLists.filter((item) => props.allow.includes(item));
})

const getPlaceholder = $computed(() => {
    if (props.placeholder !== "") {
        return props.placeholder
    }
    return `${$t('main_ui_output')} ${getDisplayName(current.type)}`
})

const success = () => emit("success")

let result = $ref("")

watch(() => {
    return {
        data: props.content,
        type: current.type,
        option: current.option
    }
}, async ({data, type, option}) => {
    await nextTick()
    result = ""
    if (data.isError()) {
        result = data.error()
        return;
    }
    if (data.isEmpty()) {
        return;
    }
    try {
        let r: string = "";
        switch (type) {
            case "json":
                r = data.toJson()
                break
            case "http_query_string":
                r = data.toQueryString()
                break
            case "csv":
                r = data.toCsv(option.csv)
                break
            case "html_table":
                r = data.toTable(option.html_table)
                break
            case "xml":
                r = data.toXml(option.xml)
                break
            case "yaml":
                r = data.toYaml()
                break
            case "php_array":
                r = data.toPhpArray()
                break
            case "php_serialize":
                r = data.toPhpSerialize()
                break
            case "toml":
                r = data.toToml()
                break
            case "text":
                r = data.toText(option.text)
                break
            case "properties":
                r = data.toProperties()
                break
        }

        if (r !== "") {
            success()
            result = await formatter.simple(current.type, 'beautify', r)
        }
    } catch (e) {
        console.error(e)
        result = $error(e)
    }
}, {immediate: true, deep: true})

const style = $computed(() => {
    let css: StyleValue = {}
    if (props.height) {
        css.height = sizeConvert(props.height)
    }
    return css
})
</script>
<style>
.ctool-serialize-output-disabled-border .ctool-code-editor .cm-editor {
    border-width: 0px
}
</style>
