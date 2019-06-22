<template>
    <Card style="margin-top: 50px;min-height: 300px">
        <Tabs value="common">
            <TabPane label="常用工具设置" name="common">
                <setting-common></setting-common>
            </TabPane>
        </Tabs>
    </Card>
</template>
<script>
    import common from "./views/setting/common"
    export default {
        components: {
            "setting-common": common
        }
    }
</script>