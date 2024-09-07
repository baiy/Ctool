/// <reference types="vite/client" />
/// <reference types="@vue-macros/reactivity-transform/macros-global" />

declare const $copy: (data: string) => void
declare const $error: (error: any, isI18n: boolean = true) => string

