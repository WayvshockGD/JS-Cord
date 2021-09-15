const Base = require("./Base");

module.exports = class ClientUser extends Base {
    /**
     * @param {import("discord-api-types").APIUser} data
     */
    constructor(data, client) {
        super(data.id, client);
    }

    json() {
        return super.json([ 
            "id"
        ]);
    }
}