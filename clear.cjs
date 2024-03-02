const { resolve } = require("path");
const { rmSync } = require("fs");


const lists = [
    "packages/ctool-adapter/base",
    "packages/ctool-adapter/chrome",
    "packages/ctool-adapter/edge",
    "packages/ctool-adapter/electron",
    "packages/ctool-adapter/firefox",
    "packages/ctool-adapter/tauri",
    "packages/ctool-adapter/utools",
    "packages/ctool-adapter/web",
    "packages/ctool-adapter/ctool-config",
    "packages/ctool-adapter/ctool-core",
    "packages/ctool-adapter/ctool-site",
];

lists.forEach(item => {
    const removePath = resolve(__dirname, `${item}/dist/`);
    console.log(removePath)
    rmSync(removePath, { recursive: true, force: true });
});
