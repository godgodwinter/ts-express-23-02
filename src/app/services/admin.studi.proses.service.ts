
import db from "../models";
import { Op } from 'sequelize';
import { Request } from 'express';
import { fn_get_sisa_waktu } from "../helpers/babengUjian";

const moment = require('moment');
const localization = require('moment/locale/id')
moment.updateLocale("id", localization);

const {
    ujian_proses, ujian_proses_kelas,
    ujian_proses_kelas_siswa,
    ujian_proses_kelas_siswa_kategori,
    ujian_proses_kelas_siswa_kategori_hasil,
    ujian_kategori
} = db;
class adminStudiProsesService {

    body: Request['body'];
    params: Request['params'];

    constructor(req: Request) {
        this.body = req.body;
        this.params = req.params;
    }

    studi_proses_getSekolah = async () => {
        try {
            const response = await ujian_proses.findAll({ include: db.sekolah });
            for (let i: number = 0; i < response.length; i++) {
                response[i].setDataValue("nama", response[i]?.sekolah?.nama)
            }
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    studi_proses_getAllKelasPerSekolah = async () => {
        try {
            const response = await ujian_proses_kelas.findAll({ where: { ujian_proses_id: this.params.ujian_proses_id }, include: [db.ujian_proses, db.ujian_paketsoal, db.kelas] });
            for (let i: number = 0; i < response.length; i++) {
                response[i].setDataValue("kelas_nama", response[i]?.kelas?.nama)
                response[i].setDataValue("paketsoal_nama", response[i]?.ujian_paketsoal?.nama)
            }
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    studi_proses_getAllSiswaPerKelas = async () => {
        try {
            const response = await ujian_proses_kelas_siswa.findAll({ where: { ujian_proses_kelas_id: this.params.ujian_proses_kelas_id }, include: [db.ujian_proses_kelas, { model: db.siswa, attributes: ['id', 'nama', 'username', 'passworddefault'] }] });
            for (let i: number = 0; i < response.length; i++) {
                response[i].setDataValue("nama", response[i]?.siswa?.nama)
                response[i].setDataValue("username", response[i]?.siswa?.username)
                response[i].setDataValue("passworddefault", response[i]?.siswa?.passworddefault)
            }
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    studi_proses_getAllKategoriPerSiswa = async () => {
        try {
            const response = await ujian_proses_kelas_siswa_kategori.findAll({ where: { ujian_proses_kelas_siswa_id: this.params.ujian_proses_kelas_siswa_id }, include: [{ model: db.ujian_paketsoal_kategori, attributes: ['id', 'nama'], where: { deleted_at: null } }], });
            for (let i: number = 0; i < response.length; i++) {
                response[i].setDataValue("nama", response[i]?.ujian_paketsoal_kategori?.nama)
                const getJumlahSoal = await db.ujian_paketsoal_soal.count({ where: { ujian_paketsoal_kategori_id: response[i].ujian_paketsoal_kategori_id, deleted_at: null } })
                response[i].setDataValue("jumlah_soal", getJumlahSoal)
                const getJawabanku = await db.ujian_proses_kelas_siswa_kategori_hasil.findAll({ where: { ujian_proses_kelas_siswa_kategori_id: response[i].id } })
                let skor: number = 0;
                for (let i_jawabanku = 0; i_jawabanku < getJawabanku.length; i_jawabanku++) {
                    skor += parseInt(getJawabanku[i_jawabanku].skor)
                }
                response[i].setDataValue("skor", skor)
                let sisa_waktu: number = 0;
                let sisa_waktu_dalam_menit: number = 0;
                response[i].setDataValue("sisa_waktu_dalam_menit", sisa_waktu)
                if (response[i].status === 'Reset') {
                    response[i].setDataValue("status", "Reset")
                    response[i].setDataValue("sisa_waktu", 0)
                } else {
                    if (response[i].status === 'Aktif') {
                        let getSisaWaktu = await fn_get_sisa_waktu(response[i].tgl_selesai);
                        sisa_waktu = getSisaWaktu ? getSisaWaktu.detik : 0;
                        sisa_waktu_dalam_menit = getSisaWaktu ? getSisaWaktu.menit : 0;
                    }
                    console.log(sisa_waktu);
                    response[i].setDataValue("sisa_waktu", sisa_waktu)
                    response[i].setDataValue("sisa_waktu_dalam_menit", sisa_waktu_dalam_menit)
                    if (sisa_waktu < 0) {
                        response[i].setDataValue("sisa_waktu", 0)
                        response[i].setDataValue("sisa_waktu_dalam_menit", 0)
                        response[i].setDataValue("status", "Selesai")
                    }
                }
                response[i].setDataValue("nilaiAkhir", 0)
                response[i].setDataValue("nilaiAkhir_revisi", 0)
            }
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }

    // !DO RESET_WAKTU
    doResetWaktu = async () => {
        try {
            const getProsesKategori = await ujian_proses_kelas_siswa_kategori.findOne({ where: { id: this.params.ujian_proses_kelas_siswa_kategori_id, deleted_at: null } });

            getProsesKategori.set({
                tgl_mulai: null,
                tgl_selesai: null,
                status: "Reset",
                updated_at: moment().format(),
            });
            // As above, the database still has "formUpdate" and "green"
            await getProsesKategori.save();
            return "Reset Waktu Berhasil";
        } catch (error: any) {
            console.log(error.message);
        }
    }
    doResetSalah = async () => {
        try {
            const getProsesKategori = await ujian_proses_kelas_siswa_kategori.findOne({ where: { id: this.params.ujian_proses_kelas_siswa_kategori_id, deleted_at: null } });

            getProsesKategori.set({
                tgl_mulai: null,
                tgl_selesai: null,
                status: "Reset",
                updated_at: moment().format(),
            });
            // As above, the database still has "formUpdate" and "green"
            await getProsesKategori.save();

            await ujian_proses_kelas_siswa_kategori_hasil.destroy({
                where: {
                    ujian_proses_kelas_siswa_kategori_id: this.params.ujian_proses_kelas_siswa_kategori_id,
                    deleted_at: null,
                    skor: 0
                },
                force: true
            });

            return "Reset Waktu dan Jawaban Salah Berhasil";
        } catch (error: any) {
            console.log(error.message);
        }
    }
    doGenerateHasilUjianSiswa = async (siswa_id: number = parseInt(this.params.siswa_id)) => {
        try {
            const getSiswa = await db.siswa.findOne({ where: { id: siswa_id, deleted_at: null } });
            let dataForm = {
                siswa_id,
                ujian_banksoal_aspek_id: null,
                ujian_banksoal_aspek_nama: null,
                ujian_banksoal_aspek_urutan: null,
                ujian_paketsoal_kategori_id: null,
                ujian_paketsoal_kategori_nama: null,
                urutan: null,
                max_skor: null,
                nilaiAkhir: null,
                nilaiku: null,
                nilaiAkhir_ket_singkatan: null,
                nilaiAkhir_ket: null,
                ujian_paketsoal_kategori_prefix_aspek: null,
            }
            // periksa selesai
            const is_sudah_selesai = await this.fn_is_sudah_selesai(siswa_id, getSiswa.kelas_id)
            // !jika selesai
            console.log(is_sudah_selesai, dataForm);
            if (is_sudah_selesai === 'Selesai') {
                const get_data_hasil_ujian_studi = await this.fn_get_data_hasil_ujian_studi(siswa_id, getSiswa)
                if (get_data_hasil_ujian_studi === false) {
                    return "Gagal Generate"
                }
                return " Generate Berhasil";
            }

            //fnGetDataCetakHasilLintasPersiswa
            // isi data Form
            // simpan ke tabel hasil cetak
            return "Gagal generate";
        } catch (error: any) {
            console.log(error.message);
        }
    }

    // * FUNGSI
    fn_is_sudah_selesai = async (siswa_id: number, kelas_id: number): Promise<string> => {
        try {
            let result: string = "Data tidak ditemukan"
            const getUjian_proses_kelas_siswa = await db.ujian_proses_kelas_siswa.findOne({ where: { siswa_id } });
            if (getUjian_proses_kelas_siswa === null) {
                return result;
            }
            const ujian_proses_kelas_siswa_id = getUjian_proses_kelas_siswa.id
            const getPaketId = await db.ujian_proses_kelas.findOne({ where: { kelas_id }, order: [['id', 'desc']] })
            const ujian_paketsoal_id = getPaketId?.paketsoal_id

            const get_ujian_paketsoal_kategori = await db.ujian_paketsoal_kategori.findAll({ where: { ujian_paketsoal_id } })
            const jmlKategori = get_ujian_paketsoal_kategori.length;
            let jmlSelesai = 0
            for (let i = 0; i < get_ujian_paketsoal_kategori.length; i++) {
                let periksaUjianKategori = await db.ujian_proses_kelas_siswa_kategori.findOne({ where: { ujian_proses_kelas_siswa_id: ujian_proses_kelas_siswa_id, ujian_paketsoal_kategori_id: get_ujian_paketsoal_kategori[i].id } })
                if (periksaUjianKategori) {
                    jmlSelesai++
                }
            }
            if (jmlSelesai != jmlKategori) {
                return "Belum diselesaikan"
            } else {
                return "Selesai"
            }
        } catch (error: any) {
            console.log(error.message);
            throw (error)
        }
    };
    fn_get_data_hasil_ujian_studi = async (siswa_id: number, siswa: any): Promise<any | boolean> => {
        try {
            let result = false
            const getujian_proses_kelas_siswa = await db.ujian_proses_kelas_siswa.findOne({ where: { siswa_id } })
            if (getujian_proses_kelas_siswa === null) {
                return false
            }

            const getPaketId = await db.ujian_proses_kelas.findOne({ where: { kelas_id: siswa.kelas_id }, order: [['id', 'desc']] })
            const ujian_paketsoal_id = getPaketId?.paketsoal_id

            const getUjianKategori = await db.ujian_paketsoal_kategori.findAll({ where: { ujian_paketsoal_id } })

            let tempAspekTipeSemua = [];

            const getAspek = await db.ujian_banksoal_aspek.findAll();

            //!1. masukkan kategori sesuai aspek kecuali prefix==banksoal_all
            for (let i = 0; i < getAspek.length; i++) {
                let temp = []
                for (let j = 0; j < getUjianKategori.length; j++) {
                    let periksaKategori = await db.ujian_proses_kelas_siswa_kategori.findOne({
                        where: {
                            ujian_proses_kelas_siswa_id: getujian_proses_kelas_siswa.id, ujian_paketsoal_kategori_id: getUjianKategori[j].id,
                            //  status: { [Op.ne]: null } 
                        }
                    })
                    // console.log('====================================');
                    // console.log(periksaKategori, getujian_proses_kelas_siswa.id);
                    // console.log('====================================');
                    if (periksaKategori) {
                        if (periksaKategori.status != null) {

                        }
                        let getNilaiku = await db.ujian_proses_kelas_siswa_kategori_hasil.sum('skor', { where: { ujian_proses_kelas_siswa_kategori_id: periksaKategori.id } })
                        let dataku = periksaKategori;
                        dataku.setDataValue("nilaiku", getNilaiku)
                        let getMaxSkor = await this.fn_get_max_skor(getUjianKategori[j].id)
                        // console.log('====================================');
                        // console.log(getMaxSkor);
                        // console.log('====================================');
                        dataku.setDataValue("max_skor", getMaxSkor)
                        let getNilaiAkhir = getMaxSkor ? ((getNilaiku / getMaxSkor) * 100) : 0;
                        dataku.setDataValue("nilaiAkhir", getNilaiAkhir)
                        dataku.setDataValue("nilaiAkhir_ket", await this.fn_studi_get_ket(getNilaiAkhir))
                        dataku.setDataValue("nilaiAkhir_ket_singkatan", await this.fn_studi_get_ket_singkatan(getNilaiAkhir))
                        let get_ujian_paketsoal_kategori = await db.ujian_paketsoal_kategori.findOne({
                            where: { id: periksaKategori.ujian_paketsoal_kategori_id },
                            include: [{ model: ujian_kategori }]
                        })
                        dataku.setDataValue("kategori_nama", get_ujian_paketsoal_kategori?.ujian_kategori?.nama)
                        dataku.setDataValue("prefix", get_ujian_paketsoal_kategori?.ujian_kategori?.prefix)
                        // let getAspekDetail = periksaKategori.ujian_paketsoal_kategori ? periksaKategori.ujian_paketsoal_kategori.kategri
                        // let prefix= periksaKategori.ujian_paketsoal_kategori
                        console.log('====================================');
                        console.log(get_ujian_paketsoal_kategori?.ujian_kategori?.prefix);
                        console.log('====================================');

                        // console.log('====================================');
                        // console.log(getNilaiAkhir, getNilaiku, getMaxSkor);
                        // console.log('====================================');

                        // console.log("dataku", dataku)
                        // console.log('====================================');
                        // console.log(getNilaiku, periksaKategori.id);
                        // console.log('====================================');

                    }
                }
            }
            // console.log(getAspek)
            return result;
        } catch (error: any) {
            console.log(error.message);
            throw (error)
        }
    };


    fn_get_max_skor = async (ujian_paketsoal_kategori_id: number): Promise<number> => {
        try {
            console.log('====================================');
            console.log(ujian_paketsoal_kategori_id, "ini kategori");
            console.log('====================================');
            let getSoal = await db.ujian_paketsoal_soal.findAll({ where: { ujian_paketsoal_kategori_id: ujian_paketsoal_kategori_id } })
            let maxSkor: number = 0;
            for (let i = 0; i < getSoal.length; i++) {
                let getMaxSkor = await db.ujian_paketsoal_soal_pilihanjawaban.findOne({
                    include: {
                        model: db.ujian_paketsoal_soal, attributes: ['id'],
                        where: { id: getSoal[i].id, deleted_at: null }
                    }
                    , order: [['skor', 'desc']]
                })
                // console.log(getMaxSkor.skor)
                if (getMaxSkor) {
                    maxSkor += getMaxSkor.skor;
                }

            }
            return maxSkor
        } catch (error: any) {
            console.log(error.message);
            throw (error)
        }
    };
    // * FUNGSI
    // * FUNGSI-UMUM

    fn_studi_get_ket = async (nilai: number): Promise<string> => {
        try {
            if (nilai >= 88) {
                return "Sangat Tinggi Sekali";
            }
            if (88 > nilai && nilai >= 78) {
                return "Tinggi Sekali"
            }
            if (78 > nilai && nilai >= 68) {
                return "Tinggi"
            }
            if (68 > nilai && nilai >= 61) {
                return "Cukup Tinggi"
            }
            if (61 > nilai && nilai >= 44) {
                return "Cukup"
            }
            if (44 > nilai && nilai >= 34) {
                return "Agak Rendah"
            }
            if (34 > nilai && nilai >= 28) {
                return "Rendah"
            }
            if (28 > nilai && nilai >= 18) {
                return "Rendah Sekali"
            }
            return "Sangat Rendah Sekali"
        } catch (error: any) {
            console.log(error.message);
            throw (error)
        }
    };
    fn_studi_get_ket_singkatan = async (nilai: number): Promise<string> => {
        try {
            if (nilai >= 88) {
                return "STS";
            }
            if (88 > nilai && nilai >= 78) {
                return "TS"
            }
            if (78 > nilai && nilai >= 68) {
                return "T"
            }
            if (68 > nilai && nilai >= 61) {
                return "CT"
            }
            if (61 > nilai && nilai >= 44) {
                return "C"
            }
            if (44 > nilai && nilai >= 34) {
                return "AR"
            }
            if (34 > nilai && nilai >= 28) {
                return "R"
            }
            if (28 > nilai && nilai >= 18) {
                return "RS"
            }
            return "SRS"
        } catch (error: any) {
            console.log(error.message);
            throw (error)
        }
    };
    // * FUNGSI-UMUM-END
}

export default adminStudiProsesService;