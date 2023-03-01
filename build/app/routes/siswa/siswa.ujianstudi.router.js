"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_jwt_1 = require("../../middleware/auth.jwt");
const base_router_1 = __importDefault(require("../base.router"));
const siswa_ujianstudi_controller_1 = __importDefault(require("../../controllers/siswa/ujianstudi/siswa.ujianstudi.controller"));
class siswaUjianstudiRouter extends base_router_1.default {
    routes() {
        this.router.get("/aspek_detail", [auth_jwt_1.verifyToken, auth_jwt_1.menuSiswa], siswa_ujianstudi_controller_1.default.getAspekDetail);
        this.router.post("/aspek_detail/:aspek_detail_id/mulai", [auth_jwt_1.verifyToken, auth_jwt_1.menuSiswa], siswa_ujianstudi_controller_1.default.doMulai);
        this.router.post("/aspek_detail/jawab/:soal_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuSiswa], siswa_ujianstudi_controller_1.default.doJawab);
        this.router.post("/aspek_detail/:aspek_detail_id/finish", [auth_jwt_1.verifyToken, auth_jwt_1.menuSiswa], siswa_ujianstudi_controller_1.default.doFinish);
        // this.router.post("/auth/me", [verifyToken, menuAdminOwner], AuthController.siswaMe)
    }
}
exports.default = new siswaUjianstudiRouter().router;
