
import db from "../../models";
import { sequelize_studi_v2 } from '../../models/index';
import { db_studi_v2 } from "../../models";
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import redisProsesService from "../studiv2/redis/redis.studiv2.proses.service";
import redisClient from '../../helpers/babengRedis';
import { fn_get_sisa_waktu } from "../../helpers/babengUjian";
import { fn_deteksimasalah, fn_deteksimasalah_singkatan } from "../../helpers/babengPsikotes";

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
            let result: any = [];
            const get_siswa_perkelas = await siswa.findAll({
                where: {
                    kelas_id, deleted_at: null
                }
            })
            for (const [index_siswa, data_siswa] of get_siswa_perkelas.entries()) {
                let get_deteksi = await this.fn_deteksimasalah_service(data_siswa.id);
                result.push(get_deteksi);
            }
            // if (get_deteksi) {
            //     return result
            // } else {
            //     return null
            // }
            return result;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    get_deteksimasalah_perkelas_full = async (kelas_id: number) => {
        try {
            let result: any = [];
            const get_siswa_perkelas = await siswa.findAll({
                where: {
                    kelas_id, deleted_at: null
                }
            })
            for (const [index_siswa, data_siswa] of get_siswa_perkelas.entries()) {
                let get_deteksi = await this.fn_deteksimasalah_service_full(data_siswa.id);
                result.push(get_deteksi);
            }
            // if (get_deteksi) {
            //     return result
            // } else {
            //     return null
            // }
            return result;
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
            result.deteksimasalah = await this.fn_siswa_deteksimasalah(result.apiprobk.apiprobk_id);
            if (siswa) {
                return result
            } else {
                return null
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }
    fn_deteksimasalah_service_full = async (siswa_id: number) => {
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
            result.deteksimasalah = await this.fn_siswa_deteksimasalah_full(result.apiprobk.apiprobk_id);
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
            let jml_negatif: number = 0;
            let jml_positif: number = 0;
            let avg_negatif: number = 0;
            let avg_positif: number = 0;
            let jml_data: number = 0;
            for (const [index_deteksi, data_deteksi] of response.apiprobk_deteksi_list.entries()) {
                const data_positif = await masterdeteksi.findOne({
                    where: {
                        nama: data_deteksi.deteksi_nama, deleted_at: null
                    }
                })
                if (data_positif?.positif) {
                    let positif_score: number = (99 - data_deteksi.deteksi_score);
                    data_deteksi.setDataValue('positif_score', positif_score);
                    data_deteksi.setDataValue('positif', data_positif.positif);
                    data_deteksi.setDataValue('positif_keterangan', fn_deteksimasalah_singkatan(positif_score));

                    jml_negatif += parseInt(data_deteksi.deteksi_score);
                    jml_positif += positif_score;
                    jml_data++;
                    data_result.push(data_deteksi);
                }
            }
            avg_negatif = jml_negatif / jml_data;
            avg_positif = jml_positif / jml_data;
            response.setDataValue("avg_negatif", avg_negatif.toFixed(2))
            response.setDataValue("avg_negatif_keterangan", fn_deteksimasalah_singkatan(parseInt(avg_negatif.toFixed(2))))
            response.setDataValue("avg_negatif_keterangan_panjang", fn_deteksimasalah(parseInt(avg_negatif.toFixed(2))))
            response.setDataValue("avg_positif", avg_positif.toFixed(2))
            response.setDataValue("avg_positif_keterangan", fn_deteksimasalah_singkatan(parseInt(avg_positif.toFixed(2))))
            response.setDataValue("avg_positif_keterangan_panjang", fn_deteksimasalah(parseInt(avg_positif.toFixed(2))))
            response.setDataValue("apiprobk_deteksi_list", data_result)
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    fn_siswa_deteksimasalah_full = async (apiprobk_id: number) => {
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
            let jml_negatif: number = 0;
            let jml_positif: number = 0;
            let avg_negatif: number = 0;
            let avg_positif: number = 0;
            let jml_data: number = 0;
            for (const [index_deteksi, data_deteksi] of response.apiprobk_deteksi_list.entries()) {
                const data_positif = await masterdeteksi.findOne({
                    where: {
                        nama: data_deteksi.deteksi_nama, deleted_at: null
                    }
                })
                if (data_positif?.positif) {
                    let positif_score: number = (99 - data_deteksi.deteksi_score);
                    data_deteksi.setDataValue('positif_score', positif_score);
                    data_deteksi.setDataValue('positif', data_positif.positif);
                    data_deteksi.setDataValue('positif_keterangan', fn_deteksimasalah_singkatan(positif_score));

                    jml_negatif += parseInt(data_deteksi.deteksi_score);
                    jml_positif += positif_score;
                    jml_data++;
                    data_result.push(data_deteksi);
                } else {
                    data_deteksi.setDataValue('positif_score', 0);
                    data_deteksi.setDataValue('positif', 0);
                    data_deteksi.setDataValue('positif_keterangan', 0);
                    data_result.push(data_deteksi);
                }
            }
            avg_negatif = jml_negatif / jml_data;
            avg_positif = jml_positif / jml_data;
            response.setDataValue("avg_negatif", avg_negatif.toFixed(2))
            response.setDataValue("avg_negatif_keterangan", fn_deteksimasalah_singkatan(parseInt(avg_negatif.toFixed(2))))
            response.setDataValue("avg_negatif_keterangan_panjang", fn_deteksimasalah(parseInt(avg_negatif.toFixed(2))))
            response.setDataValue("avg_positif", avg_positif.toFixed(2))
            response.setDataValue("avg_positif_keterangan", fn_deteksimasalah_singkatan(parseInt(avg_positif.toFixed(2))))
            response.setDataValue("avg_positif_keterangan_panjang", fn_deteksimasalah(parseInt(avg_positif.toFixed(2))))
            response.setDataValue("apiprobk_deteksi_list", data_result)
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
}

export default siswaDataSiswaService;