import {ToolInterface, CategoryInterface, ToolType, CategoryType} from "./config"

class Category<T extends CategoryType = any> implements CategoryInterface<T> {
    private readonly _name: T;
    private _tools: ToolInterface[] = []

    constructor(name: T) {
        this._name = name
    }

    get name() {
        return this._name;
    }

    get tools() {
        return this._tools
    }

    addTool(tool: ToolInterface) {
        this._tools.push(tool)
        tool.addCategory(this)
    }

    existTool(name: string) {
        return this.tools.map<string>(item => item.name).includes(name)
    }

    firstTool() {
        return this._tools[0]
    }
}

export default Category
