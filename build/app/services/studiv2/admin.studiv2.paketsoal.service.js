"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../models/index");
const models_1 = require("../../models");
const uuid_1 = require("uuid");
const moment = require('moment');
const localization = require('moment/locale/id');
moment.updateLocale("id", localization);
const { studi_v2_paketsoal, studi_v2_paketsoal_aspek, studi_v2_paketsoal_aspek_detail, studi_v2_paketsoal_aspek_penilaian, studi_v2_paketsoal_soal, studi_v2_proses_aspek_detail_soal_pilihan_jawaban, studi_v2_paketsoal_pilihanjawaban, studi_v2_banksoal_soal, studi_v2_banksoal_soal_pilihanjawaban, } = models_1.db_studi_v2;
class studiv2PaketsoalService {
    constructor(req) {
        //! PAKETSOAL
        this.paketsoalGetAll = async () => {
            try {
                const response = await studi_v2_paketsoal.findAll();
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.paketsoalStore = async () => {
            try {
                const dataSave = await studi_v2_paketsoal.create({
                    nama: this.body.nama,
                    tgl: moment().format(),
                    users_tipe: "admin",
                    users_id: this.meId,
                    created_at: moment().format(),
                    updated_at: moment().format(),
                });
                return dataSave;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.paketsoalEdit = async () => {
            try {
                const response = await studi_v2_paketsoal.findOne({ where: { id: this.params.paketsoal_id } });
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.paketsoalUpdate = async () => {
            try {
                const dataUpdate = await studi_v2_paketsoal.findOne({ where: { id: this.params.paketsoal_id, deleted_at: null } });
                dataUpdate.set({
                    nama: this.body.nama,
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
        this.paketsoalDelete = async () => {
            try {
                const t = await index_1.sequelize_studi_v2.transaction();
                try {
                    const getAspek_id = await studi_v2_paketsoal_aspek.findAll({ where: { studi_v2_paketsoal_id: this.params.paketsoal_id, deleted_at: null } });
                    if (getAspek_id) {
                        for (const [index, item] of getAspek_id.entries()) {
                            const dataDeletedPenilaian = await studi_v2_paketsoal_aspek_penilaian.destroy({ where: { studi_v2_paketsoal_aspek_id: getAspek_id[index].id, deleted_at: null } }, { transaction: t });
                        }
                    }
                    const dataDeletedAspekDetail = await studi_v2_paketsoal_aspek_detail.destroy({ where: { studi_v2_paketsoal_id: this.params.paketsoal_id, deleted_at: null } }, { transaction: t });
                    const dataDeletedAspek = await studi_v2_paketsoal_aspek.destroy({ where: { studi_v2_paketsoal_id: this.params.paketsoal_id, deleted_at: null } }, { transaction: t });
                    const dataDeleted = await studi_v2_paketsoal.destroy({ where: { id: this.params.paketsoal_id, deleted_at: null } }, { transaction: t });
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
        //! PAKETSOAL-END
        // !ASPEK
        this.aspekGetAll = async () => {
            try {
                const response = await studi_v2_paketsoal_aspek.findAll({
                    where: { studi_v2_paketsoal_id: this.params.paketsoal_id },
                    // include: [{ model: db_studi_v2.studi_v2_paketsoal_aspek_penilaian, attributes: ['id', 'pertanyaan'], where: { deleted_at: null } }]
                });
                for (const [index, item] of response.entries()) {
                    let getPenilaian = await models_1.db_studi_v2.studi_v2_paketsoal_aspek_penilaian.count({ where: { studi_v2_paketsoal_aspek_id: item.id, deleted_at: null } });
                    response[index].setDataValue("mapel_jml", getPenilaian);
                }
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.aspekStore = async () => {
            try {
                const dataUpdate = await studi_v2_paketsoal_aspek.findOne({ where: { studi_v2_paketsoal_id: this.params.paketsoal_id, studi_v2_banksoal_aspek_id: this.body.studi_v2_banksoal_aspek_id, deleted_at: null } });
                if (dataUpdate) {
                    dataUpdate.set({
                        nama: this.body.nama,
                        urutan: this.body.urutan,
                        tipe: this.body.tipe || 'Sendiri',
                        studi_v2_paketsoal_id: this.params.paketsoal_id,
                        studi_v2_banksoal_aspek_id: this.body.studi_v2_banksoal_aspek_id,
                        updated_at: moment().format(),
                    });
                    // As above, the database still has "formUpdate" and "green"
                    await dataUpdate.save();
                    return dataUpdate;
                }
                else {
                    const dataSave = await studi_v2_paketsoal_aspek.create({
                        nama: this.body.nama,
                        urutan: this.body.urutan,
                        studi_v2_paketsoal_id: this.params.paketsoal_id,
                        studi_v2_banksoal_aspek_id: this.body.studi_v2_banksoal_aspek_id,
                        tipe: this.body.tipe || 'Sendiri',
                        created_at: moment().format(),
                        updated_at: moment().format(),
                    });
                    return dataSave;
                }
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.aspekEdit = async () => {
            try {
                const response = await studi_v2_paketsoal_aspek.findOne({ where: { id: this.params.aspek_id } });
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.aspekUpdate = async () => {
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
                return dataUpdate;
                // return "Data berhasil disimpan"
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.aspekDelete = async () => {
            try {
                const dataDeletedPenilaian = await studi_v2_paketsoal_aspek_penilaian.destroy({ where: { studi_v2_paketsoal_aspek_id: this.params.aspek_id, deleted_at: null } });
                const dataDeleted = await studi_v2_paketsoal_aspek.destroy({ where: { id: this.params.aspek_id, deleted_at: null } });
                return dataDeleted;
                // return "Data berhasil disimpan"
            }
            catch (error) {
                console.log(error.message);
            }
        };
        // !ASPEK-END
        // !PENILAIAN
        this.penilaianGet = async () => {
            try {
                const response = await studi_v2_paketsoal_aspek.findAll({
                    where: { studi_v2_paketsoal_id: this.params.paketsoal_id, deleted_at: null }
                    // include: [{ model: db_studi_v2.studi_v2_banksoal_soal, attributes: ['id', 'pertanyaan'], where: { deleted_at: null } }]
                });
                for (const [index, item] of response.entries()) {
                    let getPenilaian = await studi_v2_paketsoal_aspek_penilaian.findAll({ where: { studi_v2_paketsoal_aspek_id: item.id, deleted_at: null } });
                    response[index].setDataValue("penilaian", getPenilaian);
                }
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.penilaianGetPerAspek = async () => {
            var _a, _b;
            try {
                const response = await studi_v2_paketsoal_aspek.findOne({
                    where: { id: this.params.aspek_id, deleted_at: null }
                    // include: [{ model: db_studi_v2.studi_v2_banksoal_soal, attributes: ['id', 'pertanyaan'], where: { deleted_at: null } }]
                });
                if (response) {
                    let getPenilaian = await studi_v2_paketsoal_aspek_penilaian.findAll({
                        where: { studi_v2_paketsoal_aspek_id: this.params.aspek_id, deleted_at: null },
                        include: [
                            { model: models_1.db_studi_v2.studi_v2_paketsoal_aspek, attributes: ['id', 'nama'], where: { deleted_at: null } },
                            { model: models_1.db_studi_v2.studi_v2_paketsoal_aspek_detail, attributes: ['id', 'nama'], where: { deleted_at: null } }
                        ]
                    });
                    for (const [index, item] of getPenilaian.entries()) {
                        getPenilaian[index].setDataValue("aspek_nama", (_a = item.studi_v2_paketsoal_aspek) === null || _a === void 0 ? void 0 : _a.nama);
                        getPenilaian[index].setDataValue("aspek_detail_nama", (_b = item.studi_v2_paketsoal_aspek_detail) === null || _b === void 0 ? void 0 : _b.nama);
                        // getPenilaian[index].setDataValue("status", item.status)
                    }
                    response.setDataValue("penilaian", getPenilaian);
                }
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.penilaianStore = async () => {
            try {
                const dataUpdate = await studi_v2_paketsoal_aspek_penilaian.findOne({ where: { studi_v2_paketsoal_id: this.params.paketsoal_id, studi_v2_paketsoal_aspek_id: this.body.studi_v2_paketsoal_aspek_id, studi_v2_paketsoal_aspek_detail_id: this.body.studi_v2_paketsoal_aspek_detail_id, deleted_at: null } });
                if (dataUpdate) {
                    dataUpdate.set({
                        status: this.body.status,
                        updated_at: moment().format(),
                    });
                    // As above, the database still has "formUpdate" and "green"
                    await dataUpdate.save();
                    return dataUpdate;
                }
                else {
                    const dataSave = await studi_v2_paketsoal_aspek_penilaian.create({
                        studi_v2_paketsoal_aspek_id: this.body.studi_v2_paketsoal_aspek_id,
                        studi_v2_paketsoal_aspek_detail_id: this.body.studi_v2_paketsoal_aspek_detail_id,
                        status: this.body.status,
                        studi_v2_paketsoal_id: this.params.paketsoal_id,
                        created_at: moment().format(),
                        updated_at: moment().format(),
                    });
                    return dataSave;
                }
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.penilaianDelete = async () => {
            try {
                const dataDeleted = await studi_v2_paketsoal_aspek_penilaian.destroy({ where: { id: this.params.penilaian_id, deleted_at: null } });
                return dataDeleted;
                // return "Data berhasil disimpan"
            }
            catch (error) {
                console.log(error.message);
            }
        };
        // !PENILAIAN-END
        // !ASPEK_DETAIL
        this.aspek_detailGetAll = async () => {
            try {
                const response = await studi_v2_paketsoal_aspek_detail.findAll({ where: { studi_v2_paketsoal_id: this.params.paketsoal_id } });
                for (const [index, item] of response.entries()) {
                    let getJml = await studi_v2_paketsoal_soal.count({ where: { studi_v2_paketsoal_aspek_detail_id: item.id, deleted_at: null } });
                    response[index].setDataValue("soal_jml", getJml);
                }
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.aspek_detailStore = async () => {
            try {
                const dataUpdate = await studi_v2_paketsoal_aspek_detail.findOne({ where: { studi_v2_paketsoal_id: this.params.paketsoal_id, studi_v2_banksoal_aspek_detail_id: this.body.studi_v2_banksoal_aspek_detail_id, deleted_at: null } });
                if (dataUpdate) {
                    dataUpdate.set({
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
                        updated_at: moment().format(),
                    });
                    // As above, the database still has "formUpdate" and "green"
                    await dataUpdate.save();
                    return dataUpdate;
                }
                else {
                    const dataSave = await studi_v2_paketsoal_aspek_detail.create({
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
                        studi_v2_banksoal_aspek_detail_id: this.body.studi_v2_banksoal_aspek_detail_id,
                        studi_v2_paketsoal_id: this.params.paketsoal_id,
                        created_at: moment().format(),
                        updated_at: moment().format(),
                    });
                    return dataSave;
                }
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.aspek_detailEdit = async () => {
            try {
                const response = await studi_v2_paketsoal_aspek_detail.findOne({ where: { id: this.params.aspek_detail_id } });
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.aspek_detailUpdate = async () => {
            try {
                const dataUpdate = await studi_v2_paketsoal_aspek_detail.findOne({ where: { id: this.params.aspek_detail_id, deleted_at: null } });
                dataUpdate.set({
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
                    studi_v2_banksoal_aspek_detail_id: this.body.studi_v2_banksoal_aspek_detail_id,
                    studi_v2_paketsoal_id: this.params.paketsoal_id,
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
                const dataDeleted = await studi_v2_paketsoal_aspek_detail.destroy({ where: { id: this.params.aspek_detail_id, deleted_at: null } });
                return dataDeleted;
                // return "Data berhasil disimpan"
            }
            catch (error) {
                console.log(error.message);
            }
        };
        // !ASPEK_DETAIL-END
        // !SOAL
        this.soalGetAll = async () => {
            try {
                const response = await studi_v2_paketsoal_soal.findAll({
                    where: { studi_v2_paketsoal_aspek_detail_id: this.params.aspek_detail_id, deleted_at: null },
                    // include: [{ model: db_studi_v2.studi_v2_paketsoal_aspek_penilaian, attributes: ['id', 'pertanyaan'], where: { deleted_at: null } }]
                });
                for (const [index, item] of response.entries()) {
                    let getPJ_jml = await models_1.db_studi_v2.studi_v2_paketsoal_pilihanjawaban.count({ where: { studi_v2_paketsoal_soal_id: item.id, deleted_at: null } });
                    response[index].setDataValue("pilihanjawaban_jml", getPJ_jml);
                }
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.soalStore = async () => {
            try {
                let listSoal = this.body.listId;
                for (const [index, item] of listSoal.entries()) {
                    const dataUpdate = await studi_v2_paketsoal_soal.findOne({
                        where: {
                            studi_v2_paketsoal_aspek_detail_id: this.params.aspek_detail_id,
                            studi_v2_banksoal_soal_id: item,
                            deleted_at: null
                        }
                    });
                    if (dataUpdate) {
                    }
                    else {
                        const t = await index_1.sequelize_studi_v2.transaction();
                        try {
                            // !insert get banksoal soal
                            const getBanksoalSoal = await studi_v2_banksoal_soal.findOne({
                                where: {
                                    id: item,
                                    deleted_at: null
                                }
                            });
                            // !insert paketsoal soal
                            const dataSave = await studi_v2_paketsoal_soal.create({
                                studi_v2_paketsoal_aspek_detail_id: this.params.aspek_detail_id,
                                studi_v2_banksoal_soal_id: item,
                                pertanyaan: getBanksoalSoal.pertanyaan,
                                kode: getBanksoalSoal.kode || null,
                                kode_soal: getBanksoalSoal.kode_soal,
                                nomer_urut: getBanksoalSoal.nomer_urut,
                                desc: getBanksoalSoal.desc,
                                created_at: moment().format(),
                                updated_at: moment().format(),
                            }, { transaction: t });
                            // !insert get banksoal pilihanjawaban where banksoal soal_id
                            const getBanksoalPilihanjawaban = await studi_v2_banksoal_soal_pilihanjawaban.findAll({
                                where: {
                                    studi_v2_banksoal_soal_id: item,
                                    deleted_at: null
                                }
                            });
                            // !insert paketsoal pilihanjawaban where paketsoal soal id and banksoal pilihanjwaban
                            for (const [index, itemPilihanjawaban] of getBanksoalPilihanjawaban.entries()) {
                                const dataSavePilihanjawaban = await studi_v2_paketsoal_pilihanjawaban.create({
                                    kode_jawaban: itemPilihanjawaban.kode_jawaban,
                                    jawaban: itemPilihanjawaban.jawaban,
                                    skor: itemPilihanjawaban.skor,
                                    kode_soal: itemPilihanjawaban.kode_soal,
                                    studi_v2_banksoal_soal_pilihanjawaban_id: itemPilihanjawaban.id,
                                    studi_v2_paketsoal_soal_id: dataSave.id,
                                    created_at: moment().format(),
                                    updated_at: moment().format(),
                                }, { transaction: t });
                            }
                            await t.commit();
                        }
                        catch (error) {
                            // If the execution reaches this line, an error was thrown.
                            // We rollback the transaction.
                            await t.rollback();
                        }
                    }
                }
                return "Data berhasil ditambahkan";
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.soalDelete = async () => {
            try {
                const dataDeletedPilihanjawaban = await studi_v2_paketsoal_pilihanjawaban.destroy({ where: { studi_v2_paketsoal_soal_id: this.params.soal_id, deleted_at: null } });
                const dataDeleted = await studi_v2_paketsoal_soal.destroy({ where: { id: this.params.soal_id, deleted_at: null } });
                return dataDeleted;
                // return "Data berhasil disimpan"
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
exports.default = studiv2PaketsoalService;
