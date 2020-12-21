<template>
    <div>
        <Menu mode="horizontal" theme="light" :active-name="currentCategory" @on-select="categorySelect"
              style="height: 45px;line-height: 45px;">
            <MenuItem :name="cat.name" v-for="(cat) in category" :key="cat.name">
                <Badge v-if="badgeCategoryIsShow(cat.name)" dot :offset="[15,-10]">
                    {{ cat.title }}
                </Badge>
                <template v-else>
                    {{ cat.title }}
                </template>
            </MenuItem>
            <MenuItem style="padding: 0 5px;float: right" name="_new">
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
        <RadioGroup :value="currentTool" @on-change="toolSelect" style="margin: 10px 0 10px 20px;line-height: 30px;">
            <Radio :label="tool.name" v-for="(tool) in tools" :key="tool.name">
                <Badge v-if="badgeToolIsShow(tool.name)" dot :offset="[5,-5]">
                    {{ tool.title }}
                </Badge>
                <template v-else>
                    {{ tool.title }}
                </template>
            </Radio>
        </RadioGroup>
        <div>
            <router-view :key="$route.path + $route.query.t"/>
        </div>
        <Drawer :title="currentToolTitle+' - 历史记录'" v-model="historyShow" :width="100">
            <Table ref="historyTable" border :columns="historyColumns" :data="historyData" :height="historyTableHeight">
                <template slot-scope="{ row }" slot="_value">
                    <div>{{ historyValue(row.value) }}}</div>
                </template>
                <template slot-scope="{ index }" slot="_op">
                    <Button type="primary" size="small" @click="historyView(index)">查看</Button>
                    <Button type="primary" style="margin-left: 5px" @click="historyLoad(index)" size="small">加载</Button>
                </template>
            </Table>
            <div class="drawer-footer">
                <Button type="primary" @click="historyClear">清空历史记录</Button>
            </div>
        </Drawer>
    </div>
</template>

<script>
import config from './tool/config'
import model from './tool/model'
import historyFactory from './tool/history'
import {setLoadHistoryIndex} from './tool/history'
import { openTab } from './helper'

export default {
    data () {
        return {
            category: config.category,
            currentCategory: '',
            currentTool: '',
            historyData: [],
            historyShow: false,
            historyColumns: [
                {
                    title: '操作时间',
                    key: 'time',
                    width:180
                },
                {
                    title: '数据',
                    slot: '_value',
                    ellipsis:true,
                },
                {
                    title: '操作',
                    slot: '_op',
                    width:150
                }
            ],
        }
    },
    computed: {
        tools () {
            return config.getToolByCategory(this.currentCategory)
        },
        historyLength(){
            return historyFactory(this.currentTool).length()
        },
        historyTableHeight() {
            // 设置表格高度
            return window.innerHeight - 140
        },
        currentToolTitle(){
            return config.getToolTitle(this.currentTool)
        }
    },
    watch: {
        currentTool (name) {
            model.setCurrentTool(name)
            this.$router.push('/tool/' + name)
        },
    },
    created () {
        this.currentCategory = model.getCategoryHistory()
        this.currentTool = model.getToolHistory(this.currentCategory)
        this.$Message.config({
            top: 150,
        })
    },
    mounted () {},
    methods: {
        categorySelect (name) {
            switch (name) {
                case '_feedback':
                    openTab('https://github.com/baiy/Ctool/issues')
                    break
                case '_about':
                    openTab('https://github.com/baiy/Ctool')
                    break
                case '_setting':
                    openTab('/setting.html')
                    break
                case '_new':
                    openTab(window.location.href)
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
        history () {
            let history = historyFactory(this.currentTool)
            if (history.length() < 1) {
                return this.$Message.error('暂无历史记录')
            }
            this.historyData = history.all()
            this.historyShow = true
        },
        historyValue (value) {
            return JSON.stringify(value)
        },
        historyView(index){
            console.log(historyFactory(this.currentTool).get(index))
        },
        historyClear(){
            historyFactory(this.currentTool).clear()
            this.historyShow = false;
        },
        historyLoad(index){
            setLoadHistoryIndex(index)
            this.historyShow = false;
            this.$router.push({
                path:this.$router.currentRoute.fullPath,
                query:{
                    t:Date.now(),
                },
            });
        },
        toolSelect (name) {
            model.setToolHistory(this.currentCategory, name)
            this.currentTool = name
        },
        badgeToolIsShow (tool) {
            return config.badgeToolIsShow(tool)
        },
        badgeCategoryIsShow (cat) {
            return config.badgeCategoryIsShow(cat)
        },
    },
}
</script>
<style scoped>
.drawer-footer{
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