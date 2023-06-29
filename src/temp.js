const crypto = require("crypto");

const sharedSecretKey = "4cd80d09-4e5e-4253-885b-c7ec0a0535ce";

const payload = "0abc4353-00ea-4b86-a0f5-4dcf1b37652d";
                
const hash = crypto
    .createHmac("sha256", sharedSecretKey)
    .update(payload)
    .digest("hex");

const xHmacSignature = `sha256=${hash}`;

console.log(xHmacSignature);
                