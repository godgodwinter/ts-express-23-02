"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const studi_service_1 = __importDefault(require("../services/studi.service"));
class StudiController {
    constructor() {
        this.getDataUjian = async (req, res) => {
            try {
                const service = new studi_service_1.default(req);
                const datas = await service.getDataUjian();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.periksaUjianAktif = async (req, res) => {
            try {
                const service = new studi_service_1.default(req);
                let datas = await service.periksaUjianAktif();
                let result = {
                    success: false,
                    data: datas,
                    message: "Tidak ada ujian aktif"
                };
                if (datas) {
                    result.success = true;
                    result.message = "Ujian aktif ditemukan";
                }
                else {
                    result.data = {
                        ujian_proses_kelas_id: null
                    };
                }
                return res.send(result);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.getDataUjianEdit = async (req, res) => {
            try {
                const service = new studi_service_1.default(req);
                let datas = await service.getDataUjianEdit(parseInt(req.params.ujian_proses_kelas_id));
                let result = {
                    success: false,
                    data: datas,
                    message: "Tidak ada ujian aktif"
                };
                if (datas) {
                    result.success = true;
                    result.message = "Ujian aktif ditemukan";
                }
                else {
                    datas = {
                        ujian_proses_kelas_id: null
                    };
                }
                return res.send(result);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.doUjianDaftar = async (req, res) => {
            try {
                const service = new studi_service_1.default(req);
                let datas = await service.doUjianDaftar(parseInt(req.params.ujian_proses_kelas_id));
                let result = {
                    success: false,
                    data: datas,
                    paketsoal_id: datas === null || datas === void 0 ? void 0 : datas.paketsoal_id
                };
                if (datas) {
                    result.success = datas.success;
                    result.data = datas.data;
                }
                else {
                    result.data = "Kelas tidak terdaftar untuk paket ini!";
                }
                return res.send(result);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.periksa_daftar = async (req, res) => {
            try {
                const service = new studi_service_1.default(req);
                let datas = await service.periksa_daftar(parseInt(req.params.ujian_proses_kelas_id));
                let result = {
                    success: false,
                    data: datas,
                };
                if (datas) {
                    result.success = datas.success;
                    result.data = datas.data;
                }
                else {
                    result.data = "Siswa Belum daftar";
                }
                return res.send(result);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.getKategoriSoal = async (req, res) => {
            try {
                const service = new studi_service_1.default(req);
                let datas = await service.getKategoriSoal(parseInt(req.params.ujian_proses_kelas_id), parseInt(req.params.ujian_paketsoal_id));
                let result = {
                    success: false,
                    data: datas,
                };
                if (datas) {
                    result.success = datas.success;
                    result.data = datas.data;
                }
                else {
                    result.data = "-";
                }
                return res.send(result);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.getKategoriSoalDetail = async (req, res) => {
            try {
                const service = new studi_service_1.default(req);
                let datas = await service.getKategoriSoalDetail(parseInt(req.params.ujian_paketsoal_id), parseInt(req.params.kategori_id));
                let result = {
                    success: false,
                    data: datas,
                };
                if (datas) {
                    result.success = datas.success;
                    result.data = datas.data;
                }
                else {
                    result.data = "-";
                }
                return res.send(result);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.doMulaiUjian = async (req, res) => {
            try {
                const service = new studi_service_1.default(req);
                let datas = await service.doMulaiUjian(parseInt(req.params.ujian_proses_kelas_id), parseInt(req.params.ujian_paketsoal_kategori_id));
                let result = {
                    success: false,
                    data: datas,
                };
                if (datas) {
                    result.success = datas.success;
                    result.data = datas.data;
                }
                else {
                    result.data = "-";
                }
                return res.send(result);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.getSoal = async (req, res) => {
            try {
                const service = new studi_service_1.default(req);
                let datas = await service.getSoal(parseInt(req.params.ujian_proses_kelas_id), parseInt(req.params.ujian_paketsoal_kategori_id), parseInt(req.params.ujian_proses_kelas_siswa_kategori_id));
                let result = {
                    success: false,
                    data: datas,
                };
                if (datas) {
                    result.success = datas.success;
                    result.data = datas.data;
                }
                else {
                    result.data = "-";
                }
                return res.send(result);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.doInsertJawaban = async (req, res) => {
            try {
                let dataForm = {
                    ujian_paketsoal_soal_id: req.body.ujian_paketsoal_soal_id,
                    kode_soal: req.body.kode_soal,
                    ujian_paketsoal_soal_pilihanjawaban_id: req.body.ujian_paketsoal_soal_pilihanjawaban_id,
                    kode_jawaban: req.body.kode_jawaban,
                };
                const service = new studi_service_1.default(req);
                let datas = await service.doInsertJawaban(parseInt(req.params.ujian_proses_kelas_siswa_kategori_id), dataForm);
                let result = {
                    success: false,
                    data: datas,
                };
                if (datas) {
                    result.success = datas.success;
                    result.data = datas.data;
                }
                else {
                    result.data = "Siswa Belum daftar";
                }
                return res.send(result);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.doFinish = async (req, res) => {
            try {
                const service = new studi_service_1.default(req);
                let datas = await service.doFinish(parseInt(req.params.ujian_proses_kelas_siswa_kategori_id));
                let result = {
                    success: false,
                    data: datas,
                };
                if (datas) {
                    result.success = datas.success;
                    result.data = datas.data;
                }
                else {
                    result.data = "-";
                }
                return res.send(result);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
    }
}
exports.default = new StudiController();
