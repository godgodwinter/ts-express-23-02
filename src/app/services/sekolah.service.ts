
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

    getSekolahAll = async () => {
        try {
            const paketDefault = await this.getPaketDefault();
            const response = await sekolah.findAll({
                where: { deleted_at: null },
                include: [
                    {
                        model: db.paket,
                    }
                ]
            });
            for (let i: number = 0; i < response.length; i++) {
                response[i].setDataValue("paket_nama", response[i].paket ? response[i]?.paket?.nama : paketDefault.nama)
            }

            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }

    Edit = async () => {
        try {
            const paketDefault = await this.getPaketDefault();
            const response = await sekolah.findOne(
                { where: { id: this.params.sekolah_id } },
                {
                    include: [
                        {
                            model: db.paket,
                        }
                    ]
                });
            response.setDataValue("paket_nama", response.paket ? response?.paket?.nama : paketDefault.nama)

            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }

    getPaketDefault = async () => {
        try {
            const response = await paket.findOne();
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
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