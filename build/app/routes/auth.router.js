"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_jwt_1 = require("./../middleware/auth.jwt");
const auth_controller_1 = __importDefault(require("../controllers/auth/auth.controller"));
const base_router_1 = __importDefault(require("./base.router"));
const auth_siswa_controller_1 = __importDefault(require("../controllers/auth/auth.siswa.controller"));
const auth_owner_controller_1 = __importDefault(require("../controllers/auth/auth.owner.controller"));
class AuthRoutes extends base_router_1.default {
    routes() {
        // AUTH SISWA
        this.router.post("/siswa/auth/login", auth_siswa_controller_1.default.siswaLogin);
        this.router.post("/siswa/auth/me", [auth_jwt_1.verifyToken, auth_jwt_1.menuSiswa], auth_siswa_controller_1.default.siswaMe);
        this.router.post("/siswa/auth/me_ujian", [auth_jwt_1.verifyToken, auth_jwt_1.menuSiswa], auth_siswa_controller_1.default.siswaMeUjian);
        // AUTH ADMIN
        this.router.post("/admin/auth/login", auth_controller_1.default.adminLogin);
        // this.router.post("/admin/auth/me", [verifyToken, menuAdminOwner], AuthController.siswaMe)
        // this.router.post("/admin/auth/me_ujian", [verifyToken, menuAdminOwner], AuthController.siswaMeUjian)
        // AUTH OWNER
        this.router.post("/owner/auth/login", auth_owner_controller_1.default.ownerLogin);
        this.router.post("/owner/auth/me", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], auth_owner_controller_1.default.Me);
    }
}
exports.default = new AuthRoutes().router;
