let { gatewayVersion } = require("./Constants");

module.exports = {
    base: `https://discord.com/api/v${gatewayVersion}`,
    CDN: "https://cdn.discordapp.com",
    gateway: `/gateway/bot`,
    /**
     * @param {string} channel 
     * @returns {string}
     */
    message: (channel) => `/channels/${channel}/messages`,
    getMessage: (channel, id) => `/channels/${channel}/messages/${id}`,

}