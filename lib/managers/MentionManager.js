let Collection = require("../util/Collection");

module.exports = class MentionManager {
    /**
     * @param {import("js-cord").MentionManagerParams} data 
     */
    constructor(data) {
        this.roles = data.roles;
        this.channels = data.channels;
        this.members = data.members;
    }

    get member() {
        /**
         * @type {import("js-cord").memberMentions}
         */
        let mentions = new Collection();

        for (let m of this.members) {
            if (m) {
                mentions.set(m.id, m);
            }
        }

        return mentions;
    }

    get role() {
        /**
         * @type {import("js-cord").roleMentions}
         */
        let mentions = new Collection();

        for(let r of this.roles) {
            if (r) {
                mentions.set(r, r);
            }
        }

        return mentions;
    }

    get channel() {
        console.log(this.channels)
        /**
         * @type {import("js-cord").channelMentions}
         */
        let mentions = new Collection();

        for (let c of this.channels) {
            if (c) {
                mentions.set(c.id, c);
            }
        }

        return mentions;
    }
}