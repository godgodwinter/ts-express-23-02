"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_studiv2_proses_service_1 = __importDefault(require("../../../services/studiv2/admin.studiv2.proses.service"));
const models_1 = require("../../../models");
const { studi_v2_paketsoal, studi_v2_paketsoal_aspek, studi_v2_paketsoal_aspek_detail, studi_v2_paketsoal_aspek_penilaian, studi_v2_paketsoal_soal, studi_v2_paketsoal_pilihanjawaban, studi_v2_banksoal_soal, studi_v2_banksoal_soal_pilihanjawaban, studi_v2_proses, studi_v2_proses_aspek_detail, studi_v2_proses_aspek_detail_soal, studi_v2_proses_aspek_detail_soal_pilihan_jawaban, studi_v2_hasil } = models_1.db_studi_v2;
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
                    const addSoal = await proses_Service.prosesAddSoal(parseInt(req.params.siswa_id), parseInt(req.params.paketsoal_id), req.body);
                    const fn_delay_response = (arg) => {
                        console.log(`arg was => ${arg}`);
                        // return res.status(500).send({ message: "error.message" });
                        return res.status(200).send({
                            status: false,
                            data: "Data ujian Siswa sudah ada",
                            message: "Failed"
                        });
                    };
                    setTimeout(fn_delay_response, 10000, 'argumen example');
                }
                const datas = await proses_Service.prosesStorePerSiswa(parseInt(req.params.siswa_id), parseInt(req.params.paketsoal_id), req.body);
                const addSoal = await proses_Service.prosesAddSoal(parseInt(req.params.siswa_id), parseInt(req.params.paketsoal_id), req.body);
                const fn_delay_response = (arg) => {
                    console.log(`arg was => ${arg}`);
                    // return res.status(500).send({ message: "error.message" });
                    return res.send({
                        data: datas,
                        message: "Success"
                    });
                };
                setTimeout(fn_delay_response, 10000, 'argumen example');
                // return res.send({
                //     data: datas,
                //     message: "Success"
                // });
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
