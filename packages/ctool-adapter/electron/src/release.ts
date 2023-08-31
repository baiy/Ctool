import { build, createTargets, Platform, Configuration } from "electron-builder";
import { release, getRootPackageJson } from "ctool-adapter-base";
import { parse, join } from "path";
import { rmSync, readFileSync } from "fs";

const rootPackage = getRootPackageJson();

const extraMetadata = {
    ...JSON.parse(readFileSync(join(__dirname, "../package.json")).toString()),
    version: rootPackage.version,
    description: rootPackage.description,
    homepage: rootPackage.homepage,
    repository: rootPackage.repository,
    author: rootPackage.author,
    license: rootPackage.license,
    main: "dist/main.js",
};

const options: Configuration = {
    productName: "ctool",
    appId: "org.baiy.ctool",
    asar: true,
    copyright: "Copyright © baiy",
    directories: {
        output: "_temp/",
    },
    files: ["./dist/**/*"],
    mac: {
        target: [
            {
                target: "zip",
                arch: ["x64", "arm64"],
            },
        ],
        artifactName: "electron_mac_${arch}.${ext}",
        icon: "./dist/web/icon/icon_1024.png",
    },
    win: {
        target: [
            {
                target: "zip",
                arch: ["x64"],
            },
        ],
        artifactName: "electron_win_${arch}.${ext}",
        icon: "./dist/web/icon/icon_1024.png",
    },
    linux: {
        target: [
            {
                target: "tar.gz",
                arch: ["x64"],
            },
        ],
        artifactName: "electron_linux_${arch}.${ext}",
        icon: "./dist/web/icon/icon_1024.png",
    },
    publish: null,
    extraMetadata,
};

(async () => {
    const platforms = [Platform.MAC, Platform.WINDOWS, Platform.LINUX];

    const files = await build({
        targets: createTargets(platforms),
        config: options,
    });
    for (let file of files) {
        if (file.includes(".blockmap")) {
            continue;
        }
        console.log(await release(file, parse(file).base));
    }
    rmSync(join(__dirname, "../_temp/"), { recursive: true, force: true });
})();
