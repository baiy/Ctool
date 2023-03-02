import {createApp} from 'vue'
import '@/statics/style.css'
import App from './Index.vue'
import {initTheme} from './helper'
import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'

initTheme()
createApp(App).use(VueTippy, {directive: "tooltip"}).mount('#app')
