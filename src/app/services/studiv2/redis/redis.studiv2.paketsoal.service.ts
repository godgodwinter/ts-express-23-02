

import { Request } from 'express';
import redisClient from '../../../helpers/babengRedis';

class redisPaketsoalService {
    body: Request['body'];
    params: Request['params'];

    constructor(req: Request) {
        this.body = req.body;
        this.params = req.params;
    }

    //!ASPEK
    testing = async () => {
        const cacheKey = `TODOS_C_false`;
        // First attempt to retrieve data from the cache
        try {
            const cachedResult = await redisClient.get(cacheKey);
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
        } catch (error) {
            console.error('Something happened to Redis', error);
        }
    }

}

export default redisPaketsoalService;