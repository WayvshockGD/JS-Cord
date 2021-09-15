let { Client } = require("../export");
let { token } = require("./config.json");

let client = new Client(token);

client.on("ready", () => {
    console.log("Ready!");
});

client.on("messageEvent", (message) => {
    if (message.content.startsWith("?test")) {
        console.log(client.guilds.toJSON());
    }
})

client.gateway.startConnection();