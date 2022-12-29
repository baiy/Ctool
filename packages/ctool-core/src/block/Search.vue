<template>
    <div style="display: inline-flex;">
        <Input size="small" :width="150" :placeholder="$t(`main_search_placeholder`)" v-model="input" @load="load">
            <template #suffix>
                <Icon name="search" :size="12"/>
            </template>
        </Input>
        <ul class="ctool-search-block" v-if="isInput" ref="container">
            <li v-for="item in items" @click="click(item.tool,item.feature)" :key="`${item.tool}-${item.feature}`">{{ item.label }}</li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import {toolKeywords} from "@/buildDataTemp";
import {getTool, FeatureInterface} from "@/config";
import useOperate from "@/store/operate";
import useSetting from "@/store/setting";

const setting = useSetting()
const operate = useOperate()
let container = $ref<HTMLElement | null>(null);
let input = $ref("")
let inputElement = $ref<HTMLInputElement | null>(null);
let isInput = $ref(false);

const load = (element: HTMLInputElement) => {
    inputElement = element
    element.addEventListener("focus", () => {
        isInput = true
    });
    document.addEventListener("click", (e: MouseEvent) => {
        if (
            element.contains(e.target as any)
            || container?.contains(e.target as any)
        ) {
            return;
        }
        isInput = false
    });
}

const click = (tool, feature) => {
    input = ""
    if (tool === "") {
        return;
    }
    operate.redirectTool(tool, feature)
    inputElement?.blur()
    isInput = false
}

const items = $computed(() => {
    let lists: FeatureInterface[]
    if (input === "") {
        lists = [
            ...(new Set(
                    [
                        ...operate.getRecently(),
                        ...setting.items.common.map(name => {
                            return getTool(name).firstFeature()
                        })
                    ]
                )
            )
        ].slice(0, 10)
    } else {
        lists = toolKeywords.filter((item) => item.search.join(",").includes(input.toLowerCase())).map(item => {
            return getTool(item.name).getFeature(item.feature)
        })
    }
    if (lists.length === 0) {
        return [{label: $t(`main_ui_null`), tool: "", feature: ""}]
    }
    return lists.map(feature => {
        const tool = feature.tool
        return {
            label: `${$t(`tool_${tool.name}`)}${tool.isSimple() ? `` : ` - ${$t(`tool_${tool.name}_${feature.name}`)}`}`,
            tool: tool.name,
            feature: feature.name
        }
    })
})
</script>

<style>
.ctool-search-block {
    z-index: 99;
    position: fixed;
    top: 28px;
    font-size: .875rem;
    width: 165px;
    max-height: 15rem;;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    border: var(--border-width) solid var(--dropdown-border-color);
    border-radius: var(--border-radius);
    background-color: var(--dropdown-background-color);
    box-shadow: var(--card-box-shadow);
    color: var(--dropdown-color);
    white-space: nowrap;
    font-style: normal;
    padding: 5px 0 0;
}

.ctool-search-block li {
    cursor: pointer;
    width: 100%;
    color: var(--dropdown-color);
    padding-left: 10px;
    line-height: 2rem;
    margin-bottom: 0;
}

.ctool-search-block li:hover {
    background-color: var(--dropdown-hover-background-color);
}
</style>
