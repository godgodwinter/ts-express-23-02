"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode_base64 = exports.encode_base64 = void 0;
const encode_base64 = (str) => {
    return Buffer.from(str).toString('base64');
};
exports.encode_base64 = encode_base64;
const decode_base64 = (str) => {
    return Buffer.from(str, 'base64').toString();
};
exports.decode_base64 = decode_base64;
