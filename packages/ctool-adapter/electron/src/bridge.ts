import {shell, ipcRenderer} from "electron";

export default {
    openUrl: (url: string) => {
        shell.openExternal(url)
    },
    toggleDevTools: () => ipcRenderer.invoke('toggleDevTools'),
}
