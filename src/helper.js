import {v4 as uuidV4} from 'uuid';
import {openUrl as chromiumOpenUrl} from './adapter/chromium/helper';
import {openUrl as utoolsOpenUrl} from './adapter/utools/helper';
import {openUrl as firefoxOpenUrl} from './adapter/firefox/helper';

export const env = (key) => {
    return process['ctool'][key] ? process['ctool'][key] : "";
};

export const isChrome = !!env('isChrome')
export const isEdge = !!env('isEdge')
export const isFirefox = !!env('isFirefox')
export const isChromium = !!env('isChromium')
export const isWeb = !!env('isWeb')
export const isUtools = !!env('isUtools')

export const uuid = () => {
    return uuidV4().toLowerCase();
}

export const openUrl = (url) => {
    if (isChromium) {
        return chromiumOpenUrl(url)
    }
    if (isUtools) {
        return utoolsOpenUrl(url)
    }
    if (isFirefox) {
        return firefoxOpenUrl(url)
    }
    return window.open(url);
};

export const version = env('version').trim()

export const setDisplayMode = (mode) => {
    mode = ['light', 'dark', 'auto'].includes(mode) ? mode : 'light'
    console.log(`set display mode:${mode}`)
    document.getElementsByTagName('html')[0].setAttribute('theme-mode', mode);
}
