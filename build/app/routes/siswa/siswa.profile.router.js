"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Request, Response } from 'express';
const auth_jwt_1 = require("../../middleware/auth.jwt");
// import AuthController from '../../controllers/auth/auth.controller';
const base_router_1 = __importDefault(require("../base.router"));
const siswa_profile_controller_1 = __importDefault(require("../../controllers/siswa/profile/siswa.profile.controller"));
class SiswaProfileRouter extends base_router_1.default {
    routes() {
        this.router.get("/profile", [auth_jwt_1.verifyToken, auth_jwt_1.menuSiswa], siswa_profile_controller_1.default.siswaProfileku);
        // this.router.post("/auth/me", [verifyToken, menuAdminOwner], AuthController.siswaMe)
    }
}
exports.default = new SiswaProfileRouter().router;
