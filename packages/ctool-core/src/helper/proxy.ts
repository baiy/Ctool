import { proxy } from "ctool-config";
import _axios, { AxiosHeaders } from "axios";
import platform from "@/helper/platform";
import qs from "qs";
import useSetting from "@/store/setting";

// 对外请求代理方法
export const axios = () => {
    const storeSetting = useSetting();
    const instance = _axios.create();
    instance.interceptors.request.use(config => {
        // 判断是否需要使用代理
        if (platform.runtime.webSecurity() && config.url && proxy.is(config.url)) {
            if (!storeSetting.items.proxy_enable || !storeSetting.items.proxy_url) {
                throw new Error($t("main_network_request_proxy_prompt"));
            }
            config.headers = !config.headers ? new AxiosHeaders() : config.headers;
            const connector = config.url.includes("?") ? "&" : "?";
            config.headers["Ctool-Proxy-Url"] = `${config.url}${
                config.params ? `${connector}${qs.stringify(config.params)}` : ""
            }`;
            config.params = undefined;
            config.url = storeSetting.items.proxy_url;
        }
        return config;
    });
    return instance;
};
