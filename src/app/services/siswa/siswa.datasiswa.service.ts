
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

const { siswa, kelas, sekolah, paket,
    masterdeteksi,
    siswadetail, apiprobk, apiprobk_deteksi, apiprobk_deteksi_list
} = db;

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
            let result = [];
            let get_deteksi = await this.fn_deteksimasalah_service(siswa_id);
            result.push(get_deteksi);
            if (get_deteksi) {
                return result
            } else {
                return null
            }
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

    fn_deteksimasalah_service = async (siswa_id: number) => {
        try {
            let result: {
                siswa: any,
                apiprobk: any,
                deteksimasalah: any,
            } = {
                siswa: null,
                apiprobk: null,
                deteksimasalah: null,
            }
            const siswa = await this.fn_siswa_profile(siswa_id);
            result.siswa = siswa;
            result.apiprobk = await this.fn_siswa_apiprobk(siswa_id);
            result.deteksimasalah = await this.fn_siswa_deteksimasalah(siswa_id);
            if (siswa) {
                return result
            } else {
                return null
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }

    fn_siswa_profile = async (siswa_id: number) => {
        try {
            const response = await siswa.scope('withoutPass').findOne({
                where: { id: siswa_id, deleted_at: null },
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


    fn_siswa_apiprobk = async (siswa_id: number) => {
        try {
            const response = await siswadetail.findOne({
                where: {
                    siswa_id: siswa_id, deleted_at: null
                },
                include: [
                    { model: db.apiprobk, attributes: ['id', 'username'], where: { deleted_at: null } },
                ],
            });
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    fn_siswa_deteksimasalah = async (apiprobk_id: number) => {
        try {
            const response = await apiprobk_deteksi.findOne({
                where: {
                    apiprobk_id: apiprobk_id, deleted_at: null
                },
                include: [
                    { model: db.apiprobk_deteksi_list, where: { deleted_at: null } },
                ],
            });
            // let index_remove = [];
            const data_result = [];
            for (const [index_deteksi, data_deteksi] of response.apiprobk_deteksi_list.entries()) {
                const data_positif = await masterdeteksi.findOne({
                    where: {
                        nama: data_deteksi.deteksi_nama, deleted_at: null
                    }
                })
                if (data_positif?.positif) {
                    data_deteksi.setDataValue('positif_score', (99 - data_deteksi.deteksi_score));
                    data_deteksi.setDataValue('positif', data_positif.positif);
                    data_result.push(data_deteksi);
                }
            }
            response.setDataValue("apiprobk_deteksi_list", data_result)
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
}

export default siswaDataSiswaService;