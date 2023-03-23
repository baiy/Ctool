// 设置
import {defineStore} from '@/helper/pinia'
import {Locale, ThemeType, ThemeRawType} from "@/types"
import {commonTool, ToolType} from "@/config"
import {proxy} from "ctool-config"
import {onMounted, watch, onUnmounted, nextTick} from 'vue';
import {setCurrentLocale} from '@/i18n';
import event from "@/event";

interface Setting {
    // 常用工具
    common: ToolType[],
    // 语言
    locale: Locale,
    // 主题
    theme: ThemeType,
    // 自动读取剪贴板
    auto_read_copy: boolean,
    // 读取剪贴板内容过滤首尾不可见字符
    auto_read_copy_filter: boolean,
    // 自动复制结果到剪贴板
    auto_save_copy: boolean,
    // 布局
    layout: "complex" | "simple",
    // 代理是否启用
    proxy_enable: boolean,
    // 代理地址
    proxy_url: string,
    // 自动填充历史过期时间
    fill_history_expire: number,
    // 历史记录角标隐藏
    history_icon_badge_hidden: boolean,
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
    layout: "complex",
    proxy_enable: false,
    proxy_url: proxy.defaultProxyUrl,
    fill_history_expire: 3600,
    history_icon_badge_hidden: false,
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
        event.addListener('locale_change', async () => {
            await nextTick()
            // 语言变化重新计算窗口尺寸
            window.dispatchEvent(new Event('resize'));
        })
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

