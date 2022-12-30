import {allLocales, buildI18n} from "./generate/i18n"
import {buildRoute} from "./generate/router"
import {buildKeywords} from "./generate/keyword"
import {buildIcon} from "./generate/icon"
import {buildAddition, buildData, buildType} from "./generate/fileSystem";
import {copyFileSync} from "fs";
import {join} from "path";

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
copyFileSync(join(__dirname, '../../../', 'README.md'), join(__dirname, '../../../packages/ctool-core/public', 'README.md'))
copyFileSync(join(__dirname, '../../../', 'LICENSE'), join(__dirname, '../../../packages/ctool-core/public', 'LICENSE'))

// 编译数据写入
buildData.write()
buildType.write()
buildAddition.write()
