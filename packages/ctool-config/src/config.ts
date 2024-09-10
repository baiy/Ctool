// 分类 定义
const _categories = ["encryption", "conversion", "encoder_decoder", "check", "generate", "other"] as const;

// 工具 - 功能 - 父目录 定义
export let _tools = {
    hash: {
        feature: ["hash"],
        parent_directory: "",
    },
    aes: {
        feature: ["encrypt", "decrypt"],
        parent_directory: "encrypt",
    },
    des: {
        feature: ["encrypt", "decrypt"],
        parent_directory: "encrypt",
    },
    tripleDes: {
        feature: ["encrypt", "decrypt"],
        parent_directory: "encrypt",
    },
    rc4: {
        feature: ["encrypt", "decrypt"],
        parent_directory: "encrypt",
    },
    rabbit: {
        feature: ["encrypt", "decrypt"],
        parent_directory: "encrypt",
    },
    sm2: {
        feature: ["encrypt", "decrypt", "sign", "verify"],
        parent_directory: "encrypt",
    },
    sm4: {
        feature: ["encrypt", "decrypt"],
        parent_directory: "encrypt",
    },
    rsa: {
        feature: ["encrypt", "decrypt"],
        parent_directory: "encrypt",
    },
    sign: {
        feature: ["sign"],
        parent_directory: "",
    },
    base64: {
        feature: ["encoder", "decoder"],
        parent_directory: "",
    },
    json: {
        feature: ["json"],
        parent_directory: "",
    },
    url: {
        feature: ["encoder", "decoder"],
        parent_directory: "",
    },
    qrCode: {
        feature: ["generate", "parse"],
        parent_directory: "",
    },
    barcode: {
        feature: ["barcode"],
        parent_directory: "",
    },
    pinyin: {
        feature: ["pinyin"],
        parent_directory: "",
    },
    ip: {
        feature: ["ip"],
        parent_directory: "",
    },
    code: {
        feature: ["code", "run"],
        parent_directory: "",
    },
    unicode: {
        feature: ["encoder", "decoder"],
        parent_directory: "",
    },
    radix: {
        feature: ["radix"],
        parent_directory: "",
    },
    regex: {
        feature: ["regex"],
        parent_directory: "",
    },
    randomString: {
        feature: ["randomString"],
        parent_directory: "",
    },
    serialize: {
        feature: ["serialize"],
        parent_directory: "",
    },
    diffs: {
        feature: ["diffs"],
        parent_directory: "",
    },
    crontab: {
        feature: ["crontab"],
        parent_directory: "",
    },
    websocket: {
        feature: ["websocket"],
        parent_directory: "",
    },
    unit: {
        feature: ["unit"],
        parent_directory: "",
    },
    time: {
        feature: ["timestamp", "timezone", "calculator"],
        parent_directory: "",
    },
    uuid: {
        feature: ["uuid"],
        parent_directory: "",
    },
    ascii: {
        feature: ["ascii"],
        parent_directory: "",
    },
    variableConversion: {
        feature: ["variableConversion"],
        parent_directory: "",
    },
    jwt: {
        feature: ["jwt"],
        parent_directory: "",
    },
    hexString: {
        feature: ["stringToHex", "hexToString"],
        parent_directory: "",
    },
    text: {
        feature: ["text"],
        parent_directory: "",
    },
    html: {
        feature: ["html"],
        parent_directory: "",
    },
    binary: {
        feature: ["binary"],
        parent_directory: "",
    },
    arm: {
        feature: ["armToHex", "hexToArm"],
        parent_directory: "",
    },
    bcrypt: {
        feature: ["bcrypt"],
        parent_directory: "",
    },
    ipcalc: {
        feature: ["ipv4", "ipv6"],
        parent_directory: "",
    },
    sqlFillParameter: {
        feature: ["sqlFillParameter"],
        parent_directory: "",
    },
    httpSnippet: {
        feature: ["httpSnippet"],
        parent_directory: "",
    },
    dataValidation: {
        feature: ["bcc", "crc", "lrc"],
        parent_directory: "",
    },
    color: {
        feature: ["color"],
        parent_directory: "",
    },
    hmac: {
        feature: ["hmac"],
        parent_directory: "",
    },
    gzip: {
        feature: ["encoder", "decoder"],
        parent_directory: "",
    },
    punycode: {
        feature: ["encoder", "decoder"],
        parent_directory: "",
    },
    urlParse: {
        feature: ["urlParse"],
        parent_directory: "",
    },
    asn1: {
        feature: ["asn1"],
        parent_directory: "",
    },
    dockerCompose: {
        feature: ["dockerCompose"],
        parent_directory: "",
    },
    zhNumber: {
        feature: ["zhNumber"],
        parent_directory: "",
    },
} as const;

// 分类 配置
export const _categoryTool: Record<CategoryType, ToolType[]> = {
    encryption: ["hash", "hmac", "aes", "des", "tripleDes", "rc4", "rabbit", "sm2", "sm4", "rsa", "sign", "base64", "bcrypt"],
    check: ["sign", "regex", "diffs", "crontab", "bcrypt", "dataValidation"],
    encoder_decoder: ["base64", "url", "unicode", "jwt", "hexString", "html", "gzip", "asn1", "punycode"],
    conversion: ["json", "pinyin", "radix", "serialize", "unit", "time", "ascii", "variableConversion", "hexString", "arm", "httpSnippet", "color", "urlParse", "dockerCompose", "zhNumber"],
    generate: ["qrCode", "barcode", "randomString", "uuid", "binary", "ipcalc", "sqlFillParameter", "httpSnippet"],
    other: ["ip", "code", "websocket", "unit", "text"],
};

// 默认常用
export const _common: ToolType[] = ["hash", "json", "base64", "url", "time", "qrCode", "pinyin", "ip", "code", "unicode", "text", "randomString", "diffs"];


// ================ 类型定义 ================ //
export type ToolType = keyof typeof _tools
export type FeatureType<T extends ToolType = ToolType> = typeof _tools[T]["feature"][number]
export type CategoryType = typeof _categories[number]

export interface ToolInterface<T extends ToolType = ToolType> {
    name: T,
    features: FeatureInterface<T>[]
    categories: CategoryInterface[]
    directory: string;
    root: string;
    parentDirectory: string;

    addFeature(feature: FeatureInterface<T>): void;

    addCategory(category: CategoryInterface): void;

    inCategory(name: string): name is CategoryType

    existFeature(name: string): name is FeatureType<T>

    getFeature(name: FeatureType<T>): FeatureInterface<T>

    firstCategory(): CategoryInterface

    firstFeature(): FeatureInterface<T>

    isSimple(): boolean
}

export interface CategoryInterface<T extends CategoryType = CategoryType> {
    name: T,
    tools: ToolInterface[]

    existTool(name: string): boolean

    addTool(tool: ToolInterface): void;

    firstTool(): ToolInterface
}

export interface FeatureInterface<T extends ToolType = ToolType> {
    name: FeatureType<T>,
    tool: ToolInterface<T>

    getRouter(): string

    getKey(): string

    getComponentPath(): string

    getQuery(category?: string, other?: Record<string, any>): Record<string, any>
}

