<template>
    <div class="ctool-content">
        <div class="ctool-main-tool">
            <router-view v-if="is"/>
        </div>
    </div>
    <ExtendPage v-model="openSetting">
        <Setting/>
    </ExtendPage>
    <Modal :title="$t('main_ui_prompt')" v-model="pwaUpdate" width="500">
        <Align :horizontal="'center'" top="15" bottom="15">
            {{ $t(`main_new_version_found`) }}
        </Align>
        <template #footer>
            <Button type="primary" long @click="pwaUpdate = false;pwaUpdater?.()" :text="$t(`main_ui_reload`)"/>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
import {onMounted} from 'vue'
import {report} from '@/helper/stat'
import {RouteMeta} from '@/types'
import {categoryExists, getTool} from '@/config'
import useOperate from '@/store/operate'
import event from "@/event";
import Setting from "@/block/Setting.vue"

const operate = useOperate()
const router = useRouter()
let pwaUpdate = $ref(false)
let pwaUpdater = $ref<(() => void) | null>(null)
let is = $ref(false)

onMounted(() => {
    window.dispatchEvent(new Event('resize'));
    // pwa 更新检测事件
    window.addEventListener('ctool_service_worker_update', (event: any) => {
        pwaUpdate = true
        pwaUpdater = event.detail.update
    })
})

// 打开设置页面
let openSetting = $ref(false)

event.addListener('open_setting', () => {
    openSetting = !openSetting
})

router.beforeResolve((to) => {
    is = false
    const meta = to.meta as RouteMeta
    if (meta.type === "tool") {
        const queryCategory = to.query.category?.toString() || ""
        const category = categoryExists(queryCategory) ? queryCategory : getTool(meta.tool).firstCategory().name
        if (!operate.access(meta.tool, meta.feature, category)) {
            is = true
            return false
        }
        report({_t: meta.type, _c: category, _n: meta.tool, _f: meta.feature, _p: to.name || ""})
    } else {
        report({_t: meta.type, _p: to.name || ""})
    }
})

router.afterEach(() => {
    is = true
})

</script>
<style>
.ctool-content {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 5px;
    overflow: hidden;
}

.ctool-main-tool {
    width: 100%;
    height: 100%;
}
</style>
