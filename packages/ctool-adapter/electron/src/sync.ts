// 同步文件
import {join} from "path";
import {copyCoreDist} from "ctool-adapter-base";
import {mkdirSync, readFileSync, rmSync, writeFileSync} from "fs";

const tempPath = join(__dirname, 'web')
rmSync(tempPath, {recursive: true, force: true});
mkdirSync(tempPath);

// 核心文件
copyCoreDist(tempPath)

// 重写首页跳转文件
writeFileSync(join(tempPath, 'index.html'), readFileSync(join(__dirname, '../index.html')).toString())
