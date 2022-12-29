// 同步文件
import {join} from "path";
import {copyCoreDist} from "ctool-adapter-base";
import {mkdirSync, rmSync} from "fs";

const tempPath = join(__dirname, 'web')
rmSync(tempPath, {recursive: true, force: true});
mkdirSync(tempPath);

// 核心文件
copyCoreDist(tempPath)
