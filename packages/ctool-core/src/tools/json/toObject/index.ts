import {ToObjectType, ToObjectOptions} from "../define"

export default (type: ToObjectType, json: string, {class_name = "", package_name = "", is_inline = true}: ToObjectOptions = {}) => {
    return new Promise<string>(async (resolve, reject) => {
        try {
            json = json.trim()
            if (json === "") {
                return resolve("")
            }
            if (type === "PHP") {
                const handle = await import('./php').then(m => m.convert)
                return resolve(handle(json, {className: class_name, namespace: package_name}))
            }
            if (type === "Java") {
                const handle = await import('./java').then(m => m.convert)
                return resolve(handle(json, class_name, package_name))
            }
            if (type === "C#") {
                const handle = await import('./cSharp').then(m => m.convert)
                return resolve(handle(json, class_name, package_name))
            }
            if (type === "Dart") {
                const handle = await import('./dart').then(m => m.convert)
                return resolve(handle(json, class_name))
            }
            if (type === "Go") {
                const handle = await import('./go').then(m => m.convert)
                return resolve(handle(json, class_name, package_name))
            }
            if (type === "Protobuf") {
                const handle = await import('./protobuf').then(m => m.convert)
                const result = handle(json, {inline: is_inline, googleProtobufTimestamp: false, mergeSimilarObjects: false})
                if (result.error !== "") {
                    throw new Error(result.error)
                }
                return resolve(result.success)
            }
        } catch (e) {
            reject($error(e))
        }
        return resolve("")
    })
}
