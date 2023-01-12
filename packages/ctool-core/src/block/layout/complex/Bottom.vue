<template>
    <div class="ctool-bottom">
        <div class="ctool-bottom-left">
            <Github/>
        </div>
        <div class="ctool-bottom-middle">
            <Notice center/>
        </div>
        <Align class="ctool-bottom-right" :gap="'large'">
            <span style="display: inline-flex;" :class="historyExist ? `ctool-bottom-exist-history` : ''">
                <Icon :size="18" hover name="history" @click="openHistory = !openHistory" :tooltip="$t('tool_'+storeOperate.items.tool) + ' -' + $t('main_history')"/>
            </span>
            <Icon hover :size="18" name="setting" @click="event.dispatch('open_setting')" :tooltip="$t('main_ui_setting')"/>
            <Icon
                :size="18"
                v-if="platform.isChromium() || platform.isFirefox() || platform.isWeb()"
                hover
                name="full"
                :tooltip="$t('main_ui_open_full')"
                @click="openUrl()"
            />
            <Icon v-if="platform.isElectron()" :size="18" hover name="devtools" :tooltip="$t('main_ui_open_devtools')" @click="platform.runtime.call('toggleDevTools')"/>
        </Align>
    </div>
    <ExtendPage v-model="openHistory">
        <History/>
    </ExtendPage>
</template>

<script setup lang="ts">
import useOperate from "@/store/operate";
import History from "../../History.vue"
import platform from "@/helper/platform"
import Notice from "../../Notice.vue"
import {openUrl} from "@/helper/helper"
import getHistoryInstance from "@/helper/history";
import {onMounted, onUnmounted} from "vue";
import event from "@/event";
import Github from "../../Github.vue";

const storeOperate = useOperate()

let openHistory = $ref(false)
let historyExist = $ref(false);

const updateHistoryExist = () => {
    historyExist = getHistoryInstance(storeOperate.items.tool, storeOperate.items.feature).length() > 0
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
.ctool-bottom {
    height: 33px;
    box-sizing: border-box;
    padding: 0 10px 0 5px;
    display: grid;
    column-gap: 5px;
    grid-template-columns: auto minmax(0px, 1fr) auto;
    align-items: center;
    border-top: 1px var(--ctool-border-color) solid;
    background-color: var(--ctool-block-title-bg-color);
    overflow: hidden;
}

.ctool-bottom-exist-history {
    position: relative;
}
.ctool-bottom-middle{
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
.ctool-bottom-exist-history::after {
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
