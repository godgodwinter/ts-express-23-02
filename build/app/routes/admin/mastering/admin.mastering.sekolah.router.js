"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Request, Response } from 'express';
const auth_jwt_1 = require("../../../middleware/auth.jwt");
// import AuthController from '../../controllers/auth/auth.controller';
const base_router_1 = __importDefault(require("../../base.router"));
const admin_mastering_sekolah_controller_1 = __importDefault(require("../../../controllers/admin/mastering/admin.mastering.sekolah.controller"));
class AdminMasteringSekolahRouterV2 extends base_router_1.default {
    routes() {
        this.router.get("/sekolah", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], admin_mastering_sekolah_controller_1.default.getSekolahAll);
        this.router.get("/sekolah/:sekolah_id", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], admin_mastering_sekolah_controller_1.default.sekolahGetWhereId);
        this.router.get("/sekolah/:sekolah_id/kelas", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], admin_mastering_sekolah_controller_1.default.getKelasWhereSekolah);
        this.router.get("/sekolah/:sekolah_id/kelas/:kelas_id/siswa", [auth_jwt_1.verifyToken, auth_jwt_1.menuAdminOwner], admin_mastering_sekolah_controller_1.default.getSiswaWhereKelas);
    }
}
exports.default = new AdminMasteringSekolahRouterV2().router;
