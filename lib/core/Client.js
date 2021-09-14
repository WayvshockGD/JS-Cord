let CordError = require("../errors/CordError");
let GatewayManager = require("../managers/GatewayManager");
let RequestHandler = require("../rest/RequestHandler");
let Endpoints = require("../util/Endpoints");
let EventEmitter = require("eventemitter3");
const { gateway } = require("../util/Endpoints");

module.exports = class Client extends EventEmitter {
    /**
     * @param {string} token
     * @param {import("js-cord").ClientOptions} options
     */
    constructor(token, options) {
        super();

        this.token = (token.startsWith("Bot ")) ? token : `Bot ${token}`;

        /**
         * @type {import("js-cord").ClientOptions}
         */
        this.options = Object.assign({
            gateway: {
                shards: undefined,
                intents: []
            },
            debug: false,
            websocketOptions: {},
            presence: {
                mobile: false
            },
        }, options);

        /**
         * @type {import("js-cord").shard}
         */
        this.shards = new Map();

        this.gateway = new GatewayManager(this);
        
        this.requestHandler = new RequestHandler(this);
    }

    /**
     * @returns {import("js-cord").GatewayData}
     */
    async getBotGateway() {
        let data = await this.requestHandler.makeRequest(gateway, "GET", true);
        return data.body;
    }

    /**
     * @param {String} channelID 
     * @param {String | import("js-cord").MessageOptions} content 
     */
    sendMessage(channelID, content) {
        let body = (typeof content === "string") ? { content } : content;

        if (!channelID) {
            return CordError.throwSnowflakeError("sendMessage()");
        }

        this.requestHandler.makeRequest(Endpoints.message(channelID), "POST",  true, body);
    }
}