# vitePlugin.translation

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ctool-site\vitePlugin.ts` (lines 7-12)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(key: string) => {
    if (key in i18n.detail.en) {
        return i18n.detail.en[key]['message']
    }
    return key
}
```

## Docstring

_No docstring provided._

## Source

```
export const translation = (key: string) => {
    if (key in i18n.detail.en) {
        return i18n.detail.en[key]['message']
    }
    return key
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
