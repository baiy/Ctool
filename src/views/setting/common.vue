<template>
    <div>
        <CheckboxGroup v-model="tools" @on-change="toolUpdate" style="line-height: 30px;">
            <Checkbox v-for="(t,k) in all" :key="k" :label="t.name">{{$t('mian_tool_'+t.name)}}</Checkbox>
        </CheckboxGroup>
    </div>
</template>

<script>
    import config from "../../tool/config"

    export default {
        data() {
            return {
                tools: [],
                all: config.tool
            }
        },
        created() {
            this.tools = config.getToolByCategory('common').map(function (item) {
                return item.name;
            });
        },
        methods: {
            toolUpdate(tools) {
                console.log(tools)
                config.setUserCommon(tools);
            },
        },
    }
</script>
