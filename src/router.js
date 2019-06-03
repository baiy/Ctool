import Vue from 'vue'
import Router from 'vue-router'
import {trim} from "./helper";

// 路由配置
const routes = [
    // {path: '/', name: 'home', component: () => import('./views/index.vue')},
];

// 路由自动加载
const routeComponent = require.context(
    './views',
    true,
    /\.vue$/
);

routeComponent.keys().forEach(fileName => {
    // 过滤组件
    if (fileName.indexOf('components/') !== -1 || fileName === "index") {
        return;
    }
    const path = '/' + trim(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'), '/', 'left');
    routes.push({
        path: path,
        name: path,
        component: routeComponent(fileName).default
    })
});

Vue.use(Router);

const router = new Router({routes});

export default router