<template>
    <Align direction="vertical">
        <Card :title="$t('main_common_tool')">
            <Draggable v-model="selected" class="ctool-common-tool-draggable" group="tool">
                <Button :type="'dotted'" v-for="name in selected">{{ $t(`tool_${name}`) }}</Button>
            </Draggable>
            <template #extra>
                <Button type="primary" size="small" @click="reset">{{ $t('main_ui_reset') }}</Button>
            </template>
        </Card>

        <Card :title="$t('main_unselected_tool')">
            <Draggable v-model="unselected" class="ctool-common-tool-draggable" group="tool">
                <Button :type="'dotted'" v-for="name in unselected">{{ $t(`tool_${name}`) }}</Button>
            </Draggable>
            <template #extra>
                {{ $t('main_common_drag') }}
            </template>
        </Card>
    </Align>
</template>

<script setup lang="ts">
import useSetting from "@/store/setting"
import {tools, ToolType} from "@/config"
import {watch} from "vue"
import {VueDraggableNext as Draggable} from 'vue-draggable-next'

const storeSetting = useSetting()

let selected = $ref(storeSetting.items.common)

let unselected = $ref<ToolType[]>(tools.filter((item) => {
    return !selected.includes(item.name)
}).map(({name}) => name))

watch(() => selected, (value) => {
    storeSetting.save('common', value)
})
const reset = () => {
    storeSetting.save('common', [])
    selected = storeSetting.items.common
    unselected = tools.filter((item) => {
        return !selected.includes(item.name)
    }).map(({name}) => name)
}
</script>

<style scoped>
.ctool-common-tool-draggable {
    display: grid;
    grid-template-columns: repeat(auto-fill, 125px);
    gap: 5px;
    justify-content: center;
}
</style>
