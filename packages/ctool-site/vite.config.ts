import {resolve, join} from 'path'
import {defineConfig, ResolvedConfig, Plugin} from 'vite'
import vue from '@vitejs/plugin-vue'
import {VitePWA} from 'vite-plugin-pwa'
import {cpSync, readFileSync, writeFileSync} from "fs";
import svgLoader from 'vite-svg-loader'

// 复制核心文件 插入内联js
const ctoolPlugin = (): Plugin => {
    let config: ResolvedConfig
    return {
        name: 'ctool-export-core-file',
        apply: 'build',
        configResolved(_config) {
            config = _config
        },
        async generateBundle() {
            const dist = join(config.root, config.build.outDir)
            const coreDist = join(__dirname, '../ctool-core/dist/')
            cpSync(coreDist, dist, {recursive: true})
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

export default defineConfig({
    base: "./",
    plugins: [
        ctoolPlugin(),
        vue(),
        svgLoader({
            defaultImport: "component"
        }),
        VitePWA({
            injectRegister: null,
            registerType: "prompt",
            manifest: false,
            workbox: {
                globPatterns: ["**\/*.{js,css,html,png,jpg,ico,svg}"],
                cleanupOutdatedCaches: true,
                maximumFileSizeToCacheInBytes: 10485760
            },
        })
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
    build: {
        assetsDir: "_assets",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'index.html'),
            }
        },
        reportCompressedSize: false
    }
})
