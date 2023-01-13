// 页面操作
import {defineStore} from '@/helper/pinia'
import {reactive} from 'vue';
import {getTool, ToolType, toolExists, categoryExists, tools, getCategory} from "@/config";
import {useRouter} from "vue-router";
import event from "@/event";

interface Types {
    // 最后使用工具
    tool: string
    // 最后使用功能
    feature: string,
    // 最后访问分类
    category: string
    // 分类最后访问工具
    category_last_tool: Record<string, string>
    // 工具最后访问功能
    tool_last_feature: Record<string, string>
    // 最近访问功能列表
    recently: string[]
}

const defaultValue: Types = {
    tool: '',
    category: '',
    feature: '',
    category_last_tool: {},
    tool_last_feature: {},
    recently: []
}

export default defineStore(
    'operate',
    () => {
        const items = reactive<Types>(defaultValue)
        const router = useRouter()

        // 跳转
        const redirectTool = (_tool: string = "", _feature: string = "", _category: string = "", history: string | number = "", keyword: string = "") => {
            const tool = getTool(toolExists(_tool) ? _tool : tools[0].name)
            const category = getCategory(tool.inCategory(_category) ? _category : tool.firstCategory().name)
            const feature = tool.getFeature(tool.existFeature(_feature) ? _feature : tool.firstFeature().name)
            const query: Record<string, any> = {}
            if (history !== "") {
                query['history'] = history
            }
            if (keyword !== "") {
                query['keyword'] = keyword
            }
            event.dispatch('extend_page_close')
            return router.push(
                {
                    path: feature.getRouter(),
                    query: feature.getQuery(category.name, query)
                }
            )
        }
        // 访问
        const access = (_tool: string, _feature: string, _category: string): boolean => {
            if (!toolExists(_tool) || !categoryExists(_category)) {
                return false
            }
            const tool = getTool(_tool)
            const category = getCategory(_category)
            if (!tool.inCategory(category.name) || !tool.existFeature(_feature)) {
                return false
            }
            const feature = tool.getFeature(_feature)

            // 最后访问工具
            items.tool = tool.name
            // 最后访问功能
            items.feature = feature.name
            // 最后访问分类
            items.category = category.name
            // 分类最后访问
            items.category_last_tool = {
                ...items.category_last_tool,
                [category.name]: tool.name
            }
            // 工具最后使用功能
            items.tool_last_feature = {
                ...items.tool_last_feature,
                [tool.name]: feature.name
            }
            // 最近使用
            const recentlyKey = `${tool.name}-${feature.name}`
            const recently = new Set(items.recently.reverse())
            if (recently.has(recentlyKey)) {
                recently.delete(recentlyKey)
            }
            recently.add(recentlyKey)
            items.recently = Array.from(recently).reverse()
            event.dispatch('tool_change')
            return true
        }

        const getRecently = () => {
            return items.recently.filter(item => {
                const [tool, feature] = item.split("-");
                return toolExists(tool) && getTool(tool).existFeature(feature)
            }).map(item => {
                const [tool, feature] = item.split("-");
                return getTool(tool as ToolType).getFeature(feature as any)
            }) || []
        }

        // 获取分类最后访问
        const getCategoryLastTool = (category: string) => {
            if (
                categoryExists(category)
                && category in items.category_last_tool
                && getCategory(category).existTool(items.category_last_tool[category])
            ) {
                return items.category_last_tool[category]
            }
            return ""
        }

        // 获取工具最后访问功能
        const getToolLastFeature = (tool: string) => {
            if (toolExists(tool)) {
                if (getTool(tool).isSimple()) {
                    return getTool(tool).firstFeature().name
                }
                if ((tool in items.tool_last_feature) && getTool(tool).existFeature(items.tool_last_feature[tool])) {
                    return items.tool_last_feature[tool]
                }
            }
            return ""
        }

        return {
            items: items,
            redirectTool: redirectTool,
            getCategoryLastTool,
            getToolLastFeature: getToolLastFeature,
            access: access,
            getRecently: getRecently
        }
    },
    true
)

