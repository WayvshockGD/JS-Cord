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

        this.icon = `${Endpoints.CDN}/`
    }

    json() {
        return super.json([
            "id"
        ]);
    }
}