import cache from './cache'
import {uuid} from '../helper'

const cache_name = "user_uuid"

export default {
    uid() {
        let id = cache.getNoVersion(cache_name);
        if (id === null) {
            id = uuid()
            cache.setNoVersion(cache_name, id)
        }
        return id
    }
}