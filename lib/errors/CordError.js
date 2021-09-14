let messages = {
    "EMPTY_OPTIONS": "Options in method 'setOptions()' are undefined.",
    "EMPTY_TOKEN": "The token field is empty.",
};

module.exports = class CordError extends Error {

    /**
     * @param {string} message 
     */
    constructor(message) {
        super(message);
    }

    /**
     * @param {import("js-cord").errors} error 
     */
    static throw(error) {
        throw new CordError(errors[error]);
    }

    /**
     * @param {string} method
     */
    static throwSnowflakeError(method) {
        throw new CordError(`Method '${method}' requires an ID.`);
    }

    /**
     * @param {string} message
     * @param {number} code
     */
    static logError(message, code) {
        switch (code) {
            case 400:
                message = "Invalid json body.";
            break;
        };
        
        return console.log(message);
    }

    /**
     * @param {object} content
     */
    static throwBodyError(content) {
        let message;
    
        if (typeof content === "undefined") {
            message = "Cannot have a blank message.";
        } else {
            message = `Invalid content: ${content}`;
        }
        
        throw new CordError(message);
    }
}