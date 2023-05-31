
import db from "../../models";
import { Request, Response } from 'express';

const { siswa, kelas, sekolah, paket } = db;
class kelasService {

    body: Request['body'];
    params: Request['params'];

    constructor(req: Request) {
        this.body = req.body;
        this.params = req.params;
    }

    kelasGetWhereSekolah = async (sekolah_id: number) => {
        try {
            const response = await kelas.findAll({
                where: { sekolah_id, deleted_at: null }
            });
            for (const [index, item] of response.entries()) {
                const getJmlSiswa = await siswa.count({ where: { kelas_id: item.id, deleted_at: null } })
                item.setDataValue("siswa_jml", getJmlSiswa);
            }
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    kelasGetWhereId = async (kelas_id: number) => {
        try {
            const response = await kelas.findOne({
                where: { id: kelas_id, deleted_at: null }
            });

            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }


}

export default kelasService;