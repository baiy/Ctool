<template>
    <Card>
        <Tabs value="common">
            <TabPane label="常用工具设置" name="common">
                <setting-common></setting-common>
            </TabPane>
        </Tabs>
    </Card>
</template>
<script>
    import common from "./common"
    export default {
        components: {
            "setting-common": common
        }
    }
</script>