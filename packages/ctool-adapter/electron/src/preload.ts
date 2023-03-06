import {contextBridge} from "electron";
import bridge from "./bridge";
import {existsSync} from "fs";
import path from "path";
import http from "https";
import {homedir} from "os";

contextBridge.exposeInMainWorld('ctoolDesktopBridge', bridge)

// 是否使用离线版本
contextBridge.exposeInMainWorld('ctoolIsUseOffline', () => {
    return new Promise<{ is: boolean, text: string }>((resolve) => {
        let is = false
        const back = (b: boolean, t: string) => {
            if (!is) {
                is = true;
                resolve({is: b, text: t})
            }
        }
        if (existsSync(path.join(homedir(), ".ctool.electron_use_local_file.lock"))) {
            // 强制使用本地离线版本 标示文件 ~/.ctool.electron_use_local_file.lock
            return back(true, '.ctool.electron_use_local_file.lock');
        }
        // 验证`ctool.dev`是否可以访问
        const req = http.get("https:/ctool.dev/_status.html", () => back(false, 'online'));
        req.on('error', () => back(true, 'network error'));
        req.setTimeout(3000, () => req.abort());
        setTimeout(() => back(true, 'time out'), 4000)
    })
})
