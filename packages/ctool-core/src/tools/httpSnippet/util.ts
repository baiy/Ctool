import { HTTPSnippet, HarRequest } from "@readme/httpsnippet";
import Json from "@/helper/json";
import curlToHar from "./curlToHar";
import { ClientId, TargetId, targets as httpTargets } from "@readme/httpsnippet/targets";
import { isArray } from "lodash";

interface Entry {
    request: Partial<HarRequest>;
}

interface HarEntry {
    log: {
        version: string;
        creator: {
            name: string;
            version: string;
        };
        entries: Entry[];
    };
}

const convert = (items: HarEntry, target: string) => {
    const targetInfo = getTarget(target);
    // 自定义处理
    if (targetInfo.clientId === "custom-define-data-schema") {
        return items.log.entries.map(item => {
            const headers = Object.fromEntries(
                item.request.headers?.map(({ name, value }) => {
                    return [name, value];
                }) || [],
            );
            const cookies = Object.fromEntries(
                item.request.cookies?.map(({ name, value }) => {
                    return [name, value];
                }) || [],
            );
            const queryString = Object.fromEntries(
                item.request.queryString?.map(({ name, value }) => {
                    return [name, value];
                }) || [],
            );
            const postData =
                (item.request.postData?.params
                    ? Object.fromEntries(
                          item.request.postData.params.map(({ name, value }) => {
                              return [name, value];
                          }) || [],
                      )
                    : item.request.postData?.text) || {};
            const request = {
                url: item.request.url,
                method: item.request.method,
                httpVersion: item.request.httpVersion,
            };
            return [
                `const request = ${JSON.stringify(request, null, 4)};`,
                `const queryString = ${JSON.stringify(queryString, null, 4)};`,
                ...(item.request.method?.toLowerCase() === "post" && postData
                    ? [`const postData = ${JSON.stringify(postData, null, 4)};`]
                    : []),
                `const headers = ${JSON.stringify(headers, null, 4)};`,
                `const cookies = ${JSON.stringify(cookies, null, 4)};`,
            ].join("\n\n");
        });
    }
    const result = new HTTPSnippet(items).convert(targetInfo.targetId, targetInfo.clientId);
    return result === false ? [""] : isArray(result) ? result : [result];
};

export const targets = (() => {
    const lists: {
        value: string;
        label: string;
        url: string;
        description: string;
        clientId: ClientId;
        targetId: TargetId;
    }[] = [];
    for (let target of Object.values(httpTargets)) {
        const isSimple = Object.values(target.clientsById).length < 2;
        for (let client of Object.values(target.clientsById)) {
            lists.push({
                value: `${target.info.key}-|-${client.info.key}`,
                label: isSimple ? target.info.title : `${target.info.title} - ${client.info.title}`,
                url: client.info.link,
                description: client.info.description,
                clientId: client.info.key,
                targetId: target.info.key,
            });
        }
    }
    // 添加对象输出
    lists.push({
        value: `javascript-|-custom-define-data-schema`,
        label: `Data Schema`,
        url: "",
        description: "",
        clientId: "custom-define-data-schema",
        targetId: "javascript",
    });
    return lists.sort((a, b) => a.label.localeCompare(b.label));
})();

export const getTarget = value => {
    for (let target of targets) {
        if (value === target.value) {
            return target;
        }
    }
    throw new Error("Error Target");
};

export const generate = (input: string, source: string, target: string) => {
    input = input.trim();
    const harData = source === "cURL" ? curlToHar(input) : Json.parse(input, { JSON_REPAIR: true });
    let har: HarEntry = {
        log: {
            version: "",
            creator: {
                name: "",
                version: "",
            },
            entries: [],
        },
    };

    if (harData.entries) {
        har.log = harData;
    } else if (harData.url) {
        har.log.entries.push(harData);
    } else {
        har = harData;
    }

    return convert(har, target).map((item, index) => {
        return {
            value: item,
            url: har.log.entries?.[index]?.request.url?.substring(0, 50) || "",
        };
    });
};
