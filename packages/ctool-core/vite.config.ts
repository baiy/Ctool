import {resolve} from 'path'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {nodePolyfills} from 'vite-plugin-node-polyfills'
import {VitePWA} from 'vite-plugin-pwa'
import HtmlConfig from "vite-plugin-html-config"
import {META_INFO as metas, LINK_INFO as links, ctoolVitePlugin, APP_INFO} from "./ctool";

export default defineConfig({
    base: "./",
    plugins: [
        nodePolyfills(),
        HtmlConfig({metas, links}),
        vue({reactivityTransform: true}),
        ctoolVitePlugin(),
        VitePWA({
            registerType: "prompt",
            manifest: {
                name: APP_INFO.name,
                short_name: APP_INFO.name,
                description: APP_INFO.shortDescription,
                start_url: "/?_source=pwa",
                background_color: '#ffffff',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: "./icon/icon_512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable",
                    },
                    {
                        src: "./icon/icon.svg",
                        sizes: "48x48 72x72 96x96 128x128 256x256 512x512",
                        type: "image/svg+xml",
                        purpose: "any maskable",
                    },
                ],
            },
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
        emptyOutDir: true,
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'index.html'),
                tool: resolve(__dirname, 'tool.html')
            }
        },
        reportCompressedSize: false
    },
    server: {
        proxy: {
            "/__proxy/api.jdoodle.com": {
                target: 'https://api.jdoodle.com',
                changeOrigin: true,
                rewrite: (path) => path.replace('/__proxy/api.jdoodle.com', '')
            }
        }
    }

})
