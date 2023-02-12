
import rateLimit from "express-rate-limit"

export const babengLimiter = (max: number = 30, minutes: number = 1) => rateLimit({
    windowMs: minutes * 60 * 1000, // 1 minutes
    max: max, // Limit each IP to 70 requests per `window` (here, per 15 minutes)
    // delayMs: 0, // disable delaying - full speed until the max limit is reached
    message: `Too many requests maid from this IP, please try again after an hour. ${max} req / ${minutes} minutes`,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


export const babengLimiterUjian = (max: number = 30, minutes: number = 1) => rateLimit({
    windowMs: minutes * 60 * 1000, // 1 minutes
    max: max, // Limit each IP to 70 requests per `window` (here, per 15 minutes)
    // delayMs: 0, // disable delaying - full speed until the max limit is reached
    message: `Too many requests maid from this IP, please try again after an hour. ${max} req / ${minutes} minutes - Ujian`,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})