"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../models/index");
const models_1 = require("../../models");
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const siswa_v2_service_1 = __importDefault(require("../mastering/siswa.v2.service"));
const babengUjian_1 = require("../../helpers/babengUjian");
const moment = require('moment');
const localization = require('moment/locale/id');
moment.updateLocale("id", localization);
const { studi_v2_paketsoal, studi_v2_paketsoal_aspek, studi_v2_paketsoal_aspek_detail, studi_v2_paketsoal_aspek_penilaian, studi_v2_paketsoal_soal, studi_v2_paketsoal_pilihanjawaban, studi_v2_banksoal_soal, studi_v2_banksoal_soal_pilihanjawaban, studi_v2_proses, studi_v2_proses_aspek_detail, studi_v2_proses_aspek_detail_soal, studi_v2_proses_aspek_detail_soal_pilihan_jawaban, studi_v2_hasil } = models_1.db_studi_v2;
class studiv2ProsesService {
    constructor(req) {
        //! PERSISWA
        this.prosesGetSiswa = async (siswa_id) => {
            try {
                const siswa_Service = new siswa_v2_service_1.default(this.req);
                const response = await siswa_Service.siswaGetWhereId(siswa_id);
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.prosesGetProsesUjianPersiswa = async (siswa_id) => {
            try {
                const getProses = await studi_v2_proses.findOne({ where: { siswa_id, deleted_at: null } });
                if (getProses) {
                    const getProsesDetail = await studi_v2_proses_aspek_detail.findAll({ where: { studi_v2_proses_id: getProses.id, deleted_at: null } });
                    for (const [index, item] of getProsesDetail.entries()) {
                        const soal_jml = await studi_v2_proses_aspek_detail_soal.count({ where: { studi_v2_proses_aspek_detail_id: item.id, deleted_at: null } });
                        item.setDataValue("soal_jml", soal_jml);
                        const get_skor_jml = await studi_v2_proses_aspek_detail_soal.findAll({ where: { studi_v2_proses_aspek_detail_id: item.id, deleted_at: null } });
                        const skor_jml = get_skor_jml.reduce((jml, object) => {
                            return jml + parseInt(object.skor || 0);
                        }, 0);
                        item.setDataValue("skor_jml", skor_jml);
                        const soal_terjawab = await studi_v2_proses_aspek_detail_soal.count({ where: { studi_v2_proses_aspek_detail_id: item.id, kode_jawaban: { [sequelize_2.Op.ne]: null }, deleted_at: null } });
                        item.setDataValue("soal_terjawab", soal_terjawab);
                        const soal_belum_terjawab = await studi_v2_proses_aspek_detail_soal.count({ where: { studi_v2_proses_aspek_detail_id: item.id, kode_jawaban: null, deleted_at: null } });
                        item.setDataValue("soal_belum_terjawab", soal_belum_terjawab);
                        let status_updated = "Aktif";
                        if (item.status === "Aktif") {
                            if (item.tgl_selesai) {
                                let periksa = await (0, babengUjian_1.fn_get_sisa_waktu)(item.tgl_selesai);
                                if (periksa.detik < 0) {
                                    status_updated = "Selesai";
                                }
                            }
                            else {
                                status_updated = "Belum";
                            }
                            item.setDataValue("status", status_updated);
                        }
                    }
                    return getProsesDetail;
                }
                return null;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.do_reset_waktu = async (proses_detail_id) => {
            try {
                const getProsesDetail = await studi_v2_proses_aspek_detail.findOne({ where: { id: proses_detail_id, deleted_at: null } });
                getProsesDetail.set({
                    tgl_mulai: null,
                    tgl_selesai: null,
                    status: "RESET_WAKTU",
                    updated_at: moment().format(),
                });
                // As above, the database still has "formUpdate" and "green"
                await getProsesDetail.save();
                return getProsesDetail;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.do_reset_salah = async (proses_detail_id) => {
            try {
                //! hapus jawaban salah
                const getJawabanSalah = await studi_v2_proses_aspek_detail_soal.findAll({ where: { studi_v2_proses_aspek_detail_id: proses_detail_id, skor: 0, kode_jawaban: { [sequelize_2.Op.ne]: null }, deleted_at: null } });
                for (const [index, item] of getJawabanSalah.entries()) {
                    const getSoal = await studi_v2_proses_aspek_detail_soal.findOne({ where: { id: item.id, deleted_at: null } });
                    getSoal.set({
                        status: null,
                        skor: null,
                        status_jawaban: null,
                        kode_jawaban: null,
                        updated_at: moment().format(),
                    });
                    await getSoal.save();
                }
                const getProsesDetail = await studi_v2_proses_aspek_detail.findOne({ where: { id: proses_detail_id, deleted_at: null } });
                getProsesDetail.set({
                    tgl_mulai: null,
                    tgl_selesai: null,
                    status: "RESET_SALAH",
                    updated_at: moment().format(),
                });
                await getProsesDetail.save();
                // return getJawabanSalah;
                return getProsesDetail;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.prosesStorePerSiswa = async (siswa_id, paketsoal_id, dataForm) => {
            try {
                const siswa_Service = new siswa_v2_service_1.default(this.req);
                const response = await siswa_Service.siswaGetWhereId(siswa_id);
                const getPaketsoal = await studi_v2_paketsoal.findOne({ where: { id: paketsoal_id, deleted_at: null } });
                // ! 1. insert proses = siswa_id,paketsoal_id , tgl_ujian //batas ujian terakhir
                // ! 2. studi_v2_proses_aspek_detail = mapel, tgl_mulai, selesai ada dsini (proses mengerjakan per mapel)
                // ! 3. studi_v2_proses_aspek_detail_soal = insert semua soal (random_soal)
                // ! 4. studi_v2_proses_aspek_detail_soal_pilihan_jawaban   =  insert semua pilihanjawaban (random_pilihanjawaban)
                const t = await index_1.sequelize_studi_v2.transaction();
                try {
                    const save_studi_v2_proses = await studi_v2_proses.create({
                        status: "Aktif",
                        tgl_ujian: dataForm.tgl_ujian,
                        siswa_id,
                        studi_v2_paketsoal_id: paketsoal_id,
                        paketsoal_nama: getPaketsoal.nama,
                        created_at: moment().format(),
                        updated_at: moment().format(),
                    }, { transaction: t });
                    const getPaketosoalAspekDetail_where_paketsoal_id = await studi_v2_paketsoal_aspek_detail.findAll({ where: { studi_v2_paketsoal_id: paketsoal_id, deleted_at: null } });
                    // * tambahan_field: mapel_nama
                    for (const [index, mapel] of getPaketosoalAspekDetail_where_paketsoal_id.entries()) {
                        const save_studi_v2_proses_aspek_detail = await studi_v2_proses_aspek_detail.create({
                            status: "Aktif",
                            tgl_mulai: null,
                            tgl_selesai: null,
                            waktu: mapel.waktu,
                            instruksi: mapel.instruksi,
                            instruksi_status: mapel.instruksi_status,
                            lembar_prasoal: mapel.lembar_prasoal,
                            lembar_prasoal_status: mapel.lembar_prasoal_status,
                            instruksi_pengerjaan: mapel.instruksi_pengerjaan,
                            instruksi_pengerjaan_status: mapel.instruksi_pengerjaan_status,
                            random_soal: mapel.random_soal,
                            random_pilihanjawaban: mapel.random_pilihanjawaban,
                            studi_v2_proses_id: save_studi_v2_proses.id,
                            studi_v2_paketsoal_aspek_detail_id: mapel.id,
                            aspek_detail_nama: mapel.nama,
                            created_at: moment().format(),
                            updated_at: moment().format(),
                        }, { transaction: t });
                        let getSoal = [{
                                id: null, pertanyaan: "", kode_soal: null, kode_jawaban: null, status_jawaban: null, skor: 0, studi_v2_proses_aspek_detail_id: save_studi_v2_proses_aspek_detail.id, studi_v2_paketsoal_soal_id: mapel.id
                            }];
                        if (mapel.random_soal === "Aktif") {
                            getSoal = await studi_v2_paketsoal_soal.findAll({ where: { studi_v2_paketsoal_aspek_detail_id: mapel.id }, order: [sequelize_1.Sequelize.literal('RAND()')] });
                        }
                        else {
                            getSoal = await studi_v2_paketsoal_soal.findAll({ where: { studi_v2_paketsoal_aspek_detail_id: mapel.id } });
                        }
                        for (const [index_soal, soal] of getSoal.entries()) {
                            const save_studi_v2_proses_aspek_detail_soal = await studi_v2_proses_aspek_detail_soal.create({
                                kode_soal: soal.kode_soal,
                                kode_jawaban: soal.kode_jawaban,
                                status_jawaban: soal.kode_jawaban,
                                skor: soal.kode_jawaban,
                                studi_v2_proses_aspek_detail_id: save_studi_v2_proses_aspek_detail.id,
                                studi_v2_paketsoal_soal_id: soal.id,
                                // soal_pertanyaan: soal.pertanyaan,
                                created_at: moment().format(),
                                updated_at: moment().format(),
                            }, { transaction: t });
                            let getPilihanjawaban = [{ id: null, jawaban: "", skor: 0, kode_jawaban: null, studi_v2_proses_aspek_detail_soal_id: null, studi_v2_paketsoal_pilihanjawaban_id: null }];
                            if (mapel.random_pilihanjawaban === "Aktif") {
                                getPilihanjawaban = await studi_v2_paketsoal_pilihanjawaban.findAll({ where: { studi_v2_paketsoal_soal_id: soal.id, deleted_at: null }, order: [sequelize_1.Sequelize.literal('RAND()')] });
                            }
                            else {
                                getPilihanjawaban = await studi_v2_paketsoal_pilihanjawaban.findAll({ where: { studi_v2_paketsoal_soal_id: soal.id, deleted_at: null } });
                            }
                            for (const [index_pj, pilihanjawaban] of getPilihanjawaban.entries()) {
                                const save_studi_v2_proses_aspek_detail_soal_pilihan_jawaban = await studi_v2_proses_aspek_detail_soal_pilihan_jawaban.create({
                                    kode_jawaban: pilihanjawaban.kode_jawaban,
                                    studi_v2_proses_aspek_detail_soal_id: save_studi_v2_proses_aspek_detail_soal.id,
                                    studi_v2_paketsoal_pilihanjawaban_id: pilihanjawaban.id,
                                    pilihanjawaban_jawaban: pilihanjawaban.jawaban,
                                    pilihanjawaban_skor: pilihanjawaban.skor,
                                    created_at: moment().format(),
                                    updated_at: moment().format(),
                                }, { transaction: t });
                            }
                        }
                    }
                    await t.commit();
                }
                catch (error) {
                    // If the execution reaches this line, an error was thrown.
                    // We rollback the transaction.
                    await t.rollback();
                }
                return "Data berhasil disimpan";
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.prosesDeletePersiswa = async (siswa_id, proses_id) => {
            try {
                try {
                    const t = await index_1.sequelize_studi_v2.transaction();
                    try {
                        const getMapel = await studi_v2_proses_aspek_detail.findAll({ where: { studi_v2_proses_id: proses_id, deleted_at: null } });
                        for (const [index, mapel] of getMapel.entries()) {
                            const getSoal = await studi_v2_proses_aspek_detail_soal.findAll({ where: { studi_v2_proses_aspek_detail_id: mapel.id, deleted_at: null } });
                            for (const [index_soal, soal] of getSoal.entries()) {
                                const dataDeleted_studi_v2_proses_aspek_detail_soal_pilihan_jawaban = await studi_v2_proses_aspek_detail_soal_pilihan_jawaban.destroy({ where: { studi_v2_proses_aspek_detail_soal_id: soal.id, deleted_at: null } }, { transaction: t });
                            }
                            const dataDeleted_proses_soal_id = await studi_v2_proses_aspek_detail_soal.destroy({ where: { studi_v2_proses_aspek_detail_id: mapel.id, deleted_at: null } }, { transaction: t });
                        }
                        const dataDeleted_proses_aspek_detail = await studi_v2_proses_aspek_detail.destroy({ where: { studi_v2_proses_id: proses_id, deleted_at: null } }, { transaction: t });
                        const dataDeleted_proses = await studi_v2_proses.destroy({ where: { id: proses_id, deleted_at: null } }, { transaction: t });
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
        this.prosesPeriksaIsSiswaSudahAda = async (siswa_id, tgl_ujian) => {
            const periksaSiswa = await studi_v2_proses.findOne({ where: { siswa_id: siswa_id, deleted_at: null } });
            if (periksaSiswa) {
                periksaSiswa.set({
                    tgl_ujian,
                    updated_at: moment().format(),
                });
                // As above, the database still has "formUpdate" and "green"
                await periksaSiswa.save();
                return true;
            }
            return false;
        };
        //! PERSISWA
        //! PERKELAS
        this.prosesGetSiswaPerKelas = async (kelas_id) => {
            try {
                const siswa_Service = new siswa_v2_service_1.default(this.req);
                const response = await siswa_Service.siswaGetWhereKelas(kelas_id);
                for (const [index, item] of response.entries()) {
                    const getProses = await studi_v2_proses.findOne({ where: { siswa_id: item.id, deleted_at: null } });
                    let proses_id = null;
                    let paketsoal_id = null;
                    let paketsoal_nama = null;
                    let tgl_ujian = null;
                    let status = "Belum";
                    if (getProses) {
                        proses_id = getProses.id;
                        paketsoal_id = getProses.studi_v2_paketsoal_id;
                        const getPaketsoal = await studi_v2_paketsoal.findOne({ where: { id: paketsoal_id, deleted_at: null } });
                        paketsoal_nama = getPaketsoal === null || getPaketsoal === void 0 ? void 0 : getPaketsoal.nama;
                        tgl_ujian = getProses.tgl_ujian;
                        status = "Ada";
                    }
                    response[index].setDataValue("proses_id", proses_id);
                    response[index].setDataValue("paketsoal_nama", paketsoal_nama);
                    response[index].setDataValue("paketsoal_id", paketsoal_id);
                    response[index].setDataValue("tgl_ujian", tgl_ujian);
                    response[index].setDataValue("status", status);
                    let progres = "Complete";
                    let periksaProgres = await this.fn_periksa_progres(item.id);
                    response[index].setDataValue("progres", periksaProgres);
                    response[index].setDataValue("progres_status", periksaProgres === null || periksaProgres === void 0 ? void 0 : periksaProgres.status);
                    response[index].setDataValue("progres_angka", periksaProgres === null || periksaProgres === void 0 ? void 0 : periksaProgres.selesai);
                    const periksaHasil = await studi_v2_hasil.count({ where: { siswa_id: item.id, deleted_at: null } });
                    response[index].setDataValue("hasil", periksaHasil);
                }
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.fn_periksa_progres = async (siswa_id) => {
            try {
                let result = {
                    total: 0,
                    belum: 0,
                    selesai: 0,
                    status: "Belum"
                };
                const getProses = await studi_v2_proses.findOne({ where: { siswa_id, deleted_at: null } });
                if (getProses) {
                    const getAspek = await studi_v2_proses_aspek_detail.findAll({ where: { studi_v2_proses_id: getProses.id, deleted_at: null } });
                    const getAspek_jml = await studi_v2_proses_aspek_detail.count({ where: { studi_v2_proses_id: getProses.id, deleted_at: null } });
                    result.total = getAspek_jml;
                    for (const [index, item] of getAspek.entries()) {
                        const periksaMapel = await this.fn_periksa_progres_per_mapel(item.id);
                        if (periksaMapel === "Selesai") {
                            result.selesai++;
                        }
                        else {
                            result.belum++;
                        }
                    }
                }
                if (result.total) {
                    if (result.total === result.selesai) {
                        result.status = "Complete";
                    }
                }
                // const soal_jml = await studi_v2_proses_aspek_detail_soal.count({ where: { studi_v2_proses_aspek_detail_id: item.id, deleted_at: null } });
                // const soal_terjawab = await studi_v2_proses_aspek_detail_soal.count({ where: { studi_v2_proses_aspek_detail_id: item.id, kode_jawaban: { [Op.ne]: null }, deleted_at: null } });
                // const soal_belum_terjawab = await studi_v2_proses_aspek_detail_soal.count({ where: { studi_v2_proses_aspek_detail_id: item.id, kode_jawaban: null, deleted_at: null } });
                return result;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.fn_periksa_progres_per_mapel = async (aspek_detail_id) => {
            try {
                let result = "Belum";
                let status_updated = "Aktif";
                const getAspekDetail = await studi_v2_proses_aspek_detail.findOne({ where: { id: aspek_detail_id, deleted_at: null } });
                if (getAspekDetail.status === "Aktif") {
                    if (getAspekDetail.tgl_selesai) {
                        let periksa = await (0, babengUjian_1.fn_get_sisa_waktu)(getAspekDetail.tgl_selesai);
                        if (periksa.detik < 0) {
                            status_updated = "Selesai";
                        }
                    }
                    else {
                        status_updated = "Belum";
                    }
                    return status_updated;
                }
                return result;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.prosesStoreSiswaPerKelas = async (kelas_id, paketsoal_id, dataForm) => {
            try {
                const siswa_Service = new siswa_v2_service_1.default(this.req);
                const response = await siswa_Service.siswaGetWhereKelas(kelas_id);
                let dataBerhasilDisimpan = 0;
                for (const [index, siswa] of response.entries()) {
                    const periksaIsSudahAda = await this.prosesPeriksaIsSiswaSudahAda(siswa.id, dataForm.tgl_ujian);
                    if (periksaIsSudahAda === false) {
                        await this.prosesStorePerSiswa(siswa.id, paketsoal_id, dataForm);
                        dataBerhasilDisimpan++;
                    }
                }
                return dataBerhasilDisimpan;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.prosesDeleteSiswaPerKelas = async (kelas_id) => {
            try {
                const siswa_Service = new siswa_v2_service_1.default(this.req);
                const response = await siswa_Service.siswaGetWhereKelas(kelas_id);
                let dataBerhasilDisimpan = 0;
                for (const [index, siswa] of response.entries()) {
                    const proses = await studi_v2_proses.findOne({ where: { siswa_id: siswa.id, deleted_at: null } });
                    if (proses) {
                        const dataTerhapus = await this.prosesDeletePersiswa(siswa.id, proses.id);
                        if (dataTerhapus) {
                            dataBerhasilDisimpan++;
                        }
                    }
                }
                return dataBerhasilDisimpan;
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
exports.default = studiv2ProsesService;
