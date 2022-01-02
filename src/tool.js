import Vue from 'vue'
import ViewUI from 'view-design'
import './statics/theme.less'
import router from './tool.router'
import optionBlock from './components/optionBlock'
import inputBlock from './components/inputBlock'
import {plugin as modelPlugin} from './tool/model'
import cache from './tool/cache'
import setting from './tool/setting'
import App from './tool.vue'
import {isUtools,isWeb} from './helper'
import theme from './tool/theme'
import {setCurrentLocale,i18n} from "./i18n";

const run = () => {
    // 设置语言环境
    setCurrentLocale(setting.locale())
    // 设置显示模式
    theme(setting.displayMode())

    Vue.config.productionTip = false

    Vue.use(ViewUI)
    Vue.use(modelPlugin)
    Vue.component('option-block', optionBlock);
    Vue.component('input-block', inputBlock);

    new Vue({
        i18n,
        router,
        render: h => h(App),
    }).$mount('#app')

    // 清理缓存数据
    setTimeout(() => {
        cache.clear()
    }, 500)
}

(function () {
    if (document.body.clientWidth > 900 || isUtools || isWeb) {
        const page = document.getElementById('page')
        page.style.width = 'auto'
        page.style.height = 'auto'
    }
    if (isUtools) {
        window.utools.onPluginReady(() => {
            run()
        })
    } else {
        run()
    }
})()


