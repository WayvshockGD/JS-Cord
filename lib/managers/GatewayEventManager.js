const Client = require("../core/Client");
const ClientUser = require("../structures/ClientUser");
const Guild = require("../structures/Guild");
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
                this.client.user = new ClientUser(this.payload.d.user, this.client);
                this.client.emit("ready");
                break;
            case "MESSAGE_CREATE":
                this.client.emit("messageEvent", new Message(data, this.client))
                break;
            case "GUILD_CREATE":
                this.client.guilds.set(this.payload.d.id, this.payload.d);

                this.client.emit("guildCreateEvent", data);

                /**
                 * @type {import("discord-api-types").APIChannel[]}
                 */
                let channels = data.channels;

                for (let c of channels) {
                    this.client.channels.set(c.id, c);
                }
                break;
        
            default:
                break;
        }
    }
}