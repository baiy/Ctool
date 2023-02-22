/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />
/// <reference types="vite-plugin-pwa/client" />
declare module '*.vue' {
    import type {DefineComponent} from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare const CTOOL_VERSION: string
declare const CTOOL_UPDATE_TIME: string

declare const $copy: (data: string) => void
declare const $error: (error: any, isI18n: boolean = true) => string

declare namespace Intl {
    type Key = 'calendar' | 'collation' | 'currency' | 'numberingSystem' | 'timeZone' | 'unit';

    function supportedValuesOf(input: Key): string[];
}
