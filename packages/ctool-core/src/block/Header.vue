<template>
    <div class="ctool-header">
        <Align>
            <Github />
            <span>/</span>
            <span>{{ $t(`main_category_${operate.items.category}`) }}</span>
            <span>/</span>
            <span>{{ $t(`tool_${operate.items.tool}`) }}</span>
        </Align>
        <div class="ctool-header-feature">
            <div
                v-for="feature in features"
                class="ctool-header-feature-item"
                :class="operate.items.feature === feature.name ? `ctool-header-feature-item-current` : ``"
                :key="`${operate.items.tool}-${feature.name}`"
                @click="selectFeature(feature)"
            >
                {{ $t(`tool_${operate.items.tool}_${feature.name}`) }}
            </div>
        </div>
        <Align>
            <Search/>
            <Icon :size="18" hover name="common" @click="openTools = !openTools" :tooltip="$t(`main_tools_lists`)"/>
        </Align>
    </div>
    <ExtendPage v-model="openTools">
        <Tools/>
    </ExtendPage>
</template>

<script setup lang="ts">
import useOperate from "@/store/operate";
import Tools from "./Tools.vue";
import {getTool, toolExists, FeatureInterface} from "@/config";
import Search from "./Search.vue";
import Github from "./Github.vue";

const operate = useOperate()
const features = $computed(() => {
    return toolExists(operate.items.tool) && !getTool(operate.items.tool).isSimple() ? getTool(operate.items.tool).features : []
})

const selectFeature = (feature: FeatureInterface) => {
    operate.redirectTool(operate.items.tool, feature.name, operate.items.category)
}

let openTools = $ref(false);
</script>

<style>
.ctool-header {
    font-size: 14px;
    padding: 0 10px;
    height: 33px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px var(--ctool-border-color);
    background-color: var(--ctool-block-title-bg-color);
    overflow: hidden;
}

.ctool-header-feature {
    display: inline-flex;
}

.ctool-header-feature-item {
    display: inline-flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    cursor: pointer;
}

.ctool-header-feature-item-current {
    color: var(--ctool-primary);
    border-bottom: 2px solid var(--ctool-primary);
}

.ctool-header-feature-item:hover {
    background-color: var(--primary-focus);
}
</style>
