import { config as dotenv } from "dotenv";
dotenv();

export const dbConfig = {
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

export const dbConfig_studi_v2 = {
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