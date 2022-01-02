<template>
    <div>
        <div class="ctool-bottom">
            <div class="ctool-bottom-right" style="width: 210px">
                <Tooltip class="ctool-bottom-tooltip" transfer :content="$t('main_tool_'+currentTool) + ' -' + $t('main_history')" placement="top">
                    <Badge v-if="historyLength>0" dot :offset="[6,10]">
                        <Icon type="md-time" :size="22" @click="historyShow= true"/>
                    </Badge>
                    <template v-else>
                        <Icon type="md-time" :size="22" @click="historyShow= true"/>
                    </template>
                </Tooltip>
                <Tooltip class="ctool-bottom-tooltip" transfer content="Github" placement="top">
                    <Icon type="logo-github" :size="22" @click="openUrl('https://github.com/baiy/Ctool')"/>
                </Tooltip>
                <Tooltip class="ctool-bottom-tooltip" transfer :content="$t('main_ui_setting')" placement="top">
                    <Icon type="md-settings" :size="22" @click="settingShow = true"/>
                </Tooltip>
                <Tooltip class="ctool-bottom-tooltip" transfer :content="$t('main_ui_issues')" placement="top">
                    <Icon type="md-help-circle" :size="22" @click="openUrl('https://github.com/baiy/Ctool/issues')"/>
                </Tooltip>
                <Tooltip class="ctool-bottom-tooltip" transfer :content="$t('main_ui_open_full')" placement="top">
                    <Icon type="md-expand" :size="22" @click="openUrl('_new')" v-if="!isUtools"/>
                </Tooltip>
            </div>
            <div class="ctool-bottom-block" style="margin-right: 210px">
                <notice-block/>
            </div>
        </div>
        <Drawer :title="$t('main_ui_setting')" v-model="settingShow" :width="400">
            <setting-block v-if="settingShow"></setting-block>
        </Drawer>
        <Drawer :title="$t('main_tool_'+currentTool)+' - '+$t('main_history')" v-model="historyShow" :width="100">
            <History v-if="historyShow" @close="historyShow = false"/>
        </Drawer>
    </div>
</template>
<script>
import Notice from './notice'
import History from './history'
import {isUtools, openUrl} from '../helper'
import settingBlock from "../views/setting/block"
import model from "../tool/model";
import historyFactory from "../tool/history";

export default {
    name: "bottom",
    components: {
        "notice-block": Notice,
        "setting-block": settingBlock,
        History
    },
    data() {
        return {
            isUtools,
            settingShow: false,
            historyShow: false,
            currentTool: model.getCurrentTool(),
            currentToolSetInterval: null,
        }
    },
    computed: {
        historyLength() {
            return historyFactory(this.currentTool).length()
        }
    },
    created() {
        this.currentToolSetInterval = setInterval(() => {
            this.currentTool = model.getCurrentTool()
        }, 2000);
    },
    methods: {
        openUrl(url) {
            openUrl(url === '_new' ? window.location.href : url)
        }
    },
    destroyed() {
        if (this.currentToolSetInterval !== null) {
            clearInterval(this.currentToolSetInterval);
            this.currentToolSetInterval = null
        }
    },
}
</script>

<style>
.ctool-bottom {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 33px;
    padding-top: 2px;
    overflow: hidden;
    border-top: 1px solid #dcdee2;
    background: #FFF;
}

.ctool-bottom-block {
    height: 30px;
    line-height: 30px;
    overflow: hidden;
}

.ctool-bottom-right {
    line-height: 30px;
    float: right;
    text-align: right;
}

.ctool-bottom-right .ivu-icon {
    margin-right: 15px;
    cursor: pointer;
}

.ctool-bottom-right .ivu-icon:hover {
    color: #1abc9c;
}
</style>
