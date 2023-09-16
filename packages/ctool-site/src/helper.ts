import i18n from "./locale.json";
import { ref } from "vue";
import { i18n as coreI18n, keywords as allKeywords } from "../../ctool-core/public/ctool.addition.json";
import {
    Locale,
    ThemeType,
    toolExists,
    ToolType,
    FeatureInterface,
    getTool,
    commonTool,
    FeatureType,
} from "ctool-config";

const settingKey = "ctool.nv_setting";
const operateKey = "ctool.nv_operate";
const browserLocale = navigator.language;
const defaultLocale =
    browserLocale === "zh" || browserLocale.indexOf("zh-") === 0 || browserLocale.indexOf("zh_") === 0 ? "zh_CN" : "en";
const secondLocale = defaultLocale === "zh_CN" ? "en" : "zh_CN";

export const getSetting = (): { v: { items: { locale: Locale; theme: ThemeType } } } => {
    return JSON.parse(localStorage.getItem(settingKey) || `{"e":0,"v":{"items":{"locale":"_default","theme":"auto"}}}`);
};
let settingInstance: any = undefined;
export const useSetting = () => {
    const handle = () => {
        const setting = getSetting();
        const locale = ref(setting.v.items.locale);
        const theme = ref(setting.v.items.theme);
        const update = (key: "locale" | "theme") => {
            if (key === "locale") {
                locale.value = locale.value === secondLocale ? defaultLocale : secondLocale;
                document.getElementsByTagName("html")[0].dataset.locale = locale.value;
            }
            if (key === "theme") {
                let _theme = theme.value;
                if (theme.value === "auto") {
                    _theme =
                        window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
                            ? "dark"
                            : "light";
                }
                theme.value = _theme === "dark" ? "light" : "dark";
            }
            const localStorageSetting = getSetting();
            localStorageSetting.v.items.locale = locale.value;
            localStorageSetting.v.items.theme = theme.value;
            localStorage.setItem(settingKey, JSON.stringify(localStorageSetting));
            initTheme();
        };
        document.getElementsByTagName("html")[0].dataset.locale =
            locale.value === secondLocale ? defaultLocale : secondLocale;
        return { locale, theme, update };
    };
    if (settingInstance === undefined) {
        settingInstance = handle();
    }
    return settingInstance as ReturnType<typeof handle>;
};

export const initTheme = () => {
    let theme = useSetting().theme.value;
    if (theme === "auto") {
        theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    document.getElementsByTagName("html")[0].dataset.theme = theme;
};

export const isToToolIndex = () => {
    if (document.referrer === "app-info://platform/microsoft-store") {
        // 识别 Microsoft Store App
        return true;
    }
    return false;
};

export const translation = (key: string) => {
    let l = useSetting().locale.value === "_default" ? defaultLocale : useSetting().locale.value;
    if (key in i18n[l]) {
        return i18n[l][key];
    }
    if (key in coreI18n.detail[l]) {
        return coreI18n.detail[l][key]["message"];
    }
    return key;
};

// 版本号
export const version = document.querySelector('meta[name="ctool-version"]')?.getAttribute("content") || "dev";
// 构建时间
export const buildTimestamp = parseInt(
    document.querySelector('meta[name="ctool-build-timestamp"]')?.getAttribute("content") ||
        `${Date.parse(new Date().toString()) / 1000}`,
);

export const search = (input: string) => {
    let lists: FeatureInterface[] = [];
    if (input === "") {
        // 默认暂时
        const recently: string[] = JSON.parse(localStorage.getItem(operateKey) || "{}")?.v?.items?.recently || [];

        lists = [
            ...new Set([
                ...(recently
                    .filter(item => {
                        const [tool, feature] = item.split("-");
                        return toolExists(tool) && getTool(tool).existFeature(feature);
                    })
                    .map(item => {
                        const [tool, feature] = item.split("-");
                        return getTool(tool as ToolType).getFeature(feature as any);
                    }) || []),
                ...commonTool.map(name => {
                    return getTool(name).firstFeature();
                }),
            ]),
        ].slice(0, 12);
    } else {
        lists = allKeywords
            .filter(item => item.search.join(",").includes(input.toLowerCase()))
            .map(item => {
                return getTool(item.name as ToolType).getFeature(item.feature as FeatureType);
            })
            .slice(0, 20);
    }

    return lists.map(feature => {
        const tool = feature.tool;
        return {
            label: `${translation(`tool_${tool.name}`)}${
                tool.isSimple() ? `` : ` - ${translation(`tool_${tool.name}_${feature.name}`)}`
            }`,
            url: `/tool.html#${feature.getRouter()}`,
        };
    });
};
