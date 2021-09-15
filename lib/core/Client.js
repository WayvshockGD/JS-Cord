let CordError = require("../errors/CordError");
let GatewayManager = require("../managers/GatewayManager");
let RequestHandler = require("../rest/RequestHandler");
let Endpoints = require("../util/Endpoints");
const Message = require("../structures/Message");
const Collection = require("../util/Collection");

let EventEmitter = require("eventemitter3");
const ClientUser = require("../structures/ClientUser");

module.exports = class Client extends EventEmitter {
    /**
     * @type {import("js-cord").ClientEvents<this>}
     */
    on = super.on;
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
                intents: undefined
            },
            debug: false,
            websocketOptions: {},
            presence: {
                mobile: false
            },
        }, options);

        this.user = new ClientUser({ id: undefined });

        /**
         * @type {import("js-cord").shard}
         */
        this.shards = new Collection();

        /**
         * @type {import("js-cord").channel}
         */
        this.channels = new Collection();

        /**
         * @type {import("js-cord").guild}
         */
        this.guilds = new Collection();

        this.gateway = new GatewayManager(this);
        
        this.requestHandler = new RequestHandler(this);
    }

    /**
     * @returns {import("js-cord").GatewayData}
     */
    async getBotGateway() {
        let data = await this.requestHandler.makeRequest(Endpoints.gateway, "GET", true);
        return data.body;
    }

    /**
     * @param {string} channelID
     * @param {string} messageID
     */
    deleteMessage(channelID, messageID) {
        return this.requestHandler.makeRequest(Endpoints.getMessage(channelID, messageID), "DELETE", true)
               .catch(err => null);
    }

    /**
     * @param {string} id
     */
    getGuild(id) {
        return this.guilds.get(id);
    }

    /**
     * @param {string} id
     */
    getChannel(id) {
        return this.channels.get(id);
    }

    /**
     * @param {String} channelID 
     * @param {String | import("js-cord").MessageOptions} content 
     * @returns {Promise<Message>}
     */
    async sendMessage(channelID, content) {
        let body = (typeof content === "string") ? { content } : content;

        if (!channelID) {
            return CordError.throwSnowflakeError("sendMessage()");
        }

        return await this.requestHandler.makeRequest(Endpoints.message(channelID), "POST",  true, body)
                    .then(data => new Message(data.body, this));
    }
}