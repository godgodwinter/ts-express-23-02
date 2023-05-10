"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_router_1 = __importDefault(require("../base.router"));
const datasiswa_deteksimasalah_controller_1 = __importDefault(require("../../controllers/siswa/datasiswa/datasiswa.deteksimasalah.controller"));
class guestDatasiswaRouter extends base_router_1.default {
    routes() {
        this.router.get("/guest/datasiswa/deteksimasalah/:siswa_id", datasiswa_deteksimasalah_controller_1.default.getPersiswa);
        this.router.get("/guest/datasiswa/deteksimasalah/:kelas_id/perkelas", datasiswa_deteksimasalah_controller_1.default.getPerkelas);
    }
}
exports.default = new guestDatasiswaRouter().router;
