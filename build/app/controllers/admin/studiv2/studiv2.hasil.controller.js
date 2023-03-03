"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_studiv2_proses_service_1 = __importDefault(require("../../../services/studiv2/admin.studiv2.proses.service"));
const admin_studiv2_hasil_service_1 = __importDefault(require("../../../services/studiv2/admin.studiv2.hasil.service"));
const kelas_v2_service_1 = __importDefault(require("../../../services/mastering/kelas.v2.service"));
class Studiv2HasilController {
    constructor() {
        // ! PERSISWA
        this.hasilGetSiswa = async (req, res) => {
            try {
                const proses_Service = new admin_studiv2_proses_service_1.default(req);
                const hasil_Service = new admin_studiv2_hasil_service_1.default(req);
                const siswa = await proses_Service.prosesGetSiswa(parseInt(req.params.siswa_id));
                const datas = await hasil_Service.hasilGetPersiswa(parseInt(req.params.siswa_id));
                // const get_dataJurusan = await hasil_Service.get_dataJurusan(datas);
                return res.send({
                    siswa: siswa,
                    data: datas,
                    // dataMinatbidangstudi: dataJurusanDanMinat.dataMinatbidangstudi,
                    // dataJurusan: get_dataJurusan,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.hasilGeneratePersiswa = async (req, res) => {
            try {
                const hasil_Service = new admin_studiv2_hasil_service_1.default(req);
                const datas = await hasil_Service.hasilGeneratePersiswa(parseInt(req.params.siswa_id));
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.hasilDeletePersiswa = async (req, res) => {
            try {
                const hasil_Service = new admin_studiv2_hasil_service_1.default(req);
                const datas = await hasil_Service.hasilDeletePersiswa(parseInt(req.params.siswa_id));
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.hasilRevisiNilaiAkhir = async (req, res) => {
            try {
                const hasil_Service = new admin_studiv2_hasil_service_1.default(req);
                const datas = await hasil_Service.hasilRevisiNilaiAkhir(parseInt(req.params.hasil_aspek_detail_id));
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        // ! PERSISWA-END
        // ! PERKELAS
        this.hasilGetPerkelas = async (req, res) => {
            try {
                const hasil_Service = new admin_studiv2_hasil_service_1.default(req);
                const datas = await hasil_Service.hasilGetPerkelas(parseInt(req.params.kelas_id));
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.hasilGetPerkelas_exportjawaban = async (req, res) => {
            try {
                const hasil_Service = new admin_studiv2_hasil_service_1.default(req);
                const kelas_Service = new kelas_v2_service_1.default(req);
                const dataKelas = await kelas_Service.kelasGetWhereId(parseInt(req.params.kelas_id));
                const datasHeader = await hasil_Service.hasilGetPerkelas_exportjawaban_header();
                const datas = await hasil_Service.hasilGetPerkelas_exportjawaban(parseInt(req.params.kelas_id));
                return res.send({
                    kelas: dataKelas,
                    header: datasHeader,
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.hasilGeneratePerkelas = async (req, res) => {
            try {
                const hasil_Service = new admin_studiv2_hasil_service_1.default(req);
                const datas = await hasil_Service.hasilGeneratePerkelas(parseInt(req.params.kelas_id));
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.hasilGeneratePerkelasCompleteOnly = async (req, res) => {
            try {
                const hasil_Service = new admin_studiv2_hasil_service_1.default(req);
                const datas = await hasil_Service.hasilGeneratePerkelasCompleteOnly(parseInt(req.params.kelas_id));
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.hasilDeletePerkelas = async (req, res) => {
            try {
                const hasil_Service = new admin_studiv2_hasil_service_1.default(req);
                const datas = await hasil_Service.hasilDeletePerkelas(parseInt(req.params.kelas_id));
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        // ! PERKELAS-END
    }
}
exports.default = new Studiv2HasilController();
