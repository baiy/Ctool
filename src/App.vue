<template>
    <div>
        <Menu mode="horizontal" theme="light" :active-name="currentCategory" @on-select="categorySelect" style="height: 45px;line-height: 45px;">
            <MenuItem :name="cat.name" v-for="(cat) in category" :key="cat.name">
                {{cat.title}}
            </MenuItem>
            <Submenu name="_options" style="float: right">
                <template slot="title">
                    选项
                </template>
                <MenuItem name="_about">关于</MenuItem>
                <MenuItem name="_new">新窗口</MenuItem>
            </Submenu>
            <MenuItem name="_feedback" style="float: right">问题反馈</MenuItem>
        </Menu>
        <RadioGroup size="large" :value="currentTool" @on-change="toolSelect" style="margin: 10px 0 10px 20px;line-height: 30px;">
            <Radio :label="tool.name" v-for="(tool) in tools" :key="tool.name">
                {{tool.title}}
            </Radio>
        </RadioGroup>
        <div>
            <router-view/>
        </div>
    </div>
</template>

<script>
    import config from "./tool/config"
    import model from "./tool/model"
    import {openTab} from "./helper";

    export default {
        data() {
            return {
                category: config.category,
                currentCategory: "",
                currentTool: "",
            }
        },
        computed: {
            tools() {
                return config.getToolByCategory(this.currentCategory)
            }
        },
        watch: {
            currentTool(name) {
                model.setCurrentTool(name);
                this.$router.push("/tool/" + name);
            }
        },
        created() {
            this.currentCategory = model.getCategoryHistory();
            this.currentTool = model.getToolHistory(this.currentCategory)
            this.$Message.config({
                top:150
            })
        },
        mounted() {},
        methods: {
            categorySelect(name) {
                switch (name) {
                    case "_feedback":
                        openTab("https://github.com/baiy/Ctool/issues");
                        break;
                    case "_about":
                        openTab("https://github.com/baiy/Ctool");
                        break;
                    case "_new":
                        openTab(window.location.href);
                        break;
                    default:
                        this.currentCategory = name;
                        model.setCategoryHistory(name);
                        this.currentTool = model.getToolHistory(this.currentCategory)
                        break;
                }
            },
            toolSelect(name) {
                model.setToolHistory(this.currentCategory, name)
                this.currentTool = name
            }
        },
    }
</script>