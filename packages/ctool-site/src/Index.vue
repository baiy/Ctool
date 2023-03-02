<template>
    <header class="ctool-header">
        <div class="ctool-container">
            <div class="ctool-header-top">
                <a href="/" class="ctool-logo">
                    <div class="ctool-logo-image">
                        <Logo/>
                    </div>
                    <span class="ctool-site-name">Ctool</span>
                </a>
                <div class="ctool-option">
                    <a href="https://github.com/baiy/ctool" rel="external nofollow noreferrer" target="_blank">
                        <img alt="GitHub Repo stars" style="height:26px;opacity:.8" src="https://img.shields.io/github/stars/baiy/ctool?style=social">
                    </a>
                    <a class="ctool-theme ctool-hover-opacity" @click="updateTheme">
                        <Theme/>
                    </a>
                    <a class="ctool-locale ctool-hover-opacity" @click="updateLocale">
                        <Lang/>
                    </a>
                    <a class="ctool-suggest ctool-hover-opacity" href="https://github.com/baiy/Ctool/issues/new" target="_blank" v-tooltip="translation('suggest')">
                        <Suggest/>
                    </a>
                </div>
            </div>
            <div class="ctool-header-bottom">
                <h1>{{ translation('short_description') }}</h1>
                <h2>{{ translation('description') }}</h2>
                <div class="ctool-use">
                    <a href="./tool.html" class="ctool-hover-opacity">
                        {{ translation('online') }}
                    </a>
                    <a @click="pwaInstaller?.()" v-if="pwaInstaller!==null" class="ctool-hover-opacity">
                        {{ translation('install') }}
                    </a>
                    <a href="https://github.com/baiy/Ctool/releases/latest" target="_blank" class="ctool-hover-opacity">
                        {{ translation('download') }}
                    </a>
                </div>
                <div class="ctool-platform">
                    <a href="https://github.com/baiy/Ctool/releases/latest" target="_blank" v-tooltip="`Windows ${translation('application')}`"
                       class="ctool-hover-opacity">
                        <Windows/>
                    </a>
                    <a href="https://github.com/baiy/Ctool/releases/latest" target="_blank" v-tooltip="`MacOx ${translation('application')}`" class="ctool-hover-opacity">
                        <Mac/>
                    </a>
                    <a href="https://github.com/baiy/Ctool/releases/latest" target="_blank" v-tooltip="`Linux ${translation('application')}`"
                       class="ctool-hover-opacity ctool-platform-bg">
                        <Linux/>
                    </a>
                    <a href="https://chrome.google.com/webstore/detail/ipfcebkfhpkjeikaammlkcnalknjahmh" v-tooltip="`Google Chrome ${translation('extension')}`"
                       target="_blank" class="ctool-hover-opacity ctool-platform-bg">
                        <Chrome/>
                    </a>
                    <a href="https://microsoftedge.microsoft.com/addons/detail/cihekagpnnadjjplgljkmkpcfiopfplc" v-tooltip="`Microsoft Edge ${translation('extension')}`"
                       target="_blank" class="ctool-hover-opacity ctool-platform-bg">
                        <Edge/>
                    </a>
                    <a href="https://addons.mozilla.org/zh-CN/firefox/addon/ctool/" target="_blank" v-tooltip="`Firefox ${translation('extension')}`"
                       class="ctool-hover-opacity">
                        <Firefox/>
                    </a>
                    <a href="https://github.com/baiy/Ctool#utools-%E5%AE%89%E8%A3%85" v-tooltip="`Utools ${translation('extension')}`" target="_blank"
                       class="ctool-platform-bg ctool-hover-opacity">
                        <Utools/>
                    </a>
                </div>
            </div>
        </div>
    </header>
    <section class="ctool-list">
        <div class="ctool-list-block">
            <div class="ctool-list-item">
                <a :href="`./tool.html#${tool.firstFeature().getRouter()}`" v-for="tool in common" class="ctool-hover-opacity">
                    {{ translation(`tool_${tool.name}`) }}
                </a>
            </div>
        </div>
        <div class="ctool-list-block" v-for="cate in categories">
            <div class="ctool-list-name">
                <span>{{ translation(`main_category_${cate.name}`) }}</span>
                <span></span>
            </div>
            <div class="ctool-list-item">
                <template v-for="tool in cate.tools">
                    <a :href="`./tool.html#${item.getRouter()}`" v-for="item in tool.features" class="ctool-hover-opacity">
                        {{ `${translation(`tool_${item.tool.name}`)}${item.tool.isSimple() ? `` : ` - ${translation(`tool_${item.tool.name}_${item.name}`)}`}` }}
                    </a>
                </template>
            </div>
        </div>
    </section>
    <footer class="ctool-footer">
        <section class="ctool-contribution">
            <span></span>
            <h3>{{ translation(`contribution_1`) }}</h3>
            <p>{{ translation(`contribution_2`) }}</p>
            <a href="https://github.com/baiy/Ctool"  class="ctool-contribution-button  ctool-hover-opacity">
                <Github/>
                <span>Ctool Github</span>
            </a>
            <a href="https://github.com/baiy/ctool/graphs/contributors" style="text-align: center;" target="_blank">
                <img src="https://contrib.rocks/image?repo=baiy/ctool" style="max-width: 90%" />
            </a>
        </section>
        <p>© {{ (new Date()).getFullYear() }} Ctool.DEV, All rights reserved.</p>
    </footer>
</template>

<script setup lang="ts">
import Logo from "./statics/logo.svg?component"
import Github from "./statics/github.svg?component"
import Theme from "./statics/theme.svg?component"
import Lang from "./statics/lang.svg?component"
import Chrome from "./statics/chrome.svg?component"
import Edge from "./statics/edge.svg?component"
import Firefox from "./statics/firefox.svg?component"
import Linux from "./statics/linux.svg?component"
import Mac from "./statics/mac.svg?component"
import Windows from "./statics/windows.svg?component"
import Utools from "./statics/utools.svg?component"
import Suggest from "./statics/suggest.svg?component"
import {ref, onMounted} from "vue"
import {getSetting, updateTheme, updateLocale as _updateLocale, translation as _translation} from "@/helper"
import {categories as _categories, CategoryInterface, commonTool, ToolInterface, getTool} from "ctool-config"


const pwaInstaller = ref<(() => void) | null>(null)
const locale = ref(getSetting().v.items.locale)
const updateLocale = () => {
    _updateLocale()
    locale.value = getSetting().v.items.locale
}

const translation = (key: string) => {
    return _translation(key, locale.value)
}

const categories: CategoryInterface[] = _categories
const common: ToolInterface[] = commonTool.map(name => getTool(name))

onMounted(() => {
    window.addEventListener('ctool_pwa_install', (event: any) => {
        pwaInstaller.value = event.detail.installer
    })
    window.addEventListener('ctool_service_worker_update', (event: any) => {
        event.detail.update()
    })
})
</script>
