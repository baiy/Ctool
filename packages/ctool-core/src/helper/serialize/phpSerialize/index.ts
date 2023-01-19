import unserialize from "./unserialize"
import serialize from "./serialize"

export default {
    parse<T = any>(value = ""): T {
        return unserialize(value)
    },
    stringify(json: any): string {
        return serialize(json)
    }
}
