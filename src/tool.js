import Vue from 'vue'
import ViewUI from 'view-design'
import './statics/theme.less'
import router from './tool.router'
import optionBlock from './components/optionBlock'
import {plugin as modelPlugin} from './tool/model'
import App from './tool.vue'
import {isUtools} from './helper'

(function () {
    if (document.body.clientWidth > 900 || isUtools) {
        console.log('调整窗口大小')
        const page = document.getElementById('page')
        page.style.width = 'auto'
        page.style.height = 'auto'
        page.style.minHeight = '550px'
    }
})()

Vue.config.productionTip = false

Vue.use(ViewUI)
Vue.use(modelPlugin)
Vue.component('option-block', optionBlock);

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
