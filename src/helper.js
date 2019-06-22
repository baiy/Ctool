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

export const formatDate = function (date, fmt = "yyyy-MM-dd hh:mm:ss") {
    let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

export const env = function (key) {
    return process['ctool'][key] ? process['ctool'][key] : "";
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

