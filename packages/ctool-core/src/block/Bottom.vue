<template>
    <div class="ctool-bottom">
        <div class="ctool-bottom-left">
            <Notice/>
        </div>
        <div class="ctool-bottom-right">
            <span class="ctool-bottom-right-item" @click="openHistory = !openHistory" :class="historyExist ? `ctool-bottom-right-item-exist-history` : ''">
                <Icon hover name="history" :tooltip="$t('tool_'+storeOperate.items.tool) + ' -' + $t('main_history')"/>
            </span>
            <span class="ctool-bottom-right-item" @click="openSetting = !openSetting">
                <Icon hover name="setting" :tooltip="$t('main_ui_setting')"/>
            </span>
            <span class="ctool-bottom-right-item" @click="openUrl('https://github.com/baiy/Ctool/issues')">
                <Icon hover name="question" :tooltip="$t('main_ui_issues')"/>
            </span>
            <span class="ctool-bottom-right-item" @click="()=>storeSetting.save('theme', storeTheme.theme.raw === `dark` ? `light` : `dark`)">
                <Icon
                    hover
                    :name="storeTheme.theme.raw === 'dark' ? 'sun' : 'moon'"
                    :tooltip="$t(`main_ui_toggle_${storeTheme.theme.raw === 'dark' ? 'dark' : 'light'}`)"
                />
            </span>
            <span v-if="platform.isChromium() || platform.isFirefox() || platform.isWeb()" class="ctool-bottom-right-item" @click="openUrl()">
                <Icon hover name="full" :tooltip="$t('main_ui_open_full')"/>
            </span>
            <span v-if="platform.isElectron()" class="ctool-bottom-right-item" @click="platform.runtime.call('toggleDevTools')">
                <Icon hover name="devtools" :tooltip="$t('main_ui_open_devtools')"/>
            </span>
        </div>
        <ExtendPage v-model="openHistory">
            <History/>
        </ExtendPage>
        <ExtendPage v-model="openSetting">
            <Setting/>
        </ExtendPage>
    </div>
</template>

<script setup lang="ts">
import {openUrl} from "@/helper/helper"
import platform from "@/helper/platform"
import Notice from "./Notice.vue"
import Setting from "./Setting.vue"
import History from "./History.vue"
import useSetting, {useTheme} from "@/store/setting";
import useOperate from "@/store/operate";
import event from "@/event";
import {onMounted, onUnmounted} from "vue";
import getHistoryInstance from "@/helper/history"

const storeSetting = useSetting()
const storeTheme = useTheme()
const storeOperate = useOperate()

let historyExist = $ref(false);
let openSetting = $ref(false)
let openHistory = $ref(false)

const updateHistoryExist = () => {
    historyExist = getHistoryInstance(storeOperate.items.tool, storeOperate.items.feature).length() > 0
}

onMounted(() => {
    event.addListener(['tool_change', 'history_change'], updateHistoryExist)
})
onUnmounted(() => {
    event.removeListener(['tool_change', 'history_change'], updateHistoryExist)
})
</script>

<style scoped>
.ctool-bottom {
    height: 33px;
    box-sizing: border-box;
    padding: 0 5px;
    display: grid;
    grid-template-columns: minmax(0px, 1fr) auto;
    border-top: 1px var(--ctool-border-color) solid;
    background-color: var(--ctool-block-title-bg-color);
    overflow: hidden;
}

.ctool-bottom-left {
    overflow: hidden;
    padding-left: 5px;
    padding-right: 50px;
}

.ctool-bottom-right {
    display: flex;
    align-items: center;
}

.ctool-bottom-right-item {
    padding: 0 8px;
    display: inline-flex;
    cursor: pointer;
    position: relative;
}

.ctool-bottom-right-item-exist-history::after {
    position: absolute;
    content: "";
    background-color: #f56c6c;
    border-radius: 50%;
    height: 7px;
    width: 7px;
    padding: 0;
    right: 1px;
    top: -3px;
}
</style>
