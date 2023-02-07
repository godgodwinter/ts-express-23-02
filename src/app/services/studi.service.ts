
import db from "../models";
import { Request, Response } from 'express';
const { siswa, kelas, ujian_proses_kelas, ujian_paketsoal } = db;
class StudiService {
    meId: number;
    body: Request['body'];
    params: Request['params'];

    constructor(req: Request) {
        this.meId = req.app.locals.meId;
        this.body = req.body;
        this.params = req.params;
    }

    // * SERVICE
    getDataUjian = async () => {
        console.log('====================================');
        console.log(this.meId);
        console.log('====================================');
        const me: any = await this.fn_get_me(this.meId)
        let dataUjian: {} = {};

        const response = await ujian_proses_kelas.findAll({ where: { kelas_id: me?.kelas?.id }, include: [db.ujian_proses] });
        dataUjian = response;
        let data = [];
        for (const tempData of response) {
            tempData.setDataValue("tgl", tempData?.ujian_proses?.tgl)
            tempData.setDataValue("ujian_proses_status", tempData?.ujian_proses?.status);
            const paketsoal = await ujian_paketsoal.findOne({ where: { id: tempData.paketsoal_id } });
            tempData.setDataValue("nama", paketsoal?.nama)
            data.push(tempData)
        }
        return data;
    }
    // * SERVICE-END

    // * FUNGSI
    fn_get_me = async (meId: number): Promise<Response | undefined> => {
        try {
            const response = await siswa.findOne({ where: { id: meId }, include: kelas });
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    // * FUNGSI-END

}

export default StudiService;