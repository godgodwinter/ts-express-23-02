"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.babengLimiterUjian = exports.babengLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const babengLimiter = (max = 30, minutes = 1) => (0, express_rate_limit_1.default)({
    windowMs: minutes * 60 * 1000,
    max: max,
    // delayMs: 0, // disable delaying - full speed until the max limit is reached
    message: `Too many requests maid from this IP, please try again after an hour. ${max} req / ${minutes} minutes`,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
exports.babengLimiter = babengLimiter;
const babengLimiterUjian = (max = 5000, minutes = 1) => (0, express_rate_limit_1.default)({
    windowMs: minutes * 60 * 1000,
    max: max,
    // delayMs: 0, // disable delaying - full speed until the max limit is reached
    message: `Too many requests maid from this IP, please try again after an hour. ${max} req / ${minutes} minutes - Ujian`,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
exports.babengLimiterUjian = babengLimiterUjian;
