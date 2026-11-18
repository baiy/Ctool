# vitePlugin.copyCore

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ctool-site\vitePlugin.ts` (lines 14-18)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(config: ResolvedConfig) => {
    const dist = join(config.root, config.build.outDir)
    const coreDist = join(__dirname, '../ctool-core/dist/')
    cpSync(coreDist, dist, {recursive: true})
}
```

## Docstring

_No docstring provided._

## Source

```
const copyCore = (config: ResolvedConfig) => {
    const dist = join(config.root, config.build.outDir)
    const coreDist = join(__dirname, '../ctool-core/dist/')
    cpSync(coreDist, dist, {recursive: true})
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
