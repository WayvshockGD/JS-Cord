const Client = require("../core/Client");
const ChannelManager = require("../managers/ChannelManager");
const Base = require("./Base");
const Guild = require("./Guild");
const GuildMember = require("./GuildMember");

module.exports = class Message extends Base {

    /**
     * @param {import("discord-api-types").APIMessage} data 
     * @param {Client} client
     */
    constructor(data, client) {
        super(data.id, client);

        this.content = data.content;
        
        this.channel = ChannelManager.init(client.getChannel(data.channel_id), client);
        
        this.guild = new Guild(client.guilds.get(data.guild_id), client);

        this.member = new GuildMember(data.member, client);
    }

    /**
     * @param {number} time
     */
    deleteContent(time) {

        if (time) {

            setTimeout(() => {
                this.client.deleteMessage(this.channel.id, this.id);
            }, time);
        } else {
            this.client.deleteMessage(this.channel.id, this.id);
        }
    }

    json() {
        return super.json([
            "id",
            "content",
            "channel",
            "guild"
        ]);
    }
}