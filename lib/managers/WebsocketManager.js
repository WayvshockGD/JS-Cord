const Websocket = require("ws");

module.exports = class WebsocketManager {
    /**
     * @param {WebSocket.Data} data 
     */
    constructor(data) {
        this.data = data;
        
        this.hasHadHeartBeat = false;
    }
    
    keepAlive() {
        if (!this.hasHadHeartBeat) {
            
        }
    }

    message() {
        let data = (typeof this.data === "object") ? this.data : JSON.parse(this.data);

        switch (data.op) {
            case 10:
                this.keepAlive();
                break;
            case 11:
                this.hasHadHeartBeat = true;
                break;
        }
    }
}