<template>
    <div class="ctool-bottom">
        <span style="font-size: 13px;font-weight: bold;cursor: pointer;" @click="openTools = !openTools">{{ $t(`main_category_common`) }}:</span>
        <div class="ctool-bottom-tools">
            <div
                v-for="tool in tools"
                class="ctool-bottom-tools-item"
                :class="storeOperate.items.tool === tool.name ? `ctool-bottom-tools-item-current` : ``"
                @click="redirectTool(tool.name)"
            >
                {{ $t(`tool_${tool.name}`) }}
            </div>
        </div>
    </div>
    <ExtendPage v-model="openTools">
        <Tools/>
    </ExtendPage>
</template>

<script setup lang="ts">
import useSetting from "@/store/setting";
import Tools from "../../Tools.vue";
import {getTool} from "@/config";
import useOperate from "@/store/operate";

const storeSetting = useSetting()
const storeOperate = useOperate()
let openTools = $ref(false);

const tools = $computed(() => {
    return storeSetting.items.common.map(name => {
        return getTool(name)
    })
})

const redirectTool = (tool: string) => storeOperate.redirectTool(tool)
</script>

<style scoped>
.ctool-bottom {
    height: 33px;
    box-sizing: border-box;
    padding: 0 10px 0 5px;
    display: grid;
    column-gap: 5px;
    grid-template-columns: auto minmax(0px, 1fr);
    align-items: center;
    border-top: 1px var(--ctool-border-color) solid;
    background-color: var(--ctool-block-title-bg-color);
    overflow: hidden;
}

.ctool-bottom-tools {
    height: 33px;
}

.ctool-bottom-tools-item {
    line-height: 33px;
    height: 33px;
    font-size: 13px;
    display: inline-block;
    padding: 0 5px;
    cursor: pointer;
    border-left: 1px var(--ctool-border-color) solid;
    user-select: none;
}

.ctool-bottom-tools-item:first-child {
    border-left: none;
}
.ctool-bottom-tools-item-current{
    color: var(--ctool-primary);
}
.ctool-bottom-tools-item:hover {
    color: var(--ctool-primary);
}
</style>
