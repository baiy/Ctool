// 存储
export interface StorageDataStructureInterface<T = any> {
    v: T,
    u: string,
    e: number,
    es: string
}

export type StorageDataStructure<T = any> = StorageDataStructureInterface<T> | null

export interface StorageInterface {
    get<T = any>(key: string): StorageDataStructure<T>

    set<T = any>(key: string, value: StorageDataStructureInterface<T>): void

    remove(key: string): void

    clear(): void

    getAllKey(): string[]
}

export type Storage = {
    get<T = any>(key: string, def: T | null, isVersion: boolean | null): T | null
    set<T = any>(key: string, value: T, expiry: number, isVersion: boolean): void
    setNoVersion<T = any>(key: string, value: T, expiry: number): void
}

// 平台
export interface PlatformRuntime {
    is(): boolean

    name: string

    openUrl(url: string): any,

    storage?: () => StorageInterface

    getLocale?: () => string

    entry?: (storage: Storage) => Promise<void>
}
