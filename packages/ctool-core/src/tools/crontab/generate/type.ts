export type ItemType = "second" | "minute" | "hour" | "day" | "month" | "week"
export type OptionType = "any" | "scope" | "interval" | "list" | "ignore"
export type OptionValue = {
    any: "*",
    scope: {
        start: number,
        end: number,
    },
    interval: {
        start: string,
        step: number
    },
    list: (string | number)[]
}
