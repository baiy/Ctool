<template>
    <HeightResize v-slot="{ height }">
        <Diff
            v-model:original="action.current.original"
            v-model:modified="action.current.modified"
            :lang="action.current.option.lang"
            :height="`${height}px`"
        >
            <Select size="small" v-model="action.current.option.lang" :options="allLanguage" />
        </Diff>
    </HeightResize>
</template>
<script lang="ts" setup>
import { watch } from "vue";
import { initialize, useAction } from "@/store/action";
import { allLanguage } from "@/helper/code";
import Diff from "@/components/editor/Diff.vue";

type DataType = {
    original: string;
    modified: string;
    option: {
        lang: string;
    };
};
const action = useAction(
    await initialize<DataType>(
        {
            original: "",
            modified: "",
            option: {
                lang: "Text",
            },
        },
        { paste: false },
    ),
);

// 数据保存
watch(
    () => action.current,
    () => {
        if (action.current.original === "" || action.current.modified === "") {
            return;
        }
        action.save();
    },
    { deep: true },
);
</script>
<style></style>
