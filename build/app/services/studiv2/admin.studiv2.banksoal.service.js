"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../../models/index");
const models_1 = require("../../models");
const uuid_1 = require("uuid");
const moment = require('moment');
const localization = require('moment/locale/id');
moment.updateLocale("id", localization);
const { studi_v2_banksoal_aspek, studi_v2_banksoal_aspek_detail, studi_v2_banksoal_soal, studi_v2_banksoal_soal_pilihanjawaban } = models_1.db_studi_v2;
class studiv2BanksoalService {
    constructor(req) {
        //!ASPEK
        this.aspekGetAll = async () => {
            try {
                const response = await studi_v2_banksoal_aspek.findAll();
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.aspekEdit = async () => {
            try {
                const response = await studi_v2_banksoal_aspek.findOne({ where: { id: this.params.aspek_id } });
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.aspekStore = async () => {
            try {
                const dataSave = await studi_v2_banksoal_aspek.create({
                    nama: this.body.nama,
                    urutan: this.body.urutan
                });
                return dataSave;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.aspekUpdate = async () => {
            try {
                const dataUpdate = await studi_v2_banksoal_aspek.findOne({ where: { id: this.params.aspek_id, deleted_at: null } });
                dataUpdate.set({
                    nama: this.body.nama,
                    urutan: this.body.urutan || null,
                    updated_at: moment().format(),
                });
                // As above, the database still has "formUpdate" and "green"
                await dataUpdate.save();
                return dataUpdate;
                // return "Data berhasil disimpan"
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.aspekDelete = async () => {
            try {
                const dataDeleted = await studi_v2_banksoal_aspek.destroy({ where: { id: this.params.aspek_id, deleted_at: null } });
                return dataDeleted;
                // return "Data berhasil disimpan"
            }
            catch (error) {
                console.log(error.message);
            }
        };
        //!ASPEK-END
        //!ASPEKDETAIL //MAPEL
        this.aspek_detailGetAll = async () => {
            try {
                const response = await studi_v2_banksoal_aspek_detail.findAll({
                // include: [{ model: db_studi_v2.studi_v2_banksoal_soal, attributes: ['id', 'pertanyaan'], where: { deleted_at: null } }]
                });
                for (const [index, item] of response.entries()) {
                    let soal_jml = await studi_v2_banksoal_soal.count({ where: { studi_v2_banksoal_aspek_detail_id: item.id, deleted_at: null } });
                    response[index].setDataValue("soal_jml", soal_jml);
                }
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.aspek_detailEdit = async () => {
            try {
                const response = await studi_v2_banksoal_aspek_detail.findOne({ where: { id: this.params.aspek_detail_id } });
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.aspek_detailStore = async () => {
            try {
                const dataSave = await studi_v2_banksoal_aspek_detail.create({
                    nama: this.body.nama,
                    kode: this.body.kode || (0, uuid_1.v4)(),
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
                return dataSave;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.aspek_detailUpdate = async () => {
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
                return dataUpdate;
                // return "Data berhasil disimpan"
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.aspek_detailDelete = async () => {
            try {
                const dataDeleted = await studi_v2_banksoal_aspek_detail.destroy({ where: { id: this.params.aspek_detail_id, deleted_at: null } });
                return dataDeleted;
                // return "Data berhasil disimpan"
            }
            catch (error) {
                console.log(error.message);
            }
        };
        //!aspek_detail-END
        //!SOAL
        this.soalGetAll = async () => {
            try {
                const response = await studi_v2_banksoal_soal.findAll({ where: { studi_v2_banksoal_aspek_detail_id: this.params.aspek_detail_id, deleted_at: null } });
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.soalEdit = async () => {
            try {
                const response = await studi_v2_banksoal_soal.findOne({
                    where: { id: this.params.soal_id },
                    include: [{ model: models_1.db_studi_v2.studi_v2_banksoal_soal_pilihanjawaban, attributes: ['id', 'jawaban', 'skor', 'kode_soal', 'kode_jawaban'], where: { deleted_at: null } }]
                });
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.soalStore = async () => {
            try {
                const get_aspek_detail = await studi_v2_banksoal_aspek_detail.findOne({
                    where: { id: this.params.aspek_detail_id, deleted_at: null },
                    // include: [{ model: db_studi_v2.studi_v2_banksoal_aspek, attributes: ['id', 'nama'], where: { deleted_at: null } }]
                });
                const aspek_detail_nama = get_aspek_detail.nama;
                const t = await index_1.sequelize_studi_v2.transaction();
                try {
                    const dataSave = await studi_v2_banksoal_soal.create({
                        studi_v2_banksoal_aspek_detail_id: this.body.studi_v2_banksoal_aspek_detail_id,
                        pertanyaan: this.body.pertanyaan,
                        kode: this.body.kode || null,
                        kode_soal: this.body.kode_soal || (0, uuid_1.v4)(),
                        nomer_urut: this.body.nomer_urut,
                        desc: this.body.desc,
                        aspek_detail_nama: aspek_detail_nama,
                    }, { transaction: t });
                    let soal_id = dataSave.id || null;
                    let kode_soal = dataSave.kode_soal || null;
                    let pilihanJawaban = this.body.pilihanJawaban;
                    for (const [index, item] of pilihanJawaban.entries()) {
                        // console.log(index,item);
                        const dataSavePilihanJawaban = await studi_v2_banksoal_soal_pilihanjawaban.create({
                            kode_jawaban: this.body.kode_jawaban || (0, uuid_1.v4)(),
                            jawaban: item.jawaban,
                            skor: item.skor,
                            kode_soal: kode_soal,
                            studi_v2_banksoal_soal_id: soal_id,
                        }, { transaction: t });
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
        this.soalUpdate = async () => {
            try {
                const dataUpdate = await studi_v2_banksoal_soal.findOne({ where: { id: this.params.soal_id, deleted_at: null } });
                const get_aspek_detail = await studi_v2_banksoal_aspek_detail.findOne({
                    where: { id: this.params.aspek_detail_id, deleted_at: null },
                    // include: [{ model: db_studi_v2.studi_v2_banksoal_aspek, attributes: ['id', 'nama'], where: { deleted_at: null } }]
                });
                const aspek_detail_nama = get_aspek_detail.nama;
                const t = await index_1.sequelize_studi_v2.transaction();
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
                        let dataDitemukan = 0;
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
                        }
                        else {
                            const dataSavePilihanJawaban = await studi_v2_banksoal_soal_pilihanjawaban.create({
                                studi_v2_banksoal_aspek_detail_id: this.body.studi_v2_banksoal_aspek_detail_id,
                                kode_jawaban: this.body.kode_jawaban || (0, uuid_1.v4)(),
                                jawaban: item.jawaban,
                                skor: item.skor,
                                kode_soal: kode_soal,
                                studi_v2_banksoal_soal_id: soal_id,
                            }, { transaction: t });
                        }
                    }
                    await t.commit();
                }
                catch (error) {
                    // If the execution reaches this line, an error was thrown.
                    // We rollback the transaction.
                    await t.rollback();
                }
                return dataUpdate;
                // return "Data berhasil disimpan"
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.soalDelete = async () => {
            try {
                const t = await index_1.sequelize_studi_v2.transaction();
                try {
                    const dataDeleted_pilihanjawaban = await studi_v2_banksoal_soal_pilihanjawaban.destroy({ where: { studi_v2_banksoal_soal_id: this.params.soal_id, deleted_at: null } }, { transaction: t });
                    const dataDeleted = await studi_v2_banksoal_soal.destroy({ where: { id: this.params.soal_id, deleted_at: null } }, { transaction: t });
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
        };
        //!SOAL-END
        this.importSoalPeriksa = async () => {
            try {
                const response = await studi_v2_banksoal_soal.findOne({ where: { kode_soal: this.params.kode_soal } });
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.body = req.body;
        this.params = req.params;
    }
}
exports.default = studiv2BanksoalService;
