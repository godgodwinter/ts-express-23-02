import { sequelize_studi_v2 } from '../../models/index';

import { db_studi_v2 } from "../../models";
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Sequelize } from "sequelize";

const moment = require('moment');
const localization = require('moment/locale/id')
moment.updateLocale("id", localization);

const { studi_v2_paketsoal } = db_studi_v2;
class studiv2PaketsoalService {

    meId: number;
    body: Request['body'];
    params: Request['params'];

    constructor(req: Request) {
        this.meId = req.app.locals.meId;
        this.body = req.body;
        this.params = req.params;
    }

    //!ASPEK
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

}

export default studiv2PaketsoalService;