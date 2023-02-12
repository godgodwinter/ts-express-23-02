"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const base_router_1 = __importDefault(require("./base.router"));
// import { babengLimiter } from '../helpers/babengLimiter';
// import rateLimit from "express-rate-limit"
// const limiter = rateLimit({
//     windowMs: 1 * 60 * 1000, // 1 minutes
//     max: 1, // Limit each IP to 70 requests per `window` (here, per 15 minutes)
//     // delayMs: 0, // disable delaying - full speed until the max limit is reached
//     message: "Too many requests maid from this IP, please try again after an hour",
//     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//     legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// })
class HomeRoutes extends base_router_1.default {
    routes() {
        this.router.get("/home", (req, res) => {
            res.send({
                success: true,
                message: 'this is Home TS dev'
            });
        });
        this.router.get("/users", user_controller_1.default.index);
    }
}
exports.default = new HomeRoutes().router;
