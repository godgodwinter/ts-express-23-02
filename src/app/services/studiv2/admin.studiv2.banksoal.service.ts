import { sequelize_studi_v2 } from './../../models/index';

import { db_studi_v2 } from "../../models";
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Sequelize } from "sequelize";

const moment = require('moment');
const localization = require('moment/locale/id')
moment.updateLocale("id", localization);

const { studi_v2_banksoal_aspek, studi_v2_banksoal_aspek_detail, studi_v2_banksoal_soal, studi_v2_banksoal_soal_pilihanjawaban } = db_studi_v2;
class studiv2BanksoalService {

    body: Request['body'];
    params: Request['params'];

    constructor(req: Request) {
        this.body = req.body;
        this.params = req.params;
    }

    //!ASPEK
    aspekGetAll = async () => {
        try {
            const response = await studi_v2_banksoal_aspek.findAll();
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }

    aspekEdit = async () => {
        try {
            const response = await studi_v2_banksoal_aspek.findOne(
                { where: { id: this.params.aspek_id } },
            );

            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    aspekStore = async () => {
        try {
            const dataSave = await studi_v2_banksoal_aspek.create({
                nama: this.body.nama,
                urutan: this.body.urutan
            });

            return dataSave
        } catch (error: any) {
            console.log(error.message);
        }
    }
    aspekUpdate = async () => {
        try {
            const dataUpdate = await studi_v2_banksoal_aspek.findOne({ where: { id: this.params.aspek_id, deleted_at: null } });
            dataUpdate.set({
                nama: this.body.nama,
                urutan: this.body.urutan || null,
                updated_at: moment().format(),
            });
            // As above, the database still has "formUpdate" and "green"
            await dataUpdate.save();
            return dataUpdate
            // return "Data berhasil disimpan"
        } catch (error: any) {
            console.log(error.message);
        }
    }

    aspekDelete = async () => {
        try {
            const dataDeleted = await studi_v2_banksoal_aspek.destroy({ where: { id: this.params.aspek_id, deleted_at: null } });
            return dataDeleted
            // return "Data berhasil disimpan"
        } catch (error: any) {
            console.log(error.message);
        }
    }
    //!ASPEK-END

    //!ASPEKDETAIL //MAPEL
    aspek_detailGetAll = async () => {
        try {
            const response = await studi_v2_banksoal_aspek_detail.findAll();
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }

    aspek_detailEdit = async () => {
        try {
            const response = await studi_v2_banksoal_aspek_detail.findOne(
                { where: { id: this.params.aspek_detail_id } },
            );

            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    aspek_detailStore = async () => {
        try {
            const dataSave = await studi_v2_banksoal_aspek_detail.create({
                nama: this.body.nama,
                kode: this.body.kode || uuidv4(),
                desc: this.body.desc,
                urutan: this.body.urutan,
                waktu: this.body.waktu,
                instruksi: this.body.instruksi,
                instruksi_status: this.body.instruksi_status,
                lembar_prasoal: this.body.lembar_prasoal,
                lembar_prasoal_status: this.body.lembar_prasoal_status,
                instruksi_pengerjaan: this.body.instruksi_pengerjaan,
                instruksi_pengerjaan_status: this.body.instruksi_pengerjaan_status,
                random_soal: this.body.random_soal,
                random_pilihanjawaban: this.body.random_pilihanjawaban,
            });

            return dataSave
        } catch (error: any) {
            console.log(error.message);
        }
    }
    aspek_detailUpdate = async () => {
        try {
            const dataUpdate = await studi_v2_banksoal_aspek_detail.findOne({ where: { id: this.params.aspek_detail_id, deleted_at: null } });
            dataUpdate.set({
                nama: this.body.nama,
                desc: this.body.desc,
                urutan: this.body.urutan,
                waktu: this.body.waktu,
                instruksi: this.body.instruksi,
                instruksi_status: this.body.instruksi_status,
                lembar_prasoal: this.body.lembar_prasoal,
                lembar_prasoal_status: this.body.lembar_prasoal_status,
                instruksi_pengerjaan: this.body.instruksi_pengerjaan,
                instruksi_pengerjaan_status: this.body.instruksi_pengerjaan_status,
                random_soal: this.body.random_soal,
                random_pilihanjawaban: this.body.random_pilihanjawaban,
                updated_at: moment().format(),
            });
            // As above, the database still has "formUpdate" and "green"
            await dataUpdate.save();
            return dataUpdate
            // return "Data berhasil disimpan"
        } catch (error: any) {
            console.log(error.message);
        }
    }

    aspek_detailDelete = async () => {
        try {
            const dataDeleted = await studi_v2_banksoal_aspek_detail.destroy({ where: { id: this.params.aspek_detail_id, deleted_at: null } });
            return dataDeleted
            // return "Data berhasil disimpan"
        } catch (error: any) {
            console.log(error.message);
        }
    }
    //!aspek_detail-END


    //!SOAL
    soalGetAll = async () => {
        try {
            const response = await studi_v2_banksoal_soal.findAll({ where: { studi_v2_banksoal_aspek_detail_id: this.params.aspek_detail_id, deleted_at: null } });
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }

    soalEdit = async () => {
        try {
            const response = await studi_v2_banksoal_soal.findOne(
                {
                    where: { id: this.params.soal_id },
                    include: [{ model: db_studi_v2.studi_v2_banksoal_soal_pilihanjawaban, attributes: ['id', 'jawaban', 'skor', 'kode_soal', 'kode_jawaban'], where: { deleted_at: null } }]
                },);

            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    soalStore = async () => {
        try {
            const get_aspek_detail = await studi_v2_banksoal_aspek_detail.findOne({
                where: { id: this.params.aspek_detail_id, deleted_at: null },
                // include: [{ model: db_studi_v2.studi_v2_banksoal_aspek, attributes: ['id', 'nama'], where: { deleted_at: null } }]
            })
            const aspek_detail_nama = get_aspek_detail.nama;
            const t = await sequelize_studi_v2.transaction();
            try {
                const dataSave = await studi_v2_banksoal_soal.create({
                    studi_v2_banksoal_aspek_detail_id: this.body.studi_v2_banksoal_aspek_detail_id,
                    pertanyaan: this.body.pertanyaan,
                    kode: this.body.kode || null,
                    kode_soal: this.body.kode_soal || uuidv4(),
                    nomer_urut: this.body.nomer_urut,
                    desc: this.body.desc,
                    aspek_detail_nama: aspek_detail_nama,
                }, { transaction: t })

                let soal_id = dataSave.id || null;
                let kode_soal = dataSave.kode_soal || null;
                let pilihanJawaban = this.body.pilihanJawaban;
                for (const [index, item] of pilihanJawaban.entries()) {
                    // console.log(index,item);
                    const dataSavePilihanJawaban = await studi_v2_banksoal_soal_pilihanjawaban.create({
                        kode_jawaban: this.body.kode_jawaban || uuidv4(),
                        jawaban: item.jawaban,
                        skor: item.skor,
                        kode_soal: kode_soal,
                        studi_v2_banksoal_soal_id: soal_id,
                    }, { transaction: t })

                }
                await t.commit();
            } catch (error) {

                // If the execution reaches this line, an error was thrown.
                // We rollback the transaction.
                await t.rollback();

            }



            return "Data berhasil disimpan"
        } catch (error: any) {
            console.log(error.message);
        }
    }
    soalUpdate = async () => {
        try {
            const dataUpdate = await studi_v2_banksoal_soal.findOne({ where: { id: this.params.soal_id, deleted_at: null } });

            const get_aspek_detail = await studi_v2_banksoal_aspek_detail.findOne({
                where: { id: this.params.aspek_detail_id, deleted_at: null },
                // include: [{ model: db_studi_v2.studi_v2_banksoal_aspek, attributes: ['id', 'nama'], where: { deleted_at: null } }]
            })

            const aspek_detail_nama = get_aspek_detail.nama;
            const t = await sequelize_studi_v2.transaction();
            try {

                dataUpdate.set({
                    pertanyaan: this.body.pertanyaan,
                    kode: this.body.kode || null,
                    nomer_urut: this.body.nomer_urut,
                    desc: this.body.desc,
                    aspek_detail_nama: aspek_detail_nama,
                    updated_at: moment().format(),
                }, { transaction: t });

                await dataUpdate.save();
                let soal_id = dataUpdate.id || null;
                let kode_soal = dataUpdate.kode_soal || null;
                let pilihanJawaban = this.body.pilihanJawaban;


                const get_pilihanjawaban = await studi_v2_banksoal_soal_pilihanjawaban.findAll({ where: { studi_v2_banksoal_soal_id: soal_id, deleted_at: null } });
                for (const [db_index, db_item] of get_pilihanjawaban.entries()) {
                    let db_item_id = db_item.id;
                    let dataDitemukan: number = 0;
                    for (const [index, item] of pilihanJawaban.entries()) {
                        if (db_item_id === item.id) {
                            dataDitemukan++;
                        }
                    }
                    if (dataDitemukan < 1) {
                        const dataDeleted = await studi_v2_banksoal_soal_pilihanjawaban.destroy({ where: { id: db_item_id, deleted_at: null } }, { transaction: t });
                    }
                }


                for (const [index, item] of pilihanJawaban.entries()) {
                    if (item.id) {
                        const get_pilihanjawaban = await studi_v2_banksoal_soal_pilihanjawaban.findOne({ where: { id: item.id, deleted_at: null } });
                        console.log('====================================');
                        console.log(get_pilihanjawaban, item, item.id);
                        console.log('====================================');
                        get_pilihanjawaban.set({
                            jawaban: item.jawaban,
                            skor: item.skor,
                            updated_at: moment().format(),
                        }, { transaction: t });
                        await get_pilihanjawaban.save();
                    } else {
                        const dataSavePilihanJawaban = await studi_v2_banksoal_soal_pilihanjawaban.create({
                            studi_v2_banksoal_aspek_detail_id: this.body.studi_v2_banksoal_aspek_detail_id,
                            kode_jawaban: this.body.kode_jawaban || uuidv4(),
                            jawaban: item.jawaban,
                            skor: item.skor,
                            kode_soal: kode_soal,
                            studi_v2_banksoal_soal_id: soal_id,
                        }, { transaction: t })
                    }

                }

                await t.commit();
            } catch (error) {

                // If the execution reaches this line, an error was thrown.
                // We rollback the transaction.
                await t.rollback();

            }

            return dataUpdate
            // return "Data berhasil disimpan"
        } catch (error: any) {
            console.log(error.message);
        }
    }

    soalDelete = async () => {
        try {
            const t = await sequelize_studi_v2.transaction();
            try {

                const dataDeleted_pilihanjawaban = await studi_v2_banksoal_soal_pilihanjawaban.destroy({ where: { studi_v2_banksoal_soal_id: this.params.soal_id, deleted_at: null } }, { transaction: t });
                const dataDeleted = await studi_v2_banksoal_soal.destroy({ where: { id: this.params.soal_id, deleted_at: null } }, { transaction: t });
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
    }
    //!SOAL-END

    importSoalPeriksa = async () => {
        try {
            const response = await studi_v2_banksoal_soal.findOne(
                { where: { kode_soal: this.params.kode_soal } },
            );

            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
}

export default studiv2BanksoalService;