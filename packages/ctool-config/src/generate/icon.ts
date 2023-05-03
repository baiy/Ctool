import clipboard from "./icon/clipboard";
import close from "./icon/close";
import common from "./icon/common";
import copy from "./icon/copy";
import empty from "./icon/empty";
import error from "./icon/error";
import full from "./icon/full";
import github from "./icon/github";
import history from "./icon/history";
import info from "./icon/info";
import location from "./icon/location";
import moon from "./icon/moon";
import question from "./icon/question";
import right from "./icon/right";
import search from "./icon/search";
import selected from "./icon/selected";
import setting from "./icon/setting";
import success from "./icon/success";
import sun from "./icon/sun";
import up from "./icon/up";
import upload from "./icon/upload";
import message from "./icon/message";
import ad from "./icon/ad";
import refresh from "./icon/refresh";
import devtools from "./icon/devtools";
import checked from "./icon/checked";
import unchecked from "./icon/unchecked";
import toggle from "./icon/toggle";
import clear from "./icon/clear";
import getBounds from "svg-path-bounds";
import {buildData} from "./fileSystem";

const lists = {
    clipboard,
    close,
    common,
    copy,
    empty,
    error,
    full,
    github,
    history,
    info,
    location,
    moon,
    question,
    right,
    search,
    selected,
    setting,
    success,
    sun,
    up,
    upload,
    message,
    ad,
    devtools,
    refresh,
    checked,
    unchecked,
    toggle,
    clear
}


const load = (paths: string[] | string) => {
    if (!Array.isArray(paths)) {
        paths = [paths]
    }
    return JSON.stringify({
        box: getBounds(paths.join(" ")).map(item => Math.floor(item * 100) / 100),
        data: paths
    })
}

const icons = Object.keys(lists)
export const buildIcon = () => {
    buildData.append(`export type iconType = "${icons.join('"\n\t|"')}"
export const iconData:{[key in iconType]:{box:number[],data:string[]}} = {
    ${icons.map((item) => {
        return `\t"${item}":${load(lists[item])},`
    }).join("\n")}
}`, 'icon')
}
