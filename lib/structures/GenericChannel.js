const Client = require("../core/Client");
const Base = require("./Base");

module.exports = class GenericChannel extends Base {

    /**
     * @param {string} id 
     * @param {Client} client 
     */
    constructor(id, client) {
        super(id);

        this.client = client;
    }

    /**
     * @param {string | import("js-cord").MessageOptions} content
     */
    sendMessage(content) {
        return this.client.sendMessage(this.id, content);
    }
}