import {contextBridge} from "electron";
import bridge from "./bridge";

contextBridge.exposeInMainWorld('ctoolDesktopBridge', bridge)
