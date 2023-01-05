import {release} from "ctool-adapter-base";
import {parse, join} from "path";
import {readdirSync, statSync} from "fs";
import os from 'os';

const platform = ["win32", "darwin"].includes(os.platform()) ? os.platform() : "linux";

const getTauriReleaseFile = (dir: string, name: string, extension: string) => {
    const path = join(__dirname, "../src-tauri/target/release", dir)
    const files = readdirSync(path).map(item => join(path, item)).filter(item => {
        return statSync(item).isFile()
    }) || []
    for (let file of files) {
        const fileInfo = parse(file)
        if (fileInfo.name.includes(name) && extension === fileInfo.ext) {
            return file
        }
    }
    return "";
}

(async () => {
    const files: { path: string, name: string }[] = []

    const filesPush = (path: string, name: string) => {
        if (path === "") {
            return;
        }
        files.push({path, name: `tauri_${name}`})
    }

    if (platform === "win32") {
        filesPush(getTauriReleaseFile("", 'ctool', '.exe'), "win.exe")
        filesPush(getTauriReleaseFile('bundle/msi', 'ctool', '.msi'), "win.msi")
    }
    if (platform === "darwin") {
        filesPush(getTauriReleaseFile("bundle/macos", 'ctool', '.app'), "mac.app")
        filesPush(getTauriReleaseFile("bundle/dmg", 'ctool', '.dmg'), "mac.dmg")
    }
    if (platform === "linux") {
        filesPush(getTauriReleaseFile("bundle/deb", 'ctool', '.deb'), "linux.deb")
        filesPush(getTauriReleaseFile("bundle/appimage", 'ctool', '.AppImage'), "linux.AppImage")
    }
    for (let file of files) {
        await release(file.path, file.name)
    }
})()
