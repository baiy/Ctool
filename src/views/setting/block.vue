<template>
    <div>
        <div>
            <CellGroup @on-click="open">
                <Cell title="常用工具设置" name="setting"/>
                <Cell v-if="is_chrome" title="快捷键设置" name="shortcuts"/>
            </CellGroup>
            <CellGroup>
                <Cell title="自动复制结果到剪贴板">
                    <i-switch v-model="auto_save_copy" slot="extra"/>
                </Cell>
                <Cell title="自动读取剪贴板内容">
                    <i-switch v-model="auto_read_copy" slot="extra"/>
                </Cell>
                <Cell v-if="is_utools" title="页面开发者工具">
                    <i-switch v-model="is_dev_tools_opened" slot="extra" @on-change="toggleDevTools"/>
                </Cell>
            </CellGroup>
        </div>
        <Drawer title="设置" placement="left" v-model="settingShow" :width="90">
            <setting-block v-if="settingShow"></setting-block>
        </Drawer>
    </div>
</template>

<script>
import {isChrome, isUtools, openTab} from '../../helper'
import setting from '../../tool/setting'
import settingBlock from './setting'

export default {
    components: {
        "setting-block": settingBlock
    },
    data() {
        return {
            settingShow: false,
            auto_save_copy: true,
            is_dev_tools_opened: false,
            auto_read_copy: true,
            is_chrome: isChrome,
            is_utools: isUtools,
        }
    },
    created() {
        if (isUtools) {
            this.is_dev_tools_opened = window.ctool.isDevToolsOpened();
        }
        this.auto_save_copy = setting.autoSaveCopy()
        this.auto_read_copy = setting.autoReadCopy()
    },
    beforeDestroy() {
        setting.autoSaveCopy(this.auto_save_copy)
        setting.autoReadCopy(this.auto_read_copy)
    },
    methods: {
        open(name) {
            switch (name) {
                case 'shortcuts':
                    openTab('chrome://extensions/shortcuts')
                    break
                case 'setting':
                    this.settingShow = true
                    break
            }
        },
        toggleDevTools() {
            if (isUtools) {
                window.ctool.toggleDevTools()
            }
        }
    },
}
</script>