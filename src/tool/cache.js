import db from './db'
import {version} from '../helper'

const cacheVersion = version.split('.').join('');

// 缓存key添加版本号
const cacheNameConvert = function (name) {
    return 'v_' + cacheVersion + '_' + name
}

const cache = {
    set(name, value, expiry = 0) {
        return db.set(cacheNameConvert(name), value, expiry)
    },
    get(name, defaultValue = null) {
        let data = db.get(cacheNameConvert(name))
        return data === null ? defaultValue : data
    },
    remove(name) {
        db.remove(cacheNameConvert(name))
        return db.remove(cacheNameConvert(name))
    },
    setNoVersion(name, value, expiry = 0) {
        return db.set('nv_' + name, value, expiry)
    },
    getNoVersion(name, defaultValue = null) {
        let data = db.get('nv_' + name)
        return data === null ? defaultValue : data
    },
    removeNoVersion(name) {
        return db.remove('nv_' + name)
    },
    // 清理数据
    clear() {
        setTimeout(() => {
            // 清理过期数据
            db.clear();
            // 清理过期版本数据
            clearExpireVersion();
        }, 100);
    }
};

const clearExpireVersion = () => {
    const cache_version_name = "cache_version";
    if (cacheVersion === cache.getNoVersion(cache_version_name)) {
        return;
    }
    cache.setNoVersion(cache_version_name, cacheVersion)
    for (let key of db.getAllKey()) {
        let c = /^v_(\d+)_/.exec(key)
        if (c === null) {
            continue;
        }
        if (cacheVersion !== c[1].trim()) {
            db.remove(key)
        }
    }
}

export default cache