
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
const { studi_v2_paketsoal, studi_v2_paketsoal_aspek, studi_v2_paketsoal_aspek_detail, studi_v2_paketsoal_aspek_penilaian, studi_v2_paketsoal_soal,
    studi_v2_paketsoal_pilihanjawaban,
    studi_v2_banksoal_soal, studi_v2_banksoal_soal_pilihanjawaban,
    studi_v2_proses, studi_v2_proses_aspek_detail, studi_v2_proses_aspek_detail_soal, studi_v2_proses_aspek_detail_soal_pilihan_jawaban
} = db_studi_v2;

class siswaUjianstudiService {
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


    getProses = async () => {
        try {
            const get_studi_v2_proses = await studi_v2_proses.findOne({
                where: {
                    siswa_id: this.meId,
                    tgl_ujian: {
                        [Op.gt]: moment().format(),
                        // [Op.lt]: moment().format(),
                    }, deleted_at: null
                },

            });


            return get_studi_v2_proses;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    getAspekDetail = async (proses_id: number) => {
        try {
            // const get_studi_v2_proses_aspek_detail = await studi_v2_proses_aspek_detail.findAll({ where: { studi_v2_proses_id: proses_id, deleted_at: null } })
            // for (const [index_mapel, mapel] of get_studi_v2_proses_aspek_detail.entries()) {
            //     const get_soal = await studi_v2_proses_aspek_detail_soal.scope('lessData').findAll({ where: { studi_v2_proses_aspek_detail_id: mapel.id, deleted_at: null } })

            //     for (const [index_soal, soal] of get_soal.entries()) {
            //         const get_pj = await studi_v2_proses_aspek_detail_soal_pilihan_jawaban.scope('lessData').findAll({ where: { studi_v2_proses_aspek_detail_soal_id: soal.id, deleted_at: null } })
            //         get_soal[index_soal].setDataValue("pilihanjawaban", get_pj);
            //     }

            //     get_studi_v2_proses_aspek_detail[index_mapel].setDataValue("soal", get_soal)

            // }
            // return get_studi_v2_proses_aspek_detail;

            const service: redisProsesService = new redisProsesService(this.req);
            // return this.params.siswa_id;
            const datas = await service.proses_siswa_get(this.meId);
            return datas
        } catch (error: any) {
            console.log(error.message);
        }
    }

    doMulai = async () => {
        try {
            const get_aspek_detail = await studi_v2_proses_aspek_detail.findOne({ where: { id: this.params.aspek_detail_id, deleted_at: null } })
            get_aspek_detail.set({
                tgl_mulai: this.body.tgl_mulai,
                tgl_selesai: this.body.tgl_selesai,
                status: "Aktif",
                updated_at: moment().format(),
            });
            // As above, the database still has "formUpdate" and "green"
            await get_aspek_detail.save();
            // !update jawaban pada redis
            const aspekdetail_index = this.body.aspekdetail_index;
            const cacheKey = `STUDIV2_PROSES_SISWA_ID_${this.meId}`;
            const cachedResult = await redisClient.get(cacheKey);
            if (cachedResult) {
                const result = JSON.parse(cachedResult);
                result[aspekdetail_index].tgl_mulai = this.body.tgl_mulai;
                result[aspekdetail_index].tgl_selesai = this.body.tgl_selesai;
                result[aspekdetail_index].status = 'Aktif';
                const delRedis = await redisClient.del(cacheKey);
                const saveAgain = await redisClient.set(
                    cacheKey,
                    JSON.stringify(result),
                    { EX: this.default_ex } // Set the specified expire time, in seconds. 86400=1HARI ,604800=7HARI
                ); // 👈 updated code
            }
            return get_aspek_detail
        } catch (error: any) {
            console.log(error.message);
        }
    }
    doFinish = async () => {
        try {
            const get_aspek_detail = await studi_v2_proses_aspek_detail.findOne({ where: { id: this.params.aspek_detail_id, deleted_at: null } })
            get_aspek_detail.set({
                tgl_selesai: moment().format(),
                updated_at: moment().format(),
            });
            // As above, the database still has "formUpdate" and "green"
            await get_aspek_detail.save();

            // !update jawaban pada redis
            const aspekdetail_index = this.body.aspekdetail_index;
            const cacheKey = `STUDIV2_PROSES_SISWA_ID_${this.meId}`;
            const cachedResult = await redisClient.get(cacheKey);
            if (cachedResult) {
                const result = JSON.parse(cachedResult);
                result[aspekdetail_index].tgl_selesai = moment().format();
                const delRedis = await redisClient.del(cacheKey);
                const saveAgain = await redisClient.set(
                    cacheKey,
                    JSON.stringify(result),
                    { EX: this.default_ex } // Set the specified expire time, in seconds. 86400=1HARI ,604800=7HARI
                ); // 👈 updated code
            }
            return get_aspek_detail
        } catch (error: any) {
            console.log(error.message);
        }
    }
    doJawab = async () => {
        // const delRedis = await redisClient.del(cacheKey);
        const soal_index = this.body.soal_index;
        const aspekdetail_index = this.body.aspekdetail_index;
        try {
            const get_soal = await studi_v2_proses_aspek_detail_soal.findOne({ where: { id: this.params.soal_id, deleted_at: null } })
            let skor = 0;
            let status_jawaban = "Salah";
            // !periksajawaban
            const periksaJawaban = await studi_v2_paketsoal_pilihanjawaban.findOne({ where: { kode_jawaban: this.body.kode_jawaban, deleted_at: null } })
            if (periksaJawaban?.skor) {
                skor = periksaJawaban.skor;
                if (periksaJawaban.skor > 0) {
                    status_jawaban = "Benar";
                }
            }

            get_soal.set({
                kode_jawaban: this.body.kode_jawaban,
                skor,
                status_jawaban,
                updated_at: moment().format(),
            });
            // As above, the database still has "formUpdate" and "green"
            await get_soal.save();
            // !update jawaban pada redis
            const cacheKey = `STUDIV2_PROSES_SISWA_ID_${this.meId}`;
            const cachedResult = await redisClient.get(cacheKey);
            if (cachedResult) {
                const result = JSON.parse(cachedResult);
                result[aspekdetail_index].soal[soal_index].kode_jawaban = this.body.kode_jawaban
                const delRedis = await redisClient.del(cacheKey);
                const saveAgain = await redisClient.set(
                    cacheKey,
                    JSON.stringify(result),
                    { EX: this.default_ex } // Set the specified expire time, in seconds. 86400=1HARI ,604800=7HARI
                ); // 👈 updated code
            }

            return { periksaJawaban, skor, status_jawaban }
        } catch (error: any) {
            console.log(error.message);
        }
    }


    // !ujianstudiv3

    periksaUjianAktif = async (proses_id: number) => {
        try {

            const service: redisProsesService = new redisProsesService(this.req);
            // return this.params.siswa_id;
            // ambil data dari redis
            const datas = await service.proses_siswa_get(this.meId);
            // periksa data. jika ada masukkan kdalam array aspekdetail
            const aspek_detail = [];

            for (const [index, data] of datas.entries()) {
                // delete data.soal;
                // aspek_detail.push(data);
                let sisa_waktu: number = 0;
                let sisa_waktu_dalam_menit: number = 0;
                let getSisaWaktu = await fn_get_sisa_waktu(data.tgl_selesai);
                sisa_waktu = getSisaWaktu ? getSisaWaktu.detik : 0;
                sisa_waktu_dalam_menit = getSisaWaktu ? getSisaWaktu.menit : 0;
                if (sisa_waktu > 0) {
                    data.sisa_waktu = sisa_waktu;
                    data.sisa_waktu_dalam_menit = sisa_waktu_dalam_menit;
                    return data
                }
                // !periksa 
                // jika sisa waktu >0 return data
            }
            return null
            // return aspek_detail
        } catch (error: any) {
            console.log(error.message);
        }
    }
    get_aspekdetail_tersedia = async (proses_id: number) => {
        try {

            const service: redisProsesService = new redisProsesService(this.req);
            // return this.params.siswa_id;
            // ambil data dari redis
            const datas = await service.proses_siswa_get(this.meId);
            // periksa data. jika ada masukkan kdalam array aspekdetail
            const aspek_detail = [];

            for (const [index, data] of datas.entries()) {
                data.soal_jml = data.soal.length;
                delete data.soal;
                aspek_detail.push(data);
            }
            return aspek_detail
        } catch (error: any) {
            console.log(error.message);
        }
    }
    getAspekDetail_detail = async (studi_v2_proses_aspek_detail_id: number) => {
        try {

            const service: redisProsesService = new redisProsesService(this.req);
            // return this.params.siswa_id;
            // ambil data dari redis
            const datas = await service.proses_siswa_get(this.meId);
            // periksa data. jika ada masukkan kdalam array aspekdetail
            const aspek_detail = [];

            for (const [index, data] of datas.entries()) {
                data.soal_jml = data.soal.length;
                delete data.soal;
                if (data.id === studi_v2_proses_aspek_detail_id) {
                    return data
                }
            }
            return null
        } catch (error: any) {
            console.log(error.message);
        }
    }
    getSoal_perAspekdetail = async (studi_v2_proses_aspek_detail_id: number) => {
        try {

            const service: redisProsesService = new redisProsesService(this.req);
            // return this.params.siswa_id;
            // ambil data dari redis
            const datas = await service.proses_siswa_get(this.meId);
            // periksa data. jika ada masukkan kdalam array aspekdetail
            const aspek_detail = [];

            for (const [index, data] of datas.entries()) {
                if (data.id === studi_v2_proses_aspek_detail_id) {
                    return data.soal
                }
            }
            return null
        } catch (error: any) {
            console.log(error.message);
        }
    }
    getSoal_perSoal = async (studi_v2_proses_aspek_detail_id: number, studi_v2_proses_aspek_detail_soal_id: number) => {
        try {

            const service: redisProsesService = new redisProsesService(this.req);
            // return this.params.siswa_id;
            // ambil data dari redis
            const datas = await service.proses_siswa_get(this.meId);
            // periksa data. jika ada masukkan kdalam array aspekdetail
            const aspek_detail = [];

            for (const [index, data] of datas.entries()) {
                if (data.id === studi_v2_proses_aspek_detail_id) {
                    // return data.soal
                    for (const [index_soal, soal] of data.soal.entries()) {
                        if (soal.id === studi_v2_proses_aspek_detail_soal_id) {
                            return soal
                        }
                    }
                }
            }
            return null
        } catch (error: any) {
            console.log(error.message);
        }
    }
    v3_doMulai = async (studi_v2_proses_aspek_detail_id: number) => {
        try {
            const get_aspek_detail = await studi_v2_proses_aspek_detail.findOne({ where: { id: studi_v2_proses_aspek_detail_id, deleted_at: null } })
            // if (get_aspek_detail) {
            //     if (get_aspek_detail.tgl_mulai) {
            //         return "paket sudah dimulai"
            //     }
            // }
            // return get_aspek_detail;
            get_aspek_detail.set({
                tgl_mulai: this.body.tgl_mulai,
                tgl_selesai: this.body.tgl_selesai,
                status: "Aktif",
                updated_at: moment().format(),
            });
            // As above, the database still has "formUpdate" and "green"
            await get_aspek_detail.save();
            // !update jawaban pada redis
            // const aspekdetail_index = this.body.aspekdetail_index;

            const service: redisProsesService = new redisProsesService(this.req);
            const datas = await service.proses_siswa_get(this.meId);

            let aspekdetail_index: null | number = null;
            for (const [index, data] of datas.entries()) {
                if (data.id === studi_v2_proses_aspek_detail_id) {
                    aspekdetail_index = index;
                }
            }
            if (aspekdetail_index !== null) {
                const cacheKey = `STUDIV2_PROSES_SISWA_ID_${this.meId}`;
                const cachedResult = await redisClient.get(cacheKey);
                if (cachedResult) {
                    const result = JSON.parse(cachedResult);
                    result[aspekdetail_index].tgl_mulai = this.body.tgl_mulai;
                    result[aspekdetail_index].tgl_selesai = this.body.tgl_selesai;
                    result[aspekdetail_index].status = 'Aktif';
                    const delRedis = await redisClient.del(cacheKey);
                    const saveAgain = await redisClient.set(
                        cacheKey,
                        JSON.stringify(result),
                        { EX: this.default_ex } // Set the specified expire time, in seconds. 86400=1HARI ,604800=7HARI
                    ); // 👈 updated code
                }
                // return "berhasil di update"
            }
            return get_aspek_detail
            // return this.meId
            // return aspekdetail_index
        } catch (error: any) {
            console.log(error.message);
        }
    }
    v3_doJawab = async (studi_v2_proses_aspek_detail_id: number, studi_v2_proses_aspek_detail_soal_id: number) => {
        // const delRedis = await redisClient.del(cacheKey);
        // const soal_index = this.body.soal_index;
        // const aspekdetail_index = this.body.aspekdetail_index;
        const service: redisProsesService = new redisProsesService(this.req);
        const datas = await service.proses_siswa_get(this.meId);

        let aspekdetail_index: null | number = null;
        let soal_index: null | number = null;
        for (const [index, data] of datas.entries()) {
            if (data.id === studi_v2_proses_aspek_detail_id) {
                aspekdetail_index = index;

                for (const [index_soal, data_soal] of data.soal.entries()) {
                    if (data_soal.id === studi_v2_proses_aspek_detail_soal_id) {
                        soal_index = index_soal;
                    }
                }
            }
        }
        if (aspekdetail_index !== null && soal_index !== null) {
            try {
                const get_soal = await studi_v2_proses_aspek_detail_soal.findOne({ where: { id: studi_v2_proses_aspek_detail_soal_id, deleted_at: null } })
                let skor = 0;
                let status_jawaban = "Salah";
                // !periksajawaban
                const periksaJawaban = await studi_v2_paketsoal_pilihanjawaban.findOne({ where: { kode_jawaban: this.body.kode_jawaban, deleted_at: null } })
                if (periksaJawaban?.skor) {
                    skor = periksaJawaban.skor;
                    if (periksaJawaban.skor > 0) {
                        status_jawaban = "Benar";
                    }
                }

                get_soal.set({
                    kode_jawaban: this.body.kode_jawaban,
                    skor,
                    status_jawaban,
                    updated_at: moment().format(),
                });
                // As above, the database still has "formUpdate" and "green"
                await get_soal.save();
                // !update jawaban pada redis
                const cacheKey = `STUDIV2_PROSES_SISWA_ID_${this.meId}`;
                const cachedResult = await redisClient.get(cacheKey);
                if (cachedResult) {
                    const result = JSON.parse(cachedResult);
                    result[aspekdetail_index].soal[soal_index].kode_jawaban = this.body.kode_jawaban
                    const delRedis = await redisClient.del(cacheKey);
                    const saveAgain = await redisClient.set(
                        cacheKey,
                        JSON.stringify(result),
                        { EX: this.default_ex } // Set the specified expire time, in seconds. 86400=1HARI ,604800=7HARI
                    ); // 👈 updated code
                }

                return { periksaJawaban, skor, status_jawaban }
            } catch (error: any) {
                console.log(error.message);
            }
        }
        return null
    }
    v3_doFinish = async (studi_v2_proses_aspek_detail_id: number) => {
        try {
            const get_aspek_detail = await studi_v2_proses_aspek_detail.findOne({ where: { id: studi_v2_proses_aspek_detail_id, deleted_at: null } })
            get_aspek_detail.set({
                tgl_selesai: moment().format(),
                updated_at: moment().format(),
            });
            // As above, the database still has "formUpdate" and "green"
            await get_aspek_detail.save();

            // !update jawaban pada redis
            // const aspekdetail_index = this.body.aspekdetail_index;
            const service: redisProsesService = new redisProsesService(this.req);
            const datas = await service.proses_siswa_get(this.meId);

            let aspekdetail_index: null | number = null;
            for (const [index, data] of datas.entries()) {
                if (data.id === studi_v2_proses_aspek_detail_id) {
                    aspekdetail_index = index;
                }
            }
            if (aspekdetail_index !== null) {
                const cacheKey = `STUDIV2_PROSES_SISWA_ID_${this.meId}`;
                const cachedResult = await redisClient.get(cacheKey);
                if (cachedResult) {
                    const result = JSON.parse(cachedResult);
                    result[aspekdetail_index].tgl_selesai = moment().format();
                    const delRedis = await redisClient.del(cacheKey);
                    const saveAgain = await redisClient.set(
                        cacheKey,
                        JSON.stringify(result),
                        { EX: this.default_ex } // Set the specified expire time, in seconds. 86400=1HARI ,604800=7HARI
                    ); // 👈 updated code
                }
                return get_aspek_detail
            }
        } catch (error: any) {
            console.log(error.message);
        }
        return null
    }

    // !ujianstudiv3

}

export default siswaUjianstudiService;