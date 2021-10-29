/**
 * Handle localstorage save, read, update, purge
 * @namespace Storage
 */
export class Storage {
    /**
     * Set the cache
     * @namespace Storage/set
     *
     * @param {String} key
     * @param {String} data
     * @param {number} time
     * @return {void}
     */
    set(
        key,
        data,
        time = 0
    ) {
        if (!key) {
            console.error(new Error('LocalStorage.set: key missing'));

            return;
        }

        localStorage.setItem(key, JSON.stringify({
            data:      data,
            timestamp: !time || time === 0 ? 0 : new Date().getTime() + time
        }));
    };

    /**
     * get the storage entry
     * @namespace Storage/get
     *
     * @param {String} key
     * @return {String}
     */
    get(key) {
        if (!key) {
            console.error(new Error('TcmsStorage.get: cacheKey missing'));
            return null;
        }

        let entry     = JSON.parse(localStorage.getItem(key));
        let cacheData = entry && (entry.timestamp === 0 || entry.timestamp > new Date().getTime()) ? entry.data : null;

        if (!cacheData) {
            this.remove(key);
        }

        return cacheData;
    };

    /**
     * purge the storage entry
     * @namespace Storage/remove
     * @param {String} key
     * @return {void}
     */
    remove(key) {
        localStorage.removeItem(key);
    };
}