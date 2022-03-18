import * as CryptoJS from 'crypto-js';

export const CRYPTO = {
    get SALT() {
        return CryptoJS.lib.WordArray.random(128 / 8);
    },
    get IV() {
        return CryptoJS.lib.WordArray.random(128 / 8);
    },
};
