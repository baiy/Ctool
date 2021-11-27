<template>
    <div>
        <Card :title="$t('main_common_tool')">
            <draggable v-model="selected" group="tool">
                <Button style="margin: 5px" v-for="name in selected"  type="dashed" :key="name">{{$t('main_tool_'+name)}}</Button>
            </draggable>
            <Button size="small" slot="extra" type="primary" @click="reset">{{$t('main_ui_reset')}}</Button>
        </Card>
        <Card :title="$t('main_unselected_tool')" style="margin-top: 10px">
            <draggable v-model="unselected" group="tool">
                <Button style="margin: 5px" v-for="name in unselected" type="dashed" :key="name">{{$t('main_tool_'+name)}}</Button>
            </draggable>
        </Card>
    </div>
</template>

<script>
    import config from "../../tool/config"
    import {DEFAULT_COMMON_TOOL} from "../../tool/config"
    import draggable from "vuedraggable";
    export default {
        components: {
            draggable
        },
        data() {
            return {
                style:"",
                selected:[],
                unselected:[],
                tools: [],
            }
        },
        created() {
            this.selected = config.getToolByCategory('common').map(function (item) {
                return item.name;
            });
            this.unselected = config.tool.filter(({name})=>{
                return !this.selected.includes(name)
            }).map(function (item) {
                return item.name;
            })
        },
        watch:{
            selected(){
                config.setUserCommon(this.selected ? this.selected : []);
            }
        },
        methods:{
            reset(){
                this.selected = DEFAULT_COMMON_TOOL
            }
        }
    }
</script>
