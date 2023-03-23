<template>
    <Card :title="$t('main_ui_setting')" height="100%" padding="20px 10px 10px 30px">
        <template #extra>
            Ctool v{{ version }} {{ $t(`main_last_updated`) }}{{ lastUpdate }}
        </template>
        <div class="ctool-setting">
            <template v-if="platform.isChromium()">
                <span>{{ $t('main_keyboard_setting') }}</span>
                <Link href="chrome://extensions/shortcuts">chrome://extensions/shortcuts</Link>
            </template>
            <span>{{ $t('main_display_mode') }}</span>
            <div>
                <Select
                    :model-value="storeSetting.items.theme"
                    @change="(value)=>storeSetting.save('theme',value)"
                    :options="themes.map((item)=>{return {value:item,label:$t('main_display_mode_'+item)}})"
                />
            </div>
            <span>{{ $t('main_setting_language') }}</span>
            <div>
                <Select
                    :model-value="storeSetting.items.locale"
                    @change="(value)=>storeSetting.save('locale',value)"
                    :options="localeOptions"
                />
            </div>
            <span>{{ $t('main_setting_layout') }}</span>
            <div>
                <Select
                    :model-value="storeSetting.items.layout"
                    @change="(value)=>storeSetting.save('layout',value)"
                    :options="['complex','simple'].map((item)=>{return {value:item,label:$t('main_setting_layout_'+item)}})"
                />
            </div>
            <span style="grid-row-start: span 3">{{ $t('main_ui_clipboard') }}</span>
            <div>
                <Bool
                    :label="$t(`main_copy_results_to_clipboard`)"
                    :model-value="storeSetting.items.auto_save_copy"
                    @change="(value)=>storeSetting.save('auto_save_copy',value)"
                />
            </div>
            <div>
                <Align>
                    <Bool
                        :disabled="clipboardState!=='granted'"
                        :label="$t(`main_read_content_from_clipboard`)"
                        :model-value="storeSetting.items.auto_read_copy"
                        @change="(value)=>storeSetting.save('auto_read_copy',value)"
                    />
                    <Link
                        v-if="clipboardState==='prompt'"
                        style="font-size: .875rem"
                        type="primary"
                        href="/tool.html#/clipboard"
                    >
                        {{ $t('main_clipboard_get') }}
                    </Link>
                </Align>
            </div>
            <div>
                <Bool
                    :disabled="!storeSetting.items.auto_read_copy"
                    :label="$t(`main_read_clipboard_content_trim`)"
                    :model-value="storeSetting.items.auto_read_copy_filter"
                    @change="(value)=>storeSetting.save('auto_read_copy_filter',value)"
                />
            </div>
            <span>{{ $t('main_auto_fill') }}</span>
            <Align>
                <InputNumber :model-value="storeSetting.items.fill_history_expire" :width="120" @change="(value)=>storeSetting.save('fill_history_expire',value)"/>
                <span style="font-size: 12px">{{ $t('main_auto_fill_explain', [storeSetting.items.fill_history_expire]) }}</span>
            </Align>
            <span>{{ $t('main_common_tool') }}</span>
            <div>
                <Button :size="'small'" @click="openCommon = !openCommon" :text="`${$t(`main_ui_config`)}`"/>
            </div>
            <template v-if="platform.runtime.webSecurity()">
                <span>{{ $t('main_network_request_proxy') }}</span>
                <Align>
                    <Bool
                        :label="$t(`main_ui_enable`)"
                        :model-value="storeSetting.items.proxy_enable"
                        @change="(value)=>storeSetting.save('proxy_enable',value)"
                    />
                    <template v-if="storeSetting.items.proxy_enable">
                        <Input :model-value="storeSetting.items.proxy_url" :width="400" @change="(value)=>storeSetting.save('proxy_url',value)">
                            <template #append>
                                <Icon hover name="refresh" @click="storeSetting.save('proxy_url',proxy.defaultProxyUrl)" :tooltip="$t('main_ui_reset')"/>
                            </template>
                        </Input>
                        <Link type="primary" style="font-size: 12px" href="https://ctool.dev/privacy">{{ $t('main_privacy_policy') }}</Link>
                    </template>
                </Align>
            </template>
            <template v-if="platform.isUtools()">
                <span>uTools</span>
                <div>
                    <Button :size="'small'" @click="openUtoolsKeyword = !openUtoolsKeyword" :text="`${$t(`main_ui_keyword`)}${$t(`main_ui_config`)}`"/>
                </div>
            </template>
            <span>{{ $t('main_ui_other') }}</span>
            <div>
                <Bool
                    :label="$t(`main_history_icon_badge_hidden`)"
                    :model-value="storeSetting.items.history_icon_badge_hidden"
                    @change="(value)=>storeSetting.save('history_icon_badge_hidden',value)"
                />
            </div>
        </div>
    </Card>
    <ExtendPage v-model="openUtoolsKeyword" disable-replace>
        <UtoolsKeyword v-if="platform.isUtools()"/>
    </ExtendPage>
    <ExtendPage v-model="openCommon" disable-replace>
        <Common/>
    </ExtendPage>
</template>

<script setup lang="ts">
import useSetting from "@/store/setting"
import {useClipboardPermission} from "@/helper/clipboard"
import {locales, themes} from "@/types"
import platform from "@/helper/platform"
import {getLocaleName} from "@/i18n"
import UtoolsKeyword from "./utools/Keyword.vue"
import Common from "./Common.vue";
import {version, buildTimestamp} from "@/helper/util";
import {proxy} from "ctool-config"
import dayjs from "dayjs";
import Bool from "@/components/ui/Bool.vue";
import Align from "@/components/Align.vue";
import Input from "@/components/ui/Input.vue";
import Link from "@/components/ui/Link.vue";
import Button from "@/components/ui/Button.vue";
import InputNumber from "@/components/ui/InputNumber.vue";

const storeSetting = useSetting()
let openUtoolsKeyword = $ref(false)
let openCommon = $ref(false)

const lastUpdate = dayjs.unix(buildTimestamp).format('YYYY-MM-DD HH:mm:ss')

const localeOptions = locales.map((item) => {
    return {value: item, label: getLocaleName(item) || ""}
})

const {state: clipboardState} = useClipboardPermission()
</script>
<style>
.ctool-setting {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 15px 20px;
}

.ctool-setting > span {
    display: flex;
    align-items: center;
    justify-content: right;
}
</style>
