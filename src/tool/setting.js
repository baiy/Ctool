import config from './config'

export default {
    autoSaveCopy (value = null) {
        if (value === null) {
            return config.getSetting('auto_save_copy', true)
        }
        return config.saveSetting('auto_save_copy', value)
    },
    autoReadCopy (value = null) {
        if (value === null) {
            return config.getSetting('auto_read_copy', true)
        }
        return config.saveSetting('auto_read_copy', value)
    },
}