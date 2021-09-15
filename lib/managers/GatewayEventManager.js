const Client = require("../core/Client");
const Message = require("../structures/Message");

module.exports = class GatewayEventManager {
    /**
     * @param {Client} client
     * @param {import("discord-api-types").GatewayDispatchPayload} payload
     */
    constructor(payload, client) {
        this.payload = payload;
        this.client = client;
    }

    init() {
        let data = this.payload.d;

        switch (this.payload.t) {
            case "READY":
                this.client.emit("ready");
                break;
            case "MESSAGE_CREATE":
                this.client.emit("messageEvent", new Message(data, this.client))
                break;
        
            default:
                break;
        }
    }
}