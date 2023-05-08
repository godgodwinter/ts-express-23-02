
import db from "../../models";
import { sequelize_studi_v2 } from '../../models/index';
import { db_studi_v2 } from "../../models";
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import redisProsesService from "../studiv2/redis/redis.studiv2.proses.service";
import redisClient from '../../helpers/babengRedis';
import { fn_get_sisa_waktu } from "../../helpers/babengUjian";

const moment = require('moment');
const localization = require('moment/locale/id')
moment.updateLocale("id", localization);

const { siswa, kelas, sekolah, paket } = db;

class siswaDataSiswaService {
    meId: number;
    body: Request['body'];
    params: Request['params'];
    req: Request;
    default_ex: number;

    constructor(req: Request) {
        this.meId = req.app.locals.meId;
        this.body = req.body;
        this.params = req.params;
        this.req = req;
        this.default_ex = process.env.REDIS_LIMIT_IN_SEC ? parseInt(process.env.REDIS_LIMIT_IN_SEC) : 10;
    }


    get_deteksimasalah_persiswa = async (siswa_id: number) => {
        try {
            return siswa_id;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    get_deteksimasalah_perkelas = async (kelas_id: number) => {
        try {
            return kelas_id;
        } catch (error: any) {
            console.log(error.message);
        }
    }
}

export default siswaDataSiswaService;