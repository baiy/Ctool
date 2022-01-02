export const openUrl = (url) => {
    return browser.tabs.create({url:url});
}

export const getMessage = (messageName, values = {}, placeholders = []) => {
    let substitutions = []
    placeholders.forEach((key) => {
        substitutions.push((key in values) ? values[key] : "")
    })
    return browser.i18n.getMessage(messageName, substitutions);
}
