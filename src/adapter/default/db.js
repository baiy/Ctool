import lsCache from './lscache'

export default {
    get(key, def = null) {
        let data = lsCache.get(key)
        return data ? data : def
    },
    set(key, value, expiry = 0) {
        return lsCache.set(key, value, expiry / 60)
    },
    remove(key) {
        return lsCache.remove(key)
    },
    // 清理过期
    clear() {
        return lsCache.flushExpired()
    },
    getAllKey() {
        return lsCache.getAllKey();
    }
}