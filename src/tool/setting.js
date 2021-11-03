import config from './config'

export default {
    /**
     * @param value
     * @return {boolean}
     */
    autoSaveCopy(value = null) {
        if (value === null) {
            return config.getSetting('auto_save_copy', true)
        }
        return config.saveSetting('auto_save_copy', value)
    },

    /**
     * @param value
     * @return {boolean}
     */
    autoReadCopy(value = null) {
        if (value === null) {
            return config.getSetting('auto_read_copy', true)
        }
        return config.saveSetting('auto_read_copy', value)
    },
    /**
     * @param value
     * @return {boolean}
     */
    autoReadCopyFilter(value = null) {
        if (value === null) {
            return config.getSetting('auto_read_copy_filter', false)
        }
        return config.saveSetting('auto_read_copy_filter', value)
    },
    /**
     * @param value
     * @return {boolean}
     */
    displayMode(value = null) {
        if (value === null) {
            return config.getSetting('display_mode', 'light')
        }
        return config.saveSetting('display_mode', value)
    },
    /**
     * @param value
     * @return {boolean}
     */
    locale(value = null) {
        if (value === null) {
            return config.getSetting('locale', '_default')
        }
        return config.saveSetting('locale', value)
    },
}
