import {tools} from "../index";
import {buildData, fileCoreSrc} from "./fileSystem";

export const buildRoute = () => {
    const indent = " ".repeat(4)
    const config = tools.map((tool) => {
        return tool.features.map((feature) => {
            const filePath = feature.getComponentPath()
            if (!fileCoreSrc.isFile(filePath)) {
                throw new Error(`文件 ${filePath} 不存在`)
            }
            return [
                `${indent.repeat(1)}{`,
                `${indent.repeat(2)}tool: "${feature.tool.name}",`,
                `${indent.repeat(2)}feature: "${feature.name}",`,
                `${indent.repeat(2)}component: () => import('@${filePath}')`,
                `${indent.repeat(1)}},`,
            ].join("\n");
        }).join("\n")
    }).join("\n")

    buildData.prepend(`import {ToolRouteConfig} from "@/types"`)
    buildData.append(
        `export const toolRoutes: ToolRouteConfig[] = [
${config}
]
`, '路由配置')
}
