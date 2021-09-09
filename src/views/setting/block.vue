<template>
    <div>
        <div>
            <CellGroup @on-click="open">
                <Cell title="常用工具设置" name="setting"/>
                <Cell v-if="is_chromium" title="快捷键设置" name="shortcuts"/>
                <Cell title="外观显示">
                    <Select v-model="display_mode" slot="extra" transfer>
                        <Option v-for="item in display_mode_list" :value="item.v" :key="item.v">{{ item.n }}</Option>
                    </Select>
                </Cell>
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
import {isChromium, isUtools, openUrl} from '../../helper'
import setting from '../../tool/setting'
import {setDisplayMode} from '../../helper'
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
            display_mode: "light",
            auto_read_copy_filter: false,
            is_chromium: isChromium,
            is_utools: isUtools,
            display_mode_list: [
                {n: "浅色", v: "light"},
                {n: "深色", v: "dark"},
                {n: "自动", v: "auto"},
            ]
        }
    },
    watch:{
        display_mode(value){
            setDisplayMode(value)
        }
    },
    created() {
        this.auto_save_copy = setting.autoSaveCopy()
        this.auto_read_copy = setting.autoReadCopy()
        this.auto_read_copy_filter = setting.autoReadCopyFilter()
        this.display_mode = setting.displayMode()
    },
    beforeDestroy() {
        setting.autoSaveCopy(this.auto_save_copy)
        setting.autoReadCopy(this.auto_read_copy)
        setting.autoReadCopyFilter(this.auto_read_copy_filter)
        setting.displayMode(this.display_mode)
    },
    methods: {
        open(name) {
            switch (name) {
                case 'shortcuts':
                    openUrl('chrome://extensions/shortcuts')
                    break
                case 'setting':
                    this.settingShow = true
                    break
            }
        }
    },
}
</script>
