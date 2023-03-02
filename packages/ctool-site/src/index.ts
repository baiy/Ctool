import {createApp} from 'vue'
import '@/statics/style.css'
import App from './Index.vue'
import {initTheme, isToToolIndex} from './helper'
import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'

(() => {
    if (isToToolIndex()) {
        return window.location.href = "/tool.html"
    }
    initTheme()
    createApp(App).use(VueTippy, {directive: "tooltip"}).mount('#app')
})()
