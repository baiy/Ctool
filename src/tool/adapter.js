const path = require('path');
const _ = require('lodash');
const fs = require('fs');
// 运行平台适配
let platform = process.env.hasOwnProperty('npm_config_adapter') ? process.env.npm_config_adapter : "";
platform = ["chrome", 'utools', 'edge', 'firefox'].includes(platform) ? platform : "web"

const IS_CHROME = "chrome" === platform
const IS_EDGE = "edge" === platform
const IS_FIREFOX = "firefox" === platform
const IS_UTOOLS = "utools" === platform
const IS_CHROMIUM = ['chrome', 'edge'].includes(platform)
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

// 删除文件
const removeFile = (filePath) => {
    fs.existsSync(filePath) && fs.unlinkSync(filePath)
}

const chromeConfigWrite = {
    remove(){},
    write(){
        if (!IS_CHROME){
            return;
        }
        fs.writeFileSync(
            path.join(__dirname, '../../public/manifest.json'),
            fs.readFileSync(path.join(__dirname, "../adapter/chrome/manifest.json")).toString().replace(/##version##/g, process.env.npm_package_version)
        );
    }
}

const edgeConfigWrite = {
    remove(){},
    write(){
        if (!IS_EDGE){
            return;
        }
        fs.writeFileSync(
            path.join(__dirname, '../../public/manifest.json'),
            fs.readFileSync(path.join(__dirname, "../adapter/edge/manifest.json")).toString().replace(/##version##/g, process.env.npm_package_version)
        );
    }
}

const chromiumConfigWrite = {
    remove(){
        removeFile(path.join(__dirname, '../../public/manifest.json'));
        removeFile(path.join(__dirname, '../../public/background.js'));
    },
    write(){
        if (!IS_CHROMIUM){
            return;
        }
        fs.copyFileSync(
            path.join(__dirname, "../adapter/chromium/background.js"),
            path.join(__dirname, '../../public/background.js')
        );
    }
}

const firefoxConfigWrite ={
    remove(){
        removeFile(path.join(__dirname, '../../public/manifest.json'));
        removeFile(path.join(__dirname, '../../public/background.js'));
    },
    write(){
        if (!IS_FIREFOX){
            return;
        }
        fs.copyFileSync(
            path.join(__dirname, "../adapter/firefox/background.js"),
            path.join(__dirname, '../../public/background.js')
        );
        fs.writeFileSync(
            path.join(__dirname, '../../public/manifest.json'),
            fs.readFileSync(path.join(__dirname, "../adapter/firefox/manifest.json")).toString().replace(/##version##/g, process.env.npm_package_version)
        );
    }
}



const utoolsConfigWrite = {
    remove(){
        removeFile(path.join(__dirname, '../../public/plugin.json'));
    },
    write(){
        if (!IS_UTOOLS){
            return;
        }
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
            fs.writeFileSync(pluginPath, result);
        });
    }
}

module.exports = {
    platform: platform,
    isChrome: IS_CHROME,
    isChromium: IS_CHROMIUM,
    isFirefox: IS_FIREFOX,
    isEdge: IS_EDGE,
    isWeb: IS_WEB,
    isUtools: IS_UTOOLS,
    initialize: function () {
        // 移除配置文件
        chromiumConfigWrite.remove();
        chromeConfigWrite.remove();
        edgeConfigWrite.remove();
        firefoxConfigWrite.remove();
        utoolsConfigWrite.remove();
        // 添加配置文件
        chromiumConfigWrite.write();
        chromeConfigWrite.write();
        edgeConfigWrite.write();
        firefoxConfigWrite.write();
        utoolsConfigWrite.write();
    }
}
