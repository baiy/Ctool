# Module: router

**File:** `\packages\ctool-core\src\helper\router.ts`

## Overview

Module `router` contains 1 analyzed entities.

```
import { createRouter, createWebHashHistory } from "vue-router";
import { ToolRouteConfig, RouteMeta } from "@/types";
import { toolRoutes } from "@/buildDataTemp";
import { getTool } from "@/config";

const routes: {
    name: string,
    path: string,
    component: any,
    meta: RouteMeta
}[] = [
    {
        name: "index",
        path: "/",
        component: () => import("@/block/Index.vue"),
        meta: { type: "index" },
    },
    {
        name: "clipboard",
        path: "/clipboard",
        component: () => import("@/block/Clipboard.vue"),
        meta: { type: "other" },
    },
    {
        name: "test",
        path: "/test",
        component: () => import("@/block/Test.vue"),
        meta: { type: "other" },
    },
    ...toolRoutes.map((item: ToolRouteConfig) => {
        const meta: RouteMeta = { type: "tool", tool: item.tool, feature: item.feature };
        return {
            name: `${item.tool}${item.feature ? `_${item.feature}` : ""}`,
            path: getTool(item.tool).getFeature(item.feature).getRouter(),
            meta: meta,
            component: item.component,
        };
    }),
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
router.afterEach((to, from, failure) => {
    if (failure) {
        console.log(to, from, failure);
    }
});

export default router;
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `router.buildRoute` | function | No description |

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
