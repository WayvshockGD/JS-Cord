const Client = require("../core/Client");
const Endpoints = require("../util/Endpoints");
const Base = require("./Base");

module.exports = class Guild extends Base {

    /**
     * @param {import("discord-api-types").APIGuild} data
     * @param {Client} client
     */
    constructor(data, client) {
        super(data.id, client);

        this.name = data.name;
        this.icon = this.client.format(Endpoints.guildIcon(data.id, data.icon));
        this.memberCount = data.member_count;
        this.large = data.large;
        this.emojis = data.emojis;
    }

    json() {
        return super.json([
            "id",
            "name",
            "icon",
            "memberCount",
            "large",
            "emojis"
        ]);
    }
}