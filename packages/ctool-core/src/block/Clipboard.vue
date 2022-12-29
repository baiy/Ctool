<template>
    <Align horizontal="center" vertical="center">
        <span v-if="state=== 'granted'">
            {{ $t('main_clipboard_granted') }}
        </span>
        <span v-if="state=== 'denied'">
            {{ $t('main_clipboard_denied') }}
        </span>
        <Link v-if="state=== 'prompt'" type="primary" @click="()=>paste(true)">
            {{ $t('main_clipboard_prompt') }}
        </Link>
    </Align>
</template>

<script setup lang="ts">
import {useClipboardPermission, paste} from "@/helper/clipboard"
import event from "@/event";

event.dispatch('extend_page_close')

const {state} = useClipboardPermission()
</script>
