import {createApp} from 'vue'
import '@/statics/style.css'
import App from './Index.vue'
import {initTheme, isToToolIndex} from './helper'

(() => {
    if (isToToolIndex()) {
        return window.location.href = "/tool.html"
    }
    initTheme()
    createApp(App).mount('#app')
})()
