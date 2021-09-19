export const openUrl = (url) => {
    return browser.tabs.create({url:url});
}
