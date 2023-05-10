"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchToDos = void 0;
const redis = __importStar(require("redis"));
// REDIS INITIALITATION
const redisClient = redis.createClient({ url: process.env.REDIS_URL, password: process.env.REDIS_PASSWORD });
(async () => {
    redisClient.on("error", (error) => console.error(`Ups : ${error}`));
    await redisClient.connect();
})();
// REDIS
// // * Updated code WITH REDIS
async function fetchToDos(completed) {
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
    }
    catch (error) {
        console.error('Something happened to Redis', error);
    }
}
exports.fetchToDos = fetchToDos;
exports.default = redisClient;
