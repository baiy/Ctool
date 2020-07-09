import Vue from 'vue'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import App from './setting.vue'

Vue.config.productionTip = false;

Vue.use(ViewUI);

new Vue({
    render: h => h(App)
}).$mount('#app');
