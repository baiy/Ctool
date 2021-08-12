import {stringify as queryStringify} from "query-string"

export const env = function (key) {
    return process['ctool'][key] ? process['ctool'][key] : "";
};

export const isChrome = !!env('isChrome')
export const isEdge = !!env('isEdge')
export const isChromium = !!env('isChromium')
export const isWeb = !!env('isWeb')
export const isUtools = !!env('isUtools')

export const trim = function (str, char, type) {
    if (char) {
        if (type === 'left') {
            return str.replace(new RegExp('^\\' + char + '+', 'g'), '');
        } else if (type === 'right') {
            return str.replace(new RegExp('\\' + char + '+$', 'g'), '');
        }
        return str.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
    }
    return str.replace(/^\s+|\s+$/g, '');
};

export const inArray = function (value, arr) {
    return arr.findIndex((v) => {
        return value === v
    }) !== -1
};

export const openTab = function (url) {
    if (isChromium && chrome.tabs) {
        return chrome.tabs.create({url: url, selected: true});
    }
    if (isUtools && window.utools) {
        return window.utools.shellOpenExternal(url)
    }
    return window.open(url);
};

export const stat = function (action, data = {}) {
    setTimeout(function () {
        try {
            let img = new Image(1, 1);
            img.src = 'https://www.baiy.org/chrome_tool/stat/?' + queryStringify(
                Object.assign(
                    {
                        v: env('version'),
                        a: action,
                        p: env('platform'),
                        r: Math.random()
                    },
                    data
                )
            );
        } catch (e) {
            // todo
        }
    }, 3000)
};

