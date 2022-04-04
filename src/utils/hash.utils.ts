const sha256 = require('js-sha256').sha256;

export class HashUtils {
    public static verifySign(value: string, hash: string): boolean {
        const key = "178c3cbc-ddb9-acdfe332f";
        const hashed = sha256.hmac(key, value);
        console.log("SHA256: ", hashed);
        return hashed == hash;
    }
}