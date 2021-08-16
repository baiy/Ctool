import {isUtools} from '../helper'
import utoolsDb from '../adapter/utools/db'
import defaultDb from '../adapter/default/db'

const db = isUtools ? utoolsDb : defaultDb;

export default {
    get(key, def = null) {
        return db.get(key, def)
    },
    set(key, value, expiry = 0) {
        return db.set(key, value, expiry)
    },
    remove(key) {
        return db.remove(key)
    },
    // 清理过期
    clear() {
        return db.clear();
    },
    getAllKey() {
        return db.getAllKey();
    }
}