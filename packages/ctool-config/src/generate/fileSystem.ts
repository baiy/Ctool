import {join, dirname} from "path";
import {existsSync, writeFileSync, readFileSync, statSync, readdirSync, unlinkSync, rmdirSync, mkdirSync, cpSync} from "fs";

const remove = (path: string) => {
    if (existsSync(path)) {
        if (statSync(path).isFile()) {
            unlinkSync(path);
            return;
        }
        readdirSync(path).forEach((file) => remove(join(path, file)))
        rmdirSync(path);
    }
}

const Root = join(__dirname, '../../ctool-core')

class fileSystem {
    base: string

    constructor(base = "/") {
        this.base = join(Root, base)
    }

    // 相对路径转绝对路径
    getPath(path: string) {
        return join(this.base, path)
    }

    // 路径是否存在
    exists(path: string) {
        return existsSync(this.getPath(path))
    }

    // 目录是否存在
    isDir(path: string) {
        return this.exists(path) && statSync(this.getPath(path)).isDirectory()
    }

    // 文件是否存在
    isFile(path: string) {
        return this.exists(path) && statSync(this.getPath(path)).isFile()
    }

    // 写入文件
    writeFile(file: string, content: string = "") {
        let dir = dirname(file)
        if (!this.isDir(dir)) {
            throw new Error(`${dir} dir not found`)
        }
        return writeFileSync(this.getPath(file), content)
    }

    // 读取文件
    readFile(file: string, encoding: BufferEncoding = "utf-8") {
        return readFileSync(this.getPath(file), encoding).toString()
    }

    // 读取目录
    readdir(dir: string, include: string = "") {
        return readdirSync(this.getPath(dir)).filter((item) => {
            return !include || item.includes(include)
        })
    }

    cpSync(src: string, dest: string) {
        cpSync(
            src,
            this.getPath(dest),
            {recursive: true}
        )
    }


    mkdir(dir) {
        if (!this.isDir(dir)) {
            mkdirSync(this.getPath(dir), {recursive: true});
        }
    }

    // 移除文件/目录
    remove(path) {
        remove(this.getPath(path))
    }
}

const getFileSystem = (root: string = "") => {
    return new fileSystem(root.replace(Root, ''))
}

export const fileCoreSrc = getFileSystem('src')
export const fileCoreRoot = getFileSystem()

const _buildData: [string[], string[]] = [[], []]
const _buildType: [string[], string[]] = [[], []]
const _buildConfig: Record<string, any> = {}

// 编译数据
export const buildData = {
    append(str: string, description?: string) {
        _buildData[1].push(...[...(description !== undefined ? [`// ${description}`] : []), str])
    },
    prepend(str: string, description?: string) {
        _buildData[0].push(...[...(description !== undefined ? [`// ${description}`] : []), str])
    },
    write() {
        fileCoreSrc.writeFile('buildDataTemp.ts', ["// 程序自动生成文件无需手动修改\n", ..._buildData[0], `\n`, ..._buildData[1]].join("\n"))
    }
}

// 编译类型
export const buildType = {
    append(str: string, description?: string) {
        _buildType[1].push(...[...(description !== undefined ? [`// ${description}`] : []), str])
    },
    prepend(str: string, description?: string) {
        _buildType[0].push(...[...(description !== undefined ? [`// ${description}`] : []), str])
    },
    write() {
        fileCoreSrc.writeFile('buildTypeTemp.d.ts', ["// 程序自动生成文件无需手动修改\n", ..._buildType[0], `\n`, ..._buildType[1]].join("\n"))
    }
}

// 编译附加数据
export const buildAddition = {
    add(name: string, data: any) {
        _buildConfig[name] = data
    },
    write() {
        fileCoreRoot.writeFile('public/ctool.addition.json', JSON.stringify(_buildConfig, null, '\t'))
    }
}

