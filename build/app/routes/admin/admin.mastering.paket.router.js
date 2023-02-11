"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_jwt_1 = require("../../middleware/auth.jwt");
const base_router_1 = __importDefault(require("../base.router"));
const admin_mastering_paket_controller_1 = __importDefault(require("../../controllers/admin/mastering/admin.mastering.paket.controller"));
class AdminMasteringPaketRouter extends base_router_1.default {
    routes() {
        this.router.get("/admin/paket", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], admin_mastering_paket_controller_1.default.getAll);
        this.router.get("/owner/paket", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], admin_mastering_paket_controller_1.default.getAll);
        this.router.get("/admin/paket/:paket_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], admin_mastering_paket_controller_1.default.Edit);
        this.router.get("/owner/paket/:paket_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], admin_mastering_paket_controller_1.default.Edit);
        // this.router.post("/auth/me", [verifyToken, menuAdminOwner], AuthController.siswaMe)
    }
}
exports.default = new AdminMasteringPaketRouter().router;
