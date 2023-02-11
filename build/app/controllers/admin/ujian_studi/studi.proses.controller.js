"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_studi_proses_service_1 = __importDefault(require("../../../services/admin.studi.proses.service"));
class AdminStudiProsesController {
    constructor() {
        this.getAllSekolah = async (req, res) => {
            try {
                const service = new admin_studi_proses_service_1.default(req);
                const datas = await service.studi_proses_getSekolah();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.getAllKelasPerSekolah = async (req, res) => {
            try {
                const service = new admin_studi_proses_service_1.default(req);
                const datas = await service.studi_proses_getAllKelasPerSekolah();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.getAllSiswaPerKelas = async (req, res) => {
            try {
                const service = new admin_studi_proses_service_1.default(req);
                const datas = await service.studi_proses_getAllSiswaPerKelas();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.getAllKategoriPerSiswa = async (req, res) => {
            try {
                const service = new admin_studi_proses_service_1.default(req);
                const datas = await service.studi_proses_getAllKategoriPerSiswa();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        // !RESET WAKTU
        this.doResetWaktu = async (req, res) => {
            try {
                const service = new admin_studi_proses_service_1.default(req);
                const datas = await service.doResetWaktu();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.doResetAll = async (req, res) => {
            try {
                const service = new admin_studi_proses_service_1.default(req);
                const datas = await service.doResetWaktu();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.doResetSalah = async (req, res) => {
            try {
                const service = new admin_studi_proses_service_1.default(req);
                const datas = await service.doResetSalah();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.doGenerateHasilUjianSiswa = async (req, res) => {
            try {
                const service = new admin_studi_proses_service_1.default(req);
                const datas = await service.doGenerateHasilUjianSiswa();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
    }
}
exports.default = new AdminStudiProsesController();
