import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser"; //untuk menampilkan data request berbentuk json
import morgan from "morgan"; //untukk logger / melihat riwayat yang di konsumsi API
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { config as dotenv } from "dotenv";



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
        dotenv();
    }

    protected plugins(): void {
        this.app.use(bodyParser.json());
        this.app.use(morgan("dev"));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    }

    protected routes(): void {
        this.app.route("/").get((req: Request, res: Response) => {
            res.send('HOME,,Ini Express dengan TS');
        })

        // this.app.use("/api/v1/users", UserRoutes);
        // this.app.use("/api/v1/auth", AuthRoutes);
        // this.app.use("/api/v1/todos", TodoRoutes);
        // this.app.route("/users").post((req: Request, res: Response) => {
        //     res.send(req.body);
        // })
    }
}

const port: number = 8002;
const app = new App().app;
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