import _ from "lodash"

const PREFIX = "_system_"

const timestamp = () => {
    return Math.ceil((Date.parse(new Date()) / 1000))
}

const encode = (value, expiry = 0) => {
    return {
        v: value,
        e: expiry ? expiry + timestamp() : 0,
    }
}

const decode = (data) => {
    if (
        !_.isObject(data)
        || !("v" in data)
        || !("e" in data)
    ) {
        return null;
    }
    return data
}

const keyName = (key) => {
    return `${PREFIX}${key}`
}

export default {
    get(key, def = null) {
        let data = decode(window.utools.dbStorage.getItem(keyName(key)));
        // 不存在/过期
        if (data === null || (data.e !== 0 && data.e < timestamp())) {
            // 移除过期
            if (data !== null) {
                this.remove(key)
            }
            return def;
        }
        return data.v
    },
    set(key, value, expiry = 0) {
        return window.utools.dbStorage.setItem(
            keyName(key),
            encode(value, _.toInteger(expiry))
        )
    },
    remove(key) {
        return window.utools.dbStorage.removeItem(keyName(key))
    },
    // 清理过期
    clear() {
        for (let {_id} of window.utools.db.allDocs(PREFIX)) {
            let key = _id.replace(PREFIX, "");
            if (key) {
                // 获取一次 过期会自动删除
                this.get(key)
            }
        }
        return true;
    },
    getAllKey() {
        return window.utools.db.allDocs(PREFIX).map(({_id}) => {
            return _id.replace(PREFIX, "");
        })
    }
}