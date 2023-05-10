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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser")); //untuk menampilkan data request berbentuk json
const morgan_1 = __importDefault(require("morgan")); //untukk logger / melihat riwayat yang di konsumsi API
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const redis = __importStar(require("redis"));
const axios_1 = __importDefault(require("axios"));
// const redis = require('redis');
// import rateLimit from "express-rate-limit"
const models_1 = __importDefault(require("./app/models"));
// router
const home_router_1 = __importDefault(require("./app/routes/home.router"));
const redis_studiv2_router_1 = __importDefault(require("./app/routes/redis/redis.studiv2.router"));
const auth_router_1 = __importDefault(require("./app/routes/auth.router"));
const studi_router_1 = __importDefault(require("./app/routes/studi.router"));
const admin_mastering_sekolah_router_1 = __importDefault(require("./app/routes/admin/admin.mastering.sekolah.router"));
const admin_mastering_sekolah_router_2 = __importDefault(require("./app/routes/admin/mastering/admin.mastering.sekolah.router"));
const admin_mastering_paket_router_1 = __importDefault(require("./app/routes/admin/admin.mastering.paket.router"));
const admin_studiv2_banksoal_router_1 = __importDefault(require("./app/routes/admin/studiv2/admin.studiv2.banksoal.router"));
const admin_studiv2_paketsoal_router_1 = __importDefault(require("./app/routes/admin/studiv2/admin.studiv2.paketsoal.router"));
const admin_studiv2_proses_router_1 = __importDefault(require("./app/routes/admin/studiv2/admin.studiv2.proses.router"));
const admin_studiv2_hasil_router_1 = __importDefault(require("./app/routes/admin/studiv2/admin.studiv2.hasil.router"));
const guest_router_1 = __importDefault(require("./app/routes/tanpalogin/guest.router"));
const guest_datasiswa_router_1 = __importDefault(require("./app/routes/tanpalogin/guest.datasiswa.router"));
const studi_proses_router_1 = __importDefault(require("./app/routes/admin/studi/studi.proses.router"));
const babengLimiter_1 = require("./app/helpers/babengLimiter");
const siswa_profile_router_1 = __importDefault(require("./app/routes/siswa/siswa.profile.router"));
const siswa_ujianstudi_router_1 = __importDefault(require("./app/routes/siswa/siswa.ujianstudi.router"));
const siswa_ujianstudiv3_router_1 = __importDefault(require("./app/routes/siswa/siswa.ujianstudiv3.router"));
(0, dotenv_1.config)();
const port = process.env.APP_PORT || 8000;
// const limiter = rateLimit({
//     windowMs: 1 * 60 * 1000, // 1 minutes
//     max: 30, // Limit each IP to 70 requests per `window` (here, per 15 minutes)
//     // delayMs: 0, // disable delaying - full speed until the max limit is reached
//     message: "Too many requests maid from this IP, please try again after an hour",
//     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//     legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// })
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 1, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//     legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// })
// ROUTERS
// import UserRoutes from "./routers/UserRouter";
// import AuthRoutes from "./routers/AuthRoutes";
// import TodoRoutes from "./routers/TodoRoutes";
const rateLimit = 6000;
// REDIS INITIALITATION
const redisClient = redis.createClient({ url: process.env.REDIS_URL, password: process.env.REDIS_PASSWORD });
(async () => {
    redisClient.on("error", (error) => console.error(`Ups : ${error}`));
    await redisClient.connect();
})();
// REDIS
// * Updated code WITH REDIS
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
    // If the cache is empty or we fail reading it, default back to the API
    const apiResponse = await (0, axios_1.default)(`https://jsonplaceholder.typicode.com/todos?completed=${completed}`);
    console.log('Data requested from the ToDo API.');
    // Finally, if you got any results, save the data back to the cache
    if (apiResponse.data.length > 0) {
        try {
            await redisClient.set(cacheKey, JSON.stringify(apiResponse.data), { EX: process.env.REDIS_LIMIT_IN_SEC ? parseInt(process.env.REDIS_LIMIT_IN_SEC) : 86400 } // Set the specified expire time, in seconds. 86400=1HARI ,604800=7HARI
            ); // 👈 updated code
        }
        catch (error) {
            console.error('Something happened to Redis', error);
        }
    }
    return apiResponse.data;
}
// * Updated code WITH REDIS-END
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.plugins();
        this.routes();
    }
    plugins() {
        this.app.use(body_parser_1.default.json());
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, compression_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cors_1.default)());
        // this.app.use(limiter);
        express_1.default.urlencoded({ extended: true, limit: "5m" });
    }
    routes() {
        //* ROUTER-BARU
        this.app.route("/redis").get((0, babengLimiter_1.babengLimiter)(), async (req, res) => {
            res.send(await fetchToDos(req.query.completed));
        });
        const apiVersion = process.env.API_VERSION || "v1";
        this.app.route("/").get((0, babengLimiter_1.babengLimiter)(), (req, res) => {
            res.send({
                success: true,
                message: 'just TS'
            });
        });
        this.app.route("/ts/req").get((0, babengLimiter_1.babengLimiterUjian)(rateLimit, 1), (req, res) => {
            res.send({
                success: true,
                message: `just TS With Request ${rateLimit}/m`
            });
        });
        this.app.use(`/api/${apiVersion}/home`, (0, babengLimiter_1.babengLimiter)(), home_router_1.default);
        this.app.use(`/api/${apiVersion}/redis/studiv2`, (0, babengLimiter_1.babengLimiter)(13000), redis_studiv2_router_1.default);
        //! ROUTER-BARU
        this.app.use(`/api/${apiVersion}/master/`, (0, babengLimiter_1.babengLimiter)(13000), admin_mastering_sekolah_router_2.default);
        // *ujian studi
        this.app.use(`/api/${apiVersion}/ujianstudi/`, (0, babengLimiter_1.babengLimiter)(13000), admin_studiv2_banksoal_router_1.default);
        this.app.use(`/api/${apiVersion}/ujianstudi/`, (0, babengLimiter_1.babengLimiter)(13000), admin_studiv2_paketsoal_router_1.default);
        this.app.use(`/api/${apiVersion}/ujianstudi/`, (0, babengLimiter_1.babengLimiter)(13000), admin_studiv2_proses_router_1.default);
        this.app.use(`/api/${apiVersion}/ujianstudi/`, (0, babengLimiter_1.babengLimiter)(13000), admin_studiv2_hasil_router_1.default);
        //! ROUTER-BARU-END
        //! ROUTER-SISWA-BARU
        this.app.use(`/api/${apiVersion}/siswa/`, (0, babengLimiter_1.babengLimiter)(13000), siswa_profile_router_1.default);
        this.app.use(`/api/${apiVersion}/siswa/ujianstudi`, (0, babengLimiter_1.babengLimiter)(13000), siswa_ujianstudi_router_1.default); //download semua soal di awal
        this.app.use(`/api/${apiVersion}/studiv3/siswa/ujianstudi/vless`, (0, babengLimiter_1.babengLimiter)(13000), siswa_ujianstudiv3_router_1.default); //versi reques kecil'' (reques persoal)
        //! ROUTER-SISWA-BARU-END
        //*  OLD-ROUTER-
        this.app.use(`/api/`, (0, babengLimiter_1.babengLimiterUjian)(rateLimit, 1), auth_router_1.default); //* user login/authentikasi
        //ADMIN OWNER
        this.app.use(`/api/siswa/data/`, (0, babengLimiter_1.babengLimiterUjian)(rateLimit, 1), studi_router_1.default); //* untuk ujian studi
        this.app.use(`/api/`, (0, babengLimiter_1.babengLimiter)(), admin_mastering_sekolah_router_1.default);
        this.app.use(`/api/`, (0, babengLimiter_1.babengLimiter)(), admin_mastering_paket_router_1.default);
        // menuujian
        this.app.use(`/api/`, (0, babengLimiter_1.babengLimiter)(), studi_proses_router_1.default);
        //*TANPALOGIN
        this.app.use(`/api/`, (0, babengLimiter_1.babengLimiter)(), guest_router_1.default);
        this.app.use(`/api/${apiVersion}/`, (0, babengLimiter_1.babengLimiter)(), guest_datasiswa_router_1.default);
    }
}
const app = new App().app;
models_1.default.sequelize.authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
app.listen(port, () => {
    console.log(`Aplikasi ini berjalan di port ${port} DB ${process.env.DB_PORT}`);
    console.log(process.env.APP_PORT);
    console.log(process.env.DB_PORT);
});
// const app = express();
// app.route("/").get((req, res) => {
//     res.send("hi NGAB");
// })
// app.listen(8000);
