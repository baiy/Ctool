<template>
    <Card>
        <Tabs value="common">
            <TabPane :label="$t('mian_common_tool_setting')" name="common">
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
