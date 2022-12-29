<script setup lang="ts">
import useOperate from "@/store/operate"
import {getCategory, categoryExists, toolExists, tools} from "@/config";
import useSetting from "@/store/setting";
import {onMounted} from "vue";

const operate = useOperate()

// 获取跳转参数 优先级: 最近使用 / 分类最近 / 分类第一个 / 常用第一个 / 工具第一个
const init = () => {
    let redirect = {
        tool: operate.items.tool || "",
        category: operate.items.category || "",
        feature: operate.items.feature || ""
    }

    // 最近使用
    if (toolExists(redirect.tool)) {
        return redirect
    }

    // 分类最近 / 分类第一个
    if (categoryExists(redirect.category)) {
        redirect.tool = operate.getCategoryLastTool(redirect.category)
        if (!redirect.tool) {
            redirect.tool = getCategory(redirect.category).firstTool().name
        }
        if (toolExists(redirect.tool)) {
            return redirect
        }
    }

    // 常用第一个
    redirect.tool = useSetting().items.common.filter(item => toolExists(item))[0] || ""
    if (toolExists(redirect.tool)) {
        return redirect
    }

    redirect.tool = tools[0].name

    return redirect
}

onMounted(() => {
    const {tool, feature, category} = init()
    operate.redirectTool(tool, feature, category)
})
</script>
<template>
    <HeightResize />
</template>
