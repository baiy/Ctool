# helper.update

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ctool-site\src\helper.ts` (lines 31-51)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(key: "locale" | "theme") => {
            if (key === "locale") {
                locale.value = locale.value === secondLocale ? defaultLocale : secondLocale;
                document.getElementsByTagName("html")[0].dataset.locale = locale.value;
            }
            if (key === "theme") {
                let _theme = theme.value;
                if (theme.value === "auto") {
                    _theme =
                        window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
                            ? "dark"
                            : "light";
                }
                theme.value = _theme === "dark" ? "light" : "dark";
            }
            const localStorageSetting = getSetting();
            localStorageSetting.v.items.locale = locale.value;
            localStorageSetting.v.items.theme = theme.value;
            localStorage.setItem(settingKey, JSON.stringify(localStorageSetting));
            initTheme();
        }
```

## Docstring

_No docstring provided._

## Source

```
        const update = (key: "locale" | "theme") => {
            if (key === "locale") {
                locale.value = locale.value === secondLocale ? defaultLocale : secondLocale;
                document.getElementsByTagName("html")[0].dataset.locale = locale.value;
            }
            if (key === "theme") {
                let _theme = theme.value;
                if (theme.value === "auto") {
                    _theme =
                        window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
                            ? "dark"
                            : "light";
                }
                theme.value = _theme === "dark" ? "light" : "dark";
            }
            const localStorageSetting = getSetting();
            localStorageSetting.v.items.locale = locale.value;
            localStorageSetting.v.items.theme = theme.value;
            localStorage.setItem(settingKey, JSON.stringify(localStorageSetting));
            initTheme();
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
