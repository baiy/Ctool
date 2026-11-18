# helper.isToToolIndex

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ctool-site\src\helper.ts` (lines 70-76)
- **Role:** internal
- **Stability:** unknown

## Signature

```
() => {
    if (document.referrer === "app-info://platform/microsoft-store") {
        // 识别 Microsoft Store App
        return true;
    }
    return false;
};

e
```

## Docstring

_No docstring provided._

## Source

```
export const isToToolIndex = () => {
    if (document.referrer === "app-info://platform/microsoft-store") {
        // 识别 Microsoft Store App
        return true;
    }
    return false;
};
```

## Git History

- Commits: 5
- Authors: 1
- Bug fixes: 0
- Features: 0

## Callers

None

## Callees

None
