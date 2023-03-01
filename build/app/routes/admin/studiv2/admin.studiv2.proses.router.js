"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_jwt_1 = require("../../../middleware/auth.jwt");
const base_router_1 = __importDefault(require("../../base.router"));
const studiv2_proses_controller_1 = __importDefault(require("../../../controllers/admin/studiv2/studiv2.proses.controller"));
class AdminUjianstudiProsesRouter extends base_router_1.default {
    routes() {
        // * PROSES
        // ! PERSISWA
        this.router.get("/proses/sekolah/:sekolah_id/kelas/:kelas_id/siswa/:siswa_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_proses_controller_1.default.prosesGetSiswa);
        this.router.post("/proses/sekolah/:sekolah_id/kelas/:kelas_id/siswa/:siswa_id/generate/:paketsoal_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_proses_controller_1.default.prosesStorePerSiswa);
        this.router.delete("/proses/sekolah/:sekolah_id/kelas/:kelas_id/siswa/:siswa_id/delete/:proses_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_proses_controller_1.default.prosesDeletePersiswa);
        this.router.post("/proses/reset/:proses_detail_id/waktu", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_proses_controller_1.default.do_reset_waktu);
        this.router.post("/proses/reset/:proses_detail_id/salah", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_proses_controller_1.default.do_reset_salah);
        // ! PERSISWA-END
        // ! PERKELAS
        this.router.get("/proses/sekolah/:sekolah_id/kelas/:kelas_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_proses_controller_1.default.prosesGetSiswaPerKelas);
        this.router.post("/proses/sekolah/:sekolah_id/kelas/:kelas_id/generate/:paketsoal_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_proses_controller_1.default.prosesStoreSiswaPerKelas);
        this.router.delete("/proses/sekolah/:sekolah_id/kelas/:kelas_id/delete", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_proses_controller_1.default.prosesDeleteSiswaPerKelas);
        // ! PERKELAS-END
        // * PROSES-END
    }
}
exports.default = new AdminUjianstudiProsesRouter().router;
