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
(0, dotenv_1.config)();
const port = process.env.APP_PORT || 8000;
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
    }
    routes() {
        this.app.route("/").get((req, res) => {
            res.send('be TS dev');
        });
        // this.app.use("/api/v1/users", UserRoutes);
        // this.app.use("/api/v1/auth", AuthRoutes);
        // this.app.use("/api/v1/todos", TodoRoutes);
        // this.app.route("/users").post((req: Request, res: Response) => {
        //     res.send(req.body);
        // })
    }
}
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
