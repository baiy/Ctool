<template>
    <Align direction="vertical">
        <Card :title="$t(`main_category_common`)">
            <Align>
                <Button type="dotted" :size="size" @click="selectTool(name)" v-for="name in setting.items.common">
                    {{ $t(`tool_${name}`) }}
                </Button>
            </Align>
            <template #extra>
                <Button type="primary" :text="$t('main_ui_setting')" @click="openCommon = true" size="small"/>
            </template>
        </Card>
        <Card :title="$t(`main_recently_use`)">
            <Align>
                <Button type="dotted" :size="size" @click="selectTool(item.tool.name,undefined,item.name)" v-for="item in recently">
                    {{ `${$t(`tool_${item.tool.name}`)}${item.tool.isSimple() ? `` : ` - ${$t(`tool_${item.tool.name}_${item.name}`)}`}` }}
                </Button>
            </Align>
        </Card>
        <Card :title="$t(`main_category_${cate.name}`)" v-for="cate in categories">
            <Align>
                <template v-for="tool in cate.tools">
                    <Button type="dotted" :size="size" @click="selectTool(tool.name,cate,item.name)" v-for="item in tool.features">
                        {{ `${$t(`tool_${item.tool.name}`)}${item.tool.isSimple() ? `` : ` - ${$t(`tool_${item.tool.name}_${item.name}`)}`}` }}
                    </Button>
                </template>
            </Align>
        </Card>
        <ExtendPage v-model="openCommon" disable-replace>
            <Common/>
        </ExtendPage>
    </Align>
</template>
<script setup lang="ts">
import useOperate from "@/store/operate";
import useSetting from "@/store/setting";
import {categories, CategoryInterface, ToolType, FeatureInterface, FeatureType} from "@/config"
import Common from "./Common.vue";
import {ComponentSizeType} from "@/types";

const operate = useOperate()
const setting = useSetting()
let openCommon = $ref(false)

const size: ComponentSizeType = "default"

const selectTool = (tool: ToolType, category?: CategoryInterface, feature?: FeatureType) => {
    operate.redirectTool(tool, feature ? feature : operate.getToolLastFeature(tool), category ? category.name : "")
}

const recently: FeatureInterface[] = $computed(() => {
    return operate.getRecently().slice(0, 10)
})
</script>
