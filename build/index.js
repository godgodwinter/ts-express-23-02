"use strict";
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
// import rateLimit from "express-rate-limit"
const models_1 = __importDefault(require("./app/models"));
// router
const home_router_1 = __importDefault(require("./app/routes/home.router"));
const auth_router_1 = __importDefault(require("./app/routes/auth.router"));
const studi_router_1 = __importDefault(require("./app/routes/studi.router"));
const admin_mastering_sekolah_router_1 = __importDefault(require("./app/routes/admin/admin.mastering.sekolah.router"));
const admin_mastering_paket_router_1 = __importDefault(require("./app/routes/admin/admin.mastering.paket.router"));
const guest_router_1 = __importDefault(require("./app/routes/tanpalogin/guest.router"));
const studi_proses_router_1 = __importDefault(require("./app/routes/admin/studi/studi.proses.router"));
const babengLimiter_1 = require("./app/helpers/babengLimiter");
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
        const apiVersion = "v1";
        this.app.route("/").get((0, babengLimiter_1.babengLimiter)(), (req, res) => {
            res.send({
                success: true,
                message: 'just TS'
            });
        });
        this.app.route("/ts/req").get((0, babengLimiter_1.babengLimiterUjian)(), (req, res) => {
            res.send({
                success: true,
                message: 'just TS With Request'
            });
        });
        this.app.use(`/api/${apiVersion}/home`, (0, babengLimiter_1.babengLimiter)(), home_router_1.default);
        //*  ROUTER-
        this.app.use(`/api/`, (0, babengLimiter_1.babengLimiterUjian)(), auth_router_1.default); //* user login/authentikasi
        //ADMIN OWNER
        this.app.use(`/api/siswa/data/`, (0, babengLimiter_1.babengLimiterUjian)(), studi_router_1.default); //* untuk ujian studi
        this.app.use(`/api/`, (0, babengLimiter_1.babengLimiter)(), admin_mastering_sekolah_router_1.default);
        this.app.use(`/api/`, (0, babengLimiter_1.babengLimiter)(), admin_mastering_paket_router_1.default);
        // menuujian
        this.app.use(`/api/`, (0, babengLimiter_1.babengLimiter)(), studi_proses_router_1.default);
        //TANPALOGIN
        this.app.use(`/api/`, (0, babengLimiter_1.babengLimiter)(), guest_router_1.default);
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
    console.log(`Aplikasi ini berjalan di port ${port}`);
    console.log(process.env.APP_PORT);
    console.log(process.env.DB_PORT);
});
// const app = express();
// app.route("/").get((req, res) => {
//     res.send("hi NGAB");
// })
// app.listen(8000);
