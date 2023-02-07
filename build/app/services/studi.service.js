"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const models_1 = __importDefault(require("../models"));
const moment = require('moment');
const localization = require('moment/locale/id');
moment.updateLocale("id", localization);
const { siswa, kelas, ujian_proses_kelas, ujian_paketsoal, ujian_proses_kelas_siswa, ujian_proses_kelas_siswa_kategori, ujian_paketsoal_kategori, ujian_paketsoal_soal_pilihanjawaban } = models_1.default;
class StudiService {
    constructor(req) {
        // * SERVICE
        this.getDataUjian = async () => {
            var _a, _b, _c;
            console.log('====================================');
            console.log(this.meId);
            console.log('====================================');
            const me = await this.fn_get_me(this.meId);
            let dataUjian = {};
            const response = await ujian_proses_kelas.findAll({ where: { kelas_id: (_a = me === null || me === void 0 ? void 0 : me.kelas) === null || _a === void 0 ? void 0 : _a.id }, include: [models_1.default.ujian_proses] });
            dataUjian = response;
            let data = [];
            for (const tempData of response) {
                tempData.setDataValue("tgl", (_b = tempData === null || tempData === void 0 ? void 0 : tempData.ujian_proses) === null || _b === void 0 ? void 0 : _b.tgl);
                tempData.setDataValue("ujian_proses_status", (_c = tempData === null || tempData === void 0 ? void 0 : tempData.ujian_proses) === null || _c === void 0 ? void 0 : _c.status);
                const paketsoal = await ujian_paketsoal.findOne({ where: { id: tempData.paketsoal_id } });
                tempData.setDataValue("nama", paketsoal === null || paketsoal === void 0 ? void 0 : paketsoal.nama);
                data.push(tempData);
            }
            return data;
        };
        this.periksaUjianAktif = async () => {
            var _a;
            const me = await this.fn_get_me(this.meId);
            let data = null;
            const resProsesKelas = await ujian_proses_kelas.findOne({ where: { kelas_id: (_a = me === null || me === void 0 ? void 0 : me.kelas) === null || _a === void 0 ? void 0 : _a.id }, include: [models_1.default.ujian_proses] });
            let ujian_proses_kelas_id = resProsesKelas.id;
            // console.log('====================================');
            // console.log(ujian_proses_kelas_id);
            // console.log('====================================');
            const resProsesKelasSiswa = await ujian_proses_kelas_siswa.findOne({ where: { ujian_proses_kelas_id, siswa_id: this.meId } });
            let ujianProsesKelasSiswaId = resProsesKelasSiswa.id;
            // console.log('====================================');
            // console.log(ujianProsesKelasSiswaId);
            // console.log('====================================');
            const resProsesKelasSiswaKategori = await ujian_proses_kelas_siswa_kategori.findOne({ where: { ujian_proses_kelas_siswa_id: ujianProsesKelasSiswaId, status: 'Aktif' }, order: [['updated_at', 'desc']] });
            console.log('====================================');
            console.log(resProsesKelasSiswaKategori);
            console.log('====================================');
            if (resProsesKelasSiswaKategori) {
                let { id, ujian_proses_kelas_siswa_id, status, hasil_per_kategori, tgl_mulai, tgl_selesai, waktu, ujian_paketsoal_kategori_id, created_at, updated_at } = resProsesKelasSiswaKategori;
                data = { id, ujian_proses_kelas_siswa_id, status, hasil_per_kategori, tgl_mulai, tgl_selesai, waktu, ujian_paketsoal_kategori_id, created_at, updated_at };
                // console.log(moment().format("YYYY-MMMM-DD"));
                let getSisaWaktu = await this.fn_get_sisa_waktu(tgl_selesai);
                data.sisa_waktu = getSisaWaktu === null || getSisaWaktu === void 0 ? void 0 : getSisaWaktu.detik;
                data.sisa_waktu_dalam_menit = getSisaWaktu === null || getSisaWaktu === void 0 ? void 0 : getSisaWaktu.menit;
                data.ujian_proses_kelas_id = ujian_proses_kelas_id;
                data.ujian_proses_kelas_siswa = resProsesKelasSiswa;
                data.getSisaWaktu = getSisaWaktu;
                if (data.sisa_waktu < 0) {
                    return null;
                }
            }
            return data;
        };
        this.getDataUjianEdit = async (ujian_proses_kelas_id) => {
            try {
                const me = await this.fn_get_me(this.meId);
                let data = null;
                const resProsesKelas = await ujian_proses_kelas.findOne({ where: { id: ujian_proses_kelas_id }, include: [models_1.default.ujian_proses] });
                let ujianProsesId = resProsesKelas.ujian_proses_id;
                const resGetUjianProses = await models_1.default.ujian_proses.findOne({ where: { id: ujianProsesId } });
                return resGetUjianProses;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.doUjianDaftar = async (ujian_proses_kelas_id) => {
            try {
                const me = await this.fn_get_me(this.meId);
                const periksaKelas = await this.fn_is_kelas_saya_terdaftar(me.kelas_id);
                const getDataKelas = await ujian_proses_kelas.findOne({ where: { id: ujian_proses_kelas_id } });
                // console.log(periksaKelas);
                if (periksaKelas == false) {
                    return false;
                }
                // periksa apakah siswa sudah daftar ujian
                const periksaSiswaSudahDaftarUjian = await this.fn_is_siswa_sudah_daftar_ujian(ujian_proses_kelas_id);
                if (periksaSiswaSudahDaftarUjian) {
                    return {
                        success: false,
                        data: "Data sudah ada",
                        paketsoal_id: getDataKelas.paketsoal_id
                    };
                }
                // insert ujian_proses_kelas_siswa
                const doInsertProsesSiswa = await ujian_proses_kelas_siswa.create({
                    ujian_proses_kelas_id,
                    siswa_id: this.meId,
                    status: "Aktif",
                    created_at: moment().format(),
                    updated_at: moment().format(),
                });
                // console.log(doInsertProsesSiswa);
                // !jika periksa kelas ada dan proses selanjutnya true
                return {
                    success: true,
                    data: doInsertProsesSiswa,
                    paketsoal_id: getDataKelas.paketsoal_id
                };
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.periksa_daftar = async (ujian_proses_kelas_id) => {
            try {
                const me = await this.fn_get_me(this.meId);
                let data = null;
                // periksa apakah siswa sudah daftar ujian
                const periksaSiswaSudahDaftarUjian = await this.fn_is_siswa_sudah_daftar_ujian(ujian_proses_kelas_id);
                if (periksaSiswaSudahDaftarUjian) {
                    return {
                        success: true,
                        data: "Siswa Sudah daftar",
                    };
                }
                return data;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.getKategoriSoal = async (ujian_proses_kelas_id, ujian_paketsoal_id) => {
            try {
                const me = await this.fn_get_me(this.meId);
                const periksaKelas = await this.fn_is_kelas_saya_terdaftar(me.kelas_id);
                console.log('tes');
                const getDataKelas = await ujian_proses_kelas.findOne({ where: { id: ujian_proses_kelas_id } });
                // console.log(periksaKelas);
                if (periksaKelas == false) {
                    return {
                        success: false,
                        data: "Kelas tidak terdaftar"
                    };
                }
                // periksa apakah siswa sudah daftar ujian
                const periksaSiswaSudahDaftarUjian = await this.fn_is_siswa_sudah_daftar_ujian(ujian_proses_kelas_id);
                if (periksaSiswaSudahDaftarUjian) {
                    //  ujian_paketsoal_kategori get wher ujian_paketsoal_id
                    const getKategori = await ujian_paketsoal_kategori.findAll({ where: { ujian_paketsoal_id: ujian_paketsoal_id } });
                    // console.log(ujian_paketsoal_id, getKategori);
                    for (const tempData of getKategori) {
                        let jumlah_soal = 0;
                        let status = 'Belum';
                        let tipe = 'Pilihan ganda';
                        const getStatsPerKategori = await models_1.default.ujian_paketsoal_soal.count({
                            where: {
                                ujian_paketsoal_kategori_id: tempData.id, deleted_at: null
                            }
                        });
                        // console.log(tempData.id, getStatsPerKategori);
                        let getStatus = await models_1.default.ujian_proses_kelas_siswa_kategori.findOne({
                            where: {
                                ujian_paketsoal_kategori_id: tempData.id
                            },
                            include: [
                                {
                                    model: models_1.default.ujian_proses_kelas_siswa,
                                    attributes: ['id', 'status'],
                                    where: {
                                        siswa_id: this.meId
                                    }
                                }
                            ]
                        });
                        // console.log(getStatus, tempData.id);
                        // break;
                        status = getStatus === null || getStatus === void 0 ? void 0 : getStatus.status;
                        let getSisaWaktu = {
                            detik: 0,
                        };
                        if (getStatus) {
                            if ((getStatus === null || getStatus === void 0 ? void 0 : getStatus.status) == 'Aktif') {
                                getSisaWaktu = await this.fn_get_sisa_waktu(getStatus.tgl_selesai);
                                if (getSisaWaktu.detik < 1) {
                                    status = 'Selesai';
                                }
                            }
                        }
                        tempData.setDataValue("jumlah_soal", getStatsPerKategori);
                        tempData.setDataValue("status", getStatus ? status : 'Belum');
                        tempData.setDataValue("jml_soal", getStatsPerKategori);
                        tempData.setDataValue("tipe", tipe);
                        // data.push(element);
                    }
                    return {
                        success: true,
                        data: getKategori,
                        periksa: true
                    };
                }
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.getKategoriSoalDetail = async (ujian_proses_kelas_id, kategori_id) => {
            try {
                const me = await this.fn_get_me(this.meId);
                let data = null;
                const periksaKelas = await this.fn_is_kelas_saya_terdaftar(me.kelas_id);
                const getDataKelas = await ujian_proses_kelas.findOne({ where: { id: ujian_proses_kelas_id } });
                // console.log(periksaKelas);
                if (periksaKelas == false) {
                    return {
                        success: false,
                        data: "Kelas tidak terdaftar"
                    };
                }
                data = await ujian_paketsoal_kategori.findOne({ where: { id: kategori_id } });
                return {
                    success: true,
                    data
                };
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.doMulaiUjian = async (ujian_proses_kelas_id, ujian_paketsoal_kategori_id) => {
            try {
                const me = await this.fn_get_me(this.meId);
                let data = null;
                const periksaKelas = await this.fn_is_kelas_saya_terdaftar(me.kelas_id);
                // const getDataKelas = await ujian_proses_kelas.findOne({ where: { id: ujian_proses_kelas_id } });
                // // console.log(periksaKelas);
                if (periksaKelas == false) {
                    return {
                        success: false,
                        data: "Kelas tidak terdaftar"
                    };
                }
                const periksaSiswaSudahDaftarUjian = await this.fn_is_siswa_sudah_daftar_ujian(ujian_proses_kelas_id);
                if (periksaSiswaSudahDaftarUjian) {
                    const ujian_proses_kelas_siswa_id = await this.fn_get_ujian_proses_kelas_siswa_id();
                    // console.log(ujian_proses_kelas_siswa_id);
                    // * periksa sudah memulai ujian ?
                    const periksa_apakah_sudah_memulai_ujian = await this.fn_is_sudah_memulai_ujian(ujian_paketsoal_kategori_id, ujian_proses_kelas_siswa_id);
                    if (periksa_apakah_sudah_memulai_ujian) {
                        let sisa_waktu = 0;
                        let sisa_waktu_dalam_menit = 0;
                        // getData Kategori
                        const getDataKategori = await models_1.default.ujian_proses_kelas_siswa_kategori.findOne({ where: { ujian_paketsoal_kategori_id, ujian_proses_kelas_siswa_id } });
                        if (getDataKategori.tgl_mulai) {
                            let get_fn_get_sisa_waktu = await this.fn_get_sisa_waktu(getDataKategori.tgl_selesai);
                            sisa_waktu = get_fn_get_sisa_waktu.detik;
                            sisa_waktu_dalam_menit = get_fn_get_sisa_waktu.menit;
                        }
                        else {
                            //! ketika direset
                            let tgl_mulai = moment();
                            getDataKategori.setDataValue("tgl_mulai", tgl_mulai);
                            let getWaktudalamPaketWhereKategori = await models_1.default.ujian_paketsoal_kategori.findOne({ where: { id: ujian_paketsoal_kategori_id } });
                            let waktu = getWaktudalamPaketWhereKategori.waktu;
                            let tgl_selesai = await this.fn_get_tgl_selesai(tgl_mulai, waktu);
                            console.log(tgl_mulai.format("YYYY-MM-DD H:m:ss"), tgl_selesai.format("YYYY-MM-DD H:m:ss"), "Aktif");
                            sisa_waktu = waktu * 60;
                            sisa_waktu_dalam_menit = waktu;
                            getDataKategori.setDataValue("tgl_mulai", tgl_mulai.format("YYYY-MM-DD H:m:ss"));
                            getDataKategori.setDataValue("tgl_selesai", tgl_selesai.format("YYYY-MM-DD H:m:ss"));
                            const formUpdate = await models_1.default.ujian_proses_kelas_siswa_kategori.findOne({ where: { ujian_paketsoal_kategori_id, ujian_proses_kelas_siswa_id } });
                            formUpdate.set({
                                tgl_mulai: tgl_mulai.format("YYYY-MM-DD H:m:ss"),
                                tgl_selesai: tgl_selesai.format("YYYY-MM-DD H:m:ss"),
                                status: "Aktif"
                            });
                            // As above, the database still has "formUpdate" and "green"
                            await formUpdate.save();
                        }
                        // get info paket yang aktif
                        // ! 
                        getDataKategori.setDataValue("sisa_waktu", sisa_waktu);
                        getDataKategori.setDataValue("sisa_waktu_dalam_menit", sisa_waktu_dalam_menit);
                        return {
                            success: true,
                            data: getDataKategori,
                        };
                    }
                    // !bug
                    const periksaUjianAktif = await this.fn_periksa_ujian_aktif(this.meId);
                    if (periksaUjianAktif) {
                        if (periksaUjianAktif.status == "Aktif" && periksaUjianAktif.sisa_waktu > 1) {
                            return {
                                success: false,
                                data: [],
                                message: "Selesaikan ujian aktif terlebih dahulu"
                            };
                        }
                    }
                    console.log(periksaUjianAktif);
                    //
                    // !clear
                    let getWaktu = await models_1.default.ujian_paketsoal_kategori.findOne({ where: { id: ujian_paketsoal_kategori_id } });
                    let tgl_selesai = await this.fn_get_tgl_selesai(moment().format("YYYY-MM-DD H:m:ss"), getWaktu.waktu);
                    const doInsertProsesSiswaKategori = await models_1.default.ujian_proses_kelas_siswa_kategori.create({
                        ujian_proses_kelas_siswa_id,
                        tgl_mulai: moment().format("YYYY-MM-DD H:m:ss"),
                        tgl_selesai: tgl_selesai.format("YYYY-MM-DD H:m:ss"),
                        waktu: getWaktu.waktu,
                        ujian_paketsoal_kategori_id,
                        created_at: moment().format(),
                        updated_at: moment().format(),
                    });
                    doInsertProsesSiswaKategori.setDataValue("sisa_waktu", getWaktu.waktu * 60);
                    doInsertProsesSiswaKategori.setDataValue("sisa_waktu_dalam_menit", getWaktu.waktu);
                    return {
                        success: true,
                        data: doInsertProsesSiswaKategori,
                    };
                    // * fnPeriksaUjianAktif 
                    // 'message' => 'Selesaikan ujian aktif terlebih dahulu'
                    // *else
                    // getUjianProsesKelasSiswaId
                    // insert data mulai ujian then get sisa waktu
                    return {
                        success: true,
                        data: "Siswa Sudah daftar",
                    };
                }
                return {
                    success: true,
                    data: "Siswa Belum daftar",
                };
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.getSoal = async (ujian_proses_kelas_id, ujian_paketsoal_kategori_id, ujian_proses_kelas_siswa_kategori_id) => {
            try {
                const me = await this.fn_get_me(this.meId);
                let data = null;
                const periksaKelas = await this.fn_is_kelas_saya_terdaftar(me.kelas_id);
                // const getDataKelas = await ujian_proses_kelas.findOne({ where: { id: ujian_proses_kelas_id } });
                // // console.log(periksaKelas);
                if (periksaKelas == false) {
                    return {
                        success: false,
                        data: "Kelas tidak terdaftar"
                    };
                }
                const getUjian_proses_kelas_siswa_kategori = await models_1.default.ujian_proses_kelas_siswa_kategori.findOne({ where: { id: ujian_proses_kelas_siswa_kategori_id } });
                const periksaWaktuHabis = await this.fn_is_waktu_habis(getUjian_proses_kelas_siswa_kategori.tgl_mulai, getUjian_proses_kelas_siswa_kategori.tgl_selesai);
                // console.log(periksaWaktuHabis);
                if (periksaWaktuHabis === false) {
                    return {
                        success: false,
                        data: "Waktu Ujian telah habis!"
                    };
                }
                const get_ujian_paketsoal_kategori = await models_1.default.ujian_paketsoal_kategori.findOne({ where: { id: ujian_paketsoal_kategori_id } });
                let random_soal = get_ujian_paketsoal_kategori.random_soal == 'Aktif' ? true : false;
                let random_pilihanjawaban = get_ujian_paketsoal_kategori.random_pilihanjawaban == 'Aktif' ? true : false;
                let getSoal = null;
                if (random_soal) {
                    getSoal = await models_1.default.ujian_paketsoal_soal.findAll({
                        where: {
                            ujian_paketsoal_kategori_id, deleted_at: null
                        },
                        order: [sequelize_1.Sequelize.literal('RAND()')]
                    });
                }
                else {
                    getSoal = await models_1.default.ujian_paketsoal_soal.findAll({
                        where: {
                            ujian_paketsoal_kategori_id, deleted_at: null
                        },
                        order: [['nomer_urut', 'ASC']]
                    });
                }
                // console.log(getSoal);
                // let result_getSoal = random_soal ? this.fn_random_array(getSoal) : getSoal;
                // console.log(this.fn_random_array(getSoal), "aaaa");
                let dataSoal = [];
                for (const soal of getSoal) {
                    let pilihan_jawaban = null;
                    if (random_pilihanjawaban) {
                        pilihan_jawaban = await ujian_paketsoal_soal_pilihanjawaban.findAll({ where: { ujian_paketsoal_soal_id: soal.id }, order: [sequelize_1.Sequelize.literal('RAND()')] });
                    }
                    else {
                        pilihan_jawaban = await ujian_paketsoal_soal_pilihanjawaban.findAll({ where: { ujian_paketsoal_soal_id: soal.id } });
                    }
                    // let result_pilihan_jawaban = random_pilihanjawaban ? this.fn_random_array(pilihan_jawaban) : pilihan_jawaban;
                    let result_pilihan_jawaban = pilihan_jawaban;
                    let getJawabanKu = await models_1.default.ujian_proses_kelas_siswa_kategori_hasil.findOne({ where: { ujian_paketsoal_soal_id: soal.id, ujian_proses_kelas_siswa_kategori_id } });
                    soal.setDataValue("jawaban_ku", getJawabanKu ? getJawabanKu.kode_jawaban : "-");
                    let periksa_file_audio = await models_1.default.ujian_files.findOne({ where: { kode_soal: soal.kode_soal } });
                    let file_audio = null;
                    if (periksa_file_audio) {
                        file_audio = `${process.env.BASE_URL_FILES}${periksa_file_audio.files}`;
                    }
                    soal.setDataValue("audio", file_audio);
                    soal.setDataValue("pilihan_jawaban", result_pilihan_jawaban);
                    dataSoal.push(soal);
                }
                data = data;
                // elseseses
                return {
                    success: true,
                    data: getSoal,
                };
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.doInsertJawaban = async (ujian_proses_kelas_siswa_kategori_id, dataForm) => {
            try {
                const me = await this.fn_get_me(this.meId);
                let data = null;
                const periksaKelas = await this.fn_is_kelas_saya_terdaftar(me.kelas_id);
                // const getDataKelas = await ujian_proses_kelas.findOne({ where: { id: ujian_proses_kelas_id } });
                // // console.log(periksaKelas);
                if (periksaKelas == false) {
                    return {
                        success: false,
                        data: "Kelas tidak terdaftar"
                    };
                }
                const get_ujian_proses_kelas_siswa_kategori = await ujian_proses_kelas_siswa_kategori.findOne({ where: { id: ujian_proses_kelas_siswa_kategori_id } });
                const periksa_waktu_habis = await this.fn_is_waktu_habis(get_ujian_proses_kelas_siswa_kategori.tgl_mulai, get_ujian_proses_kelas_siswa_kategori.tgl_selesai);
                if (periksa_waktu_habis == false) {
                    return {
                        success: false,
                        data: "Waktu  ujian telah habis"
                    };
                }
                let status_jawaban = 'Salah';
                let skor = 0;
                let periksa_jawaban_apakah_benar = await models_1.default.ujian_paketsoal_soal_pilihanjawaban.findOne({ where: { kode_jawaban: dataForm.kode_jawaban } });
                if (periksa_jawaban_apakah_benar) {
                    if (periksa_jawaban_apakah_benar.skor > 0) {
                        skor = periksa_jawaban_apakah_benar.skor;
                        status_jawaban = 'Benar';
                    }
                }
                else {
                    return {
                        success: false,
                        data: "Data Pilihan Jawaban tidak ditemukan!"
                    };
                }
                // ! periksa Jawaban
                const periksaJawaban = await models_1.default.ujian_proses_kelas_siswa_kategori_hasil.count({ where: { ujian_proses_kelas_siswa_kategori_id, ujian_paketsoal_soal_id: dataForm.ujian_paketsoal_soal_id, kode_soal: dataForm.kode_soal } });
                if (periksaJawaban > 0) {
                    const formUpdate = await models_1.default.ujian_proses_kelas_siswa_kategori_hasil.findOne({ where: { ujian_proses_kelas_siswa_kategori_id, ujian_paketsoal_soal_id: dataForm.ujian_paketsoal_soal_id, kode_soal: dataForm.kode_soal } });
                    // update
                    formUpdate.set({
                        ujian_paketsoal_soal_pilihanjawaban_id: dataForm.ujian_paketsoal_soal_pilihanjawaban_id,
                        kode_jawaban: dataForm.kode_jawaban,
                        status_jawaban,
                        skor
                    });
                    await formUpdate.save();
                }
                else {
                    // insert
                    const doInsertJawaban = await models_1.default.ujian_proses_kelas_siswa_kategori_hasil.create({
                        ujian_proses_kelas_siswa_kategori_id,
                        ujian_paketsoal_soal_id: dataForm.ujian_paketsoal_soal_id,
                        kode_soal: dataForm.kode_soal,
                        ujian_paketsoal_soal_pilihanjawaban_id: dataForm.ujian_paketsoal_soal_pilihanjawaban_id,
                        kode_jawaban: dataForm.kode_jawaban,
                        status_jawaban,
                        skor,
                        created_at: moment().format(),
                        updated_at: moment().format(),
                    });
                }
                // elseseses
                return {
                    success: true,
                    data: "Jawaban berhasil disimpan!",
                };
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.doFinish = async (ujian_proses_kelas_siswa_kategori_id) => {
            try {
                const me = await this.fn_get_me(this.meId);
                let data = null;
                const periksaKelas = await this.fn_is_kelas_saya_terdaftar(me.kelas_id);
                // const getDataKelas = await ujian_proses_kelas.findOne({ where: { id: ujian_proses_kelas_id } });
                // // console.log(periksaKelas);
                if (periksaKelas == false) {
                    return {
                        success: false,
                        data: "Kelas tidak terdaftar"
                    };
                }
                const get_ujian_proses_kelas_siswa_kategori = await models_1.default.ujian_proses_kelas_siswa_kategori.findOne({ where: { id: ujian_proses_kelas_siswa_kategori_id } });
                // console.log(get_ujian_proses_kelas_siswa_kategori);
                get_ujian_proses_kelas_siswa_kategori.set({
                    updated_at: moment().format("YYYY-MM-DD H:m:ss"),
                    status: "Selesai"
                });
                await get_ujian_proses_kelas_siswa_kategori.save();
                // elseseses
                return {
                    success: true,
                    // data: get_ujian_proses_kelas_siswa_kategori
                    data: "Proses finish berhasil!",
                };
            }
            catch (error) {
                console.log(error.message);
            }
        };
        // * SERVICE-END
        // * FUNGSI-DB
        this.fn_get_me = async (meId) => {
            try {
                const response = await siswa.findOne({ where: { id: meId }, include: kelas });
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.fn_periksa_ujian_aktif = async (meId) => {
            try {
                const response = await ujian_proses_kelas_siswa_kategori.findOne({
                    where: { status: "Aktif" }, include: [
                        {
                            model: models_1.default.ujian_proses_kelas_siswa,
                            attributes: ['id', 'status'],
                            where: {
                                siswa_id: meId,
                                status: "Aktif"
                                // !include where ujian proses where status=="Aktif"//belum
                            }
                        }
                    ]
                });
                console.log(response);
                if (response) {
                    let getSisaWaktu = await this.fn_get_sisa_waktu(response.tgl_selesai);
                    response.setDataValue("sisa_waktu", getSisaWaktu.detik);
                    response.setDataValue("sisa_waktu_dalam_menit", getSisaWaktu.menit);
                    if (response.sisa_waktu < 0) {
                        return null;
                    }
                }
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        // * FUNGSI-DB-END
        // * FUNGSI-BIASA
        this.fn_is_waktu_habis = async (tgl_mulai, tgl_selesai) => {
            try {
                const mulai = moment(tgl_mulai);
                const selesai = moment(tgl_selesai);
                const now = moment();
                let result = now.isBetween(mulai, selesai);
                if (result) {
                    return true;
                }
                return false;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.fn_random_array = async (arr) => {
            let newArr = arr.slice();
            for (let i = newArr.length - 1; i > 0; i--) {
                const rand = Math.floor(Math.random() * (i + 1));
                [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
            }
            return newArr;
        };
        this.fn_get_sisa_waktu = async (tgl_selesai) => {
            try {
                let result = {
                    detik: 0,
                    menit: 0,
                    now: null,
                    selesai: null
                };
                let selesai = moment(tgl_selesai);
                let now = moment();
                let duration = moment.duration(selesai.diff(now));
                result.detik = parseInt(duration.asSeconds().toFixed(0));
                result.menit = parseFloat(duration.asMinutes().toFixed(2));
                result.now = now;
                result.selesai = selesai;
                // result = parseInt(Date.parse(tgl_selesai)) - parseInt(Date.parse(moment().format("YYYY-MM-DD H:i:s")));
                // console.log(result);
                // const response = await Siswa.findOne({ where: { id }, include: kelas });
                return result;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.fn_get_tgl_selesai = async (tgl_mulai, waktu) => {
            try {
                const result = moment(tgl_mulai).add(waktu, 'm');
                ;
                return result;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.fn_is_siswa_sudah_daftar_ujian = async (ujian_proses_kelas_id) => {
            try {
                const response = await ujian_proses_kelas_siswa.count({ where: { ujian_proses_kelas_id, siswa_id: this.meId } });
                if (response < 1) {
                    return false;
                }
                return true;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.fn_is_kelas_saya_terdaftar = async (kelas_id) => {
            try {
                let result = false;
                const response = await ujian_proses_kelas.count({ where: { kelas_id, status: 'Aktif' } });
                if (response > 0) {
                    result = true;
                }
                return result;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.fn_get_ujian_proses_kelas_siswa_id = async () => {
            try {
                const response = await ujian_proses_kelas_siswa.findOne({ where: { siswa_id: this.meId } });
                return response.id;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.fn_is_sudah_memulai_ujian = async (ujian_paketsoal_kategori_id, ujian_proses_kelas_siswa_id) => {
            try {
                const response = await ujian_proses_kelas_siswa_kategori.count({ where: { ujian_paketsoal_kategori_id, ujian_proses_kelas_siswa_id } });
                if (response < 1) {
                    return false;
                }
                return true;
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
exports.default = StudiService;
