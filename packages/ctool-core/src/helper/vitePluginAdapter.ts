import build from "./build";
import {readFileSync} from "fs";
import {join} from "path";

export default () => {
    return {
        name: 'ctool-adapter',
        config: () => {
            build()
            const version = JSON.parse(readFileSync(join(__dirname, '../../../../package.json')).toString())['version']
            const updateTime = `${Date.parse((new Date()).toString()) / 1000}`
            return {
                define: {
                    CTOOL_VERSION: JSON.stringify(version),
                    CTOOL_UPDATE_TIME: JSON.stringify(updateTime),
                }
            }
        }
    }
}
