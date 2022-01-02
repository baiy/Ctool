<template>
    <div class="ctool-notice-block">
        <ul class="ctool-notice-ul" :class="{'ctool-notice-animate-up': animateUp}">
            <li v-for="(item, index) in listData" :key="index">
                <Icon v-if="item.icon.length > 0" :type="item.icon"/>
                <span v-html="item.text" @click="open(item)"></span>
            </li>
        </ul>
    </div>
</template>
<script>

import {env, openUrl} from "../helper";
import instance from '../tool/instance'
import cache from "../tool/cache";
import user from "../tool/user";
import axios from "axios";
import _ from "lodash";
import {dispatchWindowResize} from '../tool/event'
import {getCurrentLocale} from "../i18n/index";

const CACHE_NAME = 'notice_item';
const CACHE_EXPIRY = 3600 * 24;
const NOTICE_TYPE = ['info', 'ad', 'hidden'];
const NOTICE_URL_TYPE = ['tool', 'web'];

const handleNoticeItems = ({code, data, info}) => {
    if (code !== 0) {
        throw new Error(info)
    }

    let items = [];
    for (let item of data) {
        if (
            !('type' in item)
            || !('text' in item)
            || !('url' in item)
            || !('type' in item.url)
            || !('value' in item.url)
            || !NOTICE_TYPE.includes(item.type)
            || !NOTICE_URL_TYPE.includes(item.url.type)
            || item.text.trim().length < 1
        ) {
            continue;
        }
        items.push({
            type: item.type,
            icon: 'icon' in item ? item.icon : "",
            text: item.text.trim(),
            url: {
                type: item.url.type,
                value: item.url.value,
            },
        })
    }
    return items;
}

const logError = (e) => {
    console.log(e)
}

export default {
    name: "notice",
    data() {
        return {
            animateUp: false,
            // {icon,text,url:{type,value}},
            listData: [],
            timer: null
        }
    },
    created() {
        // 初始化数据
        this.load();
    },
    methods: {
        load() {
            try {
                // 加载缓存
                let items = cache.get(CACHE_NAME)
                if (items !== null) {
                    return this.init(items)
                }
                try {
                    // 远程加载
                    axios({
                        url: 'https://www.baiy.org/chrome_tool/notice/',
                        responseType: 'json',
                        params: {
                            i: getCurrentLocale(),
                            v: env('version'),
                            p: env('platform'),
                            u: user.uid(),
                            r: Math.random()
                        }
                    }).then(({data}) => {
                        let notices = handleNoticeItems(data);
                        if (notices.length > 0) {
                            cache.set(CACHE_NAME, notices, CACHE_EXPIRY)
                            this.init(notices);
                        }
                    }).catch((error) => {
                        logError(error)
                    });
                } catch (e) {
                    logError(e)
                }
            } catch (e) {
                logError(e)
            }
        },
        init(notices) {
            this.listData = _.cloneDeep(notices.filter((item) => {
                return item.type !== "hidden"
            }))
            if (this.listData.length > 1) {
                this.timer = setInterval(this.scrollAnimate, 6000);
            }
            this.$nextTick(()=>{
                dispatchWindowResize()
            })
        },
        scrollAnimate() {
            this.animateUp = true
            setTimeout(() => {
                this.listData.push(this.listData[0])
                this.listData.shift()
                this.animateUp = false
            }, 500)
        },
        open(item) {
            switch (item.url.type) {
                case "tool":
                    instance.enter(item.url.value)
                    break;
                case "web":
                    openUrl(item.url.value)
                    break;
            }
        }
    },
    destroyed() {
        if (this.timer !== null) {
            clearInterval(this.timer)
        }
    }
};
</script>
<style scoped>
.ctool-notice-block {
    padding-left: 20px;
    height: 28px;
    border-radius: 20px;
    margin: 0 auto;
    overflow: hidden;
}

.ctool-notice-block .ctool-notice-ul li {
    width: 100%;
    height: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    list-style: none;
    line-height: 28px;
    /*text-align: right;*/
    font-size: 14px;
    color: #515a6e;
}

.ctool-notice-animate-up {
    transition: all 0.5s ease-in-out;
    transform: translateY(-28px);
}

.ctool-notice-block .ctool-notice-ul li span:hover {
    font-weight: 400;
    text-decoration: underline;
    cursor: pointer;
}

.ctool-notice-block .ctool-notice-ul li i {
    margin-right: 5px;
}
</style>
