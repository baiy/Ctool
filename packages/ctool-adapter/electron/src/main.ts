import {app, BrowserWindow, ipcMain} from "electron";
import path from "path";
import http from "https";
import {existsSync} from "fs";

const HOME_STATUS_URL = "https:/ctool.dev/_status.html"
const HOME_TOOL_URL = "https:/ctool.dev/tool.html"
// 强制使用本地离线版本 标示文件 ~/.ctool.electron_use_local_file.lock
const LOCAL_LOCK_FILE = ".ctool.electron_use_local_file.lock"

const ipcMainHandleBound = (name, func: () => any) => {
    ipcMain.removeHandler(name)
    ipcMain.handle(name, func)
}

const createWindow = () => {

    const mainWindow = new BrowserWindow({
        autoHideMenuBar: true,
        width: 1235,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            webSecurity: false,
            spellcheck: false,
            nodeIntegration: true,
            contextIsolation: true,
        }
    })

    return new Promise<void>((resolve) => {
        let isLoad = false
        const init = (isOnline: boolean = false) => {
            if (isLoad) {
                return;
            }
            isLoad = true;
            if (isOnline) {
                // 在线版本使用`pwa` 也可以实现类似离线访问效果 而且这样更加便于用户升级程序
                mainWindow.loadURL(HOME_TOOL_URL)
            } else {
                // 离线版本
                mainWindow.loadFile(path.join(__dirname, 'web/tool.html'))
            }
            ipcMainHandleBound('toggleDevTools', () => mainWindow.webContents.toggleDevTools())
            resolve()
        }

        if (existsSync(path.join(app.getPath('home'), LOCAL_LOCK_FILE))) {
            // 本地标示文件存在 强制使用本地离线版本
            return init()
        }
        // 验证`ctool.dev`是否可以访问
        const req = http.get(HOME_STATUS_URL, () => init(true));
        req.on('error', () => init());
        req.setTimeout(3000, () => req.abort());

        setTimeout(() => init(), 4000)
    })
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
    await createWindow()

    app.on('activate', async () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) await createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
