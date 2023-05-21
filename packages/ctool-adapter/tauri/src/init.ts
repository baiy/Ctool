// 同步文件
import {join} from "path";
import {copyCoreDist, version, getRootPackageJson} from "ctool-adapter-base";
import {mkdirSync, readFileSync, rmSync, writeFileSync} from "fs";

const tempPath = join(__dirname, 'web')
rmSync(tempPath, {recursive: true, force: true});
mkdirSync(tempPath);

// 核心文件
copyCoreDist(tempPath)

// 重写首页跳转文件
writeFileSync(join(tempPath, 'index.html'), readFileSync(join(__dirname, '../index.html')).toString())

// 清理文件
const configFilePath = join(__dirname, '../src-tauri/tauri.conf.json5')
const iconsPath = join(__dirname, '../src-tauri/icons')
const targetPath = join(__dirname, '../src-tauri/target')
rmSync(configFilePath, {force: true});
rmSync(iconsPath, {recursive: true, force: true});
rmSync(targetPath, {recursive: true, force: true});

// 生成`tauri`配置文件
const config = readFileSync(join(__dirname, '../src-tauri/tauri.conf.template.json5')).toString()
    .replace(new RegExp("##version##", 'g'), version())
    .replace(new RegExp("##description##", 'g'), getRootPackageJson()['description']);
writeFileSync(configFilePath, `// 程序自动生成 => ./tauri.conf.template.json5\n${config}`)
