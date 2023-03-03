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

type IDataHasil = [
    {
        tipe: string,
        aspek_detail: any

    }
]
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
                const getAspek = await studi_v2_hasil_aspek.findAll({ where: { studi_v2_hasil_id: getHasil.id, deleted_at: null } });
                for (const [index_aspek, item_aspek] of getAspek.entries()) {
                    const getPenilaian = await studi_v2_hasil_aspek_penilaian.findAll({ where: { studi_v2_hasil_id: getHasil.id, studi_v2_hasil_aspek_id: item_aspek.id, deleted_at: null } });
                    // item_aspek.setDataValue("aspek_detail", getPenilaian)
                    let aspek_detail = [];
                    let aspek_skor = 0;
                    let aspek_jml = 0;
                    for (const [index_penilaian, item_penilaian] of getPenilaian.entries()) {
                        const getAspekDetail = await studi_v2_hasil_aspek_detail.findOne({ where: { id: item_penilaian.studi_v2_hasil_aspek_detail_id, deleted_at: null } })
                        getAspekDetail.setDataValue("status_tampil", item_penilaian.status)
                        const nilai_akhir = getAspekDetail.nilai_akhir_revisi > 0 ? getAspekDetail.nilai_akhir_revisi : getAspekDetail.nilai_akhir;
                        getAspekDetail.setDataValue("nilai_akhir", nilai_akhir)
                        aspek_jml++;
                        aspek_skor += nilai_akhir;
                        aspek_detail.push(getAspekDetail)
                    }

                    aspek_detail.sort(function (a, b) {
                        return b.nilai_akhir - a.nilai_akhir;
                    });
                    item_aspek.setDataValue("aspek_detail", aspek_detail)
                    let aspek_avg = aspek_skor / aspek_jml;
                    item_aspek.setDataValue("aspek_avg", aspek_avg > 0 ? aspek_avg.toFixed(2) : 0)
                }
                return getAspek
            }
            return null
        } catch (error: any) {
            console.log(error.message);
        }
    }

    get_dataJurusan = async (dataHasilPersiswa: any) => {
        let result: [
            {
                aspek_avg: number,

            }] = [
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
                    result.push(item)
                }
            }

            if (result.length > 0) {
                result.sort(function (a, b) {
                    return b.aspek_avg - a.aspek_avg;
                });
            }
        }
        // let removeDummy = result.shift();
        return result
    }


    hasilGeneratePersiswa = async (siswa_id: number) => {
        try {
            // ! 1. insert studi_v2_hasil where siswa
            // ! 2. insert studi_v2_hasil_aspek diambil dari paketsoal
            // ! 3. insert studi_v2_hasil_aspek_detail diambil dari proses
            // ! 4. insert studi_v2_hasil_aspek_penilaian diambil dari paketsoal
            const get_hasil = await studi_v2_hasil.findOne({ where: { siswa_id, deleted_at: null } })
            if (get_hasil) {
                return null //! data sudah ada
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
                        // console.log('====================================');
                        // console.log(save_studi_v2_hasil.id, item_penilaian.studi_v2_paketsoal_aspek_id, get_aspek_id, item_penilaian)
                        // console.log('====================================');

                        const get_aspek_detail_id = await studi_v2_hasil_aspek_detail.findOne({
                            where: {
                                studi_v2_hasil_id: save_studi_v2_hasil.id,
                                studi_v2_paketsoal_aspek_detail_id: item_penilaian.studi_v2_paketsoal_aspek_detail_id,
                                deleted_at: null
                            }
                        })
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
            const get_hasil = await studi_v2_hasil.findOne({ where: { siswa_id, deleted_at: null } })
            if (get_hasil === null) {
                return null; //!data tidak ditemukan
            }
            try {
                const t = await sequelize_studi_v2.transaction();
                try {
                    // const getHasil = await studi_v2_hasil.findOne({ where: { siswa_id, deleted_at: null } })


                    const dataDeleted_studi_v2_hasil_aspek_penilaian = await studi_v2_hasil_aspek_penilaian.destroy({ where: { studi_v2_hasil_id: get_hasil.id, deleted_at: null } }, { transaction: t });
                    const dataDeleted_studi_v2_hasil_aspek = await studi_v2_hasil_aspek.destroy({ where: { studi_v2_hasil_id: get_hasil.id, deleted_at: null } }, { transaction: t });
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


    hasilRevisiNilaiAkhir = async (hasil_aspek_detail_id: number) => {
        try {
            const get_hasil_aspek_detail = await studi_v2_hasil_aspek_detail.findOne({ where: { id: hasil_aspek_detail_id, deleted_at: null } });
            if (get_hasil_aspek_detail) {

                get_hasil_aspek_detail.set({
                    nilai_akhir_revisi: this.body.nilai_akhir_revisi,
                    updated_at: moment().format(),
                });
                // As above, the database still has "formUpdate" and "green"
                await get_hasil_aspek_detail.save();
                return get_hasil_aspek_detail
            }
            return null
        } catch (error: any) {
            console.log(error.message);
        }
    }

    // !PERSISWA-END
    // !PERKELAS
    hasilGetPerkelas = async (kelas_id: number) => {
        try {
            const siswa_Service: siswaService = new siswaService(this.req);
            const getSiswaWhereKelas = await siswa_Service.siswaGetWhereKelas(kelas_id);
            const response: any = [];
            for (const [index_kelas, item_kelas] of getSiswaWhereKelas.entries()) {
                const getHasilSiswa = await this.hasilGetPersiswa(item_kelas.id);
                if (getHasilSiswa) {
                    let dataSiswa = {
                        siswa: null,
                        data: []
                    }
                    dataSiswa.siswa = await siswa_Service.siswaGetWhereId(item_kelas.id);
                    dataSiswa.data = getHasilSiswa;
                    response.push(dataSiswa)
                }
            }
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    hasilGetPerkelas_exportjawaban_header = async () => {
        try {
            const get_paketsoal = await studi_v2_paketsoal.findOne({ where: { status: 'Aktif', deleted_at: null } })
            if (get_paketsoal) {
                const get_mapel = await studi_v2_paketsoal_aspek_detail.findAll({
                    attributes: ['id', 'nama', 'kode'],
                    where: { studi_v2_paketsoal_id: get_paketsoal.id, deleted_at: null }
                })
                for (const [index_mapel, item_mapel] of get_mapel.entries()) {
                    const jmlSoal = await studi_v2_paketsoal_soal.count({
                        attributes: ['id', 'kode_soal']
                        , where: { studi_v2_paketsoal_aspek_detail_id: item_mapel.id, deleted_at: null }
                    });
                    item_mapel.setDataValue("jmlSoal", jmlSoal)
                }
                if (get_mapel) {
                    return get_mapel;
                }
            }
            return "Paket tidak ditemukan!"
        } catch (error: any) {
            console.log(error.message);
        }
    }
    hasilGetPerkelas_exportjawaban = async (kelas_id: number) => {
        try {
            const siswa_Service: siswaService = new siswaService(this.req);
            const getSiswaWhereKelas = await siswa_Service.siswaGetWhereKelas(kelas_id);
            const response: any = [];
            // ! 1. ambil data pertama, ambil paket soal
            // ! 2. ambil mapel yang ada dalam paket
            // ! 3. ambil siswa dalam kelas yang ada hasil generate
            // ! 4. masukkan kode soal dan skor
            const get_paketsoal = await studi_v2_paketsoal.findOne({ where: { status: 'Aktif', deleted_at: null } })
            if (get_paketsoal) {
                let result: any = []
                // let tempHeader = {
                //     siswa: {
                //         id: get_paketsoal.id,
                //         nomeridentitas: null,
                //         kelas_id: null,
                //         kelas_nama: null,
                //         nama: get_paketsoal.nama,
                //     },
                //     dataMapel: []
                // }
                // // const get_mapel = await studi_v2_paketsoal_aspek_detail.findAll({
                // //     attributes: ['id', 'nama', 'kode'],
                // //     where: { studi_v2_paketsoal_id: get_paketsoal.id, deleted_at: null }
                // // })
                // // for (const [index_mapel, item_mapel] of get_mapel.entries()) {
                // //     let tempJawaban = await studi_v2_paketsoal_soal.findAll({
                // //         attributes: ['id', 'kode_soal']
                // //         , where: { studi_v2_paketsoal_aspek_detail_id: item_mapel.id, deleted_at: null }
                // //     });
                // //     let jmlSoal = 0;
                // //     for (const [index_soal, item_soal] of tempJawaban.entries()) {
                // //         jmlSoal++;
                // //         item_soal.setDataValue("skor", 1);
                // //         item_soal.setDataValue("kode_jawaban", null);
                // //     }
                // //     item_mapel.setDataValue("jmlSoal", jmlSoal)
                // //     item_mapel.setDataValue("soal", tempJawaban)
                // // }
                // // tempHeader.dataMapel = get_mapel;
                // result.push(tempHeader)

                // ! AMBIL DATA SISWA
                const getSiswaWhereKelas = await siswa_Service.siswaGetWhereKelasNoPass(kelas_id);
                if (getSiswaWhereKelas) {
                    for (const [index_siswa, item_siswa] of getSiswaWhereKelas.entries()) {
                        let tempSiswa = {
                            siswa: {
                                id: get_paketsoal.id,
                                nomeridentitas: get_paketsoal.id,
                                kelas_id: get_paketsoal.id,
                                kelas_nama: get_paketsoal.id,
                                nama: get_paketsoal.nama,
                            },
                            dataMapel: []
                        }
                        const periksaProses = await studi_v2_proses.findOne({
                            where: {
                                siswa_id: item_siswa.id,
                                studi_v2_paketsoal_id: get_paketsoal.id
                            }
                        })
                        // !periksa apakah sudah ada data generate hasil
                        if (periksaProses) {
                            tempSiswa.siswa = item_siswa;
                            const get_mapel_siswa = await studi_v2_paketsoal_aspek_detail.findAll({
                                attributes: ['id', 'nama', 'kode'],
                                where: { studi_v2_paketsoal_id: get_paketsoal.id, deleted_at: null }
                            })
                            // tempSiswa.dataMapel = get_mapel
                            for (const [index_mapel_j, item_mapel_j] of get_mapel_siswa.entries()) {
                                const get_studi_v2_proses_aspek_detail = await studi_v2_proses_aspek_detail.findOne({
                                    attributes: ['id', 'aspek_detail_nama']
                                    , where: { studi_v2_proses_id: periksaProses.id, studi_v2_paketsoal_aspek_detail_id: item_mapel_j.id, deleted_at: null }
                                })
                                // ambil skor ku di tabl studi_v2_proses_aspek_detail_soal wher kode_soal
                                let tempJawaban = await studi_v2_paketsoal_soal.findAll({
                                    attributes: ['id', 'kode_soal']
                                    , where: { studi_v2_paketsoal_aspek_detail_id: item_mapel_j.id, deleted_at: null }
                                });
                                let jmlSoal = 0;
                                for (const [index_soal_j, item_soal_j] of tempJawaban.entries()) {
                                    jmlSoal++;
                                    let get_jawabanku = await studi_v2_proses_aspek_detail_soal.findOne({
                                        attributes: ['id', 'kode_soal', 'skor', 'kode_jawaban']
                                        , where: { studi_v2_proses_aspek_detail_id: get_studi_v2_proses_aspek_detail.id, kode_soal: item_soal_j.kode_soal, deleted_at: null }
                                    })
                                    if (get_jawabanku) {
                                        item_soal_j.setDataValue("skor", get_jawabanku.skor)
                                        item_soal_j.setDataValue("kode_jawaban", get_jawabanku.kode_jawaban);
                                    } else {
                                        item_soal_j.setDataValue("skor", 0)
                                        item_soal_j.setDataValue("kode_jawaban", get_jawabanku.kode_jawaban);
                                    }
                                    // item_soal_j.setDataValue("skor", 1);

                                }
                                item_mapel_j.setDataValue("jmlSoal", jmlSoal)
                                item_mapel_j.setDataValue("soal", tempJawaban)
                                // item_mapel.setDataValue("soal")
                            }

                            tempSiswa.dataMapel = get_mapel_siswa;
                            result.push(tempSiswa)
                        }
                    }
                }


                return result
            }
            return get_paketsoal;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    hasilGeneratePerkelas = async (kelas_id: number) => {
        try {
            let jml: number = 0;
            const siswa_Service: siswaService = new siswaService(this.req);
            const getSiswaWhereKelas = await siswa_Service.siswaGetWhereKelas(kelas_id);
            for (const [index_kelas, item_kelas] of getSiswaWhereKelas.entries()) {
                const doGeneratePersiswa = await this.hasilGeneratePersiswa(item_kelas.id);
                if (doGeneratePersiswa) {
                    jml++;
                }
            }
            return `${jml} Data berhasil di generate`
        } catch (error: any) {
            console.log(error.message);
        }
    }
    hasilDeletePerkelas = async (kelas_id: number) => {
        try {
            let jml: number = 0;
            const siswa_Service: siswaService = new siswaService(this.req);
            const getSiswaWhereKelas = await siswa_Service.siswaGetWhereKelas(kelas_id);
            for (const [index_kelas, item_kelas] of getSiswaWhereKelas.entries()) {
                const doDeletePersiswa = await this.hasilDeletePersiswa(item_kelas.id);
                if (doDeletePersiswa) {
                    jml++;
                }
            }
            return `${jml} Data di Hapus`
        } catch (error: any) {
            console.log(error.message);
        }
    }
    // !PERKELAS-END

}

export default studiv2HasilService;