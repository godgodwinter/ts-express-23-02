"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_jwt_1 = require("../../../middleware/auth.jwt");
const base_router_1 = __importDefault(require("../../base.router"));
const studiv2_hasil_controller_1 = __importDefault(require("../../../controllers/admin/studiv2/studiv2.hasil.controller"));
class AdminUjianstudiHasilRouter extends base_router_1.default {
    routes() {
        // * HASIL
        // ! PERSISWA
        this.router.get("/hasil/sekolah/:sekolah_id/kelas/:kelas_id/siswa/:siswa_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_hasil_controller_1.default.hasilGetSiswa);
        this.router.post("/hasil/sekolah/:sekolah_id/kelas/:kelas_id/siswa/:siswa_id/generate", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_hasil_controller_1.default.hasilGeneratePersiswa);
        this.router.delete("/hasil/sekolah/:sekolah_id/kelas/:kelas_id/siswa/:siswa_id/delete", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_hasil_controller_1.default.hasilDeletePersiswa);
        //# revisi
        this.router.put("/hasil/revisi/hasil_aspek_detail_id/:hasil_aspek_detail_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_hasil_controller_1.default.hasilRevisiNilaiAkhir);
        // ! PERSISWA-END
        // ! PERKELAS
        this.router.get("/hasil/sekolah/:sekolah_id/kelas/:kelas_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_hasil_controller_1.default.hasilGetPerkelas);
        this.router.post("/hasil/sekolah/:sekolah_id/kelas/:kelas_id/generate", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_hasil_controller_1.default.hasilGeneratePerkelas);
        this.router.delete("/hasil/sekolah/:sekolah_id/kelas/:kelas_id/delete", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_hasil_controller_1.default.hasilDeletePerkelas);
        // ! PERKELAS-END
        // !CETAK
        this.router.get("/cetak/siswa/:siswa_id", studiv2_hasil_controller_1.default.hasilGetSiswa);
        this.router.get("/cetak/kelas/:kelas_id", studiv2_hasil_controller_1.default.hasilGetPerkelas);
        // !CETAK-END
        // * HASIL-END
    }
}
exports.default = new AdminUjianstudiHasilRouter().router;
