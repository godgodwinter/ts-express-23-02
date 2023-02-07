"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const base_router_1 = __importDefault(require("./base.router"));
class HomeRoutes extends base_router_1.default {
    routes() {
        this.router.get("/home", (req, res) => {
            res.send('this is Home TS dev');
        });
        this.router.get("/users", user_controller_1.default.index);
    }
}
exports.default = new HomeRoutes().router;
