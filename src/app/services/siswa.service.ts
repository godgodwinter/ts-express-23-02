
import db from "../models";
import { Request, Response } from 'express';
// const Siswa = db.siswa;

// const DB: any = db;
const { siswa, kelas } = db;
// export const getSiswa = async (req:Request, res:Response) => {
//         try {
//             const response = await Siswa.findAll({ offset: 0, limit: 10, include: kelas });
//             return response;
//         } catch (error:any) {
//             console.log(error.message);
//         }
// };
class siswaService {
    credential: {
        id: number,
    };

    body: Request['body'];
    params: Request['params'];

    constructor(req: Request) {
        this.credential = req.app.locals.credential;
        this.body = req.body;
        this.params = req.params;
    }

    getAll = async () => {
        // console.log('====================================');
        // console.log(DB.siswa.findAll(),this.body);
        // console.log('====================================');
        const datas = await siswa.scope('withoutPass').findAll({ offset: 0, limit: 10, include: kelas });

        return datas;
    }

}

export default siswaService;