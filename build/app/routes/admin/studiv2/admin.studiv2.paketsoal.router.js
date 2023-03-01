"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_jwt_1 = require("../../../middleware/auth.jwt");
const base_router_1 = __importDefault(require("../../base.router"));
const studiv2_paketsoal_controller_1 = __importDefault(require("../../../controllers/admin/studiv2/studiv2.paketsoal.controller"));
class AdminUjianstudiPaketsoalRouter extends base_router_1.default {
    routes() {
        // ! PAKETSOAL
        this.router.get("/paketsoal", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_paketsoal_controller_1.default.paketsoalGetAll);
        this.router.get("/paketsoal/:paketsoal_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_paketsoal_controller_1.default.paketsoalEdit);
        this.router.post("/paketsoal", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_paketsoal_controller_1.default.paketsoalStore);
        this.router.put("/paketsoal/:paketsoal_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_paketsoal_controller_1.default.paketsoalUpdate);
        this.router.delete("/paketsoal/:paketsoal_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_paketsoal_controller_1.default.paketsoalDelete);
        // ! PAKETSOAL-END
        // ! PAKETSOAL-ASPEK
        this.router.get("/paketsoal/:paketsoal_id/aspek", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_paketsoal_controller_1.default.aspekGetAll);
        this.router.get("/paketsoal/:paketsoal_id/aspek/:aspek_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_paketsoal_controller_1.default.aspekEdit);
        this.router.post("/paketsoal/:paketsoal_id/aspek", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_paketsoal_controller_1.default.aspekStore);
        this.router.put("/paketsoal/:paketsoal_id/aspek/:aspek_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_paketsoal_controller_1.default.aspekUpdate);
        this.router.delete("/paketsoal/:paketsoal_id/aspek/:aspek_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_paketsoal_controller_1.default.aspekDelete);
        // ! PAKETSOAL-ASPEK-END
        // ! PAKETSOAL-ASPEK-PENILAIAN
        this.router.get("/paketsoal/:paketsoal_id/aspek/penilaian/get", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_paketsoal_controller_1.default.penilaianGet);
        this.router.post("/paketsoal/:paketsoal_id/aspek/penilaian/get", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_paketsoal_controller_1.default.penilaianStore);
        this.router.get("/paketsoal/:paketsoal_id/aspek/penilaian/get/:aspek_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_paketsoal_controller_1.default.penilaianGetPerAspek);
        this.router.delete("/paketsoal/:paketsoal_id/aspek/penilaian/get/:penilaian_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_paketsoal_controller_1.default.penilaianDelete);
        // ! PAKETSOAL-ASPEK-PENILAIAN-END
        // ! PAKETSOAL-ASPEK_DETAIL
        this.router.get("/paketsoal/:paketsoal_id/aspek_detail", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_paketsoal_controller_1.default.aspek_detailGetAll);
        this.router.get("/paketsoal/:paketsoal_id/aspek_detail/:aspek_detail_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_paketsoal_controller_1.default.aspek_detailEdit);
        this.router.post("/paketsoal/:paketsoal_id/aspek_detail", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_paketsoal_controller_1.default.aspek_detailStore);
        this.router.put("/paketsoal/:paketsoal_id/aspek_detail/:aspek_detail_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_paketsoal_controller_1.default.aspek_detailUpdate);
        this.router.delete("/paketsoal/:paketsoal_id/aspek_detail/:aspek_detail_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_paketsoal_controller_1.default.aspek_detailDelete);
        // ! PAKETSOAL-ASPEK_DETAIL-END
        // ! PAKETSOAL-ASPEK_DETAIL-SOAL
        this.router.get("/paketsoal/:paketsoal_id/aspek_detail/:aspek_detail_id/soal", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_paketsoal_controller_1.default.soalGetAll);
        this.router.post("/paketsoal/:paketsoal_id/aspek_detail/:aspek_detail_id/soal", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_paketsoal_controller_1.default.soalStore);
        this.router.delete("/paketsoal/:paketsoal_id/aspek_detail/:aspek_detail_id/soal/:soal_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_paketsoal_controller_1.default.soalDelete);
        // ! PAKETSOAL-ASPEK_DETAIL-SOAL-END
    }
}
exports.default = new AdminUjianstudiPaketsoalRouter().router;
