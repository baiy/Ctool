import {StorageInterface, StorageDataStructureInterface, StorageDataStructure} from '@/types'
import {version} from './util'
import platform from './platform'
import {isObject} from "lodash";
import {isProxy, toRaw, unref} from "vue";
import dayjs from "dayjs";

const cacheVersion = version.split('.').join('');
const timestamp = () => {
    return dayjs().unix()
}

const addKeyVersion = (key: string, is: boolean = true): string => `${is ? `v_${cacheVersion}_` : 'nv_'}${key}`

const encode = <T>(value: T, expiry: number = 0): StorageDataStructureInterface<T> => {
    expiry = expiry ? expiry + timestamp() : 0
    value = unref(value)
    return {
        v: isProxy(value) ? toRaw(value) : value,
        u: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        e: expiry,
        es: expiry ? dayjs(expiry * 1000).format('YYYY-MM-DD HH:mm:ss') : "",
    }
}

const decode = <T>(data: StorageDataStructure<T>): StorageDataStructure<T> => {
    if (
        !data
        || !isObject(data)
        || !("v" in data)
        || !("e" in data)
    ) {
        return null;
    }
    return data
}

class StorageObject {
    private readonly _handle: StorageInterface;

    constructor(handle: StorageInterface) {
        this._handle = handle;
    }

    get handle(): StorageInterface {
        return this._handle;
    }

    get<T>(key: string, def: T | null = null, isVersion: boolean | null = null): T | null {
        let data: StorageDataStructure<T>;
        // 自动判断有无版本号
        if (isVersion === null) {
            // 默认获取有版本号数据
            data = decode<T>(this._handle.get<T>(addKeyVersion(key)))
            if (data === null) {
                // 获取无版本数据
                data = decode<T>(this._handle.get<T>(addKeyVersion(key, false)))
            }
        }
        // 强制指定有无版本号
        else {
            data = decode<T>(this._handle.get<T>(addKeyVersion(key, isVersion)))
        }

        // 不存在/过期
        if (data === null || (data.e !== 0 && data.e < timestamp())) {
            // 移除过期
            if (data !== null) {
                this.remove(key)
            }
            return def
        }
        return data.v
    }

    // 默认有版本号
    set<T>(key: string, value: T, expiry: number = 0, isVersion: boolean = true): void {
        this._handle.set<T>(addKeyVersion(key, isVersion), encode<T>(value, expiry))
    }

    // 不使用版本号
    setNoVersion<T>(key: string, value: T, expiry: number = 0): void {
        this.set<T>(key, value, expiry, false)
    }

    remove(key: string): void {
        this._handle.remove(addKeyVersion(key))
        this._handle.remove(addKeyVersion(key, false))
    }

    // 删除 不添加版本前缀
    delete(key: string) {
        this._handle.remove(key)
    }

    // 移除过期数据
    flushExpired(): void {
        for (let key of this.getAllKey()) {
            // 获取一次 过期会自动删除
            this.get(key)
        }
    }

    getAllKey(): string[] {
        return this._handle.getAllKey();
    }

    clear() {
        this._handle.clear()
    }
}

const storage = new StorageObject(platform.runtime.storage)

const clearExpireVersion = () => {
    const cacheVersionName = "cache_version";
    if (cacheVersion === storage.get(cacheVersionName)) {
        return;
    }
    storage.setNoVersion(cacheVersionName, cacheVersion)
    for (let key of storage.getAllKey()) {
        let c = /^v_(\d+)_/.exec(key)
        if (c === null) {
            continue;
        }
        if (cacheVersion !== c[1].trim()) {
            storage.delete(key)
        }
    }
}
// 清理过期数据
setTimeout(() => {
    // 清理过期数据
    storage.flushExpired();
    // 清理过期版本数据
    clearExpireVersion();
}, 100);


export default storage
