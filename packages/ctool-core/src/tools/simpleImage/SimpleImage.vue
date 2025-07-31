<template>
    <Align direction="vertical">
         <HeightResize :append="['.ctool-simple-image-option']" v-slot="{height}" :reduce="5">
            <Card :height="height" style="display: flex; justify-content: center; align-items: center;">
                <Display :ratio="action.current.width/action.current.height">
                    <img :src="output" alt="Generated Image" style="max-width: 100%">
                </Display>
            </Card>
        </HeightResize>
        <Card class="ctool-simple-image-option">
            <Align horizontal="center">
                <Input v-model="action.current.text" :min="1" :max="300" :width="150" :label="$t('simpleImage_text')"/>
                <InputNumber v-model="action.current.width" :min="1" :max="150" :width="100" :label="$t('simpleImage_width')"/>
                <InputNumber v-model="action.current.height" :min="1" :max="150" :width="100" :label="$t('simpleImage_height')"/>
                <InputNumber v-model="action.current.fontSize" :min="8" :max="128" :width="100" :label="$t('simpleImage_font_size')"/>
                <Color v-model="action.current.textColor" :label="$t('simpleImage_text_color')"/>
                <Color v-model="action.current.background" :label="$t('simpleImage_background')"/>
                <Select v-model="action.current.format" :options="formatOptions" :label="$t('simpleImage_format')"/>
                <Button @click="download" :type="'primary'">{{ $t('simpleImage_download') }}</Button>
            </Align>
        </Card>
    </Align>
</template>

<script lang="ts" setup>
import {useAction, initialize} from "@/store/action"
import {computed} from "vue"

const action = useAction(await initialize({
    width: 200,
    height: 200,
    text: "200x200",
    fontSize: 32,
    background: "#cccccc",
    textColor: "#969696",
    format: "png"
}))

const formatOptions = [
    {label: "PNG", value: "png"},
    {label: "JPEG", value: "jpeg"},
    {label: "WEBP", value: "webp"}
]

const output = computed(() => {
    action.save()
    const canvas = document.createElement('canvas')
    canvas.width = action.current.width
    canvas.height = action.current.height
    const ctx = canvas.getContext('2d')!
    
    // 绘制背景
    ctx.fillStyle = action.current.background
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // 如果有文字则绘制文字
    if (action.current.text) {
        ctx.fillStyle = action.current.textColor
        ctx.font = `${action.current.fontSize}px Arial`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(
            action.current.text, 
            canvas.width / 2, 
            canvas.height / 2
        )
    }
    
    return canvas.toDataURL(`image/${action.current.format}`)
})

const download = () => {
    const link = document.createElement('a')
    link.href = output.value
    link.download = `placeholder-${action.current.width}x${action.current.height}.${action.current.format}`
    link.click()
}
</script>
