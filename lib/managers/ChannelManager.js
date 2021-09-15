const Client = require("../core/Client");
const GuildChannel = require("../structures/channels/GuildChannel");

module.exports = class ChannelManager {
    /**
     * @param {import("discord-api-types").APIChannel} data
     * @param {Client} client
     * @returns {import("js-cord").channels}
     */
    static init(data, client) {
        let channel;

        switch (data.type) {
            case 0:
                channel = new GuildChannel(data, client);
                break;
        }

        return channel;
    }
}