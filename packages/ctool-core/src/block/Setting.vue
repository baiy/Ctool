<template>
    <Card :title="$t('main_ui_setting')" height="100%" padding="20px 10px 10px 30px">
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
            <template v-if="platform.isUtools()">
                <span>uTools</span>
                <div>
                    <Button :size="'small'" @click="openUtoolsKeyword = true" :text="`${$t(`main_ui_keyword`)}${$t(`main_ui_config`)}`" />
                </div>
            </template>
        </div>
    </Card>
    <ExtendPage v-model="openUtoolsKeyword" disable-replace>
        <UtoolsKeyword v-if="platform.isUtools()"/>
    </ExtendPage>
</template>

<script setup lang="ts">
import useSetting from "@/store/setting"
import {useClipboardPermission} from "@/helper/clipboard"
import {locales, themes} from "@/types"
import platform from "@/helper/platform"
import {getLocaleName} from "@/i18n"
import UtoolsKeyword from "./utools/Keyword.vue"

const storeSetting = useSetting()
let openUtoolsKeyword = $ref(false)

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
