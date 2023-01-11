// 设置
import {defineStore} from '@/helper/pinia'
import {Locale, ThemeType, ThemeRawType} from "@/types"
import {commonTool, ToolType} from "@/config"
import {onMounted, watch, onUnmounted} from 'vue';
import {setCurrentLocale} from '@/i18n';
import event from "@/event";

interface Setting {
    common: ToolType[],
    locale: Locale,
    theme: ThemeType,
    auto_read_copy: boolean,
    auto_read_copy_filter: boolean,
    auto_save_copy: boolean,
    layout: "complex" | "simple",
}

const getSystemTheme = (): ThemeRawType => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return "dark"
    }
    return "light"
}

const defaultValue: Setting = {
    auto_read_copy: false,
    auto_read_copy_filter: false,
    auto_save_copy: true,
    locale: "_default",
    theme: "auto",
    common: [...commonTool],
    layout: "complex"
}

const useSetting = defineStore('setting', () => {
    const items = $ref<Setting>(defaultValue)

    // 保存
    const save = <K extends keyof Setting>(key: K, value: Setting[K]) => {
        if (key === 'common' && (value as string[]).length < 1) {
            items['common'] = [...new Set(commonTool)]
            return;
        }
        items[key] = value
    }

    // 语言切换
    watch(() => items.locale, () => setCurrentLocale(items.locale))

    // 主题切换
    watch(() => items.theme, (theme) => {
        event.dispatch("theme_change", theme)
    })

    onMounted(() => {
        // 初始化语言
        setCurrentLocale(items.locale)
        // 监控系统主题变化
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            items.theme === 'auto' && event.dispatch('theme_change', 'system change')
        })
    })
    return {
        items, save
    }
})

export const useTheme = defineStore('theme', () => {
    let theme = $ref<{ raw: ThemeRawType, config: ThemeType }>({raw: 'light', config: 'auto'})
    const storeSetting = useSetting()

    const update = () => {
        theme.raw = storeSetting.items.theme === 'auto' ? getSystemTheme() : storeSetting.items.theme
        theme.config = storeSetting.items.theme
        document.getElementsByTagName('html')[0].dataset.theme = theme.raw
    }

    onMounted(() => {
        update()
        event.addListener('theme_change', update)
    })
    onUnmounted(() => event.removeListener('theme_change', update))

    return {theme}
}, false)

export default useSetting

