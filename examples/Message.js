let { Client } = require("../export");
let { token } = require("./config.json");

let client = new Client(token, {
    debug: true
});

client.gateway.startConnection();