let { Client } = require("../export");
let { token } = require("./config.json");

let client = new Client(token, { debug: true });

client.on("ready", () => {
    console.log("Ready!");
});

client.on("messageEvent", (message) => {
    if (message.content.startsWith("?test")) {
        message.channel.sendMessage();
    }
})

client.gateway.startConnection();