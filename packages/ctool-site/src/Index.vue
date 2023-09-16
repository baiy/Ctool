<template>
    <header class="ctool-header">
        <div class="ctool-container">
            <div class="ctool-header-top">
                <a href="/" class="ctool-logo">
                    <div class="ctool-logo-image">
                        <Logo />
                    </div>
                    <span class="ctool-site-name">Ctool</span>
                </a>
                <div class="ctool-option">
                    <a href="https://github.com/baiy/ctool" rel="external nofollow noreferrer" target="_blank">
                        <img
                            alt="GitHub Repo stars"
                            style="height: 26px; opacity: 0.8"
                            src="https://img.shields.io/github/stars/baiy/ctool?style=social"
                        />
                    </a>
                    <a class="ctool-theme ctool-hover-opacity" @click="setting.update('theme')">
                        <Theme />
                    </a>
                    <a class="ctool-locale ctool-hover-opacity" @click="setting.update('locale')">
                        <Lang />
                    </a>
                    <Tooltip :content="translation('suggest')">
                        <a
                            class="ctool-suggest ctool-hover-opacity"
                            href="https://github.com/baiy/Ctool/issues/new"
                            target="_blank"
                        >
                            <Suggest />
                        </a>
                    </Tooltip>
                </div>
            </div>
            <div class="ctool-header-bottom">
                <h1>{{ translation("short_description") }}</h1>
                <h2>{{ translation("description") }}</h2>
                <div class="ctool-use">
                    <div class="ctool-use-button">
                        <a href="./tool.html" class="ctool-hover-opacity">
                            {{ translation("online") }}
                        </a>
                        <a @click="pwaInstaller?.()" v-if="pwaInstaller !== null" class="ctool-hover-opacity">
                            {{ translation("install") }}
                        </a>
                        <a
                            href="https://github.com/baiy/Ctool/releases/latest"
                            target="_blank"
                            class="ctool-hover-opacity"
                        >
                            {{ translation("download") }}
                        </a>
                    </div>
                    <a class="ctool-use-time ctool-hover-opacity" href="https://github.com/baiy/ctool">
                        Ctool v{{ version }} {{ translation("main_last_updated") }}{{ formatDate(buildTimestamp) }}
                    </a>
                    <div class="ctool-platform">
                        <Tooltip :content="`Windows ${translation('application')}`">
                            <a
                                href="https://www.microsoft.com/store/apps/9P63J98XZ0M1"
                                target="_blank"
                                class="ctool-hover-opacity"
                            >
                                <Windows />
                            </a>
                        </Tooltip>
                        <Tooltip :content="`Mac OS ${translation('application')}`">
                            <a
                                href="https://github.com/baiy/Ctool/releases/latest"
                                target="_blank"
                                class="ctool-hover-opacity"
                            >
                                <Mac />
                            </a>
                        </Tooltip>
                        <Tooltip :content="`Linux ${translation('application')}`">
                            <a
                                href="https://github.com/baiy/Ctool/releases/latest"
                                target="_blank"
                                class="ctool-hover-opacity ctool-platform-bg"
                            >
                                <Linux />
                            </a>
                        </Tooltip>
                        <Tooltip :content="`Google Chrome ${translation('extension')}`">
                            <a
                                href="https://chrome.google.com/webstore/detail/ipfcebkfhpkjeikaammlkcnalknjahmh"
                                target="_blank"
                                class="ctool-hover-opacity ctool-platform-bg"
                            >
                                <Chrome />
                            </a>
                        </Tooltip>
                        <Tooltip :content="`Microsoft Edge ${translation('extension')}`">
                            <a
                                href="https://microsoftedge.microsoft.com/addons/detail/cihekagpnnadjjplgljkmkpcfiopfplc"
                                target="_blank"
                                class="ctool-hover-opacity ctool-platform-bg"
                            >
                                <Edge />
                            </a>
                        </Tooltip>
                        <Tooltip :content="`Firefox ${translation('extension')}`">
                            <a
                                href="https://addons.mozilla.org/zh-CN/firefox/addon/ctool/"
                                target="_blank"
                                class="ctool-hover-opacity"
                            >
                                <Firefox />
                            </a>
                        </Tooltip>
                        <Tooltip :content="`Utools ${translation('extension')}`">
                            <a
                                href="https://github.com/baiy/Ctool#utools-%E5%AE%89%E8%A3%85"
                                target="_blank"
                                class="ctool-platform-bg ctool-hover-opacity"
                            >
                                <Utools />
                            </a>
                        </Tooltip>
                        <Tooltip :content="`Arch Linux AUR`">
                            <a
                                href="https://aur.archlinux.org/packages/ctool-bin"
                                target="_blank"
                                class="ctool-platform-bg ctool-hover-opacity"
                            >
                                <Arc />
                            </a>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <section class="ctool-list">
        <div class="ctool-search">
            <input :placeholder="translation(`main_search_placeholder`)" v-model="keyword" />
            <Search />
        </div>
        <div class="ctool-list-block">
            <div class="ctool-list-item" v-if="searchItems.length > 0">
                <a :href="tool.url" v-for="tool in searchItems" class="ctool-hover-opacity">
                    {{ tool.label }}
                </a>
            </div>
            <div class="ctool-list-item-null" v-else>{{ translation("main_ui_null") }}</div>
        </div>
        <div class="ctool-list-block" v-for="cate in categories">
            <div class="ctool-list-name">
                <span>{{ translation(`main_category_${cate.name}`) }}</span>
                <span></span>
            </div>
            <div class="ctool-list-item">
                <template v-for="tool in cate.tools">
                    <a
                        :href="`/tool.html#${item.getRouter()}`"
                        v-for="item in tool.features"
                        class="ctool-hover-opacity"
                    >
                        {{
                            `${translation(`tool_${item.tool.name}`)}${
                                item.tool.isSimple() ? `` : ` - ${translation(`tool_${item.tool.name}_${item.name}`)}`
                            }`
                        }}
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
            <a href="https://github.com/baiy/Ctool" class="ctool-contribution-button ctool-hover-opacity">
                <Github />
                <span>Ctool Github</span>
            </a>
            <a href="https://github.com/baiy/ctool/graphs/contributors" style="text-align: center" target="_blank">
                <img src="https://contrib.rocks/image?repo=baiy/ctool" style="max-width: 90%" />
            </a>
        </section>
        <p>© {{ new Date().getFullYear() }} Ctool.DEV, All rights reserved.</p>
    </footer>
</template>

<script setup lang="ts">
import Logo from "./statics/logo.svg?component";
import Github from "./statics/github.svg?component";
import Theme from "./statics/theme.svg?component";
import Lang from "./statics/lang.svg?component";
import Chrome from "./statics/chrome.svg?component";
import Edge from "./statics/edge.svg?component";
import Firefox from "./statics/firefox.svg?component";
import Linux from "./statics/linux.svg?component";
import Mac from "./statics/mac.svg?component";
import Windows from "./statics/windows.svg?component";
import Utools from "./statics/utools.svg?component";
import Arc from "./statics/arc.svg?component";
import Suggest from "./statics/suggest.svg?component";
import Search from "./statics/search.svg?component";
import Tooltip from "./Tooltip.vue";
import { ref, onMounted, computed } from "vue";
import { version, buildTimestamp, useSetting, translation, search } from "@/helper";
import { categories as _categories, CategoryInterface } from "ctool-config";

const pwaInstaller = ref<(() => void) | null>(null);
const setting = useSetting();
const keyword = ref("");
const categories: CategoryInterface[] = _categories;

onMounted(() => {
    window.addEventListener("ctool_pwa_install", (event: any) => {
        pwaInstaller.value = event.detail.installer;
    });
    window.addEventListener("ctool_service_worker_update", (event: any) => {
        event.detail.update();
    });
});

const searchItems = computed(() => search(keyword.value));

const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};
</script>
