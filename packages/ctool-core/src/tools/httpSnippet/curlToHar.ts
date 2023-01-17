import {isEmpty, isString} from "lodash";
import parser, {Arguments} from 'yargs-parser'

const getQueryString = (url: string) => {
    const lists: { name: string, value: string }[] = [];
    const qs = url.slice(url.indexOf("?")).slice(1);
    if (!isEmpty(qs)) {
        qs.split("&").forEach((item) => {
            lists.push({
                name: item.split("=")[0],
                value: item.split("=")[1]
            });
        })
    }
    return lists;
}

const getMapValue = (items: string[] | string, split: string) => {
    const lists: { name: string, value: string }[] = []
    if (isString(items)) {
        items = items.split(";").map(item => item.trim())
    }
    items.forEach(item => {
        const temp = item.split(split).map(value => value.trim())
        if (temp.length > 1) {
            lists.push({
                name: temp[0],
                value: temp[1]
            })
        }
    })
    return lists
}

const buildR = (args: Arguments) => {
    let method = "GET"
    let url: string = ""
    const httpVersion: string = "HTTP/1.1"
    const queryString: { name: string, value: string }[] = []
    const headers: { name: string, value: string }[] = []
    const cookies: { name: string, value: string }[] = []
    const postData: Record<string, any> = {}

    for (let key of Object.keys(args)) {
        if (['_', '__'].includes(key)) {
            continue;
        }
        const value = args[key];
        switch (key) {
            case "url":
                url = value.substring(0, value.indexOf("?")) || value
                queryString.push(...getQueryString(value));
                break;
            case "A":
            case "user-agent":
                headers.push({name: "User-Agent", value})
                break;
            case "H":
            case "header":
                headers.push(...getMapValue(value, ':'))
                break;
            case "b":
            case "cookie":
                cookies.push(...getMapValue(value, "="));
                break;
            case "d":
            case "data":
            case "data-raw":
                postData['text'] = value
                break;
            case "json":
                postData['text'] = value
                headers.push({name: "Content-Type", value: "application/json"})
                headers.push({name: "Accept", value: "application/json"})
                break;
            case "data-urlencode":
                postData['text'] = getMapValue(value, "=").map(item => {
                    return `${item.name}=${encodeURIComponent(item.value)}`
                }).join("&")
                break;
            case "X":
            case "request":
                method = value
                break;
            default:
                console.log('ignore', key, args[key])
                break;
        }
    }
    return {
        method,
        url,
        httpVersion,
        queryString,
        headers,
        cookies,
        postData
    }
};

export default (str: string) => {
    let tokens = parser(str);
    str = str.replace(/\\\n\r?/g, " ")
    if (!('url' in tokens)) {
        if (!(tokens._[1] as string).includes("http")) {
            throw new Error("Invalid curl command")
        }
        str = str.replace((tokens._[1] as string), `--url ${tokens._[1]}`)
        tokens = parser(str);
    }
    if (!tokens._.includes('curl')) {
        throw new Error("Invalid curl command")
    }
    return buildR(tokens);
};


