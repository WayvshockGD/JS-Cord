const Websocket = require("ws");
const Client = require("../core/Client");
const Shard = require("../gateway/Shard");
const GatewayEventManager = require("./GatewayEventManager");

module.exports = class WebsocketManager {
    /**
     * @param {import("discord-api-types").GatewayReceivePayload} data 
     * @param {Websocket} ws
     * @param {Client} client
     * @param {Shard} shard
     */
    constructor(data, ws, client, shard) {
        this.client = client;
        this.data = data;
        this.ws = ws;
        this.shard = shard;
        this.seq = null;

        this.heartbeat = {
            time: 41250
        };

        this.heartBeat = true;
    }

    gatewayHeartbeat() {
        console.log(this.seq)
        this.ws.send(JSON.stringify({
            op: 1,
            d: 0,
        }));
    }

    keepAlive() {

        if (!this.heartBeat) return;

        setInterval(() => {
            this.gatewayHeartbeat();

            if (this.client.options.debug) {
                console.log("Heartbeat");
            }
            this.heartBeat = true;
        }, this.heartbeat.time);
        console.log(this.heartbeat.time);
    }

    message() {
        let data = this.data;

        if (data.s) this.seq = data.s;

        switch (data.op) {
            case 0:
                new GatewayEventManager(data, this.client).init();
                break;
            case 1:
                console.log("Recieved heartbeat");
            case 10:
                this.heartbeat.time = data.d.heartbeat_interval;
                this.gatewayHeartbeat();
                this.keepAlive();
                break;
            case 11:
                this.shard.identify();
                this.heartBeat = true;
                break;
        }
    }
}