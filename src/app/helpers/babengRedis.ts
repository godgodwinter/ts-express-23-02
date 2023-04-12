import * as redis from 'redis';
// REDIS INITIALITATION
const redisClient = redis.createClient({ url: process.env.REDIS_URL, password: process.env.REDIS_PASSWORD });
(async () => {
    redisClient.on("error", (error) => console.error(`Ups : ${error}`));
    await redisClient.connect();
})();
// REDIS

// // * Updated code WITH REDIS
export async function fetchToDos(completed: any) {
    const cacheKey = `TODOS_C_${completed}`;

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

export default redisClient;