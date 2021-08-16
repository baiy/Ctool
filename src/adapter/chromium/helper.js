export const openUrl = (url) => {
    // return chrome.tabs.create();
    // return chrome.windows.create();
    if (url.indexOf('chrome://') === 0){
        return chrome.tabs.create({url:url});
    }
    return window.open(url);
}