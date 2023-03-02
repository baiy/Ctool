import {Plugin, ResolvedConfig} from "vite";
import {join} from "path";
import {cpSync, readFileSync, writeFileSync} from "fs";
import {tools} from 'ctool-config'

const {i18n} = JSON.parse(readFileSync(join(__dirname, '../ctool-core/public/ctool.addition.json')).toString())
export const translation = (key: string) => {
    if (key in i18n.detail.en) {
        return i18n.detail.en[key]['message']
    }
    return key
}

const copyCore = (config: ResolvedConfig) => {
    const dist = join(config.root, config.build.outDir)
    const coreDist = join(__dirname, '../ctool-core/dist/')
    cpSync(coreDist, dist, {recursive: true})
}

const generateManifestFile = (config) => {
    writeFileSync(
        join(config.root, config.build.outDir, 'manifest.webmanifest'),
        readFileSync(join(config.root, 'manifest.webmanifest.json')).toString().replace(
            '"#shortcuts#"', JSON.stringify(manifestShortcuts())
        )
    )
}

const manifestShortcuts = () => {
    let lists: {
        name: string,
        short_name: string,
        description: string,
        url: string,
        icons: {
            src: string,
            sizes: string
        }[]
    }[] = [];
    tools.forEach(tool => {
        tool.features.forEach(feature => {
            const name = `${translation(`tool_${tool.name}`)}${tool.isSimple() ? `` : ` - ${translation(`tool_${tool.name}_${feature.name}`)}`}`
            lists.push({
                name,
                short_name: name,
                description: "",
                url: `/tool.html#${feature.getRouter()}`,
                icons: [{
                    src: "/icon/icon_180.png",
                    sizes: "180x180",
                }]
            })
        })
    })
    return lists
}

// 复制核心文件 插入内联js 生成
export default (): Plugin => {
    let config: ResolvedConfig
    return {
        name: 'ctool-export-core-file',
        apply: 'build',
        configResolved(_config) {
            config = _config
        },
        async generateBundle() {
            copyCore(config)
            generateManifestFile(config)
        },
        async closeBundle() {
            // 处理核心文件
            const dist = join(config.root, config.build.outDir);

            ['index.html', 'tool.html'].map(file => join(dist, file)).forEach(file => {
                writeFileSync(
                    file,
                    readFileSync(file).toString().replace(
                        '</head>',
                        `${readFileSync(join(__dirname, 'head.html')).toString()}</head>`
                    )
                )
            })
        }
    }
}
