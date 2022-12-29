import {stringify} from "qs";
import {version} from "./util"
import {getCurrentLocale} from "@/i18n"
import platform from "./platform"
import {getUserUuid} from "@/store/user"

export const report = (data: Record<string, any> = {}) => {
    setTimeout(() => {
        try {
            let img = new Image(1, 1);
            img.src = 'https://www.baiy.org/chrome_tool/stat/?' + stringify({
                v: version,
                u: getUserUuid(),
                p: platform.name,
                l: getCurrentLocale(),
                r: Math.random(),
                ...data
            });
        } catch (e) {
        }
    }, 3000)
}
