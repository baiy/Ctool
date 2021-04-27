let adapter = require('./src/tool/adapter');

const config = {
    productionSourceMap: false,
    publicPath:"./",
    pages: {
        tool: {
            entry: 'src/tool.js',
            template: 'public/tool.html',
        }
    },
    chainWebpack: config => {
        config.plugin('define').tap(args => {
            args[0]['process.ctool'] = JSON.stringify({
                version: process.env.npm_package_version,
                updateTime: Date.parse((new Date()).toString()) / 1000,
                platform: adapter.platform,
                isChrome: adapter.isChrome,
                isWeb: adapter.isWeb,
                isUtools: adapter.isUtools,
            });
            return args
        })
    },
};

adapter.initialize()

module.exports = config;
