

import { Request } from 'express';
import axios from "axios";
import redisClient from '../../../helpers/babengRedis';
import { db_studi_v2 } from "../../../models";
import { Sequelize } from "sequelize";
import siswaService from '../../mastering/siswa.v2.service';

const { studi_v2_paketsoal, studi_v2_paketsoal_aspek, studi_v2_paketsoal_aspek_detail, studi_v2_paketsoal_aspek_penilaian, studi_v2_paketsoal_soal, studi_v2_proses_aspek_detail_soal_pilihan_jawaban,
    studi_v2_paketsoal_pilihanjawaban,
    studi_v2_banksoal_soal, studi_v2_banksoal_soal_pilihanjawaban,
    studi_v2_proses_aspek_detail, studi_v2_proses, studi_v2_proses_aspek_detail_soal
} = db_studi_v2;
class redisProsesService {
    body: Request['body'];
    params: Request['params'];
    default_ex: number;
    req: Request;

    constructor(req: Request) {
        this.body = req.body;
        this.params = req.params;
        this.default_ex = process.env.REDIS_LIMIT_IN_SEC ? parseInt(process.env.REDIS_LIMIT_IN_SEC) : 10;
        this.req = req;
    }
    // ! PAKETSOAL ASPEK

    // mapel
    proses_siswa_get = async (siswa_id: number) => {
        const cacheKey = `STUDIV2_PROSES_SISWA_ID_${siswa_id}`;
        try {
            const cachedResult = await redisClient.get(cacheKey);
            if (cachedResult) {
                console.log('Data aspek_detail from cache.');
                const result = JSON.parse(cachedResult);
                // //! REDIS-DELETE
                // const delRedis = await redisClient.del(cacheKey);
                return result;
                // return cachedResult;
            }
        } catch (error) {
            console.error('Something happened to Redis', error);
        }
        return null
        return `get proses ${siswa_id}`;
    }
    proses_siswa_delete = async (siswa_id: number) => {
        const cacheKey = `STUDIV2_PROSES_SISWA_ID_${siswa_id}`;
        try {
            const cachedResult = await redisClient.get(cacheKey);
            if (cachedResult) {
                console.log('Data aspek_detail from cache.');
                // //! REDIS-DELETE
                const delRedis = await redisClient.del(cacheKey);
                return 'data berhasil dihapus'
                // return cachedResult;
            }
        } catch (error) {
            console.error('Something happened to Redis', error);
        }
        return 'data tidak ditemukan'
        // return `get proses ${siswa_id}`;
    }
    proses_siswa_store = async (siswa_id: number) => {
        const cacheKey = `STUDIV2_PROSES_SISWA_ID_${siswa_id}`;
        // First attempt to retrieve data from the cache
        // try {
        //     const cachedResult = await redisClient.get(cacheKey);
        //     if (cachedResult) {
        //         console.log('Data aspek_detail from cache.');
        //         const result = JSON.parse(cachedResult);
        //         // //! REDIS-DELETE
        //         // const delRedis = await redisClient.del(cacheKey);
        //         return result;
        //         // return cachedResult;
        //     }
        // } catch (error) {
        //     console.error('Something happened to Redis', error);
        // }
        const delRedis = await redisClient.del(cacheKey);
        // jika pada redis belum ada maka fetch data
        // !call service get Data per paket
        // get AspekDetail
        let response = null;
        const getProses = await studi_v2_proses.findOne({ where: { siswa_id: siswa_id, deleted_at: null } })
        if (getProses) {
            const get_studi_v2_proses_aspek_detail = await studi_v2_proses_aspek_detail.findAll({ where: { studi_v2_proses_id: getProses.id, deleted_at: null } })
            for (const [index_mapel, mapel] of get_studi_v2_proses_aspek_detail.entries()) {
                const get_soal = await studi_v2_proses_aspek_detail_soal.scope('lessData').findAll({ where: { studi_v2_proses_aspek_detail_id: mapel.id, deleted_at: null } })

                for (const [index_soal, soal] of get_soal.entries()) {

                    let get_pj = [{
                        id: null, pertanyaan: "", kode_soal: null, kode_jawaban: null, status_jawaban: null, skor: 0, studi_v2_proses_aspek_detail_id: 0, studi_v2_paketsoal_soal_id: 0
                    }];
                    if (mapel.random_soal === "Aktif") {
                        // getSoal = await studi_v2_paketsoal_soal.findAll({ where: { studi_v2_paketsoal_aspek_detail_id: mapel.id }, order: [Sequelize.literal('RAND()')] })
                        get_pj = await studi_v2_paketsoal_pilihanjawaban.scope('lessData').findAll({ where: { kode_soal: soal.kode_soal, studi_v2_paketsoal_soal_id: soal.studi_v2_paketsoal_soal_id, deleted_at: null }, order: [Sequelize.literal('RAND()')] })
                        get_soal[index_soal].setDataValue("pilihanjawaban", get_pj);
                    } else {
                        // getSoal = await studi_v2_paketsoal_soal.findAll({ where: { studi_v2_paketsoal_aspek_detail_id: mapel.id } })
                        get_pj = await studi_v2_paketsoal_pilihanjawaban.scope('lessData').findAll({ where: { kode_soal: soal.kode_soal, studi_v2_paketsoal_soal_id: soal.studi_v2_paketsoal_soal_id, deleted_at: null } })
                        get_soal[index_soal].setDataValue("pilihanjawaban", get_pj);
                    }

                }

                get_studi_v2_proses_aspek_detail[index_mapel].setDataValue("soal", get_soal)

            }
            // return get_studi_v2_proses_aspek_detail;
            response = get_studi_v2_proses_aspek_detail;
        }
        if (response) {
            try {
                await redisClient.set(
                    cacheKey,
                    JSON.stringify(response),
                    { EX: this.default_ex } // Set the specified expire time, in seconds. 86400=1HARI ,604800=7HARI
                ); // 👈 updated code
            } catch (error) {
                console.error('Something happened to Redis', error);
            }
        }
        console.log('Data requested from mysql.', this.default_ex);
        return response;
        return `store proses ${siswa_id}`;
    }

    proses_kelas_store = async (kelas_id: number) => {
        const siswa_Service: siswaService = new siswaService(this.req);
        const response = await siswa_Service.siswaGetWhereKelas(kelas_id);
        for (const [index, item] of response.entries()) {
            const do_store_persiswa = await this.proses_siswa_store(item.id)
        }
        return kelas_id
    }
    proses_kelas_delete = async (kelas_id: number) => {
        const siswa_Service: siswaService = new siswaService(this.req);
        const response = await siswa_Service.siswaGetWhereKelas(kelas_id);
        for (const [index, item] of response.entries()) {
            const do_store_persiswa = await this.proses_siswa_delete(item.id)
        }
        return kelas_id
    }

}

export default redisProsesService;