# helper.tring)

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ctool-site\src\helper.ts` (lines 97-137)
- **Role:** internal
- **Stability:** unknown

## Signature

```
 {
    let lists: FeatureInterface[] = [];
    if (input === "") {
        // 默认暂时
        const recently: string[] = JSON.parse(localStorage.getItem(operateKey) || "{}")?.v?.items?.recently || [];

        lists = [
            ...new Set([
                ...(recently
                    .filter(item => {
                        const [tool, feature] = item.split("-");
                        return toolExists(tool) && getTool(tool).existFeature(feature);
                    })
                    .map(item => {
                        const [tool, feature] = item.split("-");
                        return getTool(tool as ToolType).getFeature(feature as any);
                    }) || []),
                ...commonTool.map(name => {
                    return getTool(name).firstFeature();
                }),
            ]),
        ].slice(0, 12);
    } else {
        lists = allKeywords
            .filter(item => item.search.join(",").includes(input.toLowerCase()))
            .map(item => {
                return getTool(item.name as ToolType).getFeature(item.feature as FeatureType);
            })
            .slice(0, 20);
    }

    return lists.map(feature => {
        const tool = feature.tool;
        return {
            label: `${translation(`tool_${tool.name}`)}${
                tool.isSimple() ? `` : ` - ${translation(`tool_${tool.name}_${feature.name}`)}`
            }`,
            url: `/tool.html#${feature.getRouter()}`,
        };
    });
};

```

## Docstring

_No docstring provided._

## Source

```
export const search = (input: string) => {
    let lists: FeatureInterface[] = [];
    if (input === "") {
        // 默认暂时
        const recently: string[] = JSON.parse(localStorage.getItem(operateKey) || "{}")?.v?.items?.recently || [];

        lists = [
            ...new Set([
                ...(recently
                    .filter(item => {
                        const [tool, feature] = item.split("-");
                        return toolExists(tool) && getTool(tool).existFeature(feature);
                    })
                    .map(item => {
                        const [tool, feature] = item.split("-");
                        return getTool(tool as ToolType).getFeature(feature as any);
                    }) || []),
                ...commonTool.map(name => {
                    return getTool(name).firstFeature();
                }),
            ]),
        ].slice(0, 12);
    } else {
        lists = allKeywords
            .filter(item => item.search.join(",").includes(input.toLowerCase()))
            .map(item => {
                return getTool(item.name as ToolType).getFeature(item.feature as FeatureType);
            })
            .slice(0, 20);
    }

    return lists.map(feature => {
        const tool = feature.tool;
        return {
            label: `${translation(`tool_${tool.name}`)}${
                tool.isSimple() ? `` : ` - ${translation(`tool_${tool.name}_${feature.name}`)}`
            }`,
            url: `/tool.html#${feature.getRouter()}`,
        };
    });
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
