
import {db_studi_v2} from "../../models";
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

const moment = require('moment');
const localization = require('moment/locale/id')
moment.updateLocale("id", localization);

const { studi_v2_banksoal_aspek,studi_v2_banksoal_aspek_detail } = db_studi_v2;
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
                kode:this.body.kode||uuidv4(),
                desc:this.body.desc,
                urutan: this.body.urutan,
                waktu:this.body.waktu,
                instruksi:this.body.instruksi,
                instruksi_status:this.body.instruksi_status,
                lembar_prasoal:this.body.lembar_prasoal,
                lembar_prasoal_status:this.body.lembar_prasoal_status,
                instruksi_pengerjaan:this.body.instruksi_pengerjaan,
                instruksi_pengerjaan_status:this.body.instruksi_pengerjaan_status,
                random_soal:this.body.random_soal,
                random_pilihanjawaban:this.body.random_pilihanjawaban,
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
                desc:this.body.desc,
                urutan: this.body.urutan,
                waktu:this.body.waktu,
                instruksi:this.body.instruksi,
                instruksi_status:this.body.instruksi_status,
                lembar_prasoal:this.body.lembar_prasoal,
                lembar_prasoal_status:this.body.lembar_prasoal_status,
                instruksi_pengerjaan:this.body.instruksi_pengerjaan,
                instruksi_pengerjaan_status:this.body.instruksi_pengerjaan_status,
                random_soal:this.body.random_soal,
                random_pilihanjawaban:this.body.random_pilihanjawaban,
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

}

export default studiv2BanksoalService;