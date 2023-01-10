<template>
    <HeightResize v-row="`1-250px`" v-slot="{height}">
        <Editor :model-value="output" :height="height" :lang="lang"/>
        <Card :height="height" :title="getDisplayName(lang)" padding="5px 10px">
            <Align :direction="'vertical'">
                <div v-for="option in optionConfig">
                    <template v-if="option.type === 'boolean'">
                        <Bool v-model="options[option.name]" :label="option.description"/>
                    </template>
                    <template v-else>
                        <div style="font-size: 14px">{{ option.description }}</div>
                        <Select :center="false" width="100%" v-if="option.type === 'select'" v-model="options[option.name]" :options="option.value"/>
                        <Input v-else v-model="options[option.name]"/>
                    </template>
                </div>
            </Align>
        </Card>
    </HeightResize>
</template>

<script lang="ts" setup>
import {PropType, watch} from "vue"
import Serialize from "@/helper/serialize"
import {getDisplayName} from "@/helper/code";
import {transform, getDefaultOption, getOptionDefine} from "./index";

const props = defineProps({
    lang: {
        type: String,
        required: true
    },
    json: {
        type: Object as PropType<Serialize>,
        default: () => {
            return Serialize.empty()
        }

    }
})

const optionConfig = getOptionDefine(props.lang)
let options = $ref(getDefaultOption(props.lang))
let output = $ref("")

watch(() => {
    return {
        lang: props.lang,
        json: props.json,
        options
    }
}, async ({lang, json, options}) => {
    if (json.isError()) {
        output = json.error();
        return;
    }
    if (json.isEmpty()) {
        output = "";
        return;
    }
    output = await transform(lang, json.toJson(), options)
}, {immediate: true, deep: true})

</script>




