import {IHTMLTag} from "vite-plugin-html-config"
import {readFileSync} from "fs";
import {join} from "path";

export const APP_INFO = {
    name: "Ctool",
    keywords: "ctool,software development tools",
    shortDescription: "Commonly Used Software Development Tools",
    description: "Commonly Used Software Development Tools: Hash/Encrypt/Decrypt/Code Convert/Timestamp/Qrcode/IP Query/Code Formatter/Unicode/Regex/...",
}

export const META_INFO: IHTMLTag[] = [
    {
        name: "keywords",
        content: APP_INFO.keywords,
    },
    {
        name: "X-UA-Compatible",
        content: "IE=edge, chrome=1",
    },
    {
        name: "name",
        content: `${APP_INFO.name} - ${APP_INFO.shortDescription}`,
    },
    {
        name: "description",
        content: APP_INFO.description,
    },
    {
        name: "image",
        content: `./icon/banner.png`,
    },
    {
        name: "application-name",
        content: APP_INFO.name,
    },
    {
        name: "apple-mobile-web-app-title",
        content: APP_INFO.name,
    },
    {
        name: "apple-mobile-web-app-capable",
        content: "yes",
    },
    {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black-translucent",
    },
    {
        name: "theme-color",
        content: '#ffffff',
    },
    {
        name: "viewport",
        content: 'width=device-width,initial-scale=1',
    }
]

export const LINK_INFO: IHTMLTag[] = [
    {
        name: "mask-icon",
        href: "./icon/icon.svg",
        color: '#FFFFFF',
    },
    {
        name: "icon",
        href: "./favicon.ico",
        type: 'image/x-ico',
    }
]

export const ctoolVitePlugin = () => {
    return {
        name: 'ctool',
        config: () => {
            const version = JSON.parse(readFileSync(join(__dirname, '../../package.json')).toString())['version']
            const updateTime = `${Date.parse((new Date()).toString()) / 1000}`
            return {
                define: {
                    CTOOL_VERSION: JSON.stringify(version),
                    CTOOL_UPDATE_TIME: JSON.stringify(updateTime),
                }
            }
        }
    }
}
