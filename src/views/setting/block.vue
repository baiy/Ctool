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
                <Cell title="读取剪贴板内容过滤首尾不可见字符">
                    <i-switch v-model="auto_read_copy_filter" slot="extra"/>
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
            auto_read_copy: true,
            auto_read_copy_filter: false,
            is_chrome: isChrome,
            is_utools: isUtools,
        }
    },
    created() {
        this.auto_save_copy = setting.autoSaveCopy()
        this.auto_read_copy = setting.autoReadCopy()
        this.auto_read_copy_filter = setting.autoReadCopyFilter()
    },
    beforeDestroy() {
        setting.autoSaveCopy(this.auto_save_copy)
        setting.autoReadCopy(this.auto_read_copy)
        setting.autoReadCopyFilter(this.auto_read_copy_filter)
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
        }
    },
}
</script>