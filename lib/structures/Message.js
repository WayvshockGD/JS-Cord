const Client = require("../core/Client");
const Base = require("./Base");
const GenericChannel = require("./GenericChannel");

module.exports = class Message extends Base {

    /**
     * @param {import("discord-api-types").APIMessage} data 
     * @param {Client} client
     */
    constructor(data, client) {
        super(data.id);

        this.client = client;

        this.content = data.content;
        
        this.channel = new GenericChannel(data.channel_id, client);
    }
}