let CordError = require("../errors/CordError");
let GatewayManager = require("../managers/GatewayManager");
let RequestHandler = require("../rest/RequestHandler");
let Endpoints = require("../util/Endpoints");
const Message = require("../structures/Message");
const Collection = require("../util/Collection");
const ClientUser = require("../structures/ClientUser");
const Constants = require("../util/Constants");

let EventEmitter = require("eventemitter3");

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
            image: {
                size: 256,
                format: "JPG"
            },
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

        if (this.options.gateway.intents) {
            if (Array.isArray(this.options.gateway.intents)) {
                let bits = 0;

                for (let i of this.options.gateway.intents) {
                    if (Constants.intents[i]) {
                        bits |= Constants.intents[i];
                    }
                }

                this.options.gateway.intents = bits;
            }
        }
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
     * @param {import("js-cord").MessageOptions | string} content 
     * @returns {Promise<Message>}
     */
    async sendMessage(channelID, content) {
        let body = (typeof content === "string") ? { content } : content;

        if (typeof content === "object") {
            if (content.embeds) {
                for (let e of content.embeds) {
                    if (typeof e.color === "string") {
                        let color = Constants.colors[e.color];
                        if (!color) {
                            return CordError.throw("INVALID_COLOR");
                        }

                        e.color = color;
                    }
                }
            }
        }

        if (!channelID) {
            return CordError.throwSnowflakeError("sendMessage()");
        }

        return await this.requestHandler.makeRequest(Endpoints.message(channelID), "POST",  true, body)
                    .then(data => new Message(data.body, this));
    }

    /**
     * @param {string} url
     * @returns {string}
     */
    format(url) {
        let option = this.options.image;

        let format = Constants.imageFormats[option.format];

        if (!format) {
            return CordError.throw("INVALID_FORMAT");
        };

        if (option.size < 14) {
            return CordError.throw("INVALID_SIZE");
        } else if (option.size > 4096) {
            return CordError.throw("INVALID_SIZE");
        };

        return `${url}?size=${option.size}&format=${format}`;
    }
}