# Module: fileSystem

**File:** `\packages\ctool-config\src\generate\fileSystem.ts`

## Overview

Module `fileSystem` contains 3 analyzed entities.

```
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

const getFileSys
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `fileSystem.remove` | function | No description |
| `fileSystem.
}

export co` | function | No description |
| `fileSystem.fileSystem` | class | No description |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 1
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
