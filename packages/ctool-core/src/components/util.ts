import { isNumber } from "lodash";

/**
 * 尺寸转换 适用于 width height 等
 * @param size
 * @param lists
 */
export const sizeConvert = (size: string | number, lists: Record<string, any> = {}): string => {
    if (Object.keys(lists).includes(`${size}`)) {
        return lists[`${size}`];
    }
    return (isNumber(size) || /^[\d.]+$/.test(`${size}`)) ? `${size}px` : `${size}`;
};

export const measureTextMaxWidth = (texts: string[], fontSize: string) => {
    const lists: number[] = [0];
    const el = document.createElement("div");
    el.style.position = "absolute";
    el.style.left = "-10000px";
    el.style.top = "-10000px";
    document.body.appendChild(el);
    el.style.fontSize = fontSize;
    for (let text of texts) {
        el.textContent = text;
        lists.push(el.clientWidth);
    }
    document.body.removeChild(el);
    return Math.max(...lists);
};
