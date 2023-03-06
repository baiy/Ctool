import {app, BrowserWindow, ipcMain} from "electron";
import path from "path";

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
    mainWindow.loadFile(path.join(__dirname, 'web/index.html'))
    ipcMain.removeHandler('toggleDevTools')
    ipcMain.handle('toggleDevTools', () => mainWindow.webContents.toggleDevTools())
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
    createWindow()

    app.on('activate', async () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
