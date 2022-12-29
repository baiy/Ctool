<template>
    <div>
        <Align direction="vertical" class="ctool-json-object" v-if="lang !== 'Protobuf'" :bottom="'default'">
            <Input v-model="packageName" label="namespace/package" />
            <Input v-model="className" label="class/struct" />
        </Align>
        <HeightResize @resize="resize" :father-height="height" ignore :append="['.ctool-json-object']">
            <Editor :model-value="output" :placeholder="`${lang} Object ${$t('main_ui_output')}`" :lang="lang" :height="`${editorHeight}px`">
                <Bool v-if="lang==='Protobuf'" size="small" v-model="isInline" border :label="$t(`json_inline`)"/>
            </Editor>
        </HeightResize>
    </div>
</template>

<script lang="ts" setup>
import {PropType, watch} from "vue"
import {ToObjectType} from "../define"
import toObject from "./index"
import Serialize from "@/helper/serialize"

const props = defineProps({
    lang: {
        type: String as PropType<ToObjectType>,
        default: "java"
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
const emit = defineEmits<{ (e: 'success'): void }>()

let packageName = $ref('pag')
let className = $ref('RootName')
let isInline = $ref(true)
let output = $ref("")
watch(
    () => {
        return {
            land: props.lang,
            json: props.json,
            package_name: packageName,
            class_name: className,
            is_inline: isInline,
        }
    },
    ({land, json, package_name, class_name, is_inline}) => {
        if (json.isError()) {
            output = json.error();
            return;
        }
        if (json.isEmpty()) {
            output = "";
            return;
        }
        toObject(land, json.toJson(), {
            package_name,
            class_name,
            is_inline
        }).then((result) => {
            output = result
        }).catch((error) => {
            output = error
        })
    },
    {immediate: true, deep: true}
)

let editorHeight = $ref(100)
const resize = (height) => {
    editorHeight = height
}
</script>




