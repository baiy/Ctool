export const createTempElement = (innerHTML = "", type = "div", id = "") => {
    const el = document.createElement(type);
    el.id = id ? id : `ctool-temp-${Math.ceil(Math.random() * 99999)}`
    el.style.cssText = "display:none;"
    document.body.appendChild(el);
    // 移除script标签
    el.innerHTML = innerHTML.replace(/<script/gmi, "<xxxxx")
    return el;
}

export const jsonOutputFormat = (json, type = "json", keyed_key = 0) => {
    if (type === "keyed") {
        const keys = Object.keys(json[0])
        let result = {}
        for (let item of json) {
            let item_key = keys[keyed_key]
            result[item[item_key]] = item
        }
        return result
    }
    if (type === "array") {
        let result = json.map((item) => {
            return Object.values(item)
        })
        if (result.length > 0) {
            result = [
                Object.keys(json[0]),
                ...result
            ]
        }
        return result
    }
    if (type === "column") {
        const keys = Object.keys(json[0])
        let result = {}
        for (let key of keys) {
            result[key] = json.map((item) => {
                return item[key]
            })
        }
        return result
    }
    return json
}
