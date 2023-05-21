/// <reference types="vite/client" />
/// <reference types="@vue-macros/reactivity-transform/macros-global" />
declare module '*.vue' {
    import type {DefineComponent} from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare const $copy: (data: string) => void
declare const $error: (error: any, isI18n: boolean = true) => string

