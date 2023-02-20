import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser"; //untuk menampilkan data request berbentuk json
import morgan from "morgan"; //untukk logger / melihat riwayat yang di konsumsi API
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { config as dotenv } from "dotenv";
// import rateLimit from "express-rate-limit"

import db from "./app/models"
// router
import HomeRoutes from "./app/routes/home.router";
import AuthRoutes from "./app/routes/auth.router";
import { v4 as uuidv4 } from 'uuid';
import StudiRouter from "./app/routes/studi.router";
import AdminMasteringSekolahRouter from "./app/routes/admin/admin.mastering.sekolah.router";
import AdminMasteringSekolahRouterV2 from "./app/routes/admin/mastering/admin.mastering.sekolah.router";
import adminMasteringPaketRouter from "./app/routes/admin/admin.mastering.paket.router";
import AdminUjianstudiBanksoalRouter from "./app/routes/admin/studiv2/admin.studiv2.banksoal.router"
import AdminUjianstudiPaketsoalRouter from "./app/routes/admin/studiv2/admin.studiv2.paketsoal.router"
import AdminUjianstudiProsesRouter from "./app/routes/admin/studiv2/admin.studiv2.proses.router"
import guestRouter from "./app/routes/tanpalogin/guest.router";
import studiProsesRouter from "./app/routes/admin/studi/studi.proses.router";
import { babengLimiter, babengLimiterUjian } from "./app/helpers/babengLimiter";

dotenv();
const port: any = process.env.APP_PORT || 8000;


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
const rateLimit: number = 6000;

class App {
    public app: Application
    constructor() {
        this.app = express();
        this.plugins();
        this.routes();
    }

    protected plugins(): void {
        this.app.use(bodyParser.json());
        this.app.use(morgan("dev"));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
        // this.app.use(limiter);
        express.urlencoded({ extended: true, limit: "5m" });
    }


    protected routes(): void {
        //* ROUTER-BARU
        const apiVersion = process.env.API_VERSION || "v1"
        this.app.route("/").get(babengLimiter(), (req: Request, res: Response) => {
            res.send({
                success: true,
                message: 'just TS'
            });
        })
        this.app.route("/ts/req").get(babengLimiterUjian(rateLimit, 1), (req: Request, res: Response) => {
            res.send({
                success: true,
                message: `just TS With Request ${rateLimit}/m`
            });
        })

        this.app.use(`/api/${apiVersion}/home`, babengLimiter(), HomeRoutes);
        //! ROUTER-BARU
        this.app.use(`/api/${apiVersion}/master/`, babengLimiter(3000), AdminMasteringSekolahRouterV2);
        // *ujian studi
        this.app.use(`/api/${apiVersion}/ujianstudi/`, babengLimiter(3000), AdminUjianstudiBanksoalRouter);
        this.app.use(`/api/${apiVersion}/ujianstudi/`, babengLimiter(3000), AdminUjianstudiPaketsoalRouter);
        this.app.use(`/api/${apiVersion}/ujianstudi/`, babengLimiter(3000), AdminUjianstudiProsesRouter);
        //! ROUTER-BARU-END

        //*  OLD-ROUTER-
        this.app.use(`/api/`, babengLimiterUjian(rateLimit, 1), AuthRoutes); //* user login/authentikasi
        //ADMIN OWNER
        this.app.use(`/api/siswa/data/`, babengLimiterUjian(rateLimit, 1), StudiRouter); //* untuk ujian studi
        this.app.use(`/api/`, babengLimiter(), AdminMasteringSekolahRouter);
        this.app.use(`/api/`, babengLimiter(), adminMasteringPaketRouter);
        // menuujian
        this.app.use(`/api/`, babengLimiter(), studiProsesRouter);

        //*TANPALOGIN
        this.app.use(`/api/`, babengLimiter(), guestRouter);

    }
}

const app = new App().app;
db.sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err: any) => {
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