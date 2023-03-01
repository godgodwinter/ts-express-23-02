"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_studiv2_proses_service_1 = __importDefault(require("../../../services/studiv2/admin.studiv2.proses.service"));
class Studiv2ProsesController {
    constructor() {
        // ! PERSISWA
        this.prosesGetSiswa = async (req, res) => {
            try {
                const proses_Service = new admin_studiv2_proses_service_1.default(req);
                const siswa = await proses_Service.prosesGetSiswa(parseInt(req.params.siswa_id));
                const datas = await proses_Service.prosesGetProsesUjianPersiswa(parseInt(req.params.siswa_id));
                return res.send({
                    siswa: siswa,
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.do_reset_waktu = async (req, res) => {
            try {
                const proses_Service = new admin_studiv2_proses_service_1.default(req);
                const datas = await proses_Service.do_reset_waktu(parseInt(req.params.proses_detail_id));
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.do_reset_salah = async (req, res) => {
            try {
                const proses_Service = new admin_studiv2_proses_service_1.default(req);
                const datas = await proses_Service.do_reset_salah(parseInt(req.params.proses_detail_id));
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.prosesStorePerSiswa = async (req, res) => {
            try {
                const proses_Service = new admin_studiv2_proses_service_1.default(req);
                // periksa jika siswa_id di table proses sudah ada maka skip /return false
                const isSiswaSudahAdaDiProses = await proses_Service.prosesPeriksaIsSiswaSudahAda(parseInt(req.params.siswa_id), req.body.tgl_ujian);
                // console.log(isSiswaSudahAdaDiProses);
                // return res.send({
                //     data: isSiswaSudahAdaDiProses,
                //     message: "Success"
                // });
                if (isSiswaSudahAdaDiProses) {
                    return res.status(200).send({
                        status: false,
                        data: "Data ujian Siswa sudah ada",
                        message: "Failed"
                    });
                }
                const datas = await proses_Service.prosesStorePerSiswa(parseInt(req.params.siswa_id), parseInt(req.params.paketsoal_id), req.body);
                // setTimeout(()=>{},5000)
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.prosesDeletePersiswa = async (req, res) => {
            try {
                const proses_Service = new admin_studiv2_proses_service_1.default(req);
                const datas = await proses_Service.prosesDeletePersiswa(parseInt(req.params.siswa_id), parseInt(req.params.proses_id));
                // setTimeout(()=>{},5000)
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
        //! PERKELAS
        this.prosesGetSiswaPerKelas = async (req, res) => {
            try {
                const proses_Service = new admin_studiv2_proses_service_1.default(req);
                const datas = await proses_Service.prosesGetSiswaPerKelas(parseInt(req.params.kelas_id));
                // setTimeout(()=>{},5000)
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.prosesStoreSiswaPerKelas = async (req, res) => {
            try {
                const proses_Service = new admin_studiv2_proses_service_1.default(req);
                const datas = await proses_Service.prosesStoreSiswaPerKelas(parseInt(req.params.kelas_id), parseInt(req.params.paketsoal_id), req.body);
                // setTimeout(()=>{},5000)
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.prosesDeleteSiswaPerKelas = async (req, res) => {
            try {
                const proses_Service = new admin_studiv2_proses_service_1.default(req);
                const datas = await proses_Service.prosesDeleteSiswaPerKelas(parseInt(req.params.kelas_id));
                // setTimeout(()=>{},5000)
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
exports.default = new Studiv2ProsesController();
