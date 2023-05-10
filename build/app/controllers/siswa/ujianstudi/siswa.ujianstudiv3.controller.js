"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const siswa_ujianstudi_service_1 = __importDefault(require("../../../services/siswa/siswa.ujianstudi.service"));
class SiswaUjianstudiv3Controller {
    constructor() {
        this.periksaUjianAktif = async (req, res) => {
            try {
                const siswa_service = new siswa_ujianstudi_service_1.default(req);
                const data_proses = await siswa_service.getProses();
                if (data_proses) {
                    const data_aspek_detail = await siswa_service.periksaUjianAktif(data_proses.id);
                    return res.send({
                        data: data_aspek_detail,
                        proses: data_proses,
                        message: "Success"
                    });
                }
                return res.send({
                    data: null,
                    proses: null,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.get_aspekdetail_tersedia = async (req, res) => {
            try {
                const siswa_service = new siswa_ujianstudi_service_1.default(req);
                const data_proses = await siswa_service.getProses();
                if (data_proses) {
                    const data_aspek_detail = await siswa_service.get_aspekdetail_tersedia(data_proses.id);
                    return res.send({
                        data: data_aspek_detail,
                        proses: data_proses,
                        message: "Success"
                    });
                }
                return res.send({
                    data: null,
                    proses: null,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.getAspekDetail_detail = async (req, res) => {
            try {
                const siswa_service = new siswa_ujianstudi_service_1.default(req);
                const data_aspek_detail = await siswa_service.getAspekDetail_detail(parseInt(req.params.studi_v2_proses_aspek_detail_id));
                return res.send({
                    data: data_aspek_detail,
                    message: "Success"
                });
                return res.send({
                    data: null,
                    proses: null,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.getSoal_perAspekdetail = async (req, res) => {
            try {
                const siswa_service = new siswa_ujianstudi_service_1.default(req);
                const data_aspek_detail = await siswa_service.getSoal_perAspekdetail(parseInt(req.params.studi_v2_proses_aspek_detail_id));
                return res.send({
                    data: data_aspek_detail,
                    message: "Success"
                });
                return res.send({
                    data: null,
                    proses: null,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.getSoal_perSoal = async (req, res) => {
            try {
                const siswa_service = new siswa_ujianstudi_service_1.default(req);
                const data_aspek_detail = await siswa_service.getSoal_perSoal(parseInt(req.params.studi_v2_proses_aspek_detail_id), parseInt(req.params.studi_v2_proses_aspek_detail_soal_id));
                return res.send({
                    data: data_aspek_detail,
                    message: "Success"
                });
                return res.send({
                    data: null,
                    proses: null,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.v3_doMulai = async (req, res) => {
            try {
                const siswa_service = new siswa_ujianstudi_service_1.default(req);
                const data_aspek_detail = await siswa_service.v3_doMulai(parseInt(req.params.studi_v2_proses_aspek_detail_id));
                return res.send({
                    data: data_aspek_detail,
                    message: "Success"
                });
                return res.send({
                    data: null,
                    proses: null,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.v3_doJawab = async (req, res) => {
            try {
                const siswa_service = new siswa_ujianstudi_service_1.default(req);
                const data_aspek_detail = await siswa_service.v3_doJawab(parseInt(req.params.studi_v2_proses_aspek_detail_id), parseInt(req.params.studi_v2_proses_aspek_detail_soal_id));
                return res.send({
                    data: data_aspek_detail,
                    message: "Success"
                });
                return res.send({
                    data: null,
                    proses: null,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.v3_doFinish = async (req, res) => {
            try {
                const siswa_service = new siswa_ujianstudi_service_1.default(req);
                const data_aspek_detail = await siswa_service.v3_doFinish(parseInt(req.params.studi_v2_proses_aspek_detail_id));
                return res.send({
                    data: data_aspek_detail,
                    message: "Success"
                });
                return res.send({
                    data: null,
                    proses: null,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
    }
}
exports.default = new SiswaUjianstudiv3Controller();
