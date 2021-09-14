const Client = require("../core/Client");
const Shard = require("../gateway/Shard");

module.exports = class ShardManager {
    /**
     * @param {Client} client
     */
    constructor(client) {
        /** @private */
        this.client = client;
    }

    /**
     * @param {number} id
     * @param {string} url
     */
    initShard(id, url) {
        let shard = this.client.shards.get(id);

        if (!shard) {
            let newShard = new Shard(this.client, id, url);

            this.client.shards.set(id, newShard);
        }
    }
}