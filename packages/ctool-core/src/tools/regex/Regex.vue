<template>
    <div class="ctool-page-option" style="margin-bottom: 5px" v-row="`1-1`">
        <Display>
            <Textarea :height="80" v-model="action.current.input" :placeholder="$t('regex_expression')" />
            <template #extra>
                <Align>
                    <Dropdown
                        :size="'small'"
                        :options="getCommonExpression()"
                        :placeholder="$t('regex_common')"
                        @select="value => (action.current.input = value)"
                    />
                    <Button
                        :size="'small'"
                        :type="'primary'"
                        @click="showReference = !showReference"
                        :text="$t(`main_ui_reference`)"
                    />
                </Align>
            </template>
        </Display>
        <Display>
            <Textarea
                :disabled="action.current.is_delete"
                :height="80"
                v-model="action.current.replace"
                :placeholder="$t('regex_replace_content')"
            />
            <template #extra>
                <Bool border :size="'small'" v-model="action.current.is_delete" :label="$t('regex_delete')" />
            </template>
        </Display>
    </div>
    <HeightResize v-slot="{ height }" :append="['.ctool-page-option']" v-row="`1-1`">
        <Display>
            <Editor :height="height" v-model="action.current.content" :placeholder="$t('regex_input')" />
            <template #extra>
                <Align>
                    <Bool border :size="'small'" v-model="action.current.is_global" :label="$t('regex_global')" />
                    <Bool
                        border
                        :size="'small'"
                        v-model="action.current.is_ignore_case"
                        :label="$t('regex_ignore_case')"
                    />
                </Align>
            </template>
        </Display>
        <Editor :height="height" :model-value="output" :placeholder="$t('main_ui_output')" />
    </HeightResize>
    <ExtendPage v-model="showReference">
        <Reference />
    </ExtendPage>
</template>

<script lang="ts" setup>
import { initialize, useAction } from "@/store/action";
import { getCommonExpression } from "@/tools/regex/util";
import { watch } from "vue";
import Reference from "./Reference.vue";

const action = useAction(
    await initialize(
        {
            input: "[\\dheo]",
            content: new Date().getFullYear() + " hello WORLD 你好世界",
            replace: "",
            is_global: true,
            is_ignore_case: true,
            is_delete: false,
        },
        { paste: false },
    ),
);

let output = $ref("");
let showReference = $ref(false);
watch(
    () => action.current,
    current => {
        output = "";
        try {
            if (!current.input || !current.content) {
                return output;
            }
            const replace =
                !current.is_delete && current.replace === "" ? false : current.is_delete ? "" : current.replace;

            let reg = new RegExp(current.input, (current.is_ignore_case ? "i" : "") + (current.is_global ? "g" : ""));
            if (replace !== false) {
                output = current.content.replace(reg, replace);
            } else {
                let arr = current.content.match(reg);
                let string = "";
                if (arr) {
                    string += `${$t("regex_output_count", [arr.length])}`;
                    for (let i = 0; i < arr.length; i++) {
                        string += `\n${arr[i]}`;
                    }
                } else {
                    string = $t("regex_output_empty");
                }
                output = string;
            }
            action.save();
        } catch (e) {
            output = $error(e);
        }
    },
    { immediate: true, deep: true },
);
</script>
