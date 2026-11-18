# Module: vitePlugin

**File:** `\packages\ctool-site\vitePlugin.ts`

## Overview

Module `vitePlugin` contains 4 analyzed entities.

```
import {Plugin, ResolvedConfig} from "vite";
import {join} from "path";
import {cpSync, readFileSync, writeFileSync} from "fs";
import {tools} from 'ctool-config'

const {i18n} = JSON.parse(readFileSync(join(__dirname, '../ctool-core/public/ctool.addition.json')).toString())
export const translation = (key: string) => {
    if (key in i18n.detail.en) {
        return i18n.detail.en[key]['message']
    }
    return key
}

const copyCore = (config: ResolvedConfig) => {
    const dist = join(config.root, config.build.outDir)
    const coreDist = join(__dirname, '../ctool-core/dist/')
    cpSync(coreDist, dist, {recursive: true})
}

const generateManifestFile = (config) => {
    writeFileSync(
        join(config.root, config.build.outDir, 'manifest.webmanifest.json'),
        readFileSync(join(config.root, 'manifest.webmanifest.json')).toString().replace(
            '"#shortcuts#"', JSON.stringify(manifestShortcuts())
        )
    )
}

const manifestShortcuts = () => {
    let lists: {
        name: string,
        short_name: string,
        description: string,
        url: string,
        icons: {
            src: string,
            sizes: string
        }[]
    }[] = [];
    tools.forEach(tool => {
        tool.features.forEach(feature => {
            const name = `${translation(`tool_${tool.name}`)}${tool.isSimple() ? `` : ` - ${translation(`tool_${tool.name}_${feature.name}`)}`}`
            lists.push({
                name,
                short_name: name,
                description: `Ctool ${name}`,
                url: `/tool.html#${feature.getRouter()}`,
                icons: [
                    {
                        src: "/icon/icon_96.png",
                        sizes: "96x96",
                    },
                    {
                        src: "/icon/icon_512.png",
                        sizes: "512x512",
                    }
                ]
            })
        })
    })
    return lists
}

// 复制核心文件 插入内联js 生成
export default ()
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `vitePlugin.translation` | function | No description |
| `vitePlugin.manifestShortcuts` | function | No description |
| `vitePlugin.generateManifestFile` | function | No description |
| `vitePlugin.copyCore` | function | No description |

## Git History

- Commits: 4
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
