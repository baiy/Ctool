let windowId = null;
// 打开独立窗口
const panel = {
    create() {
        browser.windows.create({
            url: browser.runtime.getURL("tool.html"),
            type: "popup",
        }, (w) => {
            browser.windows.update(w.id, {
                width: 810,
                height: 610
            });
            windowId = w.id
        })
    },
    open() {
        if (windowId === null) {
            this.create()
        } else {
            browser.windows.get(windowId, (w) => {
                if (!w) {
                    this.create()
                } else {
                    browser.windows.update(windowId, {focused: true})
                }
            })
        }

    },
    onRemoved(id) {
        if (id === windowId) {
            windowId = null;
        }
    }
}

// 注册快捷键
browser.commands.onCommand.addListener((command) => {
    switch (command) {
        case "panel":
            panel.open()
            break;
        default:
            return;
    }
})

// 窗口关闭事件
browser.windows.onRemoved.addListener((id) => {
    panel.onRemoved(id);
})
