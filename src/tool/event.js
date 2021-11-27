// 定义分类点击事件
export const CATEGORY_CLICK_EVENT_NAME = "ctoolCategoryClick"
export const dispatchCategoryClickEvent = (name) => {
    const event = new CustomEvent(CATEGORY_CLICK_EVENT_NAME, {detail: {name}})
    window.dispatchEvent(event);
}




