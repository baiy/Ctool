# helper.initTheme

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ctool-site\src\helper.ts` (lines 62-68)
- **Role:** internal
- **Stability:** unknown

## Signature

```
() => {
    let theme = useSetting().theme.value;
    if (theme === "auto") {
        theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    document.getElementsByTagName("html")[0].dataset.theme = theme;
}
```

## Docstring

_No docstring provided._

## Source

```
export const initTheme = () => {
    let theme = useSetting().theme.value;
    if (theme === "auto") {
        theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    document.getElementsByTagName("html")[0].dataset.theme = theme;
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
