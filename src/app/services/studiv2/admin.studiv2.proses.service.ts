import { sequelize_studi_v2 } from '../../models/index';

import { db_studi_v2 } from "../../models";
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Sequelize } from "sequelize";
import siswaService from '../mastering/siswa.v2.service';

const moment = require('moment');
const localization = require('moment/locale/id')
moment.updateLocale("id", localization);

const { studi_v2_paketsoal, studi_v2_paketsoal_aspek, studi_v2_paketsoal_aspek_detail, studi_v2_paketsoal_aspek_penilaian, studi_v2_paketsoal_soal,
    studi_v2_paketsoal_pilihanjawaban,
    studi_v2_banksoal_soal, studi_v2_banksoal_soal_pilihanjawaban,
    studi_v2_proses, studi_v2_proses_aspek_detail, studi_v2_proses_aspek_detail_soal, studi_v2_proses_aspek_detail_soal_pilihan_jawaban
} = db_studi_v2;
class studiv2ProsesService {

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
    prosesGetSiswa = async (siswa_id: number) => {
        try {
            const siswa_Service: siswaService = new siswaService(this.req);
            const response = await siswa_Service.siswaGetWhereId(siswa_id);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    prosesStorePerSiswa = async (siswa_id: number, paketsoal_id: number, dataForm: any) => {
        try {
            const siswa_Service: siswaService = new siswaService(this.req);
            const response = await siswa_Service.siswaGetWhereId(siswa_id);
            const getPaketsoal = await studi_v2_paketsoal.findOne({ where: { id: paketsoal_id, deleted_at: null } })
            // ! 1. insert proses = siswa_id,paketsoal_id , tgl_ujian //batas ujian terakhir
            // ! 2. studi_v2_proses_aspek_detail = mapel, tgl_mulai, selesai ada dsini (proses mengerjakan per mapel)
            // ! 3. studi_v2_proses_aspek_detail_soal = insert semua soal (random_soal)
            // ! 4. studi_v2_proses_aspek_detail_soal_pilihan_jawaban   =  insert semua pilihanjawaban (random_pilihanjawaban)

            const t = await sequelize_studi_v2.transaction();
            try {
                const save_studi_v2_proses = await studi_v2_proses.create({
                    status: "Aktif",
                    tgl_ujian: dataForm.tgl_ujian,
                    siswa_id,
                    studi_v2_paketsoal_id: paketsoal_id,
                    created_at: moment().format(),
                    updated_at: moment().format(),
                }, { transaction: t })

                const getPaketosoalAspekDetail_where_paketsoal_id = await studi_v2_paketsoal_aspek_detail.findAll({ where: { studi_v2_paketsoal_id: paketsoal_id, deleted_at: null } })
                // * tambahan_field: mapel_nama
                for (const [index, mapel] of getPaketosoalAspekDetail_where_paketsoal_id.entries()) {
                    const save_studi_v2_proses_aspek_detail = await studi_v2_proses_aspek_detail.create({
                        status: "Aktif",
                        tgl_mulai: null,
                        tgl_selesai: null,
                        waktu: mapel.waktu,
                        studi_v2_proses_id: save_studi_v2_proses.id,
                        studi_v2_paketsoal_aspek_detail_id: mapel.id,
                        created_at: moment().format(),
                        updated_at: moment().format(),
                    }, { transaction: t })

                    let getSoal = [{
                        id: null, kode_soal: null, kode_jawaban: null, status_jawaban: null, skor: 0, studi_v2_proses_aspek_detail_id: save_studi_v2_proses_aspek_detail.id, studi_v2_paketsoal_soal_id: mapel.id
                    }];
                    if (mapel.random_soal === "Aktif") {
                        getSoal = await studi_v2_paketsoal_soal.findAll({ where: { studi_v2_paketsoal_aspek_detail_id: mapel.id }, order: [Sequelize.literal('RAND()')] })
                    } else {
                        getSoal = await studi_v2_paketsoal_soal.findAll({ where: { studi_v2_paketsoal_aspek_detail_id: mapel.id } })
                    }
                    for (const [index_soal, soal] of getSoal.entries()) {
                        const save_studi_v2_proses_aspek_detail_soal = await studi_v2_proses_aspek_detail_soal.create({
                            kode_soal: soal.kode_soal,
                            kode_jawaban: soal.kode_jawaban,
                            status_jawaban: soal.kode_jawaban,
                            skor: soal.kode_jawaban,
                            studi_v2_proses_aspek_detail_id: save_studi_v2_proses_aspek_detail.id,
                            studi_v2_paketsoal_soal_id: soal.id,
                            created_at: moment().format(),
                            updated_at: moment().format(),
                        }, { transaction: t })

                        let getPilihanjawaban = [{ id: null, kode_jawaban: null, studi_v2_proses_aspek_detail_soal_id: null, studi_v2_paketsoal_pilihanjawaban_id: null }];
                        if (mapel.random_pilihanjawaban === "Aktif") {
                            getPilihanjawaban = await studi_v2_paketsoal_pilihanjawaban.findAll({ where: { studi_v2_paketsoal_soal_id: soal.id, deleted_at: null }, order: [Sequelize.literal('RAND()')] })
                        } else {
                            getPilihanjawaban = await studi_v2_paketsoal_pilihanjawaban.findAll({ where: { studi_v2_paketsoal_soal_id: soal.id, deleted_at: null } })
                        }
                        for (const [index_pj, pilihanjawaban] of getPilihanjawaban.entries()) {
                            const save_studi_v2_proses_aspek_detail_soal_pilihan_jawaban = await studi_v2_proses_aspek_detail_soal_pilihan_jawaban.create({
                                kode_jawaban: pilihanjawaban.kode_jawaban,
                                studi_v2_proses_aspek_detail_soal_id: save_studi_v2_proses_aspek_detail_soal.id,
                                studi_v2_paketsoal_pilihanjawaban_id: pilihanjawaban.id,
                                created_at: moment().format(),
                                updated_at: moment().format(),
                            }, { transaction: t })
                        }

                    }

                }

                await t.commit();
            } catch (error) {

                // If the execution reaches this line, an error was thrown.
                // We rollback the transaction.
                await t.rollback();

            }
            return "Data berhasil disimpan";
        } catch (error: any) {
            console.log(error.message);
        }
    }
    prosesDeletePersiswa = async (siswa_id: number, proses_id: number) => {
        try {

            try {
                const t = await sequelize_studi_v2.transaction();
                try {
                    const getMapel = await studi_v2_proses_aspek_detail.findAll({ where: { studi_v2_proses_id: proses_id, deleted_at: null } })
                    for (const [index, mapel] of getMapel.entries()) {

                        const getSoal = await studi_v2_proses_aspek_detail_soal.findAll({ where: { studi_v2_proses_aspek_detail_id: mapel.id, deleted_at: null } })
                        for (const [index_soal, soal] of getSoal.entries()) {
                            const dataDeleted_studi_v2_proses_aspek_detail_soal_pilihan_jawaban = await studi_v2_proses_aspek_detail_soal_pilihan_jawaban.destroy({ where: { studi_v2_proses_aspek_detail_soal_id: soal.id, deleted_at: null } }, { transaction: t });
                        }
                        const dataDeleted_proses_soal_id = await studi_v2_proses_aspek_detail_soal.destroy({ where: { studi_v2_proses_aspek_detail_id: mapel.id, deleted_at: null } }, { transaction: t });
                    }
                    const dataDeleted_proses_aspek_detail = await studi_v2_proses_aspek_detail.destroy({ where: { studi_v2_proses_id: proses_id, deleted_at: null } }, { transaction: t });
                    const dataDeleted_proses = await studi_v2_proses.destroy({ where: { id: proses_id, deleted_at: null } }, { transaction: t });
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

    prosesPeriksaIsSiswaSudahAda = async (siswa_id: number, tgl_ujian: any) => {
        const periksaSiswa = await studi_v2_proses.findOne({ where: { siswa_id: siswa_id, deleted_at: null } })
        if (periksaSiswa) {
            periksaSiswa.set({
                tgl_ujian,
                updated_at: moment().format(),
            });
            // As above, the database still has "formUpdate" and "green"
            await periksaSiswa.save();
            return true
        }
        return false;
    }

    //! PERSISWA

    //! PERKELAS

    prosesGetSiswaPerKelas = async (kelas_id: number) => {
        try {
            const siswa_Service: siswaService = new siswaService(this.req);
            const response = await siswa_Service.siswaGetWhereKelas(kelas_id);
            for (const [index, item] of response.entries()) {
                const getProses = await studi_v2_proses.findOne({ where: { siswa_id: item.id, deleted_at: null } })
                let proses_id = null;
                let paketsoal_id = null;
                let paketsoal_nama = null;
                let tgl_ujian = null;
                let status = "Belum";
                if (getProses) {
                    proses_id = getProses.id;
                    paketsoal_id = getProses.studi_v2_paketsoal_id;
                    paketsoal_nama = getProses.studi_v2_paketsoal_id;
                    tgl_ujian = getProses.tgl_ujian;
                    status = "Ada"
                }
                response[index].setDataValue("proses_id", proses_id)
                response[index].setDataValue("paketsoal_nama", paketsoal_nama)
                response[index].setDataValue("paketsoal_id", paketsoal_id)
                response[index].setDataValue("tgl_ujian", tgl_ujian)
                response[index].setDataValue("status", status)
            }
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }

    prosesStoreSiswaPerKelas = async (kelas_id: number, paketsoal_id: number, dataForm: any) => {
        try {
            const siswa_Service: siswaService = new siswaService(this.req);
            const response = await siswa_Service.siswaGetWhereKelas(kelas_id);
            let dataBerhasilDisimpan = 0;
            for (const [index, siswa] of response.entries()) {
                const periksaIsSudahAda = await this.prosesPeriksaIsSiswaSudahAda(siswa.id, dataForm.tgl_ujian)
                if (periksaIsSudahAda === false) {
                    await this.prosesStorePerSiswa(siswa.id, paketsoal_id, dataForm)
                    dataBerhasilDisimpan++;
                }
            }
            return dataBerhasilDisimpan;
        } catch (error: any) {
            console.log(error.message);
        }
    }

    prosesDeleteSiswaPerKelas = async (kelas_id: number) => {
        try {
            const siswa_Service: siswaService = new siswaService(this.req);
            const response = await siswa_Service.siswaGetWhereKelas(kelas_id);
            let dataBerhasilDisimpan = 0;
            for (const [index, siswa] of response.entries()) {
                const proses = await studi_v2_proses.findOne({ where: { siswa_id: siswa.id, deleted_at: null } })
                if (proses) {
                    const dataTerhapus = await this.prosesDeletePersiswa(siswa.id, proses.id)
                    if (dataTerhapus) {
                        dataBerhasilDisimpan++;
                    }
                }
            }
            return dataBerhasilDisimpan;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    // !PERKELAS-END

}

export default studiv2ProsesService;