import {allLocales, buildI18n} from "./i18n"
import {buildRoute} from "./router"
import {buildKeywords} from "./keyword"
import {buildIcon} from "./icon"
import {buildAddition, buildData, buildType} from "./fileSystem";
import {copyFileSync} from "fs";
import {join} from "path";

export default () => {
    // 路由配置文件
    buildRoute();

    // 语言包
    buildI18n()

    // 关键字
    buildKeywords()

    // icon
    buildIcon()

    // 工具信息
    buildAddition.add('i18n', allLocales)

    // 复制其他文件
    copyFileSync(join(__dirname, '../../../../../', 'README.md'), join(__dirname, '../../../public', 'README.md'))
    copyFileSync(join(__dirname, '../../../../../', 'LICENSE'), join(__dirname, '../../../public', 'LICENSE'))

    // 编译数据写入
    buildData.write()
    buildType.write()
    buildAddition.write()
}
