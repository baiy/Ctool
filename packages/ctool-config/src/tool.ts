import {ToolInterface, FeatureInterface, CategoryInterface, ToolType, CategoryType, FeatureType} from "./config"

export default class Tool<T extends ToolType = any> implements ToolInterface<T> {
    private readonly _name: T;
    private _parentDirectory: string = "";
    private _features: FeatureInterface<T>[] = []
    private _categories: CategoryInterface[] = []

    constructor(name: T) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    get features() {
        return this._features
    }

    get categories() {
        return this._categories
    }
    set parentDirectory(dir: string) {
        this._parentDirectory = dir || ""
    }

    get directory() {
        if (this._parentDirectory === "") {
            return `${this._name}`
        }
        return `${this._parentDirectory}/${this._name}`
    }

    get root() {
        return `/tools/${this.directory}`
    }

    addFeature(feature: FeatureInterface<T>) {
        this._features.push(feature)
    }

    getFeature(name: FeatureType<T>) {
        return this.features.filter(item => item.name === name)[0]
    }

    addCategory(category: CategoryInterface) {
        this._categories.push(category)
    }

    inCategory(name: string): name is CategoryType {
        return this.categories.map<string>(item => item.name).includes(name)
    }

    firstCategory() {
        return this._categories[0]
    }

    firstFeature() {
        return this._features[0]
    }

    existFeature(name: string): name is FeatureType<T> {
        return this.features.map<string>(item => item.name).includes(name)
    }

    isSimple() {
        return this.features.length < 2
    }
}
