"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_router_1 = __importDefault(require("../base.router"));
class guestRouter extends base_router_1.default {
    routes() {
        // this.router.get("/guest/katabijak", adminMasteringKatabijakController.getRandom)
        // this.router.post("/auth/me", [verifyToken, menuAdminOwner], AuthController.siswaMe)
    }
}
exports.default = new guestRouter().router;
