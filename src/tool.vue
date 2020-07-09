<template>
    <div>
        <Menu mode="horizontal" theme="light" :active-name="currentCategory" @on-select="categorySelect" style="height: 45px;line-height: 45px;">
            <MenuItem :name="cat.name" v-for="(cat) in category" :key="cat.name">
                <Badge v-if="badgeCategoryIsShow(cat.name)" dot :offset="[15,-10]">
                    {{cat.title}}
                </Badge>
                <template v-else>
                    {{cat.title}}
                </template>
            </MenuItem>
            <MenuItem style="padding: 0 5px;float: right" name="_new"><Icon type="md-expand" :size="24" /></MenuItem>
            <MenuItem style="padding: 0 5px;float: right" name="_feedback"><Icon type="md-help-circle" :size="24" /></MenuItem>
            <MenuItem style="padding: 0 5px;float: right" name="_setting"><Icon type="md-settings" :size="24" /></MenuItem>
            <MenuItem style="padding: 0 5px;float: right" name="_about"><Icon type="logo-github" :size="24" /></MenuItem>
        </Menu>
        <RadioGroup :value="currentTool" @on-change="toolSelect" style="margin: 10px 0 10px 20px;line-height: 30px;">
            <Radio :label="tool.name" v-for="(tool) in tools" :key="tool.name">
                <Badge v-if="badgeToolIsShow(tool.name)" dot :offset="[5,-5]">
                    {{tool.title}}
                </Badge>
                <template v-else>
                    {{tool.title}}
                </template>
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
                    case "_setting":
                        openTab("/setting.html");
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
            },
            badgeToolIsShow(tool) {
                return config.badgeToolIsShow(tool);
            },
            badgeCategoryIsShow(cat) {
                return config.badgeCategoryIsShow(cat);
            }
        },
    }
</script>