import storage from "./storage";
import {createPersistedState} from 'pinia-plugin-persistedstate'
import {createPinia, defineStore as piniaDefineStore} from 'pinia'
import {isArray} from 'lodash'

const EXPIRY_SEPARATOR = "_-expiry-_"
const VERSION_FLAG = "_version_flag_"

// 自定义持久化
class PiniaStorage implements Pick<Storage, 'getItem' | 'setItem'> {
    // 处理过期时间/版本号
    handleKey(_key: string): { k: string, e: number, v: boolean } {
        let isVersion = _key.includes(VERSION_FLAG);
        if (isVersion) {
            _key = _key.replace(VERSION_FLAG, "")
        }
        let [key, expiry] = _key.split(EXPIRY_SEPARATOR)
        return {
            k: key,
            e: parseInt(expiry),
            v: isVersion
        }
    }

    getItem(_key: string): any {
        let handle = this.handleKey(_key)
        return storage.get<any>(handle.k, null, handle.v)
    }

    setItem(_key: string, value: any): void {
        let handle = this.handleKey(_key)
        if (handle.v) {
            storage.set(handle.k, value, handle.e)
            return
        }
        storage.setNoVersion(handle.k, value, handle.e)
    }
}

const serializer = {
    serialize: (s: any) => s,
    deserialize: (s: any) => s
}

interface PersistOptions {
    key: string, // 缓存key
    expire?: number, // 过期时间 0
    paths?: string[] | undefined // 存储key数组 undefined
    isVersion?: boolean // 是否添加版本号 false
}

const persist = (_option: PersistOptions | PersistOptions[] = []) => {
    const option = (!isArray(_option) ? [_option] : _option).map((item) => {
        let config = {isVersion: false, paths: undefined, expire: 0, ...item}
        return {
            key: `${config.isVersion ? VERSION_FLAG : ""}${config.key}${EXPIRY_SEPARATOR}${config.expire}`,
            paths: config.paths
        }
    })
    return option.length == 1 ? option[0] : option
}

// pinia
export const pinia = createPinia().use(createPersistedState({storage: new PiniaStorage, serializer}))

// defineStore 默认
export const defineStore = <SS>(
    /**
     * store id
     */
    id: string,
    /**
     * storeSetup
     */
    storeSetup: () => SS,
    /**
     * 持久化设置
     * true(默认): 无版本/无有效期/全部数据/key为id
     * false: 不缓存任何数据
     * Partial<PersistOptions>: 单一缓存 全部选项可以选
     * PersistOptions[]: 多条缓存 key值必填
     */
    _persistOption: Partial<PersistOptions> | PersistOptions[] | boolean = true,
    /**
     * pinia 选项 (persist除外)
     */
    piniaOptions: Record<string, any> = {},
) => {
    if (_persistOption !== false) {
        _persistOption = _persistOption === true ? [] : _persistOption
        let option: PersistOptions[] = []
        if (!isArray(_persistOption)) {
            option.push({key: id, ..._persistOption})
        } else {
            option = _persistOption
        }
        if (option.length === 0) {
            option.push({key: id})
        }
        piniaOptions = {...piniaOptions, persist: persist(option)}
    }
    return piniaDefineStore(id, storeSetup, piniaOptions)
}
