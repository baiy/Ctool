// https://github.com/nodeca/js-yaml/issues/614

import yaml from "js-yaml"

// @ts-ignore
let options = Object.assign({}, yaml.types.int.options);

options.construct = data => {
    let value = data, sign = 1n, ch;

    if (value.indexOf('_') !== -1) {
        value = value.replace(/_/g, '');
    }

    ch = value[0];
    if (ch === '-' || ch === '+') {
        if (ch === '-') sign = -1n;
        value = value.slice(1);
        ch = value[0];
    }
    if (Number.isSafeInteger(ch === "-" ? -value : +value)) {
        return ch === "-" ? -1 * value : 1 * value
    }
    return sign * BigInt(value);
};


options.predicate = object => {
    return Object.prototype.toString.call(object) === '[object BigInt]'
        // @ts-ignore
        || yaml.types.int.options.predicate(object);
};


let BigIntType = new yaml.Type('tag:yaml.org,2002:int', options);

const SCHEMA = yaml.DEFAULT_SCHEMA.extend({implicit: [BigIntType]});

export default {
    dump: (data) => {
        return yaml.dump(data, {schema: SCHEMA})
    },
    load: (data) => {
        return yaml.load(data, {schema: SCHEMA})
    }
}
