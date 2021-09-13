let { Client } = require("../export");

let client = new Client("");

client.setOptions({
    gateway: {
        intents: [
            "guilds",
            "guildMessages"
        ]
    }
});

client.sendMessage("", "test");

client.getBotGateway();