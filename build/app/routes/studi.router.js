"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const studi_controller_1 = __importDefault(require("../controllers/studi.controller"));
// import { babengLimiterUjian, babengLimiter } from '../helpers/babengLimiter';
const auth_jwt_1 = require("../middleware/auth.jwt");
const base_router_1 = __importDefault(require("./base.router"));
class StudiRouter extends base_router_1.default {
    routes() {
        // AUTH SISWA
        this.router.get("/ujian", [auth_jwt_1.verifyToken, auth_jwt_1.menuSiswa], studi_controller_1.default.getDataUjian);
        this.router.get("/ujian/:ujian_proses_kelas_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuSiswa], studi_controller_1.default.getDataUjianEdit);
        this.router.get("/periksa/ujianaktif", [auth_jwt_1.verifyToken, auth_jwt_1.menuSiswa], studi_controller_1.default.periksaUjianAktif);
        this.router.post("/ujian/:ujian_proses_kelas_id/ujian_daftar", [auth_jwt_1.verifyToken, auth_jwt_1.menuSiswa], studi_controller_1.default.doUjianDaftar);
        this.router.get("/ujian/:ujian_proses_kelas_id/periksa_daftar", [auth_jwt_1.verifyToken, auth_jwt_1.menuSiswa], studi_controller_1.default.periksa_daftar);
        this.router.get("/ujian/proses_kelas/:ujian_proses_kelas_id/paketsoal/:ujian_paketsoal_id/kategori_soal", [auth_jwt_1.verifyToken, auth_jwt_1.menuSiswa], studi_controller_1.default.getKategoriSoal);
        this.router.get("/ujian/:ujian_paketsoal_id/kategori_soal_detail/:kategori_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuSiswa], studi_controller_1.default.getKategoriSoalDetail);
        this.router.post("/dataujian/:ujian_proses_kelas_id/paketsoal/:ujian_paketsoal_kategori_id/mulai_ujian", [auth_jwt_1.verifyToken, auth_jwt_1.menuSiswa], studi_controller_1.default.doMulaiUjian);
        this.router.post("/dataujian/:ujian_proses_kelas_id/paketsoal/:ujian_paketsoal_kategori_id/getsoal/:ujian_proses_kelas_siswa_kategori_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuSiswa], studi_controller_1.default.getSoal);
        this.router.post("/dataujian/proses/kategori/:ujian_proses_kelas_siswa_kategori_id/insertjawaban", [auth_jwt_1.verifyToken, auth_jwt_1.menuSiswa], studi_controller_1.default.doInsertJawaban);
        this.router.post("/dataujian/proses/finish/:ujian_proses_kelas_siswa_kategori_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuSiswa], studi_controller_1.default.doFinish);
    }
}
exports.default = new StudiRouter().router;
