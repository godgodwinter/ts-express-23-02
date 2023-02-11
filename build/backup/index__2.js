"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const app = (0, express_1.default)();
(0, dotenv_1.config)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
express_1.default.urlencoded({ extended: true });
app.get('/', function (req, res) {
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
