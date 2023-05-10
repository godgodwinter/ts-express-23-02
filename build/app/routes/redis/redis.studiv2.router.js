"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_router_1 = __importDefault(require("../base.router"));
const redis_studiv2_paketsoal_controller_1 = __importDefault(require("../../controllers/admin/studiv2/redis/redis.studiv2.paketsoal.controller"));
const redis_studiv2_proses_controller_1 = __importDefault(require("../../controllers/admin/studiv2/redis/redis.studiv2.proses.controller"));
const auth_jwt_1 = require("../../middleware/auth.jwt");
class RedisStudiv2Routes extends base_router_1.default {
    routes() {
        this.router.get("/home", (req, res) => {
            res.send({
                success: true,
                message: 'this is Redis Home TS dev'
            });
        });
        // ! PAKETSOAL
        this.router.get("/paketsoal_aktif/get", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], redis_studiv2_paketsoal_controller_1.default.paketsoal_aktif_get);
        this.router.get("/paketsoal_aktif/get/less", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], redis_studiv2_paketsoal_controller_1.default.paketsoal_aktif_get_less);
        this.router.delete("/paketsoal_aktif/delete", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], redis_studiv2_paketsoal_controller_1.default.paketsoal_aktif_delete);
        this.router.get("/paketsoal/:paketsoal_id/aktifkan", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], redis_studiv2_paketsoal_controller_1.default.paketsoal_aktifkan);
        this.router.get("/paketsoal/:paketsoal_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], redis_studiv2_paketsoal_controller_1.default.paketsoal_store);
        this.router.get("/aspek_detail/:aspek_detail_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], redis_studiv2_paketsoal_controller_1.default.aspek_detail_store);
        this.router.get("/redis/service", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], redis_studiv2_paketsoal_controller_1.default.index);
        // ! PROSES
        this.router.get("/proses/:siswa_id/get", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], redis_studiv2_proses_controller_1.default.proses_siswa_get);
        this.router.get("/proses/:siswa_id/store", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], redis_studiv2_proses_controller_1.default.proses_siswa_store);
        this.router.delete("/proses/:siswa_id/delete", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], redis_studiv2_proses_controller_1.default.proses_siswa_delete);
        // ! PROSES
        this.router.get("/proses_kelas/:kelas_id/store", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], redis_studiv2_proses_controller_1.default.proses_kelas_store);
        this.router.delete("/proses_kelas/:kelas_id/delete", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], redis_studiv2_proses_controller_1.default.proses_kelas_delete);
    }
}
exports.default = new RedisStudiv2Routes().router;
