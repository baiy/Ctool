<template>
    <div>
        <div>
            <CellGroup @on-click="open">
                <Cell :title="$t('main_common_tool')" name="setting"/>
                <Cell v-if="is_chromium || is_firefox" :title="$t('main_keyboard_setting')" name="shortcuts"/>
                <Cell :title="$t('main_display_mode')">
                    <Select v-model="display_mode" slot="extra" transfer>
                        <Option v-for="item in display_mode_list" :value="item" :key="item">{{ $t('main_display_mode_'+item)}}</Option>
                    </Select>
                </Cell>
                <Cell :title="$t('main_setting_language')">
                    <Select v-model="locale" slot="extra" transfer>
                        <Option v-for="item in locales" :value="item.code" :key="item.code">{{ item.name }}</Option>
                    </Select>
                </Cell>
            </CellGroup>
            <CellGroup>
                <Cell :title="$t('main_copy_results_to_clipboard')">
                    <i-switch v-model="auto_save_copy" slot="extra"/>
                </Cell>
                <Cell :title="$t('main_read_content_from_clipboard')">
                    <i-switch v-model="auto_read_copy" slot="extra"/>
                </Cell>
                <Cell :title="$t('main_read_clipboard_content_trim')">
                    <i-switch v-model="auto_read_copy_filter" slot="extra"/>
                </Cell>
            </CellGroup>
        </div>
        <Drawer :title="$t('main_common_tool_setting')" placement="left" v-model="commonShow" :width="100">
            <setting-common v-if="commonShow"></setting-common>
        </Drawer>
    </div>
</template>

<script>
import {isChromium, isFirefox, isUtools, openUrl} from '../../helper'
import theme from '../../tool/theme'
import {LOCALE_LISTS, setCurrentLocale} from '../../i18n'
import setting from '../../tool/setting'
import {dispatchI18nChange} from '../../tool/event'
import common from "./common"
export default {
    components: {
        "setting-common": common
    },
    data() {
        return {
            commonShow: false,
            auto_save_copy: true,
            auto_read_copy: true,
            display_mode: "light",
            auto_read_copy_filter: false,
            is_chromium: isChromium,
            is_utools: isUtools,
            is_firefox: isFirefox,
            display_mode_list: ["light","dark","auto"],
            locales: LOCALE_LISTS,
            locale: "",
        }
    },
    watch: {
        display_mode(value) {
            theme(value)
        },
        locale(value) {
            setCurrentLocale(value)
            dispatchI18nChange()
        }
    },
    created() {
        this.auto_save_copy = setting.autoSaveCopy()
        this.auto_read_copy = setting.autoReadCopy()
        this.auto_read_copy_filter = setting.autoReadCopyFilter()
        this.display_mode = setting.displayMode()
        this.locale = setting.locale()
    },
    beforeDestroy() {
        setting.autoSaveCopy(this.auto_save_copy)
        setting.autoReadCopy(this.auto_read_copy)
        setting.autoReadCopyFilter(this.auto_read_copy_filter)
        setting.displayMode(this.display_mode)
        setting.locale(this.locale)
    },
    methods: {
        open(name) {
            switch (name) {
                case 'shortcuts':
                    if (this.is_firefox) {
                        return this.$Notice.success({
                            title: this.$t('main_keyboard_firefox_1'),
                            render: h => {
                                return h('span', [
                                    this.$t('main_keyboard_firefox_2'),
                                    h('a', {
                                        attrs: {
                                            href: 'https://jingyan.baidu.com/article/3ea51489f1d0a713e61bbaff.html',
                                            target: '_blank'
                                        }
                                    }, this.$t('main_keyboard_firefox_3')),
                                ])
                            }
                        });
                    }
                    openUrl('chrome://extensions/shortcuts')
                    break
                case 'setting':
                    this.commonShow = true
                    break
            }
        }
    },
}
</script>
