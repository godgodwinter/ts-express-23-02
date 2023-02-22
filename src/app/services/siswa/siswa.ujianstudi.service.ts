
import db from "../../models";
import { sequelize_studi_v2 } from '../../models/index';
import { db_studi_v2 } from "../../models";
import { Request, Response } from 'express';
const moment = require('moment');
const localization = require('moment/locale/id')
moment.updateLocale("id", localization);

const { siswa, kelas, sekolah, paket } = db;
const { studi_v2_paketsoal, studi_v2_paketsoal_aspek, studi_v2_paketsoal_aspek_detail, studi_v2_paketsoal_aspek_penilaian, studi_v2_paketsoal_soal,
    studi_v2_paketsoal_pilihanjawaban,
    studi_v2_banksoal_soal, studi_v2_banksoal_soal_pilihanjawaban,
    studi_v2_proses, studi_v2_proses_aspek_detail, studi_v2_proses_aspek_detail_soal, studi_v2_proses_aspek_detail_soal_pilihan_jawaban
} = db_studi_v2;

class siswaUjianstudiService {
    meId: number;
    body: Request['body'];
    params: Request['params'];

    constructor(req: Request) {
        this.meId = req.app.locals.meId;
        this.body = req.body;
        this.params = req.params;
    }


    getProses = async () => {
        try {
            const get_studi_v2_proses = await studi_v2_proses.findOne({
                where: { siswa_id: this.meId, deleted_at: null },
            });


            return get_studi_v2_proses;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    getAspekDetail = async (proses_id: number) => {
        try {
            const get_studi_v2_proses_aspek_detail = await studi_v2_proses_aspek_detail.findAll({ where: { studi_v2_proses_id: proses_id, deleted_at: null } })
            for (const [index_mapel, mapel] of get_studi_v2_proses_aspek_detail.entries()) {
                const get_soal = await studi_v2_proses_aspek_detail_soal.scope('lessData').findAll({ where: { studi_v2_proses_aspek_detail_id: mapel.id, deleted_at: null } })

                for (const [index_soal, soal] of get_soal.entries()) {
                    const get_pj = await studi_v2_proses_aspek_detail_soal_pilihan_jawaban.scope('lessData').findAll({ where: { studi_v2_proses_aspek_detail_soal_id: soal.id, deleted_at: null } })
                    get_soal[index_soal].setDataValue("pilihanjawaban", get_pj);
                }

                get_studi_v2_proses_aspek_detail[index_mapel].setDataValue("soal", get_soal)

            }
            return get_studi_v2_proses_aspek_detail;
        } catch (error: any) {
            console.log(error.message);
        }
    }

}

export default siswaUjianstudiService;