# Architecture: Ctool

Ctool is a comprehensive toolkit designed to provide a wide range of utilities and tools for various programming and development tasks. It is built around a modular architecture, with each module focusing on a specific aspect of functionality.

## How it is laid out

The project is organized into several directories, each serving a specific purpose:

- `api/`: Contains API definitions and interfaces.
- `packages/ctool-adapter/`: Houses adapters for different platforms and environments.
- `packages/ctool-config/`: Manages configuration and generation tasks.
- `packages/ctool-core/`: Core functionality, including tools and helpers.
- `packages/ctool-site/`: Configuration and setup for the project site.

## Key modules

| Name | Path | Commits | Bug Fixes |
|------|------|---------|-----------|
| `type.d` | `packages/ctool-core/src/components/type.d.ts` | 18 | 2 |
| `action` | `packages/ctool-core/src/store/action.ts` | 8 | 0 |
| `vite-env.d` | `packages/ctool-core/src/vite-env.d.ts` | 8 | 1 |
| `vite.config` | `packages/ctool-site/vite.config.ts` | 7 | 0 |
| `code` | `packages/ctool-core/src/helper/code.ts` | 5 | 0 |
| `operate` | `packages/ctool-core/src/store/operate.ts` | 5 | 2 |
| `runtime` | `packages/ctool-core/src/helper/platform/runtime.ts` | 5 | 1 |
| `icon` | `packages/ctool-config/src/generate/icon.ts` | 4 | 1 |
| `json` | `packages/ctool-core/src/tools/code/formatter/json.ts` | 4 | 1 |
| `monaco` | `packages/ctool-core/src/components/editor/monaco.ts` | 4 | 0 |
| `placeholderContentWidget` | `packages/ctool-core/src/components/editor/placeholderContentWidget.ts` | 4 | 0 |
| `platformRuntimeDefault` | `packages/ctool-core/src/helper/platform/platformRuntimeDefault.ts` | 4 | 0 |
| `proxy` | `packages/ctool-config/src/proxy.ts` | 4 | 1 |
| `quickType` | `packages/ctool-core/src/tools/json/toObject/quickType.ts` | 4 | 0 |
| `types` | `packages/ctool-core/src/tools/code/formatter/types.ts` | 4 | 0 |
| `vitePlugin` | `packages/ctool-site/vitePlugin.ts` | 4 | 0 |

## Public API surface

The public API includes entry points such as `action`, `vite-env.d`, and `vite.config`, which are essential for setting up and managing the project.

## Hotspots and gotchas

The modules with the highest churn and bug-fix commits are:

- `type.d` (18 commits, 2 bug fixes)
- `operate` (5 commits, 2 bug fixes)
- `icon` (4 commits, 1 bug fix)
- `json` (4 commits, 1 bug fix)
- `proxy` (4 commits, 1 bug fix)

These areas are particularly prone to breaking changes, so new contributors should be cautious when working with them.