"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kelas_v2_service_1 = __importDefault(require("../../../services/mastering/kelas.v2.service"));
const siswa_v2_service_1 = __importDefault(require("../../../services/mastering/siswa.v2.service"));
const sekolah_v2_service_1 = __importDefault(require("../../../services/mastering/sekolah.v2.service"));
class AdminMasteringSekolahController {
    constructor() {
        this.getSekolahAll = async (req, res) => {
            try {
                const Sekolah_Service = new sekolah_v2_service_1.default(req);
                const datas = await Sekolah_Service.sekolahGetAll();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.sekolahGetWhereId = async (req, res) => {
            try {
                const sekolah_Service = new sekolah_v2_service_1.default(req);
                const datas = await sekolah_Service.sekolahGetWhereId(parseInt(req.params.sekolah_id));
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.Edit = async (req, res) => {
            try {
                const sekolah_Service = new sekolah_v2_service_1.default(req);
                const datas = await sekolah_Service.sekolahGetWhereId(parseInt(req.params.sekolah_id));
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.getKelasWhereSekolah = async (req, res) => {
            try {
                const kelas_Service = new kelas_v2_service_1.default(req);
                const datas = await kelas_Service.kelasGetWhereSekolah(parseInt(req.params.sekolah_id));
                const sekolah_Service = new sekolah_v2_service_1.default(req);
                const dataSekolah = await sekolah_Service.sekolahGetWhereId(parseInt(req.params.sekolah_id));
                return res.send({
                    data: datas,
                    sekolah: dataSekolah,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.getSiswaWhereKelas = async (req, res) => {
            try {
                const siswa_Service = new siswa_v2_service_1.default(req);
                const datas = await siswa_Service.siswaGetWhereKelas(parseInt(req.params.kelas_id));
                const kelas_Service = new kelas_v2_service_1.default(req);
                const dataKelas = await kelas_Service.kelasGetWhereId(parseInt(req.params.kelas_id));
                const sekolah_Service = new sekolah_v2_service_1.default(req);
                const dataSekolah = await sekolah_Service.sekolahGetWhereId(parseInt(req.params.sekolah_id));
                return res.send({
                    data: datas,
                    kelas: dataKelas,
                    sekolah: dataSekolah,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
    }
}
exports.default = new AdminMasteringSekolahController();
