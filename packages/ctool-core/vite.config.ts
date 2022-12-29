import {resolve} from 'path'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import vitePluginAdapter from './src/helper/vitePluginAdapter'

export default defineConfig({
    base: "./",
    plugins: [vue({reactivityTransform: true}), vitePluginAdapter()],
    resolve: {
        alias: {
            // './runtimeConfig': './runtimeConfig.browser',
            "@": resolve(__dirname, "./src"),
        },
    },
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'index.html'),
                tool: resolve(__dirname, 'tool.html'),
                polyfill: resolve(__dirname, 'src/polyfill.ts'),
            }
        },
        reportCompressedSize: false
    }
})
