import { localesReal, tools, ToolType, FeatureType } from "../index";
import { pinyin } from "pinyin-pro";
import { buildData, buildAddition } from "./fileSystem";
import { allLocales } from "./i18n";

type Item = { name: ToolType; feature: FeatureType; keyword: string[]; search: string[] };
export const buildKeywords = () => {
    let keywords: Item[] = [];
    tools.forEach(tool => {
        tool.features.forEach(feature => {
            const keywordItem: Item = {
                name: tool.name,
                feature: feature.name,
                keyword: [],
                search: [],
            };
            localesReal.forEach(code => {
                const locale = allLocales.detail[code];
                const items: string[] = [];

                items.push(
                    keywordItem.name,
                    keywordItem.feature,
                    locale[`tool_${keywordItem.name}`].message, // 工具名称
                    locale[`tool_${keywordItem.name}_${keywordItem.feature}`].message, // 功能名称
                    ...locale[`tool_${keywordItem.name}_${keywordItem.feature}_keywords`].message.split(","), // 功能关键字
                );
                keywordItem.keyword.push(...items);
                items.push(
                    ...locale[`tool_${keywordItem.name}_${keywordItem.feature}_keywords`].message
                        .replaceAll(" ", "")
                        .split(","), // 功能关键字(移除空格)
                );
                keywordItem.search.push(...items);

                // 获取拼音
                if (code === "zh_CN") {
                    items.forEach(item => {
                        if (/[\u4e00-\u9fa5]/.test(item)) {
                            keywordItem.search.push(
                                pinyin(item, { toneType: "none", type: "array", v: true }).join(""),
                            ); // 全拼
                            keywordItem.search.push(
                                pinyin(item, { pattern: "first", toneType: "none", type: "array", v: true }).join(""),
                            ); // 首字母
                        }
                    });
                }
            });

            // 去重
            keywordItem.keyword = [
                ...new Set(keywordItem.keyword.map(item => item.trim()).filter(item => item !== "")),
            ];
            keywordItem.search = [
                ...new Set(
                    keywordItem.search
                        .map(item => item.trim())
                        .filter(item => item !== "")
                        .map(item => item.toLowerCase()),
                ),
            ];

            keywords.push(keywordItem);
        });
    });

    // 工具关键字
    buildData.prepend(`import {ToolType, FeatureType} from "@/config"`);
    buildData.append(
        `export const toolKeywords:{ name: ToolType, feature: FeatureType, keyword: string[], search: string[] }[] = ${JSON.stringify(
            keywords,
            null,
            4,
        )}`,
        "工具关键字",
    );

    buildAddition.add("keywords", keywords);
};
