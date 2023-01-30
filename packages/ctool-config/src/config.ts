// 分类 定义
const _categories = ['encryption', 'conversion', 'encoder_decoder', 'check', 'generate', 'other'] as const

// 工具 - 功能 - 父目录 定义
export let _tools = {
    hash: {
        feature: ['hash'],
        parent_directory: "",
        keywords: ['md5', 'sha1', 'sha256', 'sha512', 'sm3']
    },
    aes: {
        feature: ['encrypt', 'decrypt'],
        parent_directory: "encrypt",
        keywords: []
    },
    des: {
        feature: ['encrypt', 'decrypt'],
        parent_directory: "encrypt",
        keywords: []
    },
    tripleDes: {
        feature: ['encrypt', 'decrypt'],
        parent_directory: "encrypt",
        keywords: []
    },
    rc4: {
        feature: ['encrypt', 'decrypt'],
        parent_directory: "encrypt",
        keywords: []
    },
    rabbit: {
        feature: ['encrypt', 'decrypt'],
        parent_directory: "encrypt",
        keywords: []
    },
    sm2: {
        feature: ['encrypt', 'decrypt', 'sign', 'verify'],
        parent_directory: "encrypt",
        keywords: []
    },
    sm4: {
        feature: ['encrypt', 'decrypt'],
        parent_directory: "encrypt",
        keywords: []
    },
    sign: {
        feature: ['sign'],
        parent_directory: "",
        keywords: []
    },
    base64: {
        feature: ['encoder', 'decoder'],
        parent_directory: "",
        keywords: []
    },
    json: {
        feature: ['json'],
        parent_directory: "",
        keywords: []
    },
    url: {
        feature: ['encoder', 'decoder'],
        parent_directory: "",
        keywords: []
    },
    qrCode: {
        feature: ['generate', 'parse'],
        parent_directory: "",
        keywords: []
    },
    barcode: {
        feature: ['barcode'],
        parent_directory: "",
        keywords: []
    },
    pinyin: {
        feature: ['pinyin'],
        parent_directory: "",
        keywords: []
    },
    ip: {
        feature: ['ip'],
        parent_directory: "",
        keywords: []
    },
    code: {
        feature: ['code'],
        parent_directory: "",
        keywords: ["js", "javascript", "markdown", "typescript", "css", "less", "scss", "yaml", "html", "xml", "php", "vue", "angular", "graphql", "sql"]
    },
    unicode: {
        feature: ['encoder', 'decoder'],
        parent_directory: "",
        keywords: []
    },
    radix: {
        feature: ['radix'],
        parent_directory: "",
        keywords: []
    },
    regex: {
        feature: ['regex'],
        parent_directory: "",
        keywords: []
    },
    randomString: {
        feature: ['randomString'],
        parent_directory: "",
        keywords: []
    },
    serialize: {
        feature: ['serialize'],
        parent_directory: "",
        keywords: []
    },
    diffs: {
        feature: ['diffs'],
        parent_directory: "",
        keywords: []
    },
    crontab: {
        feature: ['crontab'],
        parent_directory: "",
        keywords: []
    },
    websocket: {
        feature: ['websocket'],
        parent_directory: "",
        keywords: []
    },
    unit: {
        feature: ['unit'],
        parent_directory: "",
        keywords: []
    },
    time: {
        feature: ['timestamp', 'timezone', 'calculator'],
        parent_directory: "",
        keywords: []
    },
    uuid: {
        feature: ['uuid'],
        parent_directory: "",
        keywords: []
    },
    ascii: {
        feature: ['ascii'],
        parent_directory: "",
        keywords: []
    },
    variableConversion: {
        feature: ['variableConversion'],
        parent_directory: "",
        keywords: []
    },
    jwt: {
        feature: ['jwt'],
        parent_directory: "",
        keywords: []
    },
    hexString: {
        feature: ['stringToHex', 'hexToString'],
        parent_directory: "",
        keywords: []
    },
    text: {
        feature: ['text'],
        parent_directory: "",
        keywords: []
    },
    html: {
        feature: ['html'],
        parent_directory: "",
        keywords: []
    },
    binary: {
        feature: ['binary'],
        parent_directory: "",
        keywords: []
    },
    arm: {
        feature: ['armToHex', 'hexToArm'],
        parent_directory: "",
        keywords: []
    },
    bcrypt: {
        feature: ['bcrypt'],
        parent_directory: "",
        keywords: []
    },
    ipcalc: {
        feature: ['ipv4','ipv6'],
        parent_directory: "",
        keywords: []
    },
    sqlFillParameter: {
        feature: ['sqlFillParameter'],
        parent_directory: "",
        keywords: []
    },
    httpSnippet: {
        feature: ['httpSnippet'],
        parent_directory: "",
        keywords: []
    },
    dataValidation: {
        feature: ['bcc', 'crc', 'lrc'],
        parent_directory: "",
        keywords: ['异或校验', '循环冗余校验', '纵向冗余校验', '数据校验']
    },
} as const;

// 分类 配置
export const _categoryTool: Record<CategoryType, ToolType[]> = {
    encryption: ["hash", "aes", "des", "tripleDes", "rc4", "rabbit", "sm2", "sm4", "sign", "base64", "bcrypt"],
    check: ["sign", "regex", "diffs", "crontab", "bcrypt", "dataValidation"],
    encoder_decoder: ["base64", "url", "unicode", "jwt", "hexString", "html"],
    conversion: ["json", "pinyin", "radix", "serialize", "unit", "time", "ascii", "variableConversion", "hexString", "arm", "httpSnippet"],
    generate: ["qrCode", "barcode", "randomString", "uuid", "binary", "ipcalc", "sqlFillParameter", "httpSnippet"],
    other: ["ip", "code", "websocket", "unit", "text"]
}

// 默认常用
export const _common: ToolType[] = ['hash', 'json', 'base64', 'url', 'time', 'qrCode', 'pinyin', 'ip', 'code', 'unicode', 'text', 'randomString', 'diffs']


// ================ 类型定义 ================ //
export type ToolType = keyof typeof _tools
export type FeatureType<T extends ToolType = ToolType> = typeof _tools[T]['feature'][number]
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

