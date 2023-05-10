"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_jwt_1 = require("../../middleware/auth.jwt");
const base_router_1 = __importDefault(require("../base.router"));
const siswa_ujianstudiv3_controller_1 = __importDefault(require("../../controllers/siswa/ujianstudi/siswa.ujianstudiv3.controller"));
class siswaUjianstudiv3Router extends base_router_1.default {
    routes() {
        this.router.get("/periksaUjianAktif", [auth_jwt_1.verifyToken, auth_jwt_1.menuSiswa], siswa_ujianstudiv3_controller_1.default.periksaUjianAktif); // !belum
        this.router.get("/get_aspekdetail_tersedia", [auth_jwt_1.verifyToken, auth_jwt_1.menuSiswa], siswa_ujianstudiv3_controller_1.default.get_aspekdetail_tersedia);
        this.router.get("/aspekdetail/:studi_v2_proses_aspek_detail_id/detail", [auth_jwt_1.verifyToken, auth_jwt_1.menuSiswa], siswa_ujianstudiv3_controller_1.default.getAspekDetail_detail);
        this.router.post("/paketsoal/:studi_v2_proses_aspek_detail_id/do_mulai", [auth_jwt_1.verifyToken, auth_jwt_1.menuSiswa], siswa_ujianstudiv3_controller_1.default.v3_doMulai); //! sudah
        this.router.get("/paketsoal/:studi_v2_proses_aspek_detail_id/getsoal", [auth_jwt_1.verifyToken, auth_jwt_1.menuSiswa], siswa_ujianstudiv3_controller_1.default.getSoal_perAspekdetail); //getsoal per aspekdetail
        this.router.get("/paketsoal/:studi_v2_proses_aspek_detail_id/getsoal/:studi_v2_proses_aspek_detail_soal_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuSiswa], siswa_ujianstudiv3_controller_1.default.getSoal_perSoal); //get soal per soal
        this.router.post("/paketsoal/:studi_v2_proses_aspek_detail_id/getsoal/:studi_v2_proses_aspek_detail_soal_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuSiswa], siswa_ujianstudiv3_controller_1.default.v3_doJawab); //jawab //!belum
        this.router.post("/paketsoal/:studi_v2_proses_aspek_detail_id/do_finish", [auth_jwt_1.verifyToken, auth_jwt_1.menuSiswa], siswa_ujianstudiv3_controller_1.default.v3_doFinish); //!belum
    }
}
exports.default = new siswaUjianstudiv3Router().router;
