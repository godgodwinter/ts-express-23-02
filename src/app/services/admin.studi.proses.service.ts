
import db from "../models";
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
            const response = await ujian_proses_kelas_siswa.findAll({ where: { ujian_proses_kelas_id: this.params.ujian_proses_kelas_id }, include: [db.ujian_proses_kelas, db.siswa] });
            for (let i: number = 0; i < response.length; i++) {
                response[i].setDataValue("nama", response[i]?.siswa?.nama)
                response[i].setDataValue("siswa_id", response[i]?.siswa?.id)
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


}

export default adminStudiProsesService;