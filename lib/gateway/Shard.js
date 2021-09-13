const Client = require("../core/Client");
const Websocket = require("ws");
const WebsocketManager = require("../managers/WebsocketManager");

module.exports = class Shard {

    /**
     * @param {Client} client
     * @param {number} id
     */
    constructor(client, id) {
        this.id = id;
        this.client = client;

        this.ws = new WebSocket(client.url);

        this.initWebsocketManager = (data) => {
            return new WebsocketManager(data);
        };

        this.startShard();
    }

    identify() {
        let data = {
            op: 2,
            d: {
                token: this.client.token,
                intents: this.client.options.gateway.intents,
                properties: {
                    "$os": process.platform,
                    "$browser": "JSCord",
                    "$device": "JSCord"
                },
                compress: false,
                large_threshold: 250
            }
        };

        if (this.client.options.gateway.shards > 1) {
            data["shard"] = [this.id, this.client.options.gateway.shards];
        }

        this.ws.send(JSON.stringify(data));
    }

    startShard() {}
}