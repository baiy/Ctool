export type Option = {
    description: string,
    name: string
    type: "string" | "select" | "boolean"
    value?: any,
    defaultValue: any
}

export interface Transform {
    getLanguages(): string[]

    getOptionDefine(lang: string): Option[]

    execute(lang: string, input: string, options: Record<string, any>): Promise<string>
}
