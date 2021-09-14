let Client = require("../core/Client");
const CordError = require("../errors/CordError");
const { gatewayVersion } = require("../util/Constants");
const ShardManager = require("./ShardManager");

module.exports = class GatewayManager {
    /**
     * @param {Client} client
     */
    constructor(client) {
        /**
         * @private
         */
        this.client = client;

        this.shards = new ShardManager(this.client);
    }

    async startConnection() {
        if (typeof this.client.token === "undefined") return CordError.throw("EMPTY_TOKEN");

        let data = await this.client.getBotGateway();

        let shards;

        if (typeof this.client.options.shards === "undefined") {
            shards = data.shards;
            this.client.options.gateway.shards = shards;
        } else {
            shards = this.client.options.gateway.shards;
        }

        let url = `${data.url}/?v=${gatewayVersion}&encoding=json/`;

        for (let i = 0; i < shards; i++) {
            if (this.client.options.debug) {
                console.log(`[SHARD] Spawning shard: ${i}`);
            }

            this.shards.initShard(i, url);
        }
    }
}