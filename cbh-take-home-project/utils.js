const crypto = require("crypto");

exports.createHash = (value) => {
    return crypto.createHash("sha3-512").update(value).digest("hex");
}
