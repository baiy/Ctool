import {HTTPSnippet} from '@readme/httpsnippet';
import Json from '@/helper/json';
import curlToHar from './curlToHar';
import {ClientId, TargetId, targets as httpTargets} from '@readme/httpsnippet/dist/targets/targets';

const har = (items: Record<string, any>): HTTPSnippet => {
    return new HTTPSnippet("request" in items ? items["request"] : items);
}
export const targets = (() => {
    const lists: { value: string, label: string, url: string, description: string, clientId: ClientId, targetId: TargetId }[] = []
    for (let target of Object.values(httpTargets)) {
        const isSimple = Object.values(target.clientsById).length < 2
        for (let client of Object.values(target.clientsById)) {
            lists.push({
                value: `${target.info.key}-|-${client.info.key}`,
                label: isSimple ? target.info.title : `${target.info.title} - ${client.info.title}`,
                url: client.info.link,
                description: client.info.description,
                clientId: client.info.key,
                targetId: target.info.key,
            })
        }
    }
    return lists.sort()
})()

export const getTarget = (value) => {
    for (let target of targets) {
        if (value === target.value) {
            return target
        }
    }
    throw new Error("Error Target")
}

export const generate = (input: string, source: string, target: string) => {
    input = input.trim()
    const targetInfo = getTarget(target)
    return har(source === "cURL" ? curlToHar(input) : Json.parse(input, {JSON_REPAIR: true})).convert(targetInfo.targetId, targetInfo.clientId) as string
}


