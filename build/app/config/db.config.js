"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig_studi_v2 = exports.dbConfig = void 0;
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
exports.dbConfig_studi_v2 = {
    HOST: process.env.STUDI_V2_DB_HOST || "localhost",
    USER: process.env.STUDI_V2_DB_USERNAME || "root",
    PASSWORD: process.env.STUDI_V2_DB_PASSWORD || "",
    DB: process.env.STUDI_V2_DB_DATABASE || "psikotest-studi",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
