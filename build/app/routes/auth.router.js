"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const auth_jwt_1 = __importDefault(require("../middleware/auth.jwt"));
const base_router_1 = __importDefault(require("./base.router"));
class AuthRoutes extends base_router_1.default {
    routes() {
        // AUTH SISWA
        this.router.post("/auth/login", auth_controller_1.default.siswaLogin);
        this.router.post("/auth/me", [auth_jwt_1.default.verifyToken], auth_controller_1.default.siswaMe);
        this.router.post("/auth/me_ujian", [auth_jwt_1.default.verifyToken], auth_controller_1.default.siswaMeUjian);
    }
}
exports.default = new AuthRoutes().router;
