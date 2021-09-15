/**
 * @class Collection
 * @extends {Map<K, V>}
 */
module.exports = class Collection extends Map {
    getFirst() {
        return this.values()[0] || false;
    }

    toJSON() {
        let data = {};

        for(let [k, v] of this.entries()) {
            data[k] = v;
        }

        return data;
    }
}