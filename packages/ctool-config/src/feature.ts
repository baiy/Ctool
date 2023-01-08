import {ToolInterface, FeatureInterface, ToolType, FeatureType} from "./config"
import {upperFirst} from "lodash";

export default class Feature<T extends ToolType = ToolType> implements FeatureInterface<T> {
    private readonly _name: FeatureType<T>
    private readonly _tool: ToolInterface<T>

    constructor(tool: ToolInterface<T>, name: FeatureType<T>) {
        this._name = name
        this._tool = tool
        this._tool.addFeature(this)
    }

    get name() {
        return this._name;
    }

    get tool() {
        return this._tool;
    }

    getComponentPath() {
        return `${this.tool.root}/${upperFirst(this.name)}.vue`
    }

    getRouter() {
        return `/tool/${this.tool.directory}${this.tool.isSimple() ? '' : `/${this.name}`}`
    }

    getQuery(category: string = "", other: Record<string, any> = {}) {
        if (!this.tool.inCategory(category)) {
            category = this.tool.firstCategory().name
        }
        return {
            category,
            ...other
        }
    }

    getKey() {
        return `${this.tool.name}-${this.name}`
    }
}
