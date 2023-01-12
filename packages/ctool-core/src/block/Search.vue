<template>
    <div style="display: inline-flex;">
        <Input
            size="small"
            :width="150"
            :placeholder="$t(`main_search_placeholder`)"
            v-model="input"
            @load="load"
            @keyup.enter="keyupEnter"
            @keyup.up="keyupUp"
            @keyup.down="keyupDown"
            @keyup.esc="close"
        >
            <template #suffix>
                <Icon name="search" :size="12"/>
            </template>
        </Input>
        <ul class="ctool-search-block" v-if="isInput" ref="container">
            <li
                v-for="(item,index) in items"
                :class="index === selectIndex ? `ctool-search-active` : ''"
                @click="select(index)"
                :key="`${item.tool}-${item.feature}`"
                @mouseover="selectIndex = index"
            >{{ item.label }}
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import {toolKeywords} from "@/buildDataTemp";
import {getTool, FeatureInterface} from "@/config";
import useOperate from "@/store/operate";
import useSetting from "@/store/setting";
import {watch} from "vue";

const setting = useSetting()
const operate = useOperate()
let container = $ref<HTMLElement | null>(null);
let input = $ref("")
let inputElement = $ref<HTMLInputElement | null>(null);
let isInput = $ref(false);
let selectIndex = $ref(0)

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
        ]
    } else {
        lists = toolKeywords.filter((item) => item.search.join(",").includes(input.toLowerCase())).map(item => {
            return getTool(item.name).getFeature(item.feature)
        })
    }
    if (lists.length === 0) {
        return [{label: $t(`main_ui_null`), tool: "", feature: ""}]
    }
    return lists.slice(0, 15).map(feature => {
        const tool = feature.tool
        return {
            label: `${$t(`tool_${tool.name}`)}${tool.isSimple() ? `` : ` - ${$t(`tool_${tool.name}_${feature.name}`)}`}`,
            tool: tool.name,
            feature: feature.name
        }
    })
})

const open = () => {
    isInput = true
    selectIndex = 0
}

const close = () => {
    input = ""
    isInput = false
    selectIndex = 0
}

const load = (element: HTMLInputElement) => {
    inputElement = element
    element.addEventListener("focus", () => open());
    document.addEventListener("click", (e: MouseEvent) => {
        if (
            element.contains(e.target as any)
            || container?.contains(e.target as any)
        ) {
            return;
        }
        close()
    });
}

const select = (index: number) => {
    if (items.length === 0 || items.length - 1 < index) {
        return;
    }
    const {tool, feature} = items[index]
    const keyword = input
    if (tool !== "") {
        operate.redirectTool(tool, feature, '', '', keyword)
    }
    inputElement?.blur();
    close();
}

const keyupEnter = () => {
    select(selectIndex)
}
const keyupUp = () => {
    if (items.length === 0) {
        return;
    }
    selectIndex = selectIndex === 0 ? items.length - 1 : selectIndex - 1
}
const keyupDown = () => {
    if (items.length === 0) {
        return;
    }
    selectIndex = selectIndex === items.length - 1 ? 0 : selectIndex + 1
}

watch(() => input, () => selectIndex = 0, {immediate: true})
</script>

<style>
.ctool-search-block {
    z-index: 99;
    position: fixed;
    top: 28px;
    font-size: .875rem;
    width: 165px;
    display: flex;
    flex-direction: column;
    border: var(--border-width) solid var(--dropdown-border-color);
    border-radius: var(--border-radius);
    background-color: var(--dropdown-background-color);
    box-shadow: var(--card-box-shadow);
    color: var(--dropdown-color);
    white-space: nowrap;
    font-style: normal;
    margin-bottom: 0px;
    padding: 5px 0 0;
}

.ctool-search-block li {
    cursor: pointer;
    list-style: none;
    width: 100%;
    color: var(--dropdown-color);
    padding-left: 10px;
    line-height: 1.9rem;
    margin-bottom: 0;
}

.ctool-search-block li.ctool-search-active {
    background-color: var(--dropdown-hover-background-color);
}
</style>
