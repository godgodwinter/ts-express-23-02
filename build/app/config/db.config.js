"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.dbConfig = {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USERNAME || "root",
    PASSWORD: process.env.DB_PASSWORD || "",
    DB: process.env.DB_DATABASE || "psikotest-23-02a",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};