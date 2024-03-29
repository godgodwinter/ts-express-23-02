"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const babengRedis_1 = __importDefault(require("../../../helpers/babengRedis"));
const models_1 = require("../../../models");
const { studi_v2_paketsoal, studi_v2_paketsoal_aspek, studi_v2_paketsoal_aspek_detail, studi_v2_paketsoal_aspek_penilaian, studi_v2_paketsoal_soal, studi_v2_proses_aspek_detail_soal_pilihan_jawaban, studi_v2_paketsoal_pilihanjawaban, studi_v2_banksoal_soal, studi_v2_banksoal_soal_pilihanjawaban, } = models_1.db_studi_v2;
class redisPaketsoalService {
    constructor(req) {
        // ! PAKETSOAL ASPEK
        // mapel
        this.paketsoal_aktif_get = async () => {
            const cacheKey = `STUDIV2_PAKETSOAL_aktif`;
            try {
                const cachedResult = await babengRedis_1.default.get(cacheKey);
                if (cachedResult) {
                    console.log('Data aspek_detail from cache.');
                    const result = JSON.parse(cachedResult);
                    // //! REDIS-DELETE
                    // const delRedis = await redisClient.del(cacheKey);
                    return result;
                    // return cachedResult;
                }
            }
            catch (error) {
                console.error('Something happened to Redis', error);
            }
            return null;
        };
        this.paketsoal_aktif_get_less = async () => {
            const cacheKey = `STUDIV2_PAKETSOAL_aktif`;
            try {
                const cachedResult = await babengRedis_1.default.get(cacheKey);
                if (cachedResult) {
                    console.log('Data aspek_detail from cache.');
                    const result = JSON.parse(cachedResult);
                    if (result === null || result === void 0 ? void 0 : result.aspek_detail) {
                        delete result.aspek_detail;
                    }
                    // //! REDIS-DELETE
                    // const delRedis = await redisClient.del(cacheKey);
                    return result;
                    // return cachedResult;
                }
            }
            catch (error) {
                console.error('Something happened to Redis', error);
            }
            return null;
        };
        this.paketsoal_aktif_delete = async () => {
            const cacheKey = `STUDIV2_PAKETSOAL_aktif`;
            const delRedis = await babengRedis_1.default.del(cacheKey);
            return "Data paketsoal berhasil di hapus";
        };
        this.paketsoal_aktifkan = async (paketsoal_id) => {
            const cacheKey = `STUDIV2_PAKETSOAL_aktif`;
            // First attempt to retrieve data from the cache
            const delRedis = await babengRedis_1.default.del(cacheKey);
            // jika pada redis belum ada maka fetch data
            // !call service get Data per paket
            // get AspekDetail
            const response = await studi_v2_paketsoal.findOne({ where: { id: paketsoal_id } });
            if (response) {
                // get Soal
                const getAspekDetail = await studi_v2_paketsoal_aspek_detail.findAll({ where: { studi_v2_paketsoal_id: paketsoal_id } });
                for (const [index, item] of getAspekDetail.entries()) {
                    const getSoal = await studi_v2_paketsoal_soal.findAll({ where: { studi_v2_paketsoal_aspek_detail_id: item.id } });
                    for (const [index_soal, item_soal] of getSoal.entries()) {
                        let getPilihanJawaban = await studi_v2_paketsoal_pilihanjawaban.findAll({ where: { studi_v2_paketsoal_soal_id: item_soal.id, deleted_at: null } });
                        getSoal[index_soal].setDataValue("pilihanjawaban", getPilihanJawaban);
                    }
                    getAspekDetail[index].setDataValue('soal', getSoal);
                }
                response.setDataValue('aspek_detail', getAspekDetail);
            }
            // Finally, if you got any results, save the data back to the cache
            if (response) {
                try {
                    await babengRedis_1.default.set(cacheKey, JSON.stringify(response), { EX: this.default_ex } // Set the specified expire time, in seconds. 86400=1HARI ,604800=7HARI
                    ); // 👈 updated code
                }
                catch (error) {
                    console.error('Something happened to Redis', error);
                }
            }
            console.log('Data requested from mysql.', this.default_ex);
            return response;
            return 'do_caching';
        };
        this.paketsoal_store = async (paketsoal_id) => {
            const cacheKey = `STUDIV2_PAKETSOAL_${paketsoal_id}`;
            // First attempt to retrieve data from the cache
            try {
                const cachedResult = await babengRedis_1.default.get(cacheKey);
                if (cachedResult) {
                    console.log('Data aspek_detail from cache.');
                    const result = JSON.parse(cachedResult);
                    // //! REDIS-DELETE
                    // const delRedis = await redisClient.del(cacheKey);
                    return result;
                    // return cachedResult;
                }
            }
            catch (error) {
                console.error('Something happened to Redis', error);
            }
            // jika pada redis belum ada maka fetch data
            // !call service get Data per paket
            // get AspekDetail
            const response = await studi_v2_paketsoal.findOne({ where: { id: paketsoal_id } });
            if (response) {
                // get Soal
                const getAspekDetail = await studi_v2_paketsoal_aspek_detail.findAll({ where: { studi_v2_paketsoal_id: paketsoal_id } });
                for (const [index, item] of getAspekDetail.entries()) {
                    const getSoal = await studi_v2_paketsoal_soal.findAll({ where: { studi_v2_paketsoal_aspek_detail_id: item.id } });
                    for (const [index_soal, item_soal] of getSoal.entries()) {
                        let getPilihanJawaban = await studi_v2_paketsoal_pilihanjawaban.findAll({ where: { studi_v2_paketsoal_soal_id: item_soal.id, deleted_at: null } });
                        getSoal[index_soal].setDataValue("pilihanjawaban", getPilihanJawaban);
                    }
                    getAspekDetail[index].setDataValue('soal', getSoal);
                }
                response.setDataValue('aspek_detail', getAspekDetail);
            }
            // Finally, if you got any results, save the data back to the cache
            if (response) {
                try {
                    await babengRedis_1.default.set(cacheKey, JSON.stringify(response), { EX: this.default_ex } // Set the specified expire time, in seconds. 86400=1HARI ,604800=7HARI
                    ); // 👈 updated code
                }
                catch (error) {
                    console.error('Something happened to Redis', error);
                }
            }
            console.log('Data requested from mysql.', this.default_ex);
            return response;
            return 'do_caching';
        };
        this.aspek_detail_store = async (paketsoal_aspek_detail_id) => {
            const cacheKey = `STUDIV2_PAKETSOAL_ASPEK_DETAIL_${paketsoal_aspek_detail_id}`;
            // First attempt to retrieve data from the cache
            try {
                const cachedResult = await babengRedis_1.default.get(cacheKey);
                if (cachedResult) {
                    console.log('Data aspek_detail from cache.');
                    const result = JSON.parse(cachedResult);
                    // //! REDIS-DELETE
                    // const delRedis = await redisClient.del(cacheKey);
                    return result;
                    // return cachedResult;
                }
            }
            catch (error) {
                console.error('Something happened to Redis', error);
            }
            // jika pada redis belum ada maka fetch data
            // !call service get Data per paket
            // get AspekDetail
            const response = await studi_v2_paketsoal_aspek_detail.findOne({ where: { id: paketsoal_aspek_detail_id } });
            if (response) {
                // get Soal
                const getSoal = await studi_v2_paketsoal_soal.findAll({ where: { studi_v2_paketsoal_aspek_detail_id: paketsoal_aspek_detail_id } });
                for (const [index, item] of getSoal.entries()) {
                    let getPilihanJawaban = await studi_v2_paketsoal_pilihanjawaban.findAll({ where: { studi_v2_paketsoal_soal_id: item.id, deleted_at: null } });
                    getSoal[index].setDataValue("pilihanjawaban", getPilihanJawaban);
                }
                response.setDataValue('soal', getSoal);
            }
            // Finally, if you got any results, save the data back to the cache
            if (response) {
                try {
                    await babengRedis_1.default.set(cacheKey, JSON.stringify(response), { EX: this.default_ex } // Set the specified expire time, in seconds. 86400=1HARI ,604800=7HARI
                    ); // 👈 updated code
                }
                catch (error) {
                    console.error('Something happened to Redis', error);
                }
            }
            console.log('Data requested from mysql.', this.default_ex);
            return response;
            return 'do_caching';
        };
        //!TESTING
        this.testing = async () => {
            const cacheKey = `TODOS_C_false`;
            // First attempt to retrieve data from the cache
            try {
                const cachedResult = await babengRedis_1.default.get(cacheKey);
                if (cachedResult) {
                    console.log('Data from cache.');
                    const result = JSON.parse(cachedResult);
                    //! REDIS-DELETE
                    // const delRedis = await redisClient.del(cacheKey);
                    //! REDIS-DELETE-END
                    // !REDIS-UPDATE
                    // await redisClient.set(
                    //     cacheKey,
                    //     JSON.stringify({ tes: 'apiRespons' }),
                    //     { EX: process.env.REDIS_LIMIT_IN_SEC ? parseInt(process.env.REDIS_LIMIT_IN_SEC) : 86400 } // Set the specified expire time, in seconds. 86400=1HARI ,604800=7HARI
                    // ); // 👈 upda
                    // !REDIS-UPDATE-END
                    return result;
                    // return cachedResult;
                }
            }
            catch (error) {
                console.error('Something happened to Redis', error);
            }
            // If the cache is empty or we fail reading it, default back to the API
            const apiResponse = await (0, axios_1.default)(`https://jsonplaceholder.typicode.com/todos?completed=false`);
            console.log('Data requested from the ToDo API.');
            // Finally, if you got any results, save the data back to the cache
            if (apiResponse.data.length > 0) {
                try {
                    await babengRedis_1.default.set(cacheKey, JSON.stringify(apiResponse.data), { EX: process.env.REDIS_LIMIT_IN_SEC ? parseInt(process.env.REDIS_LIMIT_IN_SEC) : 86400 } // Set the specified expire time, in seconds. 86400=1HARI ,604800=7HARI
                    ); // 👈 updated code
                }
                catch (error) {
                    console.error('Something happened to Redis', error);
                }
            }
            return apiResponse.data;
        };
        this.body = req.body;
        this.params = req.params;
        this.default_ex = process.env.REDIS_LIMIT_IN_SEC ? parseInt(process.env.REDIS_LIMIT_IN_SEC) : 10;
    }
}
exports.default = redisPaketsoalService;
