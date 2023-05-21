import {isString} from "lodash";
import parser, {Arguments} from 'yargs-parser'

const parseQueryString = (searchParams: URLSearchParams) => {
    const lists: { name: string, value: string }[] = []

    for (const [key, value] of searchParams.entries()) {
        lists.push({
            name: key,
            value: value
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

const parseFormData = (formDataString: string) => {
    const lists: { name: string, value: string }[] = []
    const lines = formDataString.split('Content-Disposition')
    lines.shift();
    lines.forEach(line => {
        const matchResult = line.match(/name="(.*?)"([\s\S]+)\r\n------/i)
        if (matchResult !== null) {
            const value = matchResult[2].replace("\r\n\r\n", "")
            lists.push({
                name: matchResult[1],
                value: value.includes("filename=\"") ? "" : value
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
        const value: string = args[key];
        switch (key) {
            case "url":
                url = value
                const Url = new URL(value)
                queryString.push(...parseQueryString(Url.searchParams));
                break;
            case "A":
            case "user-agent":
                headers.push({name: "User-Agent", value})
                break;
            case "H":
            case "header":
                const temp = getMapValue(value, ":")
                temp.forEach(({name: _name, value: _value}) => {
                    if (_name.toLowerCase() === "content-type") {
                        _value = _value.includes("multipart/form-data") ? "multipart/form-data" : _value
                        postData.mimeType = _value
                    }
                    if (_name.toLowerCase() === "cookie") {
                        cookies.push(...getMapValue(_value, "="));
                    } else {
                        headers.push({name: _name, value: _value})
                    }
                })
                break;
            case "b":
            case "cookie":
                cookies.push(...getMapValue(value, "="));
                break;
            case "d":
            case "data":
            case "data-raw":
                method = "POST"
                const $text = value.match(/\$'(.*?)'/)?.[1]
                postData.text = ($text || value).replaceAll("\\n", "\n").replaceAll("\\r", "\r")
                break;
            case "json":
                method = "POST"
                postData.mimeType = "text/plain"
                postData.text = value
                headers.push({name: "Content-Type", value: "application/json"})
                headers.push({name: "Accept", value: "application/json"})
                break;
            case "data-urlencode":
                method = "POST"
                postData.mimeType = "application/x-www-form-urlencoded"
                postData.text = value
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
    // post 数据处理
    if (method === "POST" && postData.mimeType) {
        if (postData.mimeType === "application/x-www-form-urlencoded") {
            postData.params = parseQueryString(new URLSearchParams(postData.text))
            delete postData.text
        }
        if (postData.mimeType?.includes("multipart/form-data")) {
            postData.params = parseFormData(postData.text)
            delete postData.text
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
    return {
        entries: [
            {
                request: buildR(tokens)
            }
        ]
    };
};


