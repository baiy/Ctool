import store from 'store2'
import {StorageInterface, StorageDataStructure, StorageDataStructureInterface} from '@/types'

// 当前操作实例
const instance = store.namespace('ctool')

class storage implements StorageInterface {
    get<T>(key: string): StorageDataStructure<T> {
        return instance.get(key, null)
    }

    clear(): void {
        instance.clear()
    }

    getAllKey(): string[] {
        return instance.keys();
    }

    remove(key: string): void {
        instance.remove(key)
    }

    set<T>(key: string, value: StorageDataStructureInterface<T>): void {
        instance.set(key, value)
    }
}

export default new storage()
