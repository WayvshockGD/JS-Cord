let CordError = require("../errors/CordError");
let GatewayManager = require("../managers/GatewayManager");
let RequestHandler = require("../rest/RequestHandler");
let Endpoints = require("../util/Endpoints");
let EventEmitter = require("eventemitter3");
const { gateway } = require("../util/Endpoints");

module.exports = class Client extends EventEmitter {
    /**
     * @param {string} token
     */
    constructor(token) {
        super();

        this.token = (token.startsWith("Bot ")) ? token : `Bot ${token}`;

        /**
         * @type {import("js-cord").ClientOptions}
         */
        this.options = {};

        /**
         * @type {string}
         */
        this.url = undefined;

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

        this.requestHandler.makeRequest(Endpoints.message(channelID), "POST",  true, body);
    }

    /**
     * @param {import("js-cord").ClientOptions} options 
     * @returns {Client}
     */
    setOptions(options) {
        if (typeof options === "undefined") throw CordError.throw("EMPTY_OPTIONS");
        this.options = { ...options };
        return this;
    }
}