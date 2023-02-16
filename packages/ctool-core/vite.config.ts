import {resolve} from 'path'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {nodePolyfills} from 'vite-plugin-node-polyfills'
// @ts-ignore
import vitePluginAdapter from './src/helper/vitePluginAdapter'

export default defineConfig({
    base: "./",
    plugins: [
        nodePolyfills(),
        vue({reactivityTransform: true}),
        vitePluginAdapter()
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
    build: {
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
