<template>
    <div class="ctool-header">
        <Align>
            <Github/>
            <span>{{ $t(`tool_${storeOperate.items.tool}`) }}</span>
        </Align>
        <div class="ctool-header-middle" :class="features.length > 1 ? `ctool-header-middle-center` : ''">
            <template v-if="features.length < 1">
                <Notice center/>
            </template>
            <template v-else>
                <div
                    v-for="feature in features"
                    class="ctool-header-feature-item"
                    :class="storeOperate.items.feature === feature.name ? `ctool-header-feature-item-current` : ``"
                    :key="`${storeOperate.items.tool}-${feature.name}`"
                    @click="selectFeature(feature)"
                >
                    {{ $t(`tool_${storeOperate.items.tool}_${feature.name}`) }}
                </div>
            </template>
        </div>
        <Align :gap="'large'">
            <Search/>
            <Icon hover @click="openTools = !openTools" name="common" :tooltip="$t(`main_tools_lists`)"/>
            <Icon hover name="clear" @click="event.dispatch('content_clear')" :tooltip="$t('main_content_clear')"/>
            <span style="display: inline-flex;" :class="!storeSetting.items.history_icon_badge_hidden && historyExist ? `ctool-header-exist-history` : ''">
                <Icon hover name="history" @click="openHistory = !openHistory" :tooltip="$t('tool_'+storeOperate.items.tool) + ' -' + $t('main_history')"/>
            </span>
            <Icon hover name="setting" @click="event.dispatch('open_setting')" :tooltip="$t('main_ui_setting')"/>
            <Icon v-if="platform.isChromium() || platform.isFirefox() || platform.isWeb()" hover name="full" :tooltip="$t('main_ui_open_full')"  @click="openUrl()"/>
            <Icon v-if="platform.isDesktop()" hover name="devtools" :tooltip="$t('main_ui_open_devtools')" @click="platform.runtime.call('toggleDevTools')"/>
        </Align>
    </div>
    <ExtendPage v-model="openHistory">
        <History/>
    </ExtendPage>
    <ExtendPage v-model="openTools">
        <Tools/>
    </ExtendPage>
</template>

<script setup lang="ts">
import useOperate from "@/store/operate";
import useSetting from "@/store/setting";
import {openUrl} from "@/helper/helper"
import {getTool, toolExists, FeatureInterface} from "@/config";
import Search from "../../Search.vue";
import Github from "../../Github.vue";
import getHistoryInstance from "@/helper/history";
import {onMounted, onUnmounted} from "vue";
import event from "@/event";
import History from "../../History.vue"
import platform from "@/helper/platform"
import Notice from "../../Notice.vue"
import Tools from "../../Tools.vue";

const storeOperate = useOperate()
const storeSetting = useSetting()
let historyExist = $ref(false);
let openHistory = $ref(false)
let openTools = $ref(false);

const features = $computed(() => {
    return toolExists(storeOperate.items.tool) && !getTool(storeOperate.items.tool).isSimple() ? getTool(storeOperate.items.tool).features : []
})

const updateHistoryExist = () => {
    historyExist = getHistoryInstance(storeOperate.items.tool, storeOperate.items.feature).length() > 0
}

const selectFeature = (feature: FeatureInterface) => {
    storeOperate.redirectTool(storeOperate.items.tool, feature.name, storeOperate.items.category)
}
onMounted(() => {
    updateHistoryExist()
    event.addListener(['tool_change', 'history_change'], updateHistoryExist)
})
onUnmounted(() => {
    event.removeListener(['tool_change', 'history_change'], updateHistoryExist)
})
</script>

<style scoped>
.ctool-header {
    font-size: 14px;
    padding: 0 10px;
    height: 33px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: auto minmax(0px, 1fr) auto;
    border-bottom: solid 1px var(--ctool-border-color);
    background-color: var(--ctool-block-title-bg-color);
    overflow: hidden;
}

.ctool-header-middle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
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

.ctool-header-exist-history {
    position: relative;
}

.ctool-header-exist-history::after {
    position: absolute;
    content: "";
    background-color: #f56c6c;
    border-radius: 50%;
    height: 7px;
    width: 7px;
    padding: 0;
    right: -4px;
    top: -4px;
}
</style>
