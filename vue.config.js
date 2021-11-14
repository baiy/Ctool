const adapter = require('./src/tool/adapter');
const pages = {
    tool: {
        entry: 'src/tool.js',
        template: 'public/tool.html',
    }
}
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
        if (process.env.NODE_ENV === 'production'){
            // 独立打包js 防止js文件过大 影响相关平台审核
            config.optimization.splitChunks({
                cacheGroups: {
                    codemirror: {
                        test: /[\\/]node_modules[\\/]codemirror[\\/]/,
                        name: 'codemirror',
                        chunks: 'all',
                        priority: 100,
                        reuseExistingChunk:true,
                        enforce:true
                    },
                    prettier: {
                        test: /[\\/]node_modules[\\/](prettier|@prettier|prettier-plugin-sql|sql-formatter)[\\/]/,
                        name: 'prettier',
                        chunks: 'all',
                        priority: 99,
                        reuseExistingChunk:true,
                        enforce:true
                    },
                    prettierParserTypescript: {
                        test: /[\\/]node_modules[\\/]prettier[\\/]parser-typescript\.js/,
                        name: 'prettier-parser-typescript',
                        chunks: 'all',
                        priority: 100,
                        reuseExistingChunk:true,
                        enforce:true
                    },
                    nodeSqlQarser: {
                        test: /[\\/]node_modules[\\/](node-sql-parser)[\\/]/,
                        name: 'node-sql-qarser',
                        chunks: 'all',
                        priority: 100,
                        reuseExistingChunk:true,
                        enforce:true
                    },
                    uglify: {
                        test: /[\\/]src[\\/]views[\\/]tool[\\/]library[\\/]formatter[\\/]uglify\.js/,
                        name: 'uglify',
                        chunks: 'all',
                        priority: 100,
                        enforce:true
                    }
                }
            })
        }
    }
};

adapter.initialize()

module.exports = config;
