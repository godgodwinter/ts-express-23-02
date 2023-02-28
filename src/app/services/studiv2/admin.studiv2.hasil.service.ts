import { sequelize_studi_v2 } from '../../models/index';
import { db_studi_v2 } from "../../models";
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Sequelize } from "sequelize";
import { Op } from 'sequelize';
import siswaService from '../mastering/siswa.v2.service';
import { fn_get_sisa_waktu } from "../../helpers/babengUjian";

const moment = require('moment');
const localization = require('moment/locale/id')
moment.updateLocale("id", localization);

const { studi_v2_paketsoal, studi_v2_paketsoal_aspek, studi_v2_paketsoal_aspek_detail, studi_v2_paketsoal_aspek_penilaian, studi_v2_paketsoal_soal,
    studi_v2_paketsoal_pilihanjawaban,
    studi_v2_banksoal_soal, studi_v2_banksoal_soal_pilihanjawaban,
    studi_v2_proses, studi_v2_proses_aspek_detail, studi_v2_proses_aspek_detail_soal, studi_v2_proses_aspek_detail_soal_pilihan_jawaban,
    studi_v2_hasil, studi_v2_hasil_aspek, studi_v2_hasil_aspek_detail, studi_v2_hasil_aspek_penilaian,
} = db_studi_v2;
class studiv2HasilService {

    meId: number;
    body: Request['body'];
    params: Request['params'];
    req: Request;

    constructor(req: Request) {
        this.meId = req.app.locals.meId;
        this.body = req.body;
        this.params = req.params;
        this.req = req;
    }

    //! PERSISWA
    hasilGetPersiswa = async (siswa_id: number) => {
        try {
            const getHasil = await studi_v2_hasil.findOne({ where: { siswa_id, deleted_at: null } });
            if (getHasil) {
                return getHasil
            }
            return null
        } catch (error: any) {
            console.log(error.message);
        }
    }

    hasilGeneratePersiswa = async (siswa_id: number) => {
        try {
            // ! 1. insert studi_v2_hasil where siswa
            // ! 2. insert studi_v2_hasil_aspek diambil dari paketsoal
            // ! 3. insert studi_v2_hasil_aspek_detail diambil dari proses
            // ! 4. insert studi_v2_hasil_aspek_penilaian diambil dari paketsoal
            const get_hasil = await studi_v2_hasil.findOne({ where: { siswa_id, deleted_at: null } })
            if (get_hasil) {
                return "Data sudah ada"
            }

            const get_proses = await studi_v2_proses.findOne({ where: { siswa_id, deleted_at: null } })
            if (get_proses) {
                const t = await sequelize_studi_v2.transaction();
                try {
                    const save_studi_v2_hasil = await studi_v2_hasil.create({
                        status: "Aktif",
                        tgl_ujian: get_proses.tgl_ujian,
                        studi_v2_proses_id: get_proses.id,
                        studi_v2_paketsoal_id: get_proses.studi_v2_paketsoal_id,
                        siswa_id,
                        created_at: moment().format(),
                        updated_at: moment().format(),
                    })

                    const getPaketsoal = await studi_v2_paketsoal.findOne({ where: { id: get_proses.studi_v2_paketsoal_id, deleted_at: null } })
                    // !dari paketsoal
                    const getPaketsoal_aspek = await studi_v2_paketsoal_aspek.findAll({ where: { studi_v2_paketsoal_id: getPaketsoal.id, deleted_at: null } })
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
                        })
                    }
                    // !dari proses
                    const getProses_aspek_detail = await studi_v2_proses_aspek_detail.findAll({ where: { studi_v2_proses_id: get_proses.id, deleted_at: null } })
                    for (const [index_aspek_detail, item_aspek_detail] of getProses_aspek_detail.entries()) {
                        const get_skor_jml = await studi_v2_proses_aspek_detail_soal.findAll({ where: { studi_v2_proses_aspek_detail_id: item_aspek_detail.id, deleted_at: null } });
                        const skor_jml = get_skor_jml.reduce((jml: number, object: any) => {
                            return jml + parseInt(object.skor || 0);
                        }, 0);
                        // console.log(item_aspek_detail.studi_v2_paketsoal_aspek_detail_id);
                        let get_soal_jml = await studi_v2_proses_aspek_detail_soal.count({ where: { studi_v2_proses_aspek_detail_id: item_aspek_detail.id, deleted_at: null } })
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
                        })

                        // console.log('====================================');
                        // console.log(save_studi_v2_hasil_aspek_detail);
                        // console.log('====================================');
                    }


                    const getPaketsoal_aspek_penilaian = await studi_v2_paketsoal_aspek_penilaian.findAll({ where: { studi_v2_paketsoal_id: getPaketsoal.id, deleted_at: null } })
                    for (const [index_penilaian, item_penilaian] of getPaketsoal_aspek_penilaian.entries()) {
                        const get_aspek_id = await studi_v2_hasil_aspek.findOne({ where: { studi_v2_hasil_id: save_studi_v2_hasil.id, studi_v2_paketsoal_aspek_id: item_penilaian.studi_v2_paketsoal_aspek_id, deleted_at: null } })
                        console.log('====================================');
                        console.log(save_studi_v2_hasil.id, item_penilaian.studi_v2_paketsoal_aspek_id, get_aspek_id, item_penilaian)
                        console.log('====================================');

                        const get_aspek_detail_id = await studi_v2_hasil_aspek_detail.findOne({
                            where: {
                                studi_v2_hasil_id: save_studi_v2_hasil.id,
                                studi_v2_paketsoal_aspek_detail_id: item_penilaian.studi_v2_paketsoal_aspek_detail_id,
                                deleted_at: null
                            }
                        })
                        console.log('====================================');
                        console.log("log:", save_studi_v2_hasil.id, get_aspek_id.id, get_aspek_detail_id.id);
                        console.log('====================================');
                        const save_penilaian = studi_v2_hasil_aspek_penilaian.create({
                            studi_v2_hasil_id: save_studi_v2_hasil.id,
                            studi_v2_hasil_aspek_id: get_aspek_id.id,
                            studi_v2_hasil_aspek_detail_id: get_aspek_detail_id.id,
                            // studi_v2_hasil_aspek_detail_id: get_aspek_detail_id.id
                        })
                    }
                    // return getProses_aspek_detail;
                    // return getProses_aspek_detail

                    await t.commit();
                } catch (error) {

                    // If the execution reaches this line, an error was thrown.
                    // We rollback the transaction.
                    await t.rollback();

                }
                return "Data berhasil disimpan";
            }
            return null
        } catch (error: any) {
            console.log(error.message);
        }
    }

    fn_get_max_skor = async (paketsoal_aspek_detail_id: number) => {
        // !cari max skor  dari skor terting persoal dijumlahkan semua;
        const get_soal = await studi_v2_paketsoal_soal.findAll({ where: { studi_v2_paketsoal_aspek_detail_id: paketsoal_aspek_detail_id, deleted_at: null } })
        let skor: number = 0;
        for (const [index, item] of get_soal.entries()) {
            const get_pilihanjawaban_max = await studi_v2_paketsoal_pilihanjawaban.findOne({ where: { studi_v2_paketsoal_soal_id: item.id, deleted_at: null }, order: [['skor', 'desc']] })
            // console.log('====================================');
            // console.log(get_pilihanjawaban_max);
            // console.log('====================================');
            skor += get_pilihanjawaban_max ? parseInt(get_pilihanjawaban_max.skor) : 0;
        }
        return skor;
    }

    hasilDeletePersiswa = async (siswa_id: number) => {
        try {
            try {
                const t = await sequelize_studi_v2.transaction();
                try {
                    // const getHasil = await studi_v2_hasil.findOne({ where: { siswa_id, deleted_at: null } })
                    const get_hasil = await studi_v2_hasil.findOne({ where: { siswa_id, deleted_at: null } })


                    const dataDeleted_hasil_aspek_detail = await studi_v2_hasil_aspek_detail.destroy({ where: { studi_v2_hasil_id: get_hasil.id, deleted_at: null } }, { transaction: t });
                    const dataDeleted_hasil = await studi_v2_hasil.destroy({ where: { siswa_id, deleted_at: null } }, { transaction: t });
                    await t.commit();
                } catch (error) {

                    // If the execution reaches this line, an error was thrown.
                    // We rollback the transaction.
                    await t.rollback();

                }
                return "Data berhasil dihapus"
                // return "Data berhasil disimpan"
            } catch (error: any) {
                console.log(error.message);
            }
            return "Data berhasil dihapus!";
        } catch (error: any) {
            console.log(error.message);
        }
    }
    // !PERKELAS-END

}

export default studiv2HasilService;