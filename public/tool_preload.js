const {remote} = require("electron");
const browserWindow = remote.getCurrentWindow()
browserWindow.webContents.on('before-input-event', (event, input) => {
    // mac 关闭支持
    if (process.platform === "darwin") {
        if (input.meta && (['q', 'w'].includes(input.key.toLowerCase()))) {
            event.preventDefault()
            browserWindow.blur()
            browserWindow.close()
        }
    }
})
browserWindow.once('ready-to-show', () => {
    browserWindow.show()
})

window.ctool = {}
window.ctool.isDevToolsOpened = function () {
    return browserWindow.webContents.isDevToolsOpened();
}
window.ctool.toggleDevTools = function () {
    return browserWindow.webContents.toggleDevTools();
}
window.ctool.browserWindow = browserWindow;