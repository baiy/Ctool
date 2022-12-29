import {
    Config,
    Languages,
    Format
} from "./types"
import {editorLanguageMap} from "@/types";
import {isObject} from "lodash"
import Json from "@/helper/json";

const languages: { [k in Languages]: Config<k> } = {
    javascript: {
        beautify: true,
        compress: true,
        load() {
            return import('./javascript').then(m => m.formatter)
        }
    },

    json: {
        beautify: true,
        compress: true,
        load() {
            return import('./json').then(m => m.formatter)
        }
    },

    typescript: {
        beautify: true,
        compress: false,
        load() {
            return import('./typescript').then(m => m.formatter)
        }
    },

    markdown: {
        beautify: true,
        compress: false,
        load() {
            return import('./markdown').then(m => m.formatter)
        }
    },

    css: {
        beautify: true,
        compress: true,
        load() {
            return import('./css').then(m => m.formatter)
        }
    },
    less: {
        beautify: true,
        compress: false,
        load() {
            return import('./less').then(m => m.formatter)
        }
    },
    scss: {
        beautify: true,
        compress: false,
        load() {
            return import('./scss').then(m => m.formatter)
        }
    },
    yaml: {
        beautify: true,
        compress: false,
        load() {
            return import('./yaml').then(m => m.formatter)
        }
    },
    html: {
        beautify: true,
        compress: true,
        load() {
            return import('./html').then(m => m.formatter)
        }
    },
    xml: {
        beautify: true,
        compress: true,
        load() {
            return import('./xml').then(m => m.formatter)
        }
    },
    php: {
        beautify: true,
        compress: false,
        load() {
            return import('./php').then(m => m.formatter)
        }
    },
    java: {
        beautify: true,
        compress: false,
        load() {
            return import('./java').then(m => m.formatter)
        }
    },
    sql: {
        beautify: true,
        compress: true,
        load() {
            return import('./sql').then(m => m.formatter)
        }
    },

    vue: {
        beautify: true,
        compress: false,
        load() {
            return import('./vue').then(m => m.formatter)
        }
    },

    angular: {
        beautify: true,
        compress: false,
        load() {
            return import('./angular').then(m => m.formatter)
        }
    },

    graphql: {
        beautify: true,
        compress: false,
        load() {
            return import('./graphql').then(m => m.formatter)
        }
    },
}

const load = async <T extends Languages>(name: T): Promise<Format<T>> => {
    const handle = await languages[name].load()
    handle.setName(name)
    return handle
}

const parseLang = (lang: string) => {
    for (let key in editorLanguageMap) {
        const names = [key, ...(editorLanguageMap[key].alias || [])].map((item) => item.toLowerCase())
        if (names.includes(lang.toLowerCase())) {
            return {key, lang: editorLanguageMap[key].lang}
        }
    }
    return null;
}

const isEnable = (lang: string, type: "compress" | "beautify") => {
    const l = parseLang(lang)
    return l !== null && !!((l.key in languages) && languages[l.key][type])
}

const simple = async (lang: string, type: "compress" | "beautify", code: string | object) => {
    if (isObject(code)) {
        code = Json.stringify(code)
    }
    if (!isEnable(lang, type)) {
        return code
    }
    const handle = await load(parseLang(lang)?.key as Languages)
    return await handle.set(code).format(type)
}

export default {
    simple: simple, isEnable: isEnable, parseLang: parseLang, load: load, languages: languages
}
