import {copyCoreDist, release, replaceFileContent, version} from "ctool-adapter-base";
import {proxy} from "ctool-config";
import {cpSync, mkdirSync, rmSync} from "fs";
import {join} from "path";

(async () => {
    const tempPath = join(__dirname, '../_temp')
    rmSync(tempPath, {recursive: true, force: true});
    mkdirSync(tempPath);

    // 核心文件
    copyCoreDist(tempPath)
    // 平台文件
    cpSync(join(__dirname, '../resources'), tempPath, {recursive: true})
    // 写入版本号
    replaceFileContent(join(tempPath, 'manifest.json'), '##version##', version())
    // 写入权限字符串
    const permissions = proxy.getManifestPermissions()
    replaceFileContent(
        join(tempPath, 'manifest.json'),
        '"##permissions##",',
        permissions.length === 0 ? "" : `"${permissions.join('",\n"')}",\n`
    )
    // 发布
    console.info(`chrome: ${await release(tempPath, 'chrome')}`)
    // 移除临时目录
    rmSync(tempPath, {recursive: true, force: true});
})()
