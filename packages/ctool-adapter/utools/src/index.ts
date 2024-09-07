import {
    PlatformRuntime,
    StorageInterface,
    toolExists,
    getTool,
    FeatureInterface,
    tools,
    Initializer,
} from "ctool-config";
import storageUtools from "./storage";

type FeatureItem = { feature: FeatureInterface, cmds: string[] }

const $t = (key: string): string => {
    // @ts-ignore
    return window["$t"](key);
};

const setFeatures = (items: any) => {
    try {
        window.utools.setFeature(items);
    } catch (e) {

    }
};

export const runtime = new (class implements PlatformRuntime {
    name = "utools";

    is() {
        return navigator.userAgent.includes("uTools");
    }

    openUrl(url: string) {
        return window.utools.shellOpenExternal(url);
    }

    storage(): StorageInterface {
        return storageUtools;
    }

    getLocale() {
        return "zh_CN";
    }

    initialize(initializer: Initializer) {
        try {
            // utools 动态关键字初始化设置
            if (window.utools.getFeatures().length === 0) {
                this.resetFeatures();
            }
        } catch (e) {
        }

        window.utools.onPluginEnter(({ code, type, payload }) => {
            window.utools.showMainWindow();
            if (!code.includes("ctool-")) {
                return;
            }
            const [, _tool, _feature] = code.split("-");
            if (!toolExists(_tool)) {
                return;
            }

            const tool = getTool(_tool);
            if (!tool.existFeature(_feature)) {
                return;
            }
            const feature = tool.getFeature(_feature);

            const query: Record<string, string> = {};
            // 输入框数据写入临时存储
            if (["over", "regex"].includes(type) && payload !== "") {
                initializer.storage().setNoVersion("_temp_input_storage", payload, 10);
                //添加随机数 防止页面不刷新
                query["_t"] = `${Math.random()}`;
            }
            // 设置功能搜索关键字
            if (type === "text" && payload !== "") {
                query.keyword = payload;
            }
            initializer.push(feature.getRouter(), query);
        });
    }

    getFeatures() {
        const result = new Map<FeatureInterface, string[]>();
        tools.forEach(tool => {
            tool.features.forEach(feature => result.set(feature, []));
        });
        window.utools.getFeatures()
            .filter(item => item.code.includes("ctool-") && item.code.includes("-customize"))
            .forEach(item => {
                const [, _tool, _feature] = item.code.split("-");
                if (!toolExists(_tool)) {
                    return null;
                }

                const tool = getTool(_tool);
                if (!tool.existFeature(_feature)) {
                    return null;
                }
                const feature = tool.getFeature(_feature);
                result.set(feature, item.cmds as any);
            });

        return result;
    }

    resetFeatures() {
        let features: FeatureItem[] = [];
        tools.forEach(tool => {
            tool.features.forEach(feature => {
                features.push({
                    feature: feature,
                    cmds: [
                        ...(
                            new Set([
                                    tool.name,
                                    feature.name,
                                    tool.isSimple() ? `ctool-${tool.name}` : `ctool-${tool.name}-${feature.name}`,
                                    $t(`tool_${tool.name}`),
                                    $t(`tool_${tool.name}_${feature.name}`),
                                    ...$t(`tool_${tool.name}_${feature.name}_keywords`).split(","),
                                    `${tool.isSimple() ? "" : $t(`tool_${tool.name}`) + " - "}${$t(`tool_${tool.name}_${feature.name}`)}`,
                                ].map(item => item.trim().toLowerCase()).filter(item => item !== ""),
                            )
                        ),
                    ],
                });
            });
        });
        this.setFeatures(features);
    }

    setFeatures(features: FeatureItem[]) {
        // 默认添加
        setFeatures({
            "code": "Ctool",
            "explain": "ctool - 程序开发常用工具",
            "cmds": [
                "Ctool",
            ],
        });

        // 移除已有项目
        window.utools.getFeatures().forEach(item => {
            if (item.code.includes("ctool-") && item.code.includes("-customize")) {
                window.utools.removeFeature(item.code);
            }
        });

        // 添加项目
        features.forEach(({ feature, cmds }) => {
            if (cmds.length > 0) {
                setFeatures({
                    "code": `ctool-${feature.getKey()}-customize`,
                    "explain": `${feature.tool.isSimple() ? "" : $t(`tool_${feature.tool.name}`) + " - "}${$t(`tool_${feature.tool.name}_${feature.name}`)}`,
                    "cmds": cmds,
                });
            }
        });
    }
});
