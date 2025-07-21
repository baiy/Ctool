const { resolve } = require("path");
const { rmSync } = require("fs");


const lists = [
    "packages/ctool-adapter/base",
    "packages/ctool-adapter/chrome",
    "packages/ctool-adapter/edge",
    "packages/ctool-adapter/firefox",
    "packages/ctool-adapter/tauri",
    "packages/ctool-adapter/utools",
    "packages/ctool-adapter/web",
    "packages/ctool-config",
    "packages/ctool-core",
    "packages/ctool-site",
];

lists.forEach(item => {
    let removePath = resolve(__dirname, `${item}/dist/`);
    console.log(removePath);
    rmSync(removePath, { recursive: true, force: true });
    removePath = resolve(__dirname, `${item}/node_modules/`);
    console.log(removePath);
    rmSync(removePath, { recursive: true, force: true });
});
rmSync(resolve(__dirname, `node_modules/`), { recursive: true, force: true });
