import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser"; //untuk menampilkan data request berbentuk json
import morgan from "morgan"; //untukk logger / melihat riwayat yang di konsumsi API
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { config as dotenv } from "dotenv";
import db from "./app/models"
// router
import HomeRoutes from "./app/routes/home.router";
import AuthRoutes from "./app/routes/auth.router";
import { v4 as uuidv4 } from 'uuid';
import StudiRouter from "./app/routes/studi.router";
import AdminMasteringSekolahRouter from "./app/routes/admin/admin.mastering.sekolah.router";
import adminMasteringPaketRouter from "./app/routes/admin/admin.mastering.paket.router";
import guestRouter from "./app/routes/tanpalogin/guest.router";

dotenv();
const port: any = process.env.APP_PORT || 8000;
// ROUTERS
// import UserRoutes from "./routers/UserRouter";
// import AuthRoutes from "./routers/AuthRoutes";
// import TodoRoutes from "./routers/TodoRoutes";

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
        express.urlencoded({ extended: true, limit: "5m" });
    }


    protected routes(): void {
        //* ROUTER-BARU
        const apiVersion = "v1"
        this.app.route("/").get((req: Request, res: Response) => {
            res.send({
                success: true,
                message: 'just TS'
            });
        })

        this.app.use(`/api/${apiVersion}/home`, HomeRoutes);

        //*  ROUTER-
        this.app.use(`/api/`, AuthRoutes);
        //ADMIN OWNER
        this.app.use(`/api/siswa/data/`, StudiRouter);
        this.app.use(`/api/`, AdminMasteringSekolahRouter);
        this.app.use(`/api/`, adminMasteringPaketRouter);

        //TANPALOGIN
        this.app.use(`/api/`, guestRouter);

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