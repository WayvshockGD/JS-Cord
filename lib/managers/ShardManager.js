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
     */
    initShard(id) {
        let shard = this.client.shards.get(id);

        if (typeof shard === "undefined") {
            this.client.shards.set(id, new Shard(this.client, id));
        }
    }
}