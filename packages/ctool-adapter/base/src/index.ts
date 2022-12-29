import {join} from "path";
import {copyFileSync, cpSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync} from "fs";

export const getPath = (path = "") => {
    return join(__dirname, '../../../../', path)
}

export const getCoreDistPath = () => {
    const path = getPath('packages/ctool-core/dist')
    if (!existsSync(path)) {
        throw new Error(`core dist path "${path}" not found`)
    }
    return path
}

export const copyCoreDist = (path: string) => {
    if (!existsSync(path)) {
        throw new Error(`"${path}" not found`)
    }
    cpSync(getCoreDistPath(), path, {recursive: true})
}

const getReleasePath = () => {
    const path = getPath("_release")
    if (!existsSync(path)) {
        mkdirSync(path);
    }
    return path
}

export const release = async (path: string, name: string) => {
    name = `ctool_${name}`
    if (!existsSync(path)) {
        throw new Error(`release path "${path}" not found`)
    }
    const isFile = statSync(path).isFile()
    let releaseFile = "";
    if (isFile) {
        releaseFile = join(getReleasePath(), name)
        copyFileSync(path, releaseFile)
    } else {
        releaseFile = join(getReleasePath(), `${name}.zip`)
        await require('zip-a-folder').zip(path, releaseFile);
    }
    return releaseFile;
}

export const replaceFileContent = (path: string, search: string, replace: string) => {
    if (!existsSync(path)) {
        throw new Error(`file "${path}" not found`)
    }
    writeFileSync(path, readFileSync(path).toString().replace(new RegExp(search, 'g'), replace))
}

export const getRootPackageJson = (): Record<string, any> => {
    return JSON.parse(readFileSync(getPath('package.json')).toString())
}

export const getAdditionData = (): Record<string, any> => {
    return JSON.parse(readFileSync(getPath('packages/ctool-core/dist/ctool.addition.json')).toString())
}

export const version = (): string => {
    return getRootPackageJson()['version'] || ""
}
