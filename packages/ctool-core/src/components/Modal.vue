<template>
    <Teleport to="#ctool-append">
        <dialog
            class="ctool-modal"
            ref="container"
            :style="style"
        >
            <Transition name="ctool-modal">
                <article :style="{width:sizeConvert(width)}" v-if="show">
                    <header v-if="props.title !== ''">
                        <span>{{ title }}</span>
                        <Link aria-label="Close" class="close" @click="show = false"/>
                    </header>
                    <main>
                        <slot></slot>
                    </main>
                    <footer v-if="$slots.footer || footerType !== 'none'">
                        <slot name="footer">
                            <Align v-if="footerType === 'normal'">
                                <Button type="general" @click="show = false;emit('cancel')" :text="$t(`main_ui_cancel`)"/>
                                <Button :loading="loading" type="primary" @click="emit('ok')" :text="$t(`main_ui_ok`)"/>
                            </Align>
                            <Button :loading="loading" v-if="footerType === 'long'" type="primary" long @click="emit('ok')" :text="$t(`main_ui_ok`)"/>
                        </slot>
                    </footer>
                </article>
            </Transition>
        </dialog>
    </Teleport>
</template>
<script setup lang="ts">
import {PropType, watch, onMounted, StyleValue} from "vue";
import {ModalFooterType} from "@/types";
import {sizeConvert} from "./util";

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ""
    },
    width: {
        type: [Number, String],
        default: "60%"
    },
    padding: {
        type: String,
        default: '5px 10px'
    },
    footerType: {
        type: String as PropType<ModalFooterType>,
        default: "none"
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const container = $ref<HTMLDialogElement | null>(null)

const emit = defineEmits<{ (e: 'update:modelValue', modelValue: boolean): void, (e: 'ok'): void, (e: 'cancel'): void, (e: 'close'): void }>()

let show = $computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

const clickClose = (event: MouseEvent) => {
    if (!container?.querySelector('article')?.contains(event.target as any)) {
        show = false
    }
}

const open = () => {
        if (!container) {
        return;
    }
    container.show()
    setTimeout(() => {
        container && document.addEventListener('click', clickClose)
    }, 300)
}

const style = $computed(() => {
    let css: StyleValue = {}
    css['--ctool-modal-margin'] = props.padding
    return css
})

const close = () => {
    if (!container) {
        return;
    }
    setTimeout(() => {
        container && container.close()
        emit('close')
    }, 300)
    document.removeEventListener('click', clickClose);
}

const update = () => {
    return show ? open() : close()
}
watch(() => show, () => update())
onMounted(() => {
        update()
    // esc 关闭
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            show = false
        }
    });
})

</script>
<style>
.ctool-modal {
    --ctool-modal-margin: 1rem;
}

dialog.ctool-modal {
    backdrop-filter: unset;
    background-color: transparent;
    -webkit-backdrop-filter: unset;
}

.ctool-modal article {
    width: 400px;
}

.ctool-modal header {
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    padding: .6rem 1rem;
}

.ctool-modal main {
    margin: var(--ctool-modal-margin);
}

.ctool-modal footer {
    padding: .6rem 1rem;
}

dialog.ctool-modal article {
    overflow: unset;
}

.ctool-modal-enter-active, .ctool-modal-leave-active {
    transition: all 0.3s ease-in-out;
}

.ctool-modal-enter-from, .ctool-modal-leave-to {
    transform: translateY(-100%);
    opacity: 0;
}
</style>
