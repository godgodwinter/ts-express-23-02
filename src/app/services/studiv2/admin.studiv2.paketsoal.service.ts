import { sequelize_studi_v2 } from '../../models/index';

import { db_studi_v2 } from "../../models";
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Sequelize } from "sequelize";

const moment = require('moment');
const localization = require('moment/locale/id')
moment.updateLocale("id", localization);

const { studi_v2_paketsoal, studi_v2_paketsoal_aspek, studi_v2_paketsoal_aspek_detail, studi_v2_paketsoal_aspek_penilaian, studi_v2_paketsoal_soal, studi_v2_proses_aspek_detail_soal_pilihan_jawaban } = db_studi_v2;
class studiv2PaketsoalService {

    meId: number;
    body: Request['body'];
    params: Request['params'];

    constructor(req: Request) {
        this.meId = req.app.locals.meId;
        this.body = req.body;
        this.params = req.params;
    }

    //! PAKETSOAL
    paketsoalGetAll = async () => {
        try {
            const response = await studi_v2_paketsoal.findAll();
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    paketsoalStore = async () => {
        try {
            const dataSave = await studi_v2_paketsoal.create({
                nama: this.body.nama,
                tgl: moment().format(),
                users_tipe: "admin",
                users_id: this.meId,
                created_at: moment().format(),
                updated_at: moment().format(),
            });

            return dataSave
        } catch (error: any) {
            console.log(error.message);
        }
    }
    paketsoalEdit = async () => {
        try {
            const response = await studi_v2_paketsoal.findOne(
                { where: { id: this.params.paketsoal_id } },
            );

            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    paketsoalUpdate = async () => {
        try {
            const dataUpdate = await studi_v2_paketsoal.findOne({ where: { id: this.params.paketsoal_id, deleted_at: null } });
            dataUpdate.set({
                nama: this.body.nama,
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

    paketsoalDelete = async () => {
        try {
            const dataDeleted = await studi_v2_paketsoal.destroy({ where: { id: this.params.paketsoal_id, deleted_at: null } });
            return dataDeleted
            // return "Data berhasil disimpan"
        } catch (error: any) {
            console.log(error.message);
        }
    }
    //! PAKETSOAL-END

    // !ASPEK
    aspekGetAll = async () => {
        try {
            const response = await studi_v2_paketsoal_aspek.findAll({ where: { studi_v2_paketsoal_id: this.params.paketsoal_id } });
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    aspekStore = async () => {
        try {
            const dataUpdate = await studi_v2_paketsoal_aspek.findOne({ where: { studi_v2_paketsoal_id: this.params.paketsoal_id, studi_v2_banksoal_aspek_id: this.body.studi_v2_banksoal_aspek_id, deleted_at: null } });
            if (dataUpdate) {
                dataUpdate.set({
                    nama: this.body.nama,
                    urutan: this.body.urutan,
                    studi_v2_paketsoal_id: this.params.paketsoal_id,
                    studi_v2_banksoal_aspek_id: this.body.studi_v2_banksoal_aspek_id,
                    updated_at: moment().format(),
                });
                // As above, the database still has "formUpdate" and "green"
                await dataUpdate.save();
                return dataUpdate
            } else {
                const dataSave = await studi_v2_paketsoal_aspek.create({
                    nama: this.body.nama,
                    urutan: this.body.urutan,
                    studi_v2_paketsoal_id: this.params.paketsoal_id,
                    studi_v2_banksoal_aspek_id: this.body.studi_v2_banksoal_aspek_id,
                    created_at: moment().format(),
                    updated_at: moment().format(),
                });
                return dataSave
            }

        } catch (error: any) {
            console.log(error.message);
        }
    }
    aspekEdit = async () => {
        try {
            const response = await studi_v2_paketsoal_aspek.findOne(
                { where: { id: this.params.aspek_id } },
            );

            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    aspekUpdate = async () => {
        try {
            const dataUpdate = await studi_v2_paketsoal_aspek.findOne({ where: { id: this.params.aspek_id, deleted_at: null } });
            dataUpdate.set({
                nama: this.body.nama,
                urutan: this.body.urutan,
                studi_v2_paketsoal_id: this.params.paketsoal_id,
                studi_v2_banksoal_aspek_id: this.body.studi_v2_banksoal_aspek_id,
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
            const dataDeleted = await studi_v2_paketsoal_aspek.destroy({ where: { id: this.params.aspek_id, deleted_at: null } });
            return dataDeleted
            // return "Data berhasil disimpan"
        } catch (error: any) {
            console.log(error.message);
        }
    }
    // !ASPEK-END


    // !ASPEK_DETAIL
    aspek_detailGetAll = async () => {
        try {
            const response = await studi_v2_paketsoal_aspek_detail.findAll({ where: { studi_v2_paketsoal_id: this.params.paketsoal_id } });
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    aspek_detailStore = async () => {
        try {
            const dataUpdate = await studi_v2_paketsoal_aspek_detail.findOne({ where: { studi_v2_paketsoal_id: this.params.paketsoal_id, studi_v2_banksoal_aspek_detail_id: this.body.studi_v2_banksoal_aspek_detail_id, deleted_at: null } });
            if (dataUpdate) {
                dataUpdate.set({
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
                    updated_at: moment().format(),
                });
                // As above, the database still has "formUpdate" and "green"
                await dataUpdate.save();
                return dataUpdate
            } else {
                const dataSave = await studi_v2_paketsoal_aspek_detail.create({
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
                    studi_v2_banksoal_aspek_detail_id: this.body.studi_v2_banksoal_aspek_detail_id,
                    studi_v2_paketsoal_id: this.params.paketsoal_id,
                    created_at: moment().format(),
                    updated_at: moment().format(),
                });

                return dataSave
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }
    aspek_detailEdit = async () => {
        try {
            const response = await studi_v2_paketsoal_aspek_detail.findOne(
                { where: { id: this.params.aspek_detail_id } },
            );

            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    aspek_detailUpdate = async () => {
        try {
            const dataUpdate = await studi_v2_paketsoal_aspek_detail.findOne({ where: { id: this.params.aspek_detail_id, deleted_at: null } });
            dataUpdate.set({
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
                studi_v2_banksoal_aspek_detail_id: this.body.studi_v2_banksoal_aspek_detail_id,
                studi_v2_paketsoal_id: this.params.paketsoal_id,
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
            const dataDeleted = await studi_v2_paketsoal_aspek_detail.destroy({ where: { id: this.params.aspek_detail_id, deleted_at: null } });
            return dataDeleted
            // return "Data berhasil disimpan"
        } catch (error: any) {
            console.log(error.message);
        }
    }
    // !ASPEK_DETAIL-END
    // !PENILAIAN
    penilaianGet = async () => {
        try {
            const response = await studi_v2_paketsoal_aspek.findAll({
                where: { studi_v2_paketsoal_id: this.params.paketsoal_id, deleted_at: null }
                // include: [{ model: db_studi_v2.studi_v2_banksoal_soal, attributes: ['id', 'pertanyaan'], where: { deleted_at: null } }]
            });
            for (const [index, item] of response.entries()) {
                let getPenilaian = await studi_v2_paketsoal_aspek_penilaian.findAll({ where: { studi_v2_paketsoal_aspek_id: item.id, deleted_at: null } })
                response[index].setDataValue("penilaian", getPenilaian)
            }
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    penilaianGetPerAspek = async () => {
        try {
            const response = await studi_v2_paketsoal_aspek.findOne({
                where: { id: this.params.aspek_id, deleted_at: null }
                // include: [{ model: db_studi_v2.studi_v2_banksoal_soal, attributes: ['id', 'pertanyaan'], where: { deleted_at: null } }]
            });
            let getPenilaian = await studi_v2_paketsoal_aspek_penilaian.findAll({ where: { studi_v2_paketsoal_aspek_id: this.params.aspek_id, deleted_at: null } })
            response.setDataValue("penilaian", getPenilaian)
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }

    penilaianStore = async () => {
        try {
            const dataSave = await studi_v2_paketsoal_aspek_penilaian.create({
                studi_v2_paketsoal_aspek_id: this.body.studi_v2_paketsoal_aspek_id,
                studi_v2_paketsoal_aspek_detail_id: this.body.studi_v2_paketsoal_aspek_detail_id,
                status: this.body.status,
                studi_v2_paketsoal_id: this.params.paketsoal_id,
                created_at: moment().format(),
                updated_at: moment().format(),
            });

            return dataSave
        } catch (error: any) {
            console.log(error.message);
        }
    }
    penilaianDelete = async () => {
        try {
            const dataDeleted = await studi_v2_paketsoal_aspek_penilaian.destroy({ where: { id: this.params.penilaian_id, deleted_at: null } });
            return dataDeleted
            // return "Data berhasil disimpan"
        } catch (error: any) {
            console.log(error.message);
        }
    }
    // !PENILAIAN-END

}

export default studiv2PaketsoalService;