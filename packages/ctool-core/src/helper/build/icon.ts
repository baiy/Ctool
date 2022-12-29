import clipboard from "../../statics/icon/clipboard";
import close from "../../statics/icon/close";
import common from "../../statics/icon/common";
import copy from "../../statics/icon/copy";
import empty from "../../statics/icon/empty";
import error from "../../statics/icon/error";
import full from "../../statics/icon/full";
import github from "../../statics/icon/github";
import history from "../../statics/icon/history";
import info from "../../statics/icon/info";
import location from "../../statics/icon/location";
import moon from "../../statics/icon/moon";
import question from "../../statics/icon/question";
import right from "../../statics/icon/right";
import search from "../../statics/icon/search";
import selected from "../../statics/icon/selected";
import setting from "../../statics/icon/setting";
import success from "../../statics/icon/success";
import sun from "../../statics/icon/sun";
import up from "../../statics/icon/up";
import upload from "../../statics/icon/upload";
import message from "../../statics/icon/message";
import ad from "../../statics/icon/ad";
import refresh from "../../statics/icon/refresh";
import devtools from "../../statics/icon/devtools";
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
}


const load = (paths: string[] | string) => {
    if (!Array.isArray(paths)) {
        paths = [paths]
    }
    return JSON.stringify(getBounds(paths.join(" ")).map(item => Math.floor(item * 100) / 100))
}
const icons = Object.keys(lists)
export const buildIcon = () => {
    buildData.append(`export type iconType = "${icons.join('"\n\t|"')}"
export const iconViewBox = {
    ${icons.map((item) => {
        return `\t"${item}":${load(lists[item])},`
    }).join("\n")}
}`, 'icon')
}
