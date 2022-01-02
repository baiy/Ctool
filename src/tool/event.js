// 窗口大小调整事件
export const WINDOW_RESIZE = "ctoolWindowResize"
// 语言地区变化事件
export const I18N_CHANGE = "ctoolI18nChange"
export const dispatchWindowResize = () => {
    window.dispatchEvent(new CustomEvent(WINDOW_RESIZE));
}
export const dispatchI18nChange = () => {
    window.dispatchEvent(new CustomEvent(I18N_CHANGE));
}

// 原生窗口调整事件
window.addEventListener("resize", ()=>{
    dispatchWindowResize()
});



