let adapter = require('./src/tool/adapter');

let pages = {}
pages.tool = {
    entry: 'src/tool.js',
    template: 'public/tool.html',
};
const config = {
    productionSourceMap: false,
    publicPath: "./",
    pages: pages,
    chainWebpack: config => {
        config.plugin('define').tap(args => {
            args[0]['process.ctool'] = JSON.stringify({
                version: process.env.npm_package_version,
                updateTime: Date.parse((new Date()).toString()) / 1000,
                platform: adapter.platform,
                isChrome: adapter.isChrome,
                isFirefox: adapter.isFirefox,
                isEdge: adapter.isEdge,
                isChromium: adapter.isChromium,
                isWeb: adapter.isWeb,
                isUtools: adapter.isUtools,
            });
            return args
        })
    },
};

adapter.initialize()

module.exports = config;
