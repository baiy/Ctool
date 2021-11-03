import Vue from 'vue'
import ViewUI from 'view-design'
import './statics/theme.less'
import router from './tool.router'
import optionBlock from './components/optionBlock'
import {plugin as modelPlugin} from './tool/model'
import cache from './tool/cache'
import setting from './tool/setting'
import App from './tool.vue'
import {isUtools,setDisplayMode} from './helper'
import {setCurrentLocale,i18n} from "./i18n";

const run = () => {
    // 设置语言环境
    setCurrentLocale(setting.locale())
    // 设置显示模式
    setDisplayMode(setting.displayMode())

    Vue.config.productionTip = false

    Vue.use(ViewUI)
    Vue.use(modelPlugin)
    Vue.component('option-block', optionBlock);

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
    if (document.body.clientWidth > 900 || isUtools) {
        console.log('调整窗口大小')
        const page = document.getElementById('page')
        page.style.width = 'auto'
        page.style.height = 'auto'
        page.style.minHeight = '550px'
    }
    if (isUtools) {
        window.utools.onPluginReady(() => {
            // 重设高度
            window.utools.setExpendHeight(582)
            run()
        })
    } else {
        run()
    }
})()


