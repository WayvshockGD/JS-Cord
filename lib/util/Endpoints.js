let { gatewayVersion } = require("./Constants");

module.exports = {
    base: `https://discord.com/api/v${gatewayVersion}`,
    gateway: `/gateway/bot`,
    /**
     * @param {string} channel 
     * @returns {string}
     */
    message: (channel) => `/channels/${channel}/messages`
}