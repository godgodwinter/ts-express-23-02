"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_jwt_1 = require("../../../middleware/auth.jwt");
const base_router_1 = __importDefault(require("../../base.router"));
const studi_proses_controller_1 = __importDefault(require("../../../controllers/admin/ujian_studi/studi.proses.controller"));
class StudiProsesRouter extends base_router_1.default {
    routes() {
        this.router.get("/admin/menuujian/proses", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studi_proses_controller_1.default.getAllSekolah);
        this.router.get("/admin/menuujian/proseskelas/:ujian_proses_id/kelas", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studi_proses_controller_1.default.getAllKelasPerSekolah);
        this.router.get("/admin/menuujian/proseskelas/:ujian_proses_id/kelas/:ujian_proses_kelas_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studi_proses_controller_1.default.getAllSiswaPerKelas);
        this.router.get("/admin/menuujian/proseskelas/:ujian_proses_id/kelas/:ujian_proses_kelas_id/siswa/:ujian_proses_kelas_siswa_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studi_proses_controller_1.default.getAllKategoriPerSiswa);
        this.router.post("/admin/menuujian/proesssiswa/:ujian_proses_kelas_siswa_kategori_id/reset_waktu", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studi_proses_controller_1.default.doResetWaktu);
        this.router.post("/admin/menuujian/proesssiswa/:ujian_proses_kelas_siswa_kategori_id/reset_salah", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studi_proses_controller_1.default.doResetSalah);
        // this.router.post("/admin/menuujian/proesssiswa/:ujian_proses_kelas_siswa_kategori_id/reset_all", [verifyToken, menuAdminOwner], AdminStudiProsesController.doResetAll) // !BELUM
        // GENERATE HASIL UJIAN STUDI
        // this.router.get("/admin/hasil_ujian_lintas/kelas/:kelas_id", [verifyToken, menuAdminOwner], AdminStudiProsesController.doGenerateHasilUjianKelas)
        // this.router.get("/admin/hasil_ujian_lintas/siswa/:siswa_id", [verifyToken, menuAdminOwner], AdminStudiProsesController.doGenerateHasilUjianSiswa)
    }
}
exports.default = new StudiProsesRouter().router;
