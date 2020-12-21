<template>
    <div>
        <CellGroup @on-click="open">
            <Cell title="常用工具设置" name="setting"/>
            <Cell title="快捷键设置" name="shortcuts"/>
        </CellGroup>
        <CellGroup>
            <Cell title="自动复制结果到剪贴板">
                <i-switch v-model="auto_save_copy" slot="extra"/>
            </Cell>
            <Cell title="自动读取剪贴板内容">
                <i-switch v-model="auto_read_copy" slot="extra"/>
            </Cell>
        </CellGroup>
    </div>
</template>

<script>
import { openTab } from '../../helper'
import setting from '../../tool/setting'

export default {
    data () {
        return {
            auto_save_copy: true,
            auto_read_copy: true,
        }
    },
    created () {
        this.auto_save_copy = setting.autoSaveCopy()
        this.auto_read_copy = setting.autoReadCopy()
    },
    beforeDestroy () {
        setting.autoSaveCopy(this.auto_save_copy)
        setting.autoReadCopy(this.auto_read_copy)
    },
    methods: {
        open (name) {
            console.log(name)
            switch (name) {
                case 'shortcuts':
                    openTab('chrome://extensions/shortcuts')
                    break
                case 'setting':
                    openTab('/setting.html')
                    break
            }
        },
    },
}
</script>