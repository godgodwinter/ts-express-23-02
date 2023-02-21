import { sequelize_studi_v2 } from '../../models/index';

import { db_studi_v2 } from "../../models";
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Sequelize } from "sequelize";
import siswaService from '../mastering/siswa.v2.service';

const moment = require('moment');
const localization = require('moment/locale/id')
moment.updateLocale("id", localization);

const { studi_v2_paketsoal, studi_v2_paketsoal_aspek, studi_v2_paketsoal_aspek_detail, studi_v2_paketsoal_aspek_penilaian, studi_v2_paketsoal_soal, studi_v2_proses_aspek_detail_soal_pilihan_jawaban,
    studi_v2_paketsoal_pilihanjawaban,
    studi_v2_banksoal_soal, studi_v2_banksoal_soal_pilihanjawaban,
} = db_studi_v2;
class studiv2ProsesService {

    meId: number;
    body: Request['body'];
    params: Request['params'];
    req: Request;

    constructor(req: Request) {
        this.meId = req.app.locals.meId;
        this.body = req.body;
        this.params = req.params;
        this.req = req;
    }

    //! PERSISWA
    prosesGetSiswa = async (siswa_id: number) => {
        try {
            const siswa_Service: siswaService = new siswaService(this.req);
            const response = await siswa_Service.siswaGetWhereId(siswa_id);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }

    //! PERSISWA

    //! PERKELAS
    prosesGetSiswaPerKelas = async (kelas_id: number) => {
        try {
            const siswa_Service: siswaService = new siswaService(this.req);
            const response = await siswa_Service.siswaGetWhereKelas(kelas_id);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    // !PERKELAS-END

}

export default studiv2ProsesService;