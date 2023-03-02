import {resolve} from 'path'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {VitePWA} from 'vite-plugin-pwa'
import svgLoader from 'vite-svg-loader'
import ctoolPlugin from './vitePlugin'

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
