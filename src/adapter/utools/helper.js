export const openUrl = (url) => {
    if ("utools" in window && "shellOpenExternal" in window.utools) {
        return window.utools.shellOpenExternal(url)
    }
    return window.open(url);
}