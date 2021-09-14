const Client = require("../core/Client");
const WS = require("ws");
let Pako = require("pako");
const WebsocketManager = require("../managers/WebsocketManager");

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
        console.log(url)

        /**
         * @param {WS.Data} data 
         * @returns 
         */
        this.initWebsocketManager = (data) => {
            return new WebsocketManager(data);
        };

        this.startShard();
    }

    identify() {
        let data = {
            op: 2,
            d: {
                token: this.client.token.slice(4),
                intents: this.client.options.gateway.intents,
                properties: {
                    "$os": process.platform,
                    "$browser": "JSCord",
                    "$device": "JSCord"
                },
                compress: false,
                large_threshold: 250,
                presence: {
                    activities: [],
                    status: "online",
                    afk: false,
                }
            }
        };

        if (this.client.options.gateway.shards > 1) {
            data["shard"] = [this.id, this.client.options.gateway.shards];
        }

        this.ws.send(JSON.stringify(data));
    }

    startShard() {
        this.ws.on("message", (d) => {
            //this.initWebsocketManager(d).message();
        });

        this.ws.on("open", () => {
            this.identify();
        })
    }
}