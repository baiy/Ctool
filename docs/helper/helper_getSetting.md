# helper.getSetting

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ctool-site\src\helper.ts` (lines 22-24)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(): { v: { items: { locale: Locale; theme: ThemeType } } } => {
    return JSON.parse(localStorage.getItem(settingKey) || `{"e":0,"v":{"items":{"locale":"_default","theme":"auto"}}}`);
}
```

## Docstring

_No docstring provided._

## Source

```
export const getSetting = (): { v: { items: { locale: Locale; theme: ThemeType } } } => {
    return JSON.parse(localStorage.getItem(settingKey) || `{"e":0,"v":{"items":{"locale":"_default","theme":"auto"}}}`);
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
