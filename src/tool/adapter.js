let path = require('path');
// 运行平台适配
let platform = process.env.hasOwnProperty('npm_config_adapter') ? process.env.npm_config_adapter : "";
platform = ["chrome", 'utools'].includes(platform) ? platform : "web"

const IS_CHROME = "chrome" === platform
const IS_UTOOLS = "utools" === platform
const IS_WEB = "web" === platform

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
        const toolConfig = require('../config')
        let pluginPath = path.join(__dirname, '../../public/plugin.json');
        fs.readFile(path.join(__dirname, "../adapter/utools/plugin.json"), 'utf8', function (err, files) {
            if (err) return console.log(err);

            let features = [
                {
                    "code": "ctool",
                    "explain": "程序开发常用工具",
                    "cmds": ['ctool', '程序开发常用工具']
                },
                ...toolConfig.tool.map((item) => {
                    let keyword = toolConfig['keyword'].hasOwnProperty(item.name) ? toolConfig['keyword'][item.name] : [];
                    return {
                        "code": "ctool-" + item.name,
                        "explain": item.title,
                        "cmds": Array.from(new Set([item.name, item.title, "ctool-" + item.name, ...keyword]))
                    }
                })
            ]
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