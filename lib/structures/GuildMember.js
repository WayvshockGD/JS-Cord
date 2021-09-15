const Base = require("./Base");

module.exports = class GuildMember extends Base {
    /**
     * @param {import("discord-api-types").APIGuildMember} data
     */
    constructor(data, client) {
        super(data, client);
    }
}