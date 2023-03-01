"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../models/index");
const models_1 = require("../../models");
const siswa_v2_service_1 = __importDefault(require("../mastering/siswa.v2.service"));
const moment = require('moment');
const localization = require('moment/locale/id');
moment.updateLocale("id", localization);
const { studi_v2_paketsoal, studi_v2_paketsoal_aspek, studi_v2_paketsoal_aspek_detail, studi_v2_paketsoal_aspek_penilaian, studi_v2_paketsoal_soal, studi_v2_paketsoal_pilihanjawaban, studi_v2_banksoal_soal, studi_v2_banksoal_soal_pilihanjawaban, studi_v2_proses, studi_v2_proses_aspek_detail, studi_v2_proses_aspek_detail_soal, studi_v2_proses_aspek_detail_soal_pilihan_jawaban, studi_v2_hasil, studi_v2_hasil_aspek, studi_v2_hasil_aspek_detail, studi_v2_hasil_aspek_penilaian, } = models_1.db_studi_v2;
class studiv2HasilService {
    constructor(req) {
        //! PERSISWA
        this.hasilGetPersiswa = async (siswa_id) => {
            try {
                const getHasil = await studi_v2_hasil.findOne({ where: { siswa_id, deleted_at: null } });
                if (getHasil) {
                    const getAspek = await studi_v2_hasil_aspek.findAll({ where: { studi_v2_hasil_id: getHasil.id, deleted_at: null } });
                    for (const [index_aspek, item_aspek] of getAspek.entries()) {
                        const getPenilaian = await studi_v2_hasil_aspek_penilaian.findAll({ where: { studi_v2_hasil_id: getHasil.id, studi_v2_hasil_aspek_id: item_aspek.id, deleted_at: null } });
                        // item_aspek.setDataValue("aspek_detail", getPenilaian)
                        let aspek_detail = [];
                        let aspek_skor = 0;
                        let aspek_jml = 0;
                        for (const [index_penilaian, item_penilaian] of getPenilaian.entries()) {
                            const getAspekDetail = await studi_v2_hasil_aspek_detail.findOne({ where: { id: item_penilaian.studi_v2_hasil_aspek_detail_id, deleted_at: null } });
                            getAspekDetail.setDataValue("status_tampil", item_penilaian.status);
                            const nilai_akhir = getAspekDetail.nilai_akhir_revisi > 0 ? getAspekDetail.nilai_akhir_revisi : getAspekDetail.nilai_akhir;
                            getAspekDetail.setDataValue("nilai_akhir", nilai_akhir);
                            aspek_jml++;
                            aspek_skor += nilai_akhir;
                            aspek_detail.push(getAspekDetail);
                        }
                        aspek_detail.sort(function (a, b) {
                            return b.nilai_akhir - a.nilai_akhir;
                        });
                        item_aspek.setDataValue("aspek_detail", aspek_detail);
                        let aspek_avg = aspek_skor / aspek_jml;
                        item_aspek.setDataValue("aspek_avg", aspek_avg > 0 ? aspek_avg.toFixed(2) : 0);
                    }
                    return getAspek;
                }
                return null;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.get_dataJurusan = async (dataHasilPersiswa) => {
            let result = [
                {
                    aspek_avg: 0
                }
            ];
            if (dataHasilPersiswa) {
                for (const [index, item] of dataHasilPersiswa.entries()) {
                    if (item.tipe == "Semua") {
                        // result.dataMinatbidangstudi = item.aspek_detail;
                    }
                    else {
                        result.push(item);
                    }
                }
                if (result.length > 0) {
                    result.sort(function (a, b) {
                        return b.aspek_avg - a.aspek_avg;
                    });
                }
            }
            // let removeDummy = result.shift();
            return result;
        };
        this.hasilGeneratePersiswa = async (siswa_id) => {
            try {
                // ! 1. insert studi_v2_hasil where siswa
                // ! 2. insert studi_v2_hasil_aspek diambil dari paketsoal
                // ! 3. insert studi_v2_hasil_aspek_detail diambil dari proses
                // ! 4. insert studi_v2_hasil_aspek_penilaian diambil dari paketsoal
                const get_hasil = await studi_v2_hasil.findOne({ where: { siswa_id, deleted_at: null } });
                if (get_hasil) {
                    return null; //! data sudah ada
                }
                const get_proses = await studi_v2_proses.findOne({ where: { siswa_id, deleted_at: null } });
                if (get_proses) {
                    const t = await index_1.sequelize_studi_v2.transaction();
                    try {
                        const save_studi_v2_hasil = await studi_v2_hasil.create({
                            status: "Aktif",
                            tgl_ujian: get_proses.tgl_ujian,
                            studi_v2_proses_id: get_proses.id,
                            studi_v2_paketsoal_id: get_proses.studi_v2_paketsoal_id,
                            siswa_id,
                            created_at: moment().format(),
                            updated_at: moment().format(),
                        });
                        const getPaketsoal = await studi_v2_paketsoal.findOne({ where: { id: get_proses.studi_v2_paketsoal_id, deleted_at: null } });
                        // !dari paketsoal
                        const getPaketsoal_aspek = await studi_v2_paketsoal_aspek.findAll({ where: { studi_v2_paketsoal_id: getPaketsoal.id, deleted_at: null } });
                        for (const [index_aspek, item_aspek] of getPaketsoal_aspek.entries()) {
                            const save_studi_v2_hasil_aspek = studi_v2_hasil_aspek.create({
                                status: "Aktif",
                                aspek_nama: item_aspek.nama,
                                tipe: item_aspek.tipe,
                                nilai_akhir: null,
                                studi_v2_hasil_id: save_studi_v2_hasil.id,
                                studi_v2_paketsoal_aspek_id: item_aspek.id,
                                created_at: moment().format(),
                                updated_at: moment().format(),
                            });
                        }
                        // !dari proses
                        const getProses_aspek_detail = await studi_v2_proses_aspek_detail.findAll({ where: { studi_v2_proses_id: get_proses.id, deleted_at: null } });
                        for (const [index_aspek_detail, item_aspek_detail] of getProses_aspek_detail.entries()) {
                            const get_skor_jml = await studi_v2_proses_aspek_detail_soal.findAll({ where: { studi_v2_proses_aspek_detail_id: item_aspek_detail.id, deleted_at: null } });
                            const skor_jml = get_skor_jml.reduce((jml, object) => {
                                return jml + parseInt(object.skor || 0);
                            }, 0);
                            // console.log(item_aspek_detail.studi_v2_paketsoal_aspek_detail_id);
                            let get_soal_jml = await studi_v2_proses_aspek_detail_soal.count({ where: { studi_v2_proses_aspek_detail_id: item_aspek_detail.id, deleted_at: null } });
                            let get_max_skor = await this.fn_get_max_skor(item_aspek_detail.studi_v2_paketsoal_aspek_detail_id);
                            const nilai_akhir = ((skor_jml / get_max_skor) * 100);
                            // console.log(get_max_skor)
                            const save_studi_v2_hasil_aspek_detail = await studi_v2_hasil_aspek_detail.create({
                                status: "Aktif",
                                aspek_detail_nama: item_aspek_detail.aspek_detail_nama,
                                nilai_akhir: nilai_akhir > 0 ? nilai_akhir.toFixed(2) : 0,
                                nilai_akhir_revisi: 0,
                                skor_total: skor_jml,
                                soal_jml: get_soal_jml,
                                soal_max_skor: get_max_skor,
                                studi_v2_hasil_id: save_studi_v2_hasil.id,
                                studi_v2_paketsoal_aspek_detail_id: item_aspek_detail.studi_v2_paketsoal_aspek_detail_id,
                                // studi_v2_paketsoal_aspek_id: 1,
                                // urutan: 0,
                                created_at: moment().format(),
                                updated_at: moment().format(),
                            });
                            // console.log('====================================');
                            // console.log(save_studi_v2_hasil_aspek_detail);
                            // console.log('====================================');
                        }
                        const getPaketsoal_aspek_penilaian = await studi_v2_paketsoal_aspek_penilaian.findAll({ where: { studi_v2_paketsoal_id: getPaketsoal.id, deleted_at: null } });
                        for (const [index_penilaian, item_penilaian] of getPaketsoal_aspek_penilaian.entries()) {
                            const get_aspek_id = await studi_v2_hasil_aspek.findOne({ where: { studi_v2_hasil_id: save_studi_v2_hasil.id, studi_v2_paketsoal_aspek_id: item_penilaian.studi_v2_paketsoal_aspek_id, deleted_at: null } });
                            // console.log('====================================');
                            // console.log(save_studi_v2_hasil.id, item_penilaian.studi_v2_paketsoal_aspek_id, get_aspek_id, item_penilaian)
                            // console.log('====================================');
                            const get_aspek_detail_id = await studi_v2_hasil_aspek_detail.findOne({
                                where: {
                                    studi_v2_hasil_id: save_studi_v2_hasil.id,
                                    studi_v2_paketsoal_aspek_detail_id: item_penilaian.studi_v2_paketsoal_aspek_detail_id,
                                    deleted_at: null
                                }
                            });
                            // console.log('====================================');
                            // console.log("log:", save_studi_v2_hasil.id, get_aspek_id.id, get_aspek_detail_id.id);
                            // console.log('====================================');
                            const save_penilaian = studi_v2_hasil_aspek_penilaian.create({
                                studi_v2_hasil_id: save_studi_v2_hasil.id,
                                studi_v2_hasil_aspek_id: get_aspek_id.id,
                                studi_v2_hasil_aspek_detail_id: get_aspek_detail_id.id,
                                status: item_penilaian.status,
                                created_at: moment().format(),
                                updated_at: moment().format(),
                                // studi_v2_hasil_aspek_detail_id: get_aspek_detail_id.id
                            });
                        }
                        // return getProses_aspek_detail;
                        // return getProses_aspek_detail
                        await t.commit();
                    }
                    catch (error) {
                        // If the execution reaches this line, an error was thrown.
                        // We rollback the transaction.
                        await t.rollback();
                    }
                    return "Data berhasil disimpan";
                }
                return null;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.fn_get_max_skor = async (paketsoal_aspek_detail_id) => {
            // !cari max skor  dari skor terting persoal dijumlahkan semua;
            const get_soal = await studi_v2_paketsoal_soal.findAll({ where: { studi_v2_paketsoal_aspek_detail_id: paketsoal_aspek_detail_id, deleted_at: null } });
            let skor = 0;
            for (const [index, item] of get_soal.entries()) {
                const get_pilihanjawaban_max = await studi_v2_paketsoal_pilihanjawaban.findOne({ where: { studi_v2_paketsoal_soal_id: item.id, deleted_at: null }, order: [['skor', 'desc']] });
                // console.log('====================================');
                // console.log(get_pilihanjawaban_max);
                // console.log('====================================');
                skor += get_pilihanjawaban_max ? parseInt(get_pilihanjawaban_max.skor) : 0;
            }
            return skor;
        };
        this.hasilDeletePersiswa = async (siswa_id) => {
            try {
                const get_hasil = await studi_v2_hasil.findOne({ where: { siswa_id, deleted_at: null } });
                if (get_hasil === null) {
                    return null; //!data tidak ditemukan
                }
                try {
                    const t = await index_1.sequelize_studi_v2.transaction();
                    try {
                        // const getHasil = await studi_v2_hasil.findOne({ where: { siswa_id, deleted_at: null } })
                        const dataDeleted_studi_v2_hasil_aspek_penilaian = await studi_v2_hasil_aspek_penilaian.destroy({ where: { studi_v2_hasil_id: get_hasil.id, deleted_at: null } }, { transaction: t });
                        const dataDeleted_studi_v2_hasil_aspek = await studi_v2_hasil_aspek.destroy({ where: { studi_v2_hasil_id: get_hasil.id, deleted_at: null } }, { transaction: t });
                        const dataDeleted_hasil_aspek_detail = await studi_v2_hasil_aspek_detail.destroy({ where: { studi_v2_hasil_id: get_hasil.id, deleted_at: null } }, { transaction: t });
                        const dataDeleted_hasil = await studi_v2_hasil.destroy({ where: { siswa_id, deleted_at: null } }, { transaction: t });
                        await t.commit();
                    }
                    catch (error) {
                        // If the execution reaches this line, an error was thrown.
                        // We rollback the transaction.
                        await t.rollback();
                    }
                    return "Data berhasil dihapus";
                    // return "Data berhasil disimpan"
                }
                catch (error) {
                    console.log(error.message);
                }
                return "Data berhasil dihapus!";
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.hasilRevisiNilaiAkhir = async (hasil_aspek_detail_id) => {
            try {
                const get_hasil_aspek_detail = await studi_v2_hasil_aspek_detail.findOne({ where: { id: hasil_aspek_detail_id, deleted_at: null } });
                if (get_hasil_aspek_detail) {
                    get_hasil_aspek_detail.set({
                        nilai_akhir_revisi: this.body.nilai_akhir_revisi,
                        updated_at: moment().format(),
                    });
                    // As above, the database still has "formUpdate" and "green"
                    await get_hasil_aspek_detail.save();
                    return get_hasil_aspek_detail;
                }
                return null;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        // !PERSISWA-END
        // !PERKELAS
        this.hasilGetPerkelas = async (kelas_id) => {
            try {
                const siswa_Service = new siswa_v2_service_1.default(this.req);
                const getSiswaWhereKelas = await siswa_Service.siswaGetWhereKelas(kelas_id);
                const response = [];
                for (const [index_kelas, item_kelas] of getSiswaWhereKelas.entries()) {
                    const getHasilSiswa = await this.hasilGetPersiswa(item_kelas.id);
                    if (getHasilSiswa) {
                        let dataSiswa = {
                            siswa: null,
                            data: []
                        };
                        dataSiswa.siswa = await siswa_Service.siswaGetWhereId(item_kelas.id);
                        dataSiswa.data = getHasilSiswa;
                        response.push(dataSiswa);
                    }
                }
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.hasilGeneratePerkelas = async (kelas_id) => {
            try {
                let jml = 0;
                const siswa_Service = new siswa_v2_service_1.default(this.req);
                const getSiswaWhereKelas = await siswa_Service.siswaGetWhereKelas(kelas_id);
                for (const [index_kelas, item_kelas] of getSiswaWhereKelas.entries()) {
                    const doGeneratePersiswa = await this.hasilGeneratePersiswa(item_kelas.id);
                    if (doGeneratePersiswa) {
                        jml++;
                    }
                }
                return `${jml} Data berhasil di generate`;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.hasilDeletePerkelas = async (kelas_id) => {
            try {
                let jml = 0;
                const siswa_Service = new siswa_v2_service_1.default(this.req);
                const getSiswaWhereKelas = await siswa_Service.siswaGetWhereKelas(kelas_id);
                for (const [index_kelas, item_kelas] of getSiswaWhereKelas.entries()) {
                    const doDeletePersiswa = await this.hasilDeletePersiswa(item_kelas.id);
                    if (doDeletePersiswa) {
                        jml++;
                    }
                }
                return `${jml} Data di Hapus`;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.meId = req.app.locals.meId;
        this.body = req.body;
        this.params = req.params;
        this.req = req;
    }
}
exports.default = studiv2HasilService;
