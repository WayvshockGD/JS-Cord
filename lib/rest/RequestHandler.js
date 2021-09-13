let { base } = require("../util/Endpoints");
let pkg = require("../../package.json");
let got = require("got");
let Client = require("../core/Client");
const CordError = require("../errors/CordError");

module.exports = class RequestHandler {

    /**
     * @param {Client} client
     */
    constructor(client) {
        this.client = client;
        this.agent = `js-cord (${pkg.repository.url}, ${pkg.version})`;
    }

    /**
     * @param {string} endpoint 
     * @param {import("got/dist/source").Method} method 
     * @param {object} body 
     */
    async makeRequest(endpoint, method, auth, body) {
        /**
         * @type {import("got").OptionsOfTextResponseBody}
         */
        let options = {
            "headers": {
                "content-type": "application/json",
                "User-Agent": this.agent,
                "Accept-Encoding": "gzip,deflate",
                "X-RateLimit-Precision": "millisecond"
            },
            throwHttpErrors: false,
            method
        };

        if (body) {
            options.json = body;
        }

        if (auth) {
            options.headers["Authorization"] = this.client.token;
        }

        let res = await got.default(`${base}${endpoint}`, options);

        if (res.statusCode === 400) {
            return CordError.throwBodyError(body)
        } else {
            if (res.statusCode === 300) {
                return;
            }
            
            console.log(res.statusCode);
        }

        return {
            body: res.body
        };
    }
}