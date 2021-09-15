let Zlib = require("zlib-sync");
let Erlpack = require("erlpack");

module.exports = class Util {

    /**
     * @param {import("ws").Data} data
     */
    static parseData(data) {
        let zlib = new Zlib.Inflate({
            chunkSize: 128 * 1024
        });

        // Custom data parser from eris.
        try {
            if (data instanceof ArrayBuffer) {
                data = Buffer.from(data);
            } else if (Array.isArray(data)) { // Fragmented messages
                data = Buffer.concat(data); // Copyfull concat is slow, but no alternative
            }
            if (data.length >= 4 && data.readUInt32BE(data.length - 4) === 0xFFFF) {
                zlib.push(data, Zlib.Z_SYNC_FLUSH);
                if (zlib.err) {
                    console.log(`zlib error ${zlib.err}: ${zlib.msg}`);
                    return;
                }

                data = Buffer.from(zlib.result);
                if (Erlpack) {
                    return Erlpack.unpack(data);
                } else {
                    return JSON.parse(data.toString());
                }
            } else {
                return JSON.parse(data.toString());
            }
        } catch (err) {
            console.log(err);
        }
    }
}