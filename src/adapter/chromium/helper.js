export const openUrl = (url) => {
    // return chrome.tabs.create();
    // return chrome.windows.create();
    return window.open(url);
}