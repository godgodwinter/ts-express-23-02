"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../../models"));
const models_2 = require("../../models");
const sequelize_1 = require("sequelize");
const moment = require('moment');
const localization = require('moment/locale/id');
moment.updateLocale("id", localization);
const { siswa, kelas, sekolah, paket } = models_1.default;
const { studi_v2_paketsoal, studi_v2_paketsoal_aspek, studi_v2_paketsoal_aspek_detail, studi_v2_paketsoal_aspek_penilaian, studi_v2_paketsoal_soal, studi_v2_paketsoal_pilihanjawaban, studi_v2_banksoal_soal, studi_v2_banksoal_soal_pilihanjawaban, studi_v2_proses, studi_v2_proses_aspek_detail, studi_v2_proses_aspek_detail_soal, studi_v2_proses_aspek_detail_soal_pilihan_jawaban } = models_2.db_studi_v2;
class siswaUjianstudiService {
    constructor(req) {
        this.getProses = async () => {
            try {
                const get_studi_v2_proses = await studi_v2_proses.findOne({
                    where: {
                        siswa_id: this.meId,
                        tgl_ujian: {
                            [sequelize_1.Op.gt]: moment().format(),
                            // [Op.lt]: moment().format(),
                        }, deleted_at: null
                    },
                });
                return get_studi_v2_proses;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.getAspekDetail = async (proses_id) => {
            try {
                const get_studi_v2_proses_aspek_detail = await studi_v2_proses_aspek_detail.findAll({ where: { studi_v2_proses_id: proses_id, deleted_at: null } });
                for (const [index_mapel, mapel] of get_studi_v2_proses_aspek_detail.entries()) {
                    const get_soal = await studi_v2_proses_aspek_detail_soal.scope('lessData').findAll({ where: { studi_v2_proses_aspek_detail_id: mapel.id, deleted_at: null } });
                    for (const [index_soal, soal] of get_soal.entries()) {
                        const get_pj = await studi_v2_proses_aspek_detail_soal_pilihan_jawaban.scope('lessData').findAll({ where: { studi_v2_proses_aspek_detail_soal_id: soal.id, deleted_at: null } });
                        get_soal[index_soal].setDataValue("pilihanjawaban", get_pj);
                    }
                    get_studi_v2_proses_aspek_detail[index_mapel].setDataValue("soal", get_soal);
                }
                return get_studi_v2_proses_aspek_detail;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.doMulai = async () => {
            try {
                const get_aspek_detail = await studi_v2_proses_aspek_detail.findOne({ where: { id: this.params.aspek_detail_id, deleted_at: null } });
                get_aspek_detail.set({
                    tgl_mulai: this.body.tgl_mulai,
                    tgl_selesai: this.body.tgl_selesai,
                    status: "Aktif",
                    updated_at: moment().format(),
                });
                // As above, the database still has "formUpdate" and "green"
                await get_aspek_detail.save();
                return get_aspek_detail;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.doFinish = async () => {
            try {
                const get_aspek_detail = await studi_v2_proses_aspek_detail.findOne({ where: { id: this.params.aspek_detail_id, deleted_at: null } });
                get_aspek_detail.set({
                    tgl_selesai: moment().format(),
                    updated_at: moment().format(),
                });
                // As above, the database still has "formUpdate" and "green"
                await get_aspek_detail.save();
                return get_aspek_detail;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.doJawab = async () => {
            try {
                const get_soal = await studi_v2_proses_aspek_detail_soal.findOne({ where: { id: this.params.soal_id, deleted_at: null } });
                let skor = 0;
                let status_jawaban = "Salah";
                // !periksajawaban
                const periksaJawaban = await studi_v2_proses_aspek_detail_soal_pilihan_jawaban.findOne({ where: { studi_v2_proses_aspek_detail_soal_id: this.params.soal_id, kode_jawaban: this.body.kode_jawaban, deleted_at: null } });
                if (periksaJawaban === null || periksaJawaban === void 0 ? void 0 : periksaJawaban.pilihanjawaban_skor) {
                    skor = periksaJawaban.pilihanjawaban_skor;
                    status_jawaban = "Benar";
                }
                get_soal.set({
                    kode_jawaban: this.body.kode_jawaban,
                    skor,
                    status_jawaban,
                    updated_at: moment().format(),
                });
                // As above, the database still has "formUpdate" and "green"
                await get_soal.save();
                return { periksaJawaban, skor, status_jawaban };
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.meId = req.app.locals.meId;
        this.body = req.body;
        this.params = req.params;
    }
}
exports.default = siswaUjianstudiService;
