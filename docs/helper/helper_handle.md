# helper.handle

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ctool-site\src\helper.ts` (lines 27-55)
- **Role:** internal
- **Stability:** unknown

## Signature

```
() => {
        const setting = getSetting();
        const locale = ref(setting.v.items.locale);
        const theme = ref(setting.v.items.theme);
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
        document.getElementsByTagName("html")[0].dataset.locale =
            locale.value === secondLocale ? defaultLocale : secondLocale;
        return { locale, theme, update };
    }
```

## Docstring

_No docstring provided._

## Source

```
    const handle = () => {
        const setting = getSetting();
        const locale = ref(setting.v.items.locale);
        const theme = ref(setting.v.items.theme);
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
        document.getElementsByTagName("html")[0].dataset.locale =
            locale.value === secondLocale ? defaultLocale : secondLocale;
        return { locale, theme, update };
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
