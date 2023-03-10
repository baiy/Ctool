import type {VercelRequest, VercelResponse} from '@vercel/node';
import {IncomingMessage, ServerResponse, ClientRequest} from "http";
import httpProxy from "http-proxy";
import {proxy as proxyConfig} from "ctool-config";
import url from "url";

export default function (request: VercelRequest | IncomingMessage, response: VercelResponse | ServerResponse) {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Ctool-Proxy-Url,Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since, X-CSRF-TOKEN, X-Requested-With",
        "Access-Control-Allow-Credentials": "true",
    }
    // option 请求
    if (request.method?.toLowerCase() === "options") {
        response.writeHead(200, headers)
        response.end("")
        return
    }
    const proxyUrl = (request.headers['ctool-proxy-url'] || "").toString()
    if (!proxyConfig.is(proxyUrl)) {
        response.writeHead(500)
        return response.end("500")
    }
    const {protocol, hostname, port, path} = url.parse(proxyUrl)

    const proxy = httpProxy.createProxyServer({
        target: `${protocol}//${hostname}${port ? `:${port}` : ""}`,
        changeOrigin: true
    });
    proxy.on('error', function (e) {
        console.log(e)
    });

    proxy.on('proxyReq', (proxyReq: ClientRequest) => {
        proxyReq.path = path as string;
        proxyReq.removeHeader('ctool-proxy-url');
    });
    proxy.on('proxyRes', (proxyRes: IncomingMessage) => {
        Object.keys(headers).forEach(name => {
            proxyRes.headers[name] = headers[name]
        })
    });
    proxy.web(request, response)
}

