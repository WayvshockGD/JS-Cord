const Client = require("../core/Client");

module.exports = class Base {
    /**
     * @param {string} id 
     * @param {Client} client
     */
    constructor(id, client) {
        this.id = id;
        this.client = client;
    }

    /**
     * @param {string[]} props
     */
    json(props) {
        let data = {};

        for (let i of props) {
            if (!this[i] === undefined) {
                data[i] = undefined;
            } else {
                data[i] = this[i];
            }
        }

        return data;
    }
}