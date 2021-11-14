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
            <MenuItem style="padding: 0 5px;float: right" name="_new" v-if="!isUtools">
                <Icon type="md-expand" :size="24"/>
            </MenuItem>
            <MenuItem style="padding: 0 5px;float: right" name="_feedback">
                <Icon type="md-help-circle" :size="24"/>
            </MenuItem>
            <MenuItem style="padding: 0 5px;float: right" name="_setting">
                <Icon type="md-settings" :size="24"/>
            </MenuItem>
            <MenuItem style="padding: 0 5px;float: right" name="_about">
                <Icon type="logo-github" :size="24"/>
            </MenuItem>
            <MenuItem style="padding: 0 5px;float: right" name="_history">
                <Badge v-if="historyLength>0" dot :offset="[10,-3]">
                    <Icon type="md-time" :size="24"/>
                </Badge>
                <template v-else>
                    <Icon type="md-time" :size="24"/>
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
            <router-view v-if="isRouterAlive" :key="$route.path + $route.query.t"/>
        </div>
        <Drawer :title="$t('main_tool_'+currentTool)+' - '+$t('main_history')" v-model="historyShow" :width="100">
            <Table ref="historyTable" border :columns="historyColumns" :data="historyData" :height="historyTableHeight">
                <template slot-scope="{ row }" slot="_value">
                    <div>{{ historyValue(row.value) }}}</div>
                </template>
                <template slot-scope="{ index }" slot="_op">
                    <Button type="primary" size="small" @click="historyView(index)">{{ $t('main_ui_views') }}</Button>
                    <Button type="primary" style="margin-left: 5px" @click="historyLoad(index)" size="small">{{ $t('main_ui_load') }}</Button>
                </template>
            </Table>
            <div class="drawer-footer">
                <Button type="primary" @click="historyClear">{{ $t('main_history_clear') }}</Button>
            </div>
        </Drawer>
        <Drawer :title="$t('main_ui_setting')" v-model="settingShow" :width="400">
            <setting-block v-if="settingShow"></setting-block>
        </Drawer>
        <bottom-block/>
    </div>
</template>

<script>
import config from './tool/config'
import instance from './tool/instance'
import BottomBlock from './bottom'
import settingBlock from "./views/setting/block"
import model from './tool/model'
import historyFactory, {setLoadHistoryIndex} from './tool/history'
import {isUtools, openUrl} from './helper'

export default {
    components: {
        "setting-block": settingBlock,
        "bottom-block": BottomBlock
    },
    data() {
        return {
            isRouterAlive: true,
            isUtools: isUtools,
            category: config.category,
            currentCategory: '',
            currentTool: '',
            historyData: [],
            settingShow: false,
            historyShow: false,
            historyColumns: [
                {
                    title: this.$t('main_history_time'),
                    key: 'time',
                    width: 180
                },
                {
                    title: this.$t('main_history_data'),
                    slot: '_value',
                    ellipsis: true,
                },
                {
                    title: this.$t('main_history_op'),
                    slot: '_op',
                    width: 150
                }
            ],
        }
    },
    computed: {
        tools() {
            return config.getToolByCategory(this.currentCategory)
        },
        historyLength() {
            return historyFactory(this.currentTool).length()
        },
        historyTableHeight() {
            // 设置表格高度
            return window.innerHeight - 140
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
                if (type === "regex" && payload) {
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
    },
    methods: {
        reload() {
            this.isRouterAlive = false
            this.$nextTick(() => (this.isRouterAlive = true))
        },
        categorySelect(name) {
            switch (name) {
                case '_feedback':
                    openUrl('https://github.com/baiy/Ctool/issues')
                    break
                case '_about':
                    openUrl('https://github.com/baiy/Ctool')
                    break
                case '_setting':
                    this.settingShow = true;
                    break
                case '_new':
                    openUrl(window.location.href)
                    break
                case '_history':
                    this.history()
                    break
                default:
                    this.currentCategory = name
                    model.setCategoryHistory(name)
                    this.currentTool = model.getToolHistory(this.currentCategory)
                    break
            }
        },
        history() {
            let history = historyFactory(this.currentTool)
            if (history.length() < 1) {
                return this.$Message.error(this.$t('main_history_null'))
            }
            this.historyData = history.all()
            this.historyShow = true
        },
        historyValue(value) {
            return JSON.stringify(value)
        },
        historyView(index) {
            this.$Modal.info({
                render: (h) => {
                    return h('Input', {
                        props: {
                            type: "textarea",
                            rows: 10,
                            value: JSON.stringify(historyFactory(this.currentTool).get(index), null, "\t"),
                        }
                    })
                },
                width: 700,
                okText: this.$t('main_ui_close')
            })
        },
        historyClear() {
            historyFactory(this.currentTool).clear()
            this.historyShow = false;
        },
        historyLoad(index) {
            setLoadHistoryIndex(index)
            this.historyShow = false;
            this.$router.push({
                path: this.$router.currentRoute.fullPath,
                query: {
                    t: Date.now(),
                },
            });
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
<style scoped>
.drawer-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
}
</style>
