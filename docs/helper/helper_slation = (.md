# helper.slation = (

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ctool-site\src\helper.ts` (lines 78-87)
- **Role:** internal
- **Stability:** unknown

## Signature

```
: string) => {
    let l = useSetting().locale.value === "_default" ? defaultLocale : useSetting().locale.value;
    if (key in i18n[l]) {
        return i18n[l][key];
    }
    if (key in coreI18n.detail[l]) {
        return coreI18n.detail[l][key]["message"];
    }
    return key;
};

/
```

## Docstring

_No docstring provided._

## Source

```
export const translation = (key: string) => {
    let l = useSetting().locale.value === "_default" ? defaultLocale : useSetting().locale.value;
    if (key in i18n[l]) {
        return i18n[l][key];
    }
    if (key in coreI18n.detail[l]) {
        return coreI18n.detail[l][key]["message"];
    }
    return key;
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
