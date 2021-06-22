const path = require('path');
const _ = require('lodash');
// 运行平台适配
let platform = process.env.hasOwnProperty('npm_config_adapter') ? process.env.npm_config_adapter : "";
platform = ["chrome", 'utools'].includes(platform) ? platform : "web"

const IS_CHROME = "chrome" === platform
const IS_UTOOLS = "utools" === platform
const IS_WEB = "web" === platform

const toolConfig = require('../config')
const tools = toolConfig.tool
const utoolsConfig = toolConfig.utools
const featureConfig = toolConfig.feature

const getToolFeatureTitle = (name, features = []) => {
    for (let i = 0; i < features.length; i++) {
        if (features[i]['name'] === name) {
            return features[i].title
        }
    }
    return name
}

const chromeConfigWrite = () => {
    let fs = require('fs');
    // 移除环境配置文件
    let manifestPath = path.join(__dirname, '../../public/manifest.json');
    fs.unlink(manifestPath, () => {
    });
    if (IS_CHROME) {
        fs.readFile(path.join(__dirname, "../adapter/chrome/manifest.json"), 'utf8', function (err, files) {
            if (err) return console.log(err);
            let result = files.replace(/##version##/g, process.env.npm_package_version);
            fs.writeFile(manifestPath, result, 'utf8', function (err) {
                if (err) return console.log(err);
            });
        });
    }
}

const utoolsConfigWrite = () => {
    let fs = require('fs');
    // 移除环境配置文件
    let fileArr = ['plugin.json', 'README.md']
    fileArr.forEach((file) => {
        let filePath = path.join(__dirname, '../../public/' + file);
        fs.unlink(filePath, () => {
        });
    })
    if (IS_UTOOLS) {
        let pluginPath = path.join(__dirname, '../../public/plugin.json');
        fs.readFile(path.join(__dirname, "../adapter/utools/plugin.json"), 'utf8', function (err, files) {
            if (err) return console.log(err);
            let utoolsToolFeature = {};
            for (let tool of tools) {
                // 初始化数据
                let code = "ctool-" + tool.name;
                let toolFeatures = featureConfig.hasOwnProperty(tool.name) ? featureConfig[tool.name] : []
                if (!utoolsToolFeature.hasOwnProperty(code)) {
                    utoolsToolFeature[code] = {
                        "code": code,
                        "explain": tool.title,
                        "cmds": []
                    }
                    if (toolFeatures.length > 0) {
                        for (let toolFeature of toolFeatures) {
                            let toolFeatureCode = code + '-' + toolFeature['name']
                            utoolsToolFeature[toolFeatureCode] = {
                                "code": toolFeatureCode,
                                "explain": tool.title + ' - ' + toolFeature['title'],
                                "cmds": []
                            }
                        }
                    }
                }

                // 关键字
                let keyword = utoolsConfig['keyword'].hasOwnProperty(tool.name) ? utoolsConfig['keyword'][tool.name] : []
                utoolsToolFeature[code].cmds.push(
                    ...Array.from(new Set([tool.name, tool.title, "ctool-" + tool.name, ...keyword]))
                )

                // cmds手动配置
                let cmds = utoolsConfig['cmds'].hasOwnProperty(tool.name) ? utoolsConfig['cmds'][tool.name] : []
                if (!cmds.length) {
                    continue;
                }

                for (let _cmd of cmds) {
                    let cmd = _.cloneDeep(_cmd);
                    if (!cmd.hasOwnProperty('feature')) {
                        cmd['label'] = tool.title
                        utoolsToolFeature[code].cmds.push(cmd)
                        continue;
                    }
                    let toolFeatureCode = code + '-' + cmd.feature
                    if (utoolsToolFeature.hasOwnProperty(toolFeatureCode)) {
                        cmd['label'] = tool.title + ' - ' + getToolFeatureTitle(cmd.feature, toolFeatures)
                        delete cmd.feature
                        utoolsToolFeature[toolFeatureCode].cmds.push(cmd)
                    }
                }

            }

            let features = [
                {
                    "code": "ctool",
                    "explain": "程序开发常用工具",
                    "cmds": ['ctool', '程序开发常用工具']
                },
                ...Object.values(utoolsToolFeature)
            ];

            let result = files
                .replace(/##version##/g, process.env.npm_package_version)
                .replace(/"##features##"/g, JSON.stringify(features));
            fs.writeFile(pluginPath, result, 'utf8', function (err) {
                if (err) return console.log(err);
            });
        });
        let readmePath = path.join(__dirname, '../../public/README.md');
        fs.copyFile(path.join(__dirname, "../../README.md"), readmePath, function (err) {
            if (err) return console.log(err);
        });
    }
}

module.exports = {
    platform: platform,
    isChrome: IS_CHROME,
    isWeb: IS_WEB,
    isUtools: IS_UTOOLS,
    initialize: function () {
        chromeConfigWrite();
        utoolsConfigWrite();
    }
}