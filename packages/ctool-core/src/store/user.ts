// 用户
import {defineStore} from '@/helper/pinia'
import {ref} from 'vue';
import {uuid} from '@/helper/util';
import storage from '@/helper/storage';

export const getUserUuid = () => {
    const name = 'user_uuid'
    let id = storage.get<string>(name, null, false)
    if (!id) {
        id = uuid();
        storage.setNoVersion(name, id)
    }
    return id;
}

export default defineStore('user', () => {
    const userUuid = ref(getUserUuid())
    return {userUuid}
}, false)


