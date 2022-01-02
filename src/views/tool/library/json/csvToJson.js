import {parse} from 'csv-parse/lib/sync';
import {jsonOutputFormat} from './helper';

const convert = (csv = "", {type = "json",keyed_key=0} = {}) => {
    return jsonOutputFormat(
        parse(csv, {columns: true, skip_empty_lines: true}),
        type,
        keyed_key
    )
}

export default convert
