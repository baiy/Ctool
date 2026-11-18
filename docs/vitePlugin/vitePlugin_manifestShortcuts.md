# vitePlugin.manifestShortcuts

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ctool-site\vitePlugin.ts` (lines 29-62)
- **Role:** internal
- **Stability:** unknown

## Signature

```
() => {
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
```

## Docstring

_No docstring provided._

## Source

```
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
```

## Git History

- Commits: 4
- Authors: 1
- Bug fixes: 0
- Features: 0

## Callers

None

## Callees

None
