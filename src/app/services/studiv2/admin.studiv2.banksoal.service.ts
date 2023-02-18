
import {db_studi_v2} from "../../models";
import { Request } from 'express';

const moment = require('moment');
const localization = require('moment/locale/id')
moment.updateLocale("id", localization);

const { studi_v2_banksoal_aspek } = db_studi_v2;
class studiv2BanksoalService {

    body: Request['body'];
    params: Request['params'];

    constructor(req: Request) {
        this.body = req.body;
        this.params = req.params;
    }

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
              }, { fields: ['nama','urutan'] });

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
                urutan: this.body.urutan||null,
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

}

export default studiv2BanksoalService;