import {v4 as uuidV4} from 'uuid';
import {openUrl as chromiumOpenUrl} from './adapter/chromium/helper';
import {openUrl as utoolsOpenUrl} from './adapter/utools/helper';

export const env = (key) => {
    return process['ctool'][key] ? process['ctool'][key] : "";
};

export const isChrome = !!env('isChrome')
export const isEdge = !!env('isEdge')
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
    return window.open(url);
};