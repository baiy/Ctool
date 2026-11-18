# vitePlugin.generateManifestFile

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ctool-site\vitePlugin.ts` (lines 20-27)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(config) => {
    writeFileSync(
        join(config.root, config.build.outDir, 'manifest.webmanifest.json'),
        readFileSync(join(config.root, 'manifest.webmanifest.json')).toString().replace(
            '"#shortcuts#"', JSON.stringify(manifestShortcuts())
        )
    )
}
```

## Docstring

_No docstring provided._

## Source

```
const generateManifestFile = (config) => {
    writeFileSync(
        join(config.root, config.build.outDir, 'manifest.webmanifest.json'),
        readFileSync(join(config.root, 'manifest.webmanifest.json')).toString().replace(
            '"#shortcuts#"', JSON.stringify(manifestShortcuts())
        )
    )
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
