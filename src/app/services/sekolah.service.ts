
import db from "../models";
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
class sekolahService {

    body: Request['body'];
    params: Request['params'];

    constructor(req: Request) {
        this.body = req.body;
        this.params = req.params;
    }

    getPaket = async (sekolah_id: number) => {
        try {
            const response = await paket.findOne({ where: { id: sekolah_id } });
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }

}

export default sekolahService;