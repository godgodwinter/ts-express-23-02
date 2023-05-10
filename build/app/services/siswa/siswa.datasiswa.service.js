"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../../models"));
const babengPsikotes_1 = require("../../helpers/babengPsikotes");
const moment = require('moment');
const localization = require('moment/locale/id');
moment.updateLocale("id", localization);
const { siswa, kelas, sekolah, paket, masterdeteksi, siswadetail, apiprobk, apiprobk_deteksi, apiprobk_deteksi_list } = models_1.default;
class siswaDataSiswaService {
    constructor(req) {
        this.get_deteksimasalah_persiswa = async (siswa_id) => {
            try {
                let result = [];
                let get_deteksi = await this.fn_deteksimasalah_service(siswa_id);
                result.push(get_deteksi);
                if (get_deteksi) {
                    return result;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.get_deteksimasalah_perkelas = async (kelas_id) => {
            try {
                let result = [];
                const get_siswa_perkelas = await siswa.findAll({
                    where: {
                        kelas_id, deleted_at: null
                    }
                });
                for (const [index_siswa, data_siswa] of get_siswa_perkelas.entries()) {
                    let get_deteksi = await this.fn_deteksimasalah_service(data_siswa.id);
                    result.push(get_deteksi);
                }
                // if (get_deteksi) {
                //     return result
                // } else {
                //     return null
                // }
                return result;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.fn_deteksimasalah_service = async (siswa_id) => {
            try {
                let result = {
                    siswa: null,
                    apiprobk: null,
                    deteksimasalah: null,
                };
                const siswa = await this.fn_siswa_profile(siswa_id);
                result.siswa = siswa;
                result.apiprobk = await this.fn_siswa_apiprobk(siswa_id);
                result.deteksimasalah = await this.fn_siswa_deteksimasalah(result.apiprobk.apiprobk_id);
                if (siswa) {
                    return result;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.fn_siswa_profile = async (siswa_id) => {
            var _a, _b;
            try {
                const response = await siswa.scope('withoutPass').findOne({
                    where: { id: siswa_id, deleted_at: null },
                    include: [
                        { model: models_1.default.kelas, attributes: ['id', 'nama'], where: { deleted_at: null } },
                        { model: models_1.default.sekolah, attributes: ['id', 'nama'], where: { deleted_at: null } },
                    ],
                });
                response.setDataValue("kelas_nama", (_a = response === null || response === void 0 ? void 0 : response.kelas) === null || _a === void 0 ? void 0 : _a.nama);
                response.setDataValue("sekolah_nama", (_b = response === null || response === void 0 ? void 0 : response.sekolah) === null || _b === void 0 ? void 0 : _b.nama);
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.fn_siswa_apiprobk = async (siswa_id) => {
            try {
                const response = await siswadetail.findOne({
                    where: {
                        siswa_id: siswa_id, deleted_at: null
                    },
                    include: [
                        { model: models_1.default.apiprobk, attributes: ['id', 'username'], where: { deleted_at: null } },
                    ],
                });
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.fn_siswa_deteksimasalah = async (apiprobk_id) => {
            try {
                const response = await apiprobk_deteksi.findOne({
                    where: {
                        apiprobk_id: apiprobk_id, deleted_at: null
                    },
                    include: [
                        { model: models_1.default.apiprobk_deteksi_list, where: { deleted_at: null } },
                    ],
                });
                // let index_remove = [];
                const data_result = [];
                let jml_negatif = 0;
                let jml_positif = 0;
                let avg_negatif = 0;
                let avg_positif = 0;
                let jml_data = 0;
                for (const [index_deteksi, data_deteksi] of response.apiprobk_deteksi_list.entries()) {
                    const data_positif = await masterdeteksi.findOne({
                        where: {
                            nama: data_deteksi.deteksi_nama, deleted_at: null
                        }
                    });
                    if (data_positif === null || data_positif === void 0 ? void 0 : data_positif.positif) {
                        let positif_score = (99 - data_deteksi.deteksi_score);
                        data_deteksi.setDataValue('positif_score', positif_score);
                        data_deteksi.setDataValue('positif', data_positif.positif);
                        data_deteksi.setDataValue('positif_keterangan', (0, babengPsikotes_1.fn_deteksimasalah_singkatan)(positif_score));
                        jml_negatif += parseInt(data_deteksi.deteksi_score);
                        jml_positif += positif_score;
                        jml_data++;
                        data_result.push(data_deteksi);
                    }
                }
                avg_negatif = jml_negatif / jml_data;
                avg_positif = jml_positif / jml_data;
                response.setDataValue("avg_negatif", avg_negatif.toFixed(2));
                response.setDataValue("avg_negatif_keterangan", (0, babengPsikotes_1.fn_deteksimasalah_singkatan)(parseInt(avg_negatif.toFixed(2))));
                response.setDataValue("avg_negatif_keterangan_panjang", (0, babengPsikotes_1.fn_deteksimasalah)(parseInt(avg_negatif.toFixed(2))));
                response.setDataValue("avg_positif", avg_positif.toFixed(2));
                response.setDataValue("avg_positif_keterangan", (0, babengPsikotes_1.fn_deteksimasalah_singkatan)(parseInt(avg_positif.toFixed(2))));
                response.setDataValue("avg_positif_keterangan_panjang", (0, babengPsikotes_1.fn_deteksimasalah)(parseInt(avg_positif.toFixed(2))));
                response.setDataValue("apiprobk_deteksi_list", data_result);
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.meId = req.app.locals.meId;
        this.body = req.body;
        this.params = req.params;
        this.req = req;
        this.default_ex = process.env.REDIS_LIMIT_IN_SEC ? parseInt(process.env.REDIS_LIMIT_IN_SEC) : 10;
    }
}
exports.default = siswaDataSiswaService;
