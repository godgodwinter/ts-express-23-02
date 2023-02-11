"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_jwt_1 = require("../../middleware/auth.jwt");
const base_router_1 = __importDefault(require("../base.router"));
const admin_mastering_sekolah_controller_1 = __importDefault(require("../../controllers/admin/mastering/admin.mastering.sekolah.controller"));
class AdminMasteringSekolahRouter extends base_router_1.default {
    routes() {
        this.router.get("/admin/sekolah", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], admin_mastering_sekolah_controller_1.default.getSekolahAll);
        this.router.get("/owner/sekolah", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], admin_mastering_sekolah_controller_1.default.getSekolahAll);
        this.router.get("/admin/sekolah/:sekolah_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], admin_mastering_sekolah_controller_1.default.Edit);
        this.router.get("/owner/sekolah/:sekolah_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], admin_mastering_sekolah_controller_1.default.Edit);
        // this.router.post("/auth/me", [verifyToken, menuAdminOwner], AuthController.siswaMe)
    }
}
exports.default = new AdminMasteringSekolahRouter().router;
