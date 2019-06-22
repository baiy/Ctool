const config = {
    productionSourceMap: true,
    pages: {
        tool: {
            entry: 'src/tool.js',
            template: 'public/tool.html',
        },
        setting: {
            entry: 'src/setting.js',
            template: 'public/setting.html',
        }
    },
    chainWebpack: config => {
        config.plugin('define').tap(args => {
            args[0]['process.ctool'] = JSON.stringify({
                version: process.env.npm_package_version,
                updateTime: Date.parse((new Date()).toString())/1000,
            });
            return args
        })
    },
};
let fs = require('fs');
fs.readFile('./src/manifest.json', 'utf8', function (err, files) {
    let result = files.replace(/##version##/g, process.env.npm_package_version);
    fs.writeFile('./public/manifest.json', result, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});


module.exports = config;
