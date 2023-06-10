import dayjs, {Dayjs} from "dayjs";

enum InputType {
    error,
    empty,
    normal,
    unix
}

enum Format {
    second = "second",
    millisecond = "millisecond",
    nanosecond = "nanosecond",
}

type TimeType = {
    type: InputType,
    format: Format,
}

type Output = {
    isValid: boolean
    second: string
    millisecond: string
    nanosecond: string
    format?: Format
    autoFormat?: Format
    type?: InputType
}

const formatDecimalLength = {
    second: 0,
    millisecond: 3,
    nanosecond: 9,
}

const transform = (input: string, timezone: string, format: Format | "auto" = "auto"): Output => {
    const {type, format: _format} = getTimeType(input)
    format = (format === "auto" ? _format : format) as Format
    try {
        if (type === InputType.empty) {
            return {
                isValid: false,
                second: "",
                millisecond: "",
                nanosecond: "",
            }
        }

        if (type === InputType.error) {
            throw new Error($t('time_error_format'))
        }

        let decimal: string
        let time: Dayjs
        const decimalLength = formatDecimalLength[format]

        if (type === InputType.normal) {
            const fragment = input.split(".")
            decimal = (fragment[1] || "").slice(0, decimalLength)
            time = dayjs.tz(fragment[0], timezone)
        } else {
            time = dayjs(parseInt(decimalLength ? input.slice(0, -1 * decimalLength) : input) * 1000).tz(timezone)
            decimal = decimalLength ? input.slice(-1 * decimalLength) : ""
        }
        if (!time.isValid()) {
            throw new Error($t('time_error_format'))
        }

        const second = type === InputType.normal ? time.unix().toString() : time.format('YYYY-MM-DD HH:mm:ss');
        const millisecond = decimal.slice(0, formatDecimalLength.millisecond).padEnd(formatDecimalLength.millisecond, "0");
        const nanosecond = decimal.slice(0, formatDecimalLength.nanosecond).padEnd(formatDecimalLength.nanosecond, "0");
        const separator = type === InputType.normal ? "" : "."
        return {
            isValid: true,
            second,
            millisecond: `${second}${separator}${millisecond}`,
            nanosecond: `${second}${separator}${nanosecond}`,
            format,
            autoFormat: _format,
            type
        }
    } catch (e) {
        const error = $error(e)
        return {
            isValid: false,
            second: error,
            millisecond: error,
            nanosecond: error,
            type, format,autoFormat: _format,
        }
    }
}

const getTimeType = (input: string): TimeType => {
    if (input === "") {
        return {type: InputType.empty, format: Format.second}
    }
    if ((new RegExp(/^\d+-\d+-\d+ \d+:\d+:\d+$/)).test(input)) {
        return {type: InputType.normal, format: Format.second}
    }
    if ((new RegExp(/^\d+-\d+-\d+ \d+:\d+:\d+\.\d{0,3}$/)).test(input)) {
        return {type: InputType.normal, format: Format.millisecond}
    }
    if ((new RegExp(/^\d+-\d+-\d+ \d+:\d+:\d+\.\d{4,9}$/)).test(input)) {
        return {type: InputType.normal, format: Format.nanosecond}
    }
    if ((new RegExp(/^-?\d{1,12}$/)).test(input)) {
        return {type: InputType.unix, format: Format.second}
    }
    if ((new RegExp(/^-?\d{13,16}$/)).test(input)) {
        return {type: InputType.unix, format: Format.millisecond}
    }
    if ((new RegExp(/^-?\d{17,}$/)).test(input)) {
        return {type: InputType.unix, format: Format.nanosecond}
    }
    return {type: InputType.error, format: Format.second}
}

export {Format, transform, InputType}
