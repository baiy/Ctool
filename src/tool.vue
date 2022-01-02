<template>
    <div>
        <Menu class="tool-category-menu-block" mode="horizontal" theme="light" :active-name="currentCategory" @on-select="categorySelect"
              style="height: 45px;line-height: 45px;">
            <MenuItem :style="$t('main_css_main_category_item_style')" :name="cat.name" v-for="(cat) in category" :key="cat.name">
                <Badge v-if="badgeCategoryIsShow(cat.name)" dot :offset="[15,-10]">
                    {{ $t('main_category_'+cat.name) }}
                </Badge>
                <template v-else>
                    {{ $t('main_category_'+cat.name) }}
                </template>
            </MenuItem>
        </Menu>
        <RadioGroup class="tool-select-block" :value="currentTool" @on-change="toolSelect" style="margin: 10px 0 10px 20px;line-height: 30px;">
            <Radio :label="tool.name" v-for="(tool) in tools" :key="tool.name">
                <Badge v-if="badgeToolIsShow(tool.name)" dot :offset="[5,-5]">
                    {{ $t('main_tool_'+tool.name) }}
                </Badge>
                <template v-else>
                    {{ $t('main_tool_'+tool.name) }}
                </template>
            </Radio>
        </RadioGroup>
        <div>
            <router-view ref="routerView" v-if="isRouterAlive" :key="$route.path + $route.query.t"/>
        </div>
        <bottom-block/>
    </div>
</template>

<script>
import config from './tool/config'
import {dispatchWindowResize, I18N_CHANGE} from './tool/event'
import instance from './tool/instance'
import BottomBlock from './components/bottom'
import model from './tool/model'
import {isUtools} from './helper'

export default {
    components: {
        "bottom-block": BottomBlock
    },
    data() {
        return {
            isRouterAlive: true,
            isUtools: isUtools,
            category: config.category,
            currentCategory: '',
            currentTool: '',
        }
    },
    computed: {
        tools() {
            return config.getToolByCategory(this.currentCategory)
        }
    },
    watch: {
        currentTool(name) {
            model.setCurrentTool(name)
            this.$router.push('/tool/' + name)
        },
    },
    created() {
        if (this.isUtools) {
            window.utools.onPluginEnter(({code, payload, type}) => {
                window.utools.showMainWindow()
                let tool = "";
                let feature = "";
                if (code.indexOf('ctool-') !== -1) {
                    tool = code.replace(/ctool-/g, "")
                    if (tool.indexOf('-') !== -1) {
                        let temp = tool.split('-');
                        tool = temp[0]
                        feature = temp[1]
                    }
                }

                // 写入正则匹配数据到固定数据数据
                if (["over","regex"].includes(type) && payload) {
                    model.setFixeInputData(payload)
                }
                if (feature) {
                    // 设置工具内功能
                    model.setToolCurrentFeature(feature)
                }

                if (tool && this.currentTool !== tool) {
                    let cat = config.getToolDefaultCategory(tool);
                    if (cat) {
                        model.setCategoryHistory(cat)
                        model.setToolHistory(cat, tool)
                        this.currentCategory = cat;
                        this.currentTool = tool;
                    }
                }
                this.reload()
            })
        }

        this.currentCategory = model.getCategoryHistory()
        this.currentTool = model.getToolHistory(this.currentCategory)
        this.$Message.config({
            top: 150,
        })
    },
    mounted() {
        instance.set(this)
        window.addEventListener(I18N_CHANGE, ()=>{
            this.$forceUpdate()
            this.$refs.routerView.$forceUpdate()
        });
    },
    methods: {
        reload() {
            this.isRouterAlive = false
            this.$nextTick(() => (this.isRouterAlive = true))
        },
        categorySelect(name) {
            this.currentCategory = name
            model.setCategoryHistory(name)
            this.currentTool = model.getToolHistory(this.currentCategory)
            this.$nextTick(()=>{
                dispatchWindowResize()
            })
        },
        toolSelect(name) {
            model.setToolHistory(this.currentCategory, name)
            this.currentTool = name
        },
        badgeToolIsShow(tool) {
            return config.badgeToolIsShow(tool)
        },
        badgeCategoryIsShow(cat) {
            return config.badgeCategoryIsShow(cat)
        },
    },
}
</script>
