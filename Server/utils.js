import { createHash } from "crypto";
const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function encodeBase62BigInt(num) {
    let encoded = '';
    const base = BigInt(62);
    while (num > 0) {
        encoded = chars[Number(num % base)] + encoded;
        num = num / base;
    }
    return encoded || '0';
}

function generateBase62ShortCode(longUrl) {
    const hash = createHash('md5').update(longUrl).digest();
    const num = (BigInt(hash.readUIntBE(0, 6))); 
    return encodeBase62BigInt(num);
}

export { generateBase62ShortCode };
