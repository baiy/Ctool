import {copyCoreDist, release, replaceFileContent, version, getAdditionData} from "ctool-adapter-base";
import {tools, ToolInterface, FeatureInterface, AllLocaleStructure} from "ctool-config";
import {CustomCmd, customCmds} from "./config";
import {join} from "path";
import {cpSync, mkdirSync, rmSync} from "fs";

const tempPath = join(__dirname, '../_temp')
rmSync(tempPath, {recursive: true, force: true});
mkdirSync(tempPath);

// 核心文件
copyCoreDist(tempPath)
// 平台文件
cpSync(join(__dirname, '../resources'), tempPath, {recursive: true})

const i18n: AllLocaleStructure = getAdditionData()['i18n']

const getToolTitle = (tool: ToolInterface) => {
    return i18n.detail.zh_CN[`tool_${tool.name}`]?.message || ""
}
const getToolFeatureTitle = (feature: FeatureInterface) => {
    return i18n.detail.zh_CN[`tool_${feature.tool.name}_${feature.name}`]?.message || ""
}

type UtoolsFeature = {
    code: string,
    explain: string,
    cmds: (string | CustomCmd)[]
}

let utoolsFeature: Record<string, any>[] = [{
    "code": "ctool",
    "explain": "程序开发常用工具",
    "cmds": ['ctool', '程序开发常用工具']
}];
tools.forEach(tool => {
    tool.features.forEach(feature => {
        const code: UtoolsFeature['code'] = `ctool-${tool.name}-${feature.name}`
        const explain: UtoolsFeature['explain'] = `${tool.isSimple() ? "" : getToolTitle(tool) + " - "}${getToolFeatureTitle(feature)}`
        const cmds: UtoolsFeature['cmds'] = []
        if (customCmds.has(feature)) {
            cmds.push(...(customCmds.get(feature) as CustomCmd[]).map((item => {
                item.label = explain
                return item
            })))
        }
        if (cmds.length > 0) {
            utoolsFeature.push({code, explain, cmds})
        }
    })
});

(async () => {
    // 写入版本号
    replaceFileContent(join(tempPath, 'plugin.json'), '##version##', version())
    replaceFileContent(join(tempPath, 'plugin.json'), '"##features##"', JSON.stringify(utoolsFeature))
    // 发布
    console.info(`utools: ${await release(tempPath, 'utools')}`)
    // 移除临时目录
    rmSync(tempPath, {recursive: true, force: true});
})()
