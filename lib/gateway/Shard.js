const Client = require("../core/Client");
const WS = require("ws");
const WebsocketManager = require("../managers/WebsocketManager");
const Util = require("../util/Util");

module.exports = class Shard {

    /**
     * @param {Client} client
     * @param {number} id
     * @param {string} url
     */
    constructor(client, id, url) {
        this.id = id;
        this.client = client;
        this.url = url;

        this.ws = new WS(url, {
            ...client.options.websocketOptions
        });

        /**
         * @param {WS.Data} data 
         * @returns 
         */
        this.initWebsocketManager = (data) => {
            return new WebsocketManager(data, this.ws, client, this);
        };

        this.startShard();
    }

    identify() {
        /**
         * @type {import("discord-api-types").GatewayIdentifyData}
         */
        let data = {
            op: 2,
            d: {
                token: this.client.token.slice(4),
                intents: this.client.options.gateway.intents || 3843,
                properties: {
                    "$os": process.platform,
                    "$browser": "JSCord",
                    "$device": "JSCord"
                },
                compress: false,
                large_threshold: 250,
            },
            presence: {
                status: "online",
            }
        };

        if (this.client.options.gateway.shards > 1) {
            data["shard"] = [this.id, this.client.options.gateway.shards];
        }

        if (this.client.options.presence.mobile) {
            data["d"]["properties"]["$browser"] = "Discord iOS";
        }

        if (this.client.options.debug) {
            console.log("Identifying");
        }

        this.ws.send(JSON.stringify({ ...data }));
    }

    startShard() {
        this.ws.on("message", (d) => {
            let data = Util.parseData(d);
            
           this.initWebsocketManager(data).message();
        });

        this.ws.on("error", (err) => {
            console.log(err);
        })
    }
}