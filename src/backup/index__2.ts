import express, { Application, Request, Response } from "express";
// import bodyParser from "body-parser"; //untuk menampilkan data request berbentuk json
import morgan from "morgan"; //untukk logger / melihat riwayat yang di konsumsi API
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { config as dotenv } from "dotenv";


const app = express();
dotenv();

app.use(cors());
app.use(express.json())
express.urlencoded({ extended: true });

app.get('/', function (req: Request, res: Response) {
    res.send({
        success: true,
        data: "This is ts projects"
    });
});
app.get('/ts', function (req, res) {
    res.send('this  ts project');
});
app.get('/expressjs', function (req, res) {
    res.send('express');
});

// ROUTER
// app.use(require('./app/routes/PostRoute'));
// require('./app/routes/AuthRoute')(app);
// require('./app/routes/studi.route')(app);
// Listen
var port = process.env.APP_PORT || 8000;
app.listen(port);
console.log('Listening on localhost:' + port);
