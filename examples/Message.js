let { Client } = require("../export");
let { token } = require("./config.json");

let client = new Client(token, { 
    gateway: {
        intents: [
            "guildMessages",
            "guilds",
        ]
    }
});

client.on("ready", () => {
    console.log("Ready!");
});

client.on("messageEvent", (message) => {
    console.log(message.content)
    if (!message.content.startsWith("?")) return;

    let args = message.content.slice("?".length).trim().split(" ");

    if (args[0] === "test") {
        message.channel.sendMessage();
    }
})

client.gateway.startConnection();