const { join } = require("path");
const { mkdirSync, rmSync, readdirSync, statSync, writeFileSync } = require("fs");

// 发布初始化 清空 `./_release` 目录
const init = () => {
    const releasePath = join(__dirname, "_release");

    rmSync(releasePath, { recursive: true, force: true });
    mkdirSync(releasePath);
};

// 获取发布文件列表 生成发布文件日志
const get = () => {
    const releasePath = join(__dirname, "_release");
    const files =
        readdirSync(releasePath)
            .map(item => {
                return {
                    path: join(releasePath, item),
                    name: `./_release/${item}`,
                };
            })
            .filter(item => {
                return statSync(item.path).isFile();
            })
            .map(item => item.name) || [];
    const result = files.join("\n");
    writeFileSync(join(__dirname, "_release_files"), result);
    console.log(result);
};

// 清理 core dist 文件 github action 中使用
const clear = () => {
    rmSync(join(__dirname, "packages/ctool-core/dist/.git"), { recursive: true, force: true });
    rmSync(join(__dirname, "packages/ctool-core/dist/.nojekyll"), { force: true });
};

const run = () => {
    const args = process.argv.splice(2) || [];
    let type = "init";
    if (args.length > 0) {
        type = `${args[0]}`;
    }
    switch (type) {
        case "init":
            init();
            break;
        case "get":
            get();
            break;
        case "clear":
            clear();
            break;
        default:
            console.error("type error node ./release.js [init|get|clear]");
    }
};

run();
