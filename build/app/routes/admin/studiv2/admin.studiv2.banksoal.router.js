"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_jwt_1 = require("../../../middleware/auth.jwt");
const base_router_1 = __importDefault(require("../../base.router"));
const studiv2_banksoal_controller_1 = __importDefault(require("../../../controllers/admin/studiv2/studiv2.banksoal.controller"));
const studiv2_banksoal_aspek_validator_1 = require("../../../middleware/validator/studiv2.banksoal.aspek.validator");
class AdminUjianstudiBanksoalRouter extends base_router_1.default {
    routes() {
        this.router.get("/banksoal/aspek", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_banksoal_controller_1.default.aspekGetAll);
        this.router.get("/banksoal/aspek/:aspek_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_banksoal_controller_1.default.aspekEdit);
        this.router.post("/banksoal/aspek", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_banksoal_controller_1.default.aspekStore);
        this.router.put("/banksoal/aspek/:aspek_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_banksoal_aspek_validator_1.validate, studiv2_banksoal_controller_1.default.aspekUpdate);
        this.router.delete("/banksoal/aspek/:aspek_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_banksoal_controller_1.default.aspekDelete);
        this.router.get("/banksoal/aspek_detail", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_banksoal_controller_1.default.aspek_detailGetAll);
        this.router.get("/banksoal/aspek_detail/:aspek_detail_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_banksoal_controller_1.default.aspek_detailEdit);
        this.router.post("/banksoal/aspek_detail", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_banksoal_controller_1.default.aspek_detailStore);
        this.router.put("/banksoal/aspek_detail/:aspek_detail_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_banksoal_aspek_validator_1.validate, studiv2_banksoal_controller_1.default.aspek_detailUpdate);
        this.router.delete("/banksoal/aspek_detail/:aspek_detail_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_banksoal_controller_1.default.aspek_detailDelete);
        this.router.get("/banksoal/aspek_detail/:aspek_detail_id/soal", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_banksoal_controller_1.default.soalGetAll);
        this.router.get("/banksoal/aspek_detail/:aspek_detail_id/soal/:soal_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_banksoal_controller_1.default.soalEdit);
        this.router.post("/banksoal/aspek_detail/:aspek_detail_id/soal", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_banksoal_controller_1.default.soalStore);
        this.router.put("/banksoal/aspek_detail/:aspek_detail_id/soal/:soal_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_banksoal_controller_1.default.soalUpdate);
        this.router.delete("/banksoal/aspek_detail/:aspek_detail_id/soal/:soal_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_banksoal_controller_1.default.soalDelete);
        // !import
        this.router.get("/banksoal/aspek_detail/:aspek_detail_id/import/periksa/:kode_soal", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], studiv2_banksoal_controller_1.default.importSoalPeriksa);
    }
}
exports.default = new AdminUjianstudiBanksoalRouter().router;
