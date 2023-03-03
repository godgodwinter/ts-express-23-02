
import db from "../../models";
import { Request, Response } from 'express';

const { siswa, kelas, sekolah, paket, ortu } = db;
class siswaService {

    body: Request['body'];
    params: Request['params'];

    constructor(req: Request) {
        this.body = req.body;
        this.params = req.params;
    }

    siswaGetWhereId = async (id: number) => {
        try {
            const response = await siswa.findOne({
                where: { id, deleted_at: null },
                include: [{ model: sekolah }, { model: kelas }]
            });
            response.setDataValue("sekolah_nama", response?.sekolah?.nama)
            response.setDataValue("kelas_nama", response?.kelas?.nama)

            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    siswaGetWhereKelas = async (kelas_id: number) => {
        try {
            const response = await siswa.findAll({
                where: { kelas_id, deleted_at: null },
                include: [db.kelas]
            });
            for (const [index, item] of response.entries()) {
                let getDataOrtu = await ortu.findOne({ where: { siswa_id: item.id } })
                response[index].setDataValue("kelas_nama", response[index].kelas?.nama)
                response[index].setDataValue("ortu_username", getDataOrtu.username)
                response[index].setDataValue("ortu_passworddefault", getDataOrtu.passworddefault)

            }
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    siswaGetWhereKelasNoPass = async (kelas_id: number) => {
        try {
            const response = await siswa.scope('withoutPass').findAll({
                where: { kelas_id, deleted_at: null },
                include: [db.kelas]
            });
            for (const [index, item] of response.entries()) {
                let getDataOrtu = await ortu.findOne({ where: { siswa_id: item.id } })
                response[index].setDataValue("kelas_nama", response[index].kelas?.nama)

            }
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }


}

export default siswaService;