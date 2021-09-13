module.exports = class WebsocketManager {
    constructor(data) {
        this.data = data;
        
        this.hasHadHeartBeat = false;
    }

    message() {}
}