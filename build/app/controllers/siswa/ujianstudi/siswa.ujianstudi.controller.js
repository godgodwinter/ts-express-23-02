"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const siswa_ujianstudi_service_1 = __importDefault(require("../../../services/siswa/siswa.ujianstudi.service"));
class SiswaProfileController {
    constructor() {
        this.getAspekDetail = async (req, res) => {
            try {
                const siswa_service = new siswa_ujianstudi_service_1.default(req);
                const data_proses = await siswa_service.getProses();
                const data_aspek_detail = await siswa_service.getAspekDetail(data_proses.id);
                return res.send({
                    data: data_aspek_detail,
                    proses: data_proses,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.doMulai = async (req, res) => {
            try {
                const siswa_service = new siswa_ujianstudi_service_1.default(req);
                // const data_proses = await siswa_service.getProses();
                const res_do_mulai = await siswa_service.doMulai();
                return res.send({
                    data: res_do_mulai,
                    // proses: data_proses,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.doFinish = async (req, res) => {
            try {
                const siswa_service = new siswa_ujianstudi_service_1.default(req);
                // const data_proses = await siswa_service.getProses();
                const res_do_mulai = await siswa_service.doFinish();
                return res.send({
                    data: res_do_mulai,
                    // proses: data_proses,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.doJawab = async (req, res) => {
            try {
                const siswa_service = new siswa_ujianstudi_service_1.default(req);
                // const data_proses = await siswa_service.getProses();
                const res_do_mulai = await siswa_service.doJawab();
                return res.send({
                    data: res_do_mulai,
                    // proses: data_proses,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
    }
}
exports.default = new SiswaProfileController();
