import Vue from 'vue'
import Router from 'vue-router'
import { stat } from './helper'

Vue.use(Router)

// 路由配置
const routes = [
    {
        path: '/tool/base64',
        component: r => require(['./views/tool/base64.vue'], r)
    },
    {
        path: '/tool/code',
        component: r => require(['./views/tool/code.vue'], r)
    },
    {
        path: '/tool/decimalConvert',
        component: r => require(['./views/tool/decimalConvert.vue'], r)
    },
    {
        path: '/tool/diffs',
        component: r => require(['./views/tool/diffs.vue'], r)
    },
    {
        path: '/tool/encrypt',
        component: r => require(['./views/tool/encrypt.vue'], r)
    },
    {
        path: '/tool/hash',
        component: r => require(['./views/tool/hash.vue'], r)
    },
    {
        path: '/tool/ip',
        component: r => require(['./views/tool/ip.vue'], r)
    },
    {
        path: '/tool/serializeConversion',
        component: r => require(['./views/tool/serializeConversion.vue'], r)
    },
    {
        path: '/tool/pinyin',
        component: r => require(['./views/tool/pinyin.vue'], r)
    },
    {
        path: '/tool/qrCode',
        component: r => require(['./views/tool/qrCode.vue'], r)
    },
    {
        path: '/tool/randomString',
        component: r => require(['./views/tool/randomString.vue'], r)
    },
    {
        path: '/tool/regex',
        component: r => require(['./views/tool/regex.vue'], r)
    },
    {
        path: '/tool/timestamp',
        component: r => require(['./views/tool/timestamp.vue'], r)
    },
    {
        path: '/tool/unicode',
        component: r => require(['./views/tool/unicode.vue'], r)
    },
    {
        path: '/tool/url',
        component: r => require(['./views/tool/url.vue'], r)
    },
    {
        path: '/tool/crontab',
        component: r => require(['./views/tool/crontab.vue'], r)
    },
    {
        path: '/tool/websocket',
        component: r => require(['./views/tool/websocket.vue'], r)
    },
    {
        path: '/tool/unit',
        component: r => require(['./views/tool/unit.vue'], r)
    },
    {
        path: '/tool/time',
        component: r => require(['./views/tool/time.vue'], r)
    },
    {
        path: '/tool/json',
        component: r => require(['./views/tool/json.vue'], r)
    },
    {
        path: '/tool/uuid',
        component: r => require(['./views/tool/uuid.vue'], r)
    },
    {
        path: '/tool/jsonToObject',
        component: r => require(['./views/tool/jsonToObject.vue'], r)
    },
    {
        path: '/tool/ascii',
        component: r => require(['./views/tool/ascii.vue'], r)
    },
    {
        path: '/tool/variableConversion',
        component: r => require(['./views/tool/variableConversion.vue'], r)
    },
    {
        path: '/tool/jwt',
        component: r => require(['./views/tool/jwt.vue'], r)
    }
]

const router = new Router({ routes })

stat('index')

router.afterEach(to => {
    stat('tool', { tool: to.path })
})

export default router