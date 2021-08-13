import config from "./config";

let instance = null;

export default {
    set(t) {
        if (instance === null) {
            instance = t
        }
    },
    get() {
        return instance
    },
    enter(name) {
        if (instance !== null) {
            let cat = config.getToolDefaultCategory(name);
            if (cat) {
                instance.categorySelect(cat)
            }
            instance.toolSelect(name)
        }
    }
}