export default () => {
    let _deps:any[] = [];
    let _keys:any[] = [];
    let _index = 0;

    const add = (dep:any) => {
        _keys.push(dep.className);
        _deps[dep.className] = dep;

        return _inner;
    }

    const has = (className) => _deps.includes(className)

    const all = () => _deps;

    const get = () => {
        if (Object.keys(_deps).length === 0) return null;
        const className = _keys[_index];
        const val = _deps[className];
        delete _deps[className];
        _index++;
        return val;
    }

    const _inner = {
        add:add,
        has,
        all,
        get
    }
    return _inner;
};
