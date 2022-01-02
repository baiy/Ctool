import crypto from 'crypto-js'
import moment from 'moment'
import cache from './cache'
import {TOOL_DATA_EXPIRY} from './config'
import _ from "lodash";

let loadHistoryIndex = -1
let forceLoadHistory = false

function queueDataFactory(value) {
    return {
        'time': moment().format('YYYY-MM-DD HH:mm:ss'),
        'hash': crypto.MD5(JSON.stringify(value)).toString(),
        'value': value,
    }
}

class queue {
    data = []
    name = ''
    max = 10

    constructor(name, max = 50) {
        this.name = name
        this.max = max
        // 初始化数据
        this.data = cache.get(this.getCacheName(), [])
    }

    getCacheName() {
        return 'tool_data_history_' + this.name
    }

    push(value) {
        // 过滤超大数据
        if (JSON.stringify(value).length > 200 * 1024){
            console.log("Data Too Big")
            return;
        }
        let item = queueDataFactory(value)

        // 删除已有
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].hash === item.hash) {
                this.data.splice(i, 1)
            }
        }

        this.data.unshift(item)

        // 删除多余
        if (this.length() > this.max) {
            this.data.pop()
        }

        cache.set(this.getCacheName(), this.data, TOOL_DATA_EXPIRY)
    }

    length() {
        return this.data.length
    }

    all() {
        return this.data
    }

    clear() {
        cache.remove(this.getCacheName())
    }

    get(index) {
        return _.cloneDeep(this.data.hasOwnProperty(index) ? this.data[index].value : {})
    }

    current() {
        if (loadHistoryIndex < 0) {
            return this.get(0)
        }
        let index = loadHistoryIndex
        loadHistoryIndex = -1
        return this.get(index)
    }
}

const history = (name) => {
    return new queue(name)
}

export const setForceLoadHistoryIndex = (index) => {
    forceLoadHistory = true
    loadHistoryIndex = index
}

export const getForceLoadHistory = (name) => {
    if (forceLoadHistory) {
        forceLoadHistory = false
        let data = history(name).current()
        return _.isEmpty(data) ? null : data
    }
    return null
}

export default history
