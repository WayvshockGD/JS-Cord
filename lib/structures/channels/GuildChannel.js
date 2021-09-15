const Base = require("../Base");

module.exports = class GuildChannel extends Base {
    /**
     * @param {import("discord-api-types").APIChannel} data
     */
    constructor(data, client) {
        super(data.id, client);

        this.nsfw = data.nsfw;
        this.name = data.name;
    }

    /**
     * @param {import("js-cord").MessageOptions | string} content
     */
    sendMessage(content) {
        return this.client.sendMessage(this.id, content);
    }

    toString() {
        return `<#${this.id}>`;
    }

    json() {
        return super.json([
            "id",
            "nsfw",
            "name"
        ])
    }
}