export const openUrl = (url) => {
    // return chrome.tabs.create();
    // return chrome.windows.create();
    if (url.indexOf('chrome://') === 0) {
        return chrome.tabs.create({url: url});
    }
    return window.open(url);
}
export const getMessage = (messageName, values = {}, placeholders = [], options = {}) => {
    let substitutions = []
    placeholders.forEach((key) => {
        substitutions.push((key in values) ? values[key] : "")
    })
    return chrome.i18n.getMessage(messageName, substitutions, options);
}


