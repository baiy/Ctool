<template>
    <Card :title="`uTools - ${$t(`main_ui_keyword`)}${$t(`main_ui_config`)}`" height="100%">
        <div v-row="`1-1-1-1`">
            <Textarea
                :height="180"
                v-for="key in itemsKey"
                :key="key"
                v-model="items[key].cmds"
                :float-text="items[key].title"
                float-position="bottom-right"
            />
        </div>
        <template #extra>
            <Align>
                <Button :size="'small'" @click="save" :text="$t('main_ui_save')" type="primary"/>
                <Button :size="'small'" @click="reset" :text="$t('main_ui_reset')"/>
                <Button :size="'small'" @click="clear" :text="$t('main_ui_clear')" type="danger"/>
            </Align>
        </template>
    </Card>
</template>

<script setup lang="ts">
import {runtime} from 'ctool-adapter-utools'
import {FeatureInterface} from '@/config'
import Message from "@/helper/message";

type Item = {
    feature: FeatureInterface,
    title: string
    cmds: string
}

const getFeatures = () => {
    let lists: Record<string, Item> = {}
    runtime.getFeatures().forEach((value, feature) => {
        lists[`${feature.getKey()}`] = {
            feature,
            title: feature.tool.isSimple() ? $t(`tool_${feature.tool.name}`) : `${$t(`tool_${feature.tool.name}`)} - ${$t(`tool_${feature.tool.name}_${feature.name}`)}`,
            cmds: value.join("\n")
        }
    })
    return lists
}

let items = $ref(getFeatures())

const itemsKey = Object.keys(items)

const save = () => {
    const features: { feature: FeatureInterface, cmds: string[] }[] = []
    itemsKey.forEach(key => {
        let cmds = [...(new Set(items[key].cmds.split("\n").map(item => item.trim()).filter(item => item !== "")))]
        if (cmds.length > 0) {
            features.push({
                feature: items[key].feature,
                cmds
            })
        }
    })
    runtime.setFeatures(features)
    items = getFeatures()
    Message.success($t('main_ui_success'))
}
const reset = () => {
    runtime.resetFeatures()
    items = getFeatures()
    Message.success($t('main_ui_success'))
}

const clear = () => {
    runtime.setFeatures([])
    items = getFeatures()
    Message.success($t('main_ui_success'))
}
</script>

