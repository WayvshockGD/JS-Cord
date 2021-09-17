let messages = {
    "EMPTY_OPTIONS": "Options in method 'setOptions()' are undefined.",
    "EMPTY_TOKEN": "The token field is empty.",
    "INVALID_SIZE": "The option is an invalid size. sizes must be between 16 and 4096.",
    "INVALID_FORMAT": "The option is an invalid format. formats must be: JPEG, PNG, or GIF.",
    "INVALID_COLOR": "The option is color is invalid, please pick a valid one."
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
        throw new CordError(messages[error]);
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