import {stringify as queryStringify} from "query-string"

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
    if (!chrome.tabs) {
        return window.open(url);
    }
    chrome.tabs.create({url: url, selected: true});
};

export const stat = function (action, data = {}) {
    try {
        let img = new Image(1, 1);
        img.src = 'https://www.baiy.org/chrome_tool/stat/?' + queryStringify(
            Object.assign(
                {
                    v: process['chromeTool']['version'],
                    a: action,
                    r: Math.random()
                },
                data
            )
        );
    } catch (e) {
        // todo
    }
};