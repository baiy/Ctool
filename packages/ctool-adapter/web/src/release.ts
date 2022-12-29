import {copyCoreDist, release} from "ctool-adapter-base";
import {mkdirSync, rmSync} from "fs";
import {join} from "path";


(async () => {
    const tempPath = join(__dirname, '../_temp')
    rmSync(tempPath, {recursive: true, force: true});
    mkdirSync(tempPath);
    // 核心文件
    copyCoreDist(tempPath)
    // 发布
    console.info(`web: ${await release(tempPath, 'web')}`)
    // 移除临时目录
    rmSync(tempPath, {recursive: true, force: true});
})()
