
import db from "../../models";
import { Request, Response } from 'express';
// const Siswa = db.siswa;

// const DB: any = db;
const { siswa, kelas, sekolah, paket } = db;
// export const getSiswa = async (req:Request, res:Response) => {
//         try {
//             const response = await Siswa.findAll({ offset: 0, limit: 10, include: kelas });
//             return response;
//         } catch (error:any) {
//             console.log(error.message);
//         }
// };
class siswaProfileService {
    meId: number;
    body: Request['body'];
    params: Request['params'];

    constructor(req: Request) {
        this.meId = req.app.locals.meId;
        this.body = req.body;
        this.params = req.params;
    }

    siswaProfileku = async () => {
        try {
            const response = await siswa.scope('withoutPass').findOne({
                where: { id: this.meId, deleted_at: null },
                include: [
                    { model: db.kelas, attributes: ['id', 'nama'], where: { deleted_at: null } },
                    { model: db.sekolah, attributes: ['id', 'nama'], where: { deleted_at: null } },
                ],
            });
            response.setDataValue("kelas_nama", response?.kelas?.nama)
            response.setDataValue("sekolah_nama", response?.sekolah?.nama)

            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }

}

export default siswaProfileService;