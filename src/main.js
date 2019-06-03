import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import router from './router'
import optionBlock from './components/optionBlock'
import codeHighlight from './components/codeHighlight'
import {plugin as modelPlugin} from './tool/model'
import App from './App.vue'

Vue.config.productionTip = false;

Vue.use(iView);
Vue.use(modelPlugin);
Vue.component('option-block',optionBlock);
Vue.component('code-highlight',codeHighlight);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
