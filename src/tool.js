import Vue from 'vue'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import router from './tool.router'
import optionBlock from './components/optionBlock'
import model, {plugin as modelPlugin} from './tool/model'
import App from './tool.vue'
import {isUtools} from './helper'
import config from "./tool/config";

Vue.config.productionTip = false

Vue.use(ViewUI)
Vue.use(modelPlugin)
Vue.component('option-block', optionBlock);

(function () {
    if (isUtools) {
        let tool = window.utools.db.get("_current_tool_");
        if (tool && tool.data) {
            let cat = config.getToolDefaultCategory(tool.data);
            if (cat) {
                model.setCategoryHistory(cat)
                model.setToolHistory(cat, tool.data)
            }
        }
    }

    if (document.body.clientWidth > 900 || isUtools) {
        console.log('调整窗口大小')
        const page = document.getElementById('page')
        page.style.width = 'auto'
        page.style.padding = '0 50px'
        page.style.height = 'auto'
    }
})()
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
