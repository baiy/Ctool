import lsCache from "lscache"
import p from "../../package"

// 缓存key添加版本号
const cacheNameConvert = function (name) {
    return "v_" + (p.version.split('.').join("")) + '_' + name
};

export default {
    // expiry 过期时间 秒
    set(name, value, expiry = 0) {
        return lsCache.set(cacheNameConvert(name), value, expiry / 60);
    },
    get(name, defaultValue = null) {
        let data = lsCache.get(cacheNameConvert(name));
        return data ? data : defaultValue
    },
    setnNoVersion(name, value, expiry = 0) {
        return lsCache.set('nv_' + name, value, expiry / 60);
    },
    getNoVersion(name, defaultValue = null) {
        let data = lsCache.get('nv_' + name);
        return data ? data : defaultValue
    }
}