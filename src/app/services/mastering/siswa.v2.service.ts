
import db from "../../models";
import { Request, Response } from 'express';

const { siswa, kelas, sekolah, paket } = db;
class siswaService {

    body: Request['body'];
    params: Request['params'];

    constructor(req: Request) {
        this.body = req.body;
        this.params = req.params;
    }

    siswaGetWhereKelas = async (kelas_id: number) => {
        try {
            const response = await siswa.findAll({
                where: { kelas_id, deleted_at: null }
            });

            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }


}

export default siswaService;