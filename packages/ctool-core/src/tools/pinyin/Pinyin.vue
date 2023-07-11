<template>
    <HeightResize v-slot="{ small, large }" :reduce="10" ignore :append="['.ctool-page-option']">
        <Align direction="vertical">
            <Textarea :height="small" :placeholder="$t(`main_ui_input`)" v-model="action.current.input" />
            <Card class="ctool-page-option">
                <Align horizontal="center">
                    <Radio
                        v-model="action.current.type"
                        :options="
                            typeLists.map(value => {
                                return { value, label: $t(`pinyin_${value}`) };
                            })
                        "
                    />
                    <Select v-model="action.current.delimiter" :options="delimiter" :width="120" />
                    <Bool border v-model="action.current.multiple_flag" :label="$t('pinyin_multiple_flag')" />
                    <Bool border v-model="action.current.replace_v" label="ü=>v" />
                    <Bool border v-model="action.current.upper" :label="$t('pinyin_upper')" />
                    <Bool
                        border
                        v-model="action.current.tone_is_number"
                        :label="$t('pinyin_tone_is_number')"
                        v-if="action.current.type === 'tone'"
                    />
                </Align>
            </Card>
            <Textarea :height="large" :placeholder="$t(`main_ui_output`)" v-model="output" />
        </Align>
    </HeightResize>
</template>
<script lang="ts" setup>
import { initialize, useAction } from "@/store/action";
import pinyin from "./util";
import { watch } from "vue";

const action = useAction(
    await initialize(
        {
            input: "",
            delimiter: "null",
            type: "normal",
            multiple_flag: false,
            tone_is_number: false,
            replace_v: false,
            upper: false,
        },
        { paste: false },
    ),
);

const typeLists = ["normal", "tone", "abbr"];
const delimiter = [
    { label: $t("pinyin_delimiter_null"), value: "null" },
    { label: $t("pinyin_delimiter_space"), value: "blank" },
    { label: $t("pinyin_delimiter_1"), value: "-" },
    { label: $t("pinyin_delimiter_2"), value: "_" },
    { label: $t("pinyin_delimiter_3"), value: "." },
];

const option = $computed(() => {
    if (action.current.type === "normal") {
        return {
            pattern: "pinyin",
            tone: "",
        };
    }
    if (action.current.type === "tone") {
        return {
            pattern: "pinyin",
            tone: action.current.tone_is_number ? "num" : "symbol",
        };
    }
    return {
        pattern: "first",
        tone: "",
    };
});

const output = $computed(() => {
    if (action.current.input.trim()) {
        try {
            const result = pinyin(
                action.current.input,
                action.current.delimiter === "null"
                    ? ""
                    : action.current.delimiter === "blank"
                    ? " "
                    : action.current.delimiter,
                { ...option, multiple_flag: action.current.multiple_flag, replace_v: action.current.replace_v },
            );
            return action.current.upper ? result.toUpperCase() : result;
        } catch (e) {
            return $error(e);
        }
    }
    return "";
});

watch(
    () => output,
    () => action.save(),
);
</script>
