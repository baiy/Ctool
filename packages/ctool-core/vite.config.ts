import {join, resolve} from 'path'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {nodePolyfills} from 'vite-plugin-node-polyfills'
import {readFileSync} from "fs";

export const ctoolVitePlugin = () => {
    return {
        name: 'ctool',
        config: () => {
            const version = JSON.parse(readFileSync(join(__dirname, '../../package.json')).toString())['version']
            const updateTime = `${Date.parse((new Date()).toString()) / 1000}`
            return {
                define: {
                    CTOOL_VERSION: JSON.stringify(version),
                    CTOOL_UPDATE_TIME: JSON.stringify(updateTime),
                }
            }
        }
    }
}

export default defineConfig({
    base: "./",
    plugins: [
        nodePolyfills(),
        vue({reactivityTransform: true}),
        ctoolVitePlugin()
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
        reportCompressedSize: false,
        chunkSizeWarningLimit: 5000
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
