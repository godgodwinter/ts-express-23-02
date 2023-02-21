
import db from "../../models";
import { Request, Response } from 'express';

const { siswa, kelas, sekolah, paket } = db;
class sekolahService {

    body: Request['body'];
    params: Request['params'];

    constructor(req: Request) {
        this.body = req.body;
        this.params = req.params;
    }

    sekolahGetAll = async () => {
        try {
            const response = await sekolah.findAll({
                where: { deleted_at: null }
            });

            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }

    sekolahGetWhereId = async (sekolah_id: number) => {
        try {
            const response = await sekolah.findOne({
                where: { id: sekolah_id, deleted_at: null }
            });
            const getKelas = await kelas.findAll({ where: { sekolah_id, deleted_at: null } })
            response.setDataValue("kelas", getKelas)

            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }


}

export default sekolahService;