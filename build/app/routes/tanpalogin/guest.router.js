"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_router_1 = __importDefault(require("../base.router"));
const admin_mastering_katabijak_controller_1 = __importDefault(require("../../controllers/admin/mastering/admin.mastering.katabijak.controller"));
class guestRouter extends base_router_1.default {
    routes() {
        this.router.get("/guest/katabijak", admin_mastering_katabijak_controller_1.default.getRandom);
        // this.router.post("/auth/me", [verifyToken, menuAdminOwner], AuthController.siswaMe)
    }
}
exports.default = new guestRouter().router;
